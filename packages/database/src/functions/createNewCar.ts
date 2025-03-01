import { DatabaseTransactionConnection } from "slonik";
import { getDatabase } from "../services/database.js";
import * as Sentry from "@sentry/node";
import { getServerLogger } from "rusty-motors-shared";

const { slonik, sql } = await getDatabase();
const log = getServerLogger("createNewCar");

async function playerExists(playerId: number): Promise<boolean> {
    return Sentry.startSpan(
        {
            name: "Get player",
            op: "db.query",
            attributes: {
                sql: "SELECT 1 FROM player WHERE player_id = ${playerId}",
                db: "postgres",
            },
        },
        async () => {
            return slonik.exists(sql.typeAlias("id")`
        SELECT 1 FROM player WHERE player_id = ${playerId}
    `);
        },
    );
}

async function skinExists(skinId: number): Promise<boolean> {
    return Sentry.startSpan(
        {
            name: "skinExists",
            op: "db.query",
            attributes: {
                sql: "SELECT 1 FROM pt_skin WHERE skin_id = ${skinId}",
                db: "postgres",
            },
        },
        async () => {
            return slonik.exists(sql.typeAlias("id")`
        SELECT 1 FROM pt_skin WHERE skin_id = ${skinId}
    `);
        },
    );
}

async function getAbstractPartTypeIDForBrandedPartID(
    brandedPartId: number,
): Promise<number> {
    const abstractPartTypeId = await Sentry.startSpan(
        {
            name: "GetAbstractPartTypeIDForBrandedPartID",
            op: "db.query",
            attributes: {
                sql: "SELECT pt.abstract_part_type_id FROM branded_part bp inner join part_type pt on bp.part_type_id = pt.part_type_id WHERE bp.branded_part_id = ${brandedPartId}",
                db: "postgres",
            },
        },
        async () => {
            return slonik.one(sql.typeAlias("abstractPartType")`
        SELECT pt.abstract_part_type_id 
        FROM branded_part bp
        inner join part_type pt on bp.part_type_id = pt.part_type_id
        WHERE bp.branded_part_id = ${brandedPartId}
    `);
        },
    );

    if (!abstractPartTypeId) {
        log.error(`branded part with id ${brandedPartId} does not exist`);
        throw new Error(`branded part with id ${brandedPartId} does not exist`);
    }
    return abstractPartTypeId.abstract_part_type_id;
}

async function isAbstractPartTypeAVehicle(
    abstractPartTypeId: number,
): Promise<boolean> {
    return abstractPartTypeId === 101;
}

type partTableEntry = {
    partId: number | null;
    parentPartId: number | null;
    brandedPartId: number | null;
    AttachmentPointId: number | null;
};

export async function createNewCar(
    brandedPartId: number,
    skinId: number,
    newCarOwnerId: number,
): Promise<number> {
    // if ((await playerExists(newCarOwnerId)) === false) {
    //     log.error("player does not exist");
    //     throw new Error("player does not exist");
    // }

    if ((await skinExists(skinId)) === false) {
        log.error("skin does not exist");
        throw new Error("skin does not exist");
    }

    const abstractPartTypeId =
        await getAbstractPartTypeIDForBrandedPartID(brandedPartId);


    if ((await isAbstractPartTypeAVehicle(abstractPartTypeId)) === false) {
        log.error({
            brandedPartId,
            abstractPartTypeId,
        }, "branded part is not a vehicle");
        throw new Error(
            `branded part with id ${brandedPartId} and abstract part type id ${abstractPartTypeId} is not a vehicle`,
        );
    }

    const tmpParts: partTableEntry[] = [];

    tmpParts.push({
        partId: null,
        parentPartId: null,
        brandedPartId: brandedPartId,
        AttachmentPointId: 0,
    });

    // Get the rest of the parts for the vehicle
    const restOfTheParts = await Sentry.startSpan(
        {
            name: "Get rest of the parts",
            op: "db.query",
            attributes: {
                sql: "SELECT b.branded_part_id, a.attachment_point_id From stock_assembly a inner join branded_part b on a.child_branded_part_id = b.branded_part_id where a.parent_branded_part_id = ${tmpParts[0].brandedPartId}",
                db: "postgres",
            },
        },
        async () => {
            return slonik.many(sql.typeAlias("brandedPart")`
        SELECT b.branded_part_id, a.attachment_point_id
        From stock_assembly a
        inner join branded_part b on a.child_branded_part_id = b.branded_part_id
        where a.parent_branded_part_id = ${tmpParts[0].brandedPartId}
    `);
        },
    );

    for (const part of restOfTheParts) {
        tmpParts.push({
            partId: null,
            parentPartId: null,
            brandedPartId: part.brandedpartid,
            AttachmentPointId: part.attachmentpointid,
        });
    }

    try {
        let vehicleId = null;

        await Sentry.startSpan(
            {
                name: "Create new car",
                op: "db.transaction",
                attributes: {
                    db: "postgres",
                },
            },
            async () => {
                slonik.transaction(async (connection) => {
                    // First insert the new car into the vehicle table

                    if (tmpParts.length === 0) {
                        log.error(
                            `No parts found for the vehicle ${brandedPartId}`,
                        );
                        throw new Error("No parts found for the vehicle");
                    }

                    let parentPartId = null;
                    let currentPartId = await getNextSq("part_partid_seq");

                    // Make sure the first part's branded part id is not null
                    if (tmpParts[0].brandedPartId === null) {
                        log.error("The first part's branded part id is null");
                        throw new Error(
                            "The first part's branded part id is null",
                        );
                    }

                    // Get the first part's abstract part type id
                    const firstPartAbstractPartTypeId =
                        await getAbstractPartTypeIDForBrandedPartID(
                            tmpParts[0].brandedPartId,
                        );

                    if (firstPartAbstractPartTypeId !== 101) {
                        throw new Error("The first part is not a vehicle");
                    }

                    // Get the skin record for the new car
                    const skinDefaultFlag = (
                        await connection.one(sql.typeAlias("ptSkin")`
                SELECT default_flag FROM pt_skin WHERE skin_id = ${skinId}
            `)
                    ).defaultflag;

                    // The first part will have a parentpartid of 0, and a partid of nextval(next_part_id)
                    await addPart(
                        connection,
                        currentPartId,
                        parentPartId,
                        tmpParts[0],
                        newCarOwnerId,
                    );

                    // Insert the vehicle record
                    try {
                        await connection.query(sql.typeAlias("brandedPart")`
                    INSERT INTO vehicle (vehicle_id, skin_id, flags, class, info_setting, damage_info)
                    VALUES (${currentPartId}, ${skinId}, ${skinDefaultFlag}, 0, 0, null)
                `);
                    } catch (error) {
                        console.error("Error adding vehicle: " + error);
                        throw new Error("Error adding vehicle: " + error);
                    }

                    vehicleId = currentPartId;

                    tmpParts[0].partId = currentPartId;
                    tmpParts[0].parentPartId = parentPartId;

                    // Now insert the rest of the parts
                    for (let i = 1; i < tmpParts.length; i++) {
                        parentPartId = currentPartId;
                        currentPartId = await getNextSq("part_partid_seq");
                        console.log("currentPartId");
                        console.dir(currentPartId);

                        await addPart(
                            connection,
                            currentPartId,
                            parentPartId,
                            tmpParts[i],
                            newCarOwnerId,
                        );

                        // Update the partid of the part in the tmpParts array
                        tmpParts[i].partId = currentPartId;
                        tmpParts[i].parentPartId = parentPartId;
                    }
                });
            },
        );

        if (vehicleId === null) {
            log.error("vehicleId is null");
            throw new Error("vehicleId is null");
        }

        return vehicleId;
    } catch (error) {
        log.error("Error creating new car: " + error);
        throw new Error("Error creating new car: " + error);
    }
}
async function addPart(
    connection: DatabaseTransactionConnection,
    currentPartId: number,
    parentPartId: number | null,
    partEntry: partTableEntry,
    newCarOwenrId: number,
) {
    try {
        await connection.query(sql.typeAlias("part")`
                    INSERT INTO part (par_tid, parent_part_id, branded_part_id, percent_damage, item_wear, attachment_point_id, owner_id, part_name, repair_cost, scrap_value)
                    VALUES (${currentPartId}, ${parentPartId}, ${partEntry.brandedPartId}, 0, 0, ${partEntry.AttachmentPointId}, ${newCarOwenrId}, null, 0, 0)
                `);
    } catch (error) {
        log.error("Error adding part: " + error);
        throw new Error("Error adding part: " + error);
    }
}

export type DBPart = {
    partId: number;
    parentPartId: number;
    brandedPartId: number;
    percentDamage: number;
    itemWear: number;
    attachmentPointId: number;
    ownerId: number;
    partName: string;
    repairCost: number;
    scrapValue: number;
};

async function getPart(
    connection: DatabaseTransactionConnection,
    requestedPartId: number,
): Promise<DBPart> {
    try {
        const part = await connection.one(sql.typeAlias("dbPart")`
                    SELECT FROM part (part_id, parent_part_id, branded_part_id, percent_damage, item_wear, attachment_point_id, owner_id, part_name, repair_cost, scrap_value)
                    WHERE part_id = ${requestedPartId}
                `);
        return {
            partId: part.partid,
            parentPartId: part.parentpartid,
            brandedPartId: part.brandedpartid,
            percentDamage: part.percentdamage,
            itemWear: part.itemwear,
            attachmentPointId: part.attachmentpointid,
            ownerId: part.ownerid,
            partName: part.partname,
            repairCost: part.repaircost,
            scrapValue: part.scrapvalue,
        };
    } catch (error) {
        log.error("Error getting part: " + error);
        throw new Error("Error adding part: " + error);
    }
}

async function getNextSq(seqName: string) {
    return await Sentry.startSpan(
        {
            name: "Get next part id",
            op: "db.query",
            attributes: {
                sql: "SELECT nextval('part_partid_seq')",
                db: "postgres",
            },
        },
        async () => {
            return Number(
                (
                    await slonik.one(sql.typeAlias("nextPartId")`
                SELECT nextval(${seqName})
            `)
                ).nextval,
            );
        },
    );
}