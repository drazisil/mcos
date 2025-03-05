import type { DatabaseTransactionConnection } from 'slonik';
import { getDatabase } from '../services/database.js';
import * as Sentry from '@sentry/node';
import { getServerLogger } from 'rusty-motors-shared';

const { slonik, sql } = await getDatabase();
const log = getServerLogger('createNewCar');

// async function playerExists(playerId: number): Promise<boolean> {
//     return Sentry.startSpan(
//         {
//             name: 'Get player',
//             op: 'db.query',
//             attributes: {
//                 sql: 'SELECT 1 FROM player WHERE player_id = ${playerId}',
//                 db: 'postgres',
//             },
//         },
//         async () => {
//             return slonik.exists(sql.typeAlias('id')`
//         SELECT 1 FROM player WHERE player_id = ${playerId}
//     `);
//         },
//     );
// }

async function skinExists(skinId: number): Promise<boolean> {
    return Sentry.startSpan(
        {
            name: 'skinExists',
            op: 'db.query',
            attributes: {
                sql: 'SELECT 1 FROM pt_skin WHERE skin_id = ${skinId}',
                db: 'postgres',
            },
        },
        async () => {
            return slonik.exists(sql.typeAlias('id')`
        SELECT 1 FROM pt_skin WHERE skin_id = ${skinId}
    `);
        },
    );
}

async function getAbstractPartTypeIDForBrandedPartID(
    connection: DatabaseTransactionConnection,
    brandedPartId: number,
): Promise<number> {
    const abstractPartTypeId = await Sentry.startSpan(
        {
            name: 'GetAbstractPartTypeIDForBrandedPartID',
            op: 'db.query',
            attributes: {
                sql: 'SELECT pt.abstract_part_type_id FROM branded_part bp inner join part_type pt on bp.part_type_id = pt.part_type_id WHERE bp.branded_part_id = ${brandedPartId}',
                db: 'postgres',
            },
        },
        async () => {
            return connection.one(sql.typeAlias('abstractPartType')`
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

// async function isAbstractPartTypeAVehicle(
//     abstractPartTypeId: number,
// ): Promise<boolean> {
//     return abstractPartTypeId === 101;
// }

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
    if ((await skinExists(skinId)) === false) {
        log.error('skin does not exist');
        throw new Error('skin does not exist');
    }

    const abstractPartTypeId = await getAbstractPartTypeIDForBrandedPartID(
        slonik,
        brandedPartId,
    ).catch((error) => {
        log.error('Error getting abstract part type id: ' + error);
        throw new Error('Error getting abstract part type id: ' + error);
    });

    if (abstractPartTypeId !== 101) {
        log.error(
            {
                brandedPartId,
                abstractPartTypeId,
            },
            'branded part is not a vehicle',
        );
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

    log.debug({ tmpParts }, 'tmpParts after pushing the first part');

    // Get the rest of the parts for the vehicle
    const part = tmpParts[0];

    if (typeof part === 'undefined') {
        log.error('tmpParts[0] is undefined');
        throw new Error('tmpParts[0] is undefined');
    }

    const restOfTheParts = await slonik.many(
        sql.typeAlias('brandedPart')`
        SELECT b.branded_part_id, a.attachment_point_id
        From stock_assembly a
        inner join branded_part b on a.child_branded_part_id = b.branded_part_id
        where a.parent_branded_part_id = ${part.brandedPartId}
    `,
    );

    if (restOfTheParts.length === 0) {
        log.error('No parts found for the vehicle');
        throw new Error('No parts found for the vehicle');
    }

    log.debug(`Found ${restOfTheParts.length} parts for the vehicle`);

    log.debug({ restOfTheParts }, 'restOfTheParts');

    for (const part of restOfTheParts) {
        tmpParts.push({
            partId: null,
            parentPartId: null,
            brandedPartId: part.branded_part_id,
            AttachmentPointId: part.attachment_point_id,
        });
    }

    log.debug({ tmpParts }, 'tmpParts after getting the rest of the parts');

    let vehicleId: number | null = null;

    await slonik.transaction(async (connection) => {
        // First insert the new car into the vehicle table

        if (tmpParts.length === 0) {
            log.error(`No parts found for the vehicle ${brandedPartId}`);
            throw new Error('No parts found for the vehicle');
        }

        log.debug({ tmpParts }, 'tmpParts');

        let parentPartId = null;
        let currentPartId = await getNextSq(connection, 'part_partid_seq');

        if (typeof tmpParts[0] === 'undefined') {
            log.error('tmpParts[0] is undefined');
            throw new Error('tmpParts[0] is undefined');
        }

        // Make sure the first part's branded part id is not null
        if (tmpParts[0].brandedPartId === null) {
            log.error("The first part's branded part id is null");
            throw new Error("The first part's branded part id is null");
        }

        // Get the first part's abstract part type id
        const firstPartAbstractPartTypeId =
            await getAbstractPartTypeIDForBrandedPartID(
                connection,
                tmpParts[0].brandedPartId,
            );

        if (firstPartAbstractPartTypeId !== 101) {
            throw new Error('The first part is not a vehicle');
        }

        // Get the skin record for the new car
        const skinDefaultFlag = (
            await connection.one(sql.typeAlias('ptSkin')`
                    SELECT default_flag FROM pt_skin WHERE skin_id = ${skinId}
                    `)
        ).default_flag;

        if (typeof skinDefaultFlag === 'undefined') {
            log.error('skinDefaultFlag is undefined');
            throw new Error('skinDefaultFlag is undefined');
        }

        // The first part will have a parentpartid of 0, and a partid of nextval(next_part_id)
        ({ currentPartId, parentPartId, vehicleId } = await saveVehicleAndParts(
            tmpParts,
            connection,
            currentPartId,
            parentPartId,
            newCarOwnerId,
            skinId,
            skinDefaultFlag,
            vehicleId,
        ));
    });

    if (vehicleId === null) {
        log.error('vehicleId is null');
        throw new Error('vehicleId is null');
    }

    return vehicleId;
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

async function saveVehicleAndParts(
    tmpParts: partTableEntry[],
    connection: DatabaseTransactionConnection,
    currentPartId: number,
    parentPartId: any,
    newCarOwnerId: number,
    skinId: number,
    skinDefaultFlag: any,
    vehicleId: any,
) {
    const part = tmpParts[0];
    if (typeof part === 'undefined') {
        log.error('tmpParts[0] is undefined');
        throw new Error('tmpParts[0] is undefined');
    }

    await connection.query(sql.typeAlias('part')`
                                INSERT INTO part (part_id, parent_part_id, branded_part_id, percent_damage, item_wear, attachment_point_id, owner_id, part_name, repair_cost, scrap_value)
                                VALUES (${currentPartId}, ${parentPartId}, ${part.brandedPartId}, 0, 0, ${part.AttachmentPointId}, ${newCarOwnerId}, null, 0, 0)
                                `);

    // Insert the vehicle record
    await connection.query(
        sql.typeAlias('brandedPart')`
                            INSERT INTO vehicle (vehicle_id, skin_id, flags, class, info_setting, damage_info)
                            VALUES (${currentPartId}, ${skinId}, ${skinDefaultFlag}, 0, 0, null)
                            `,
    );

    vehicleId = currentPartId;

    log.debug({ vehicleId }, 'vehicleId');

    // Update the partid of the part in the tmpParts
    if (typeof tmpParts[0] === 'undefined') {
        log.error('tmpParts[0] is undefined');
        throw new Error('tmpParts[0] is undefined');
    }

    tmpParts[0].partId = currentPartId;
    tmpParts[0].parentPartId = parentPartId;

    log.debug({ tmpParts }, 'tmpParts after inserting the first part');

    // Now insert the rest of the parts
    for (let i = 1; i < tmpParts.length; i++) {
        parentPartId = currentPartId;
        currentPartId = await getNextSq(connection, 'part_partid_seq');

        const part = tmpParts[i];

        if (typeof part === 'undefined') {
            log.error('tmpParts[i] is undefined');
            throw new Error('tmpParts[i] is undefined');
        }

        await addPartToDatabase(
            part,
            connection,
            currentPartId,
            parentPartId,
            newCarOwnerId,
        );

        // Update the partid of the part in the tmpParts array
        part.partId = currentPartId;
        part.parentPartId = parentPartId;
    }

    log.debug({ tmpParts }, 'tmpParts after inserting the rest of the parts');
    return { currentPartId, parentPartId, vehicleId };
}

async function addPartToDatabase(
    part: partTableEntry | undefined,
    connection: DatabaseTransactionConnection,
    currentPartId: number,
    parentPartId: any,
    newCarOwnerId: number,
) {
    if (typeof part === 'undefined') {
        log.error('tmpParts[i] is undefined');

        throw new Error('tmpParts[i] is undefined');
    }

    if (typeof part.brandedPartId === 'undefined') {
        log.error({ part }, 'brandedPartId is undefined');
        throw new Error('brandedPartId is undefined');
    }

    if (typeof part.AttachmentPointId === 'undefined') {
        log.error({ part }, 'AttachmentPointId is undefined');
        throw new Error('AttachmentPointId is undefined');
    }

    await connection.query(
        sql.typeAlias('part')`
                                INSERT INTO part (part_id, parent_part_id, branded_part_id, percent_damage, item_wear, attachment_point_id, owner_id, part_name, repair_cost, scrap_value)
                                VALUES (${currentPartId}, ${parentPartId}, ${part.brandedPartId}, 0, 0, ${part.AttachmentPointId}, ${newCarOwnerId}, null, 0, 0)
                                `,
    );
}

async function getNextSq(
    connection: DatabaseTransactionConnection,
    seqName: string,
) {
    return await Sentry.startSpan(
        {
            name: 'Get next part id',
            op: 'db.query',
            attributes: {
                sql: "SELECT nextval('part_partid_seq')",
                db: 'postgres',
            },
        },
        async () => {
            return Number(
                (
                    await connection.one(sql.typeAlias('nextPartId')`
                SELECT nextval(${seqName})
            `)
                ).nextval,
            );
        },
    );
}

export type PartEntry = {
    partId: number;
    parentPartId: number | null;
    brandedPartId: number;
    percentDamage: number;
    itemWear: number;
    attachmentPointId: number;
    ownerId: number;
    partName: string;
    repairCost: number;
    scrapValue: number;
};

export type VehicleRecord = {
    vehicleId: number;
    skinId: number;
    flags: number;
    class: number;
    infoSetting: number;
    damageInfo: number;
    ownerId: number;
    parts: PartEntry[];
};

export async function getVehicleAndParts(
    vehicleId: number,
): Promise<VehicleRecord | null> {
    const vehicle: VehicleRecord = {
        vehicleId: vehicleId,
        skinId: 0,
        flags: 0,
        class: 0,
        infoSetting: 0,
        damageInfo: 0,
        ownerId: 0,
        parts: [],
    }

    // Get the vehicle record
    const rawVehicleRecord = await Sentry.startSpan(
        {
            name: 'Get vehicle and parts',
            op: 'db.query',
            attributes: {
                sql: 'SELECT * FROM vehicle WHERE vehicle_id = ${vehicleId}',
                db: 'postgres',
            },
        },
        async (): Promise<VehicleRecord> => {
            const vehicle = await slonik.one(sql.typeAlias('vehicleWithOwner')`
        SELECT v.*, p.owner_id 
from public.vehicle v
inner join public.part p on p.part_id = v.vehicle_id 
where v.vehicle_id = 79
    `);

            if (!vehicle) {
                log.error(`Vehicle with id ${vehicleId} not found`);
                throw new Error(`Vehicle with id ${vehicleId} not found`);
            }

            return {
                vehicleId: vehicle.vehicle_id,
                skinId: vehicle.skin_id,
                flags: vehicle.flags,
                class: vehicle.class,
                infoSetting: vehicle.info_setting,
                damageInfo: vehicle.damage_info,
                ownerId: vehicle.owner_id,
                parts: [],
            };
        },
    );

    if (!rawVehicleRecord) {
        log.error(`Vehicle with id ${vehicleId} not found`);
        throw new Error(`Vehicle with id ${vehicleId} not found`);
    }

    vehicle.vehicleId = rawVehicleRecord.vehicleId;
    vehicle.skinId = rawVehicleRecord.skinId;
    vehicle.flags = rawVehicleRecord.flags;
    vehicle.class = rawVehicleRecord.class;
    vehicle.infoSetting = rawVehicleRecord.infoSetting;
    vehicle.damageInfo = rawVehicleRecord.damageInfo;
    vehicle.ownerId = rawVehicleRecord.ownerId;

    // Get the parts for the vehicle
    const parts = await Sentry.startSpan(
        {
            name: 'Get vehicle and parts',
            op: 'db.query',
            attributes: {
                sql: 'SELECT * FROM part WHERE part_id = ${vehicleId} OR parent_part_id = ${vehicleId}',
                db: 'postgres',
            },
        },
        async (): Promise<PartEntry[]> => {
            const parts = [];
            const rawParts = await slonik.many(sql.typeAlias('part')`
        SELECT * FROM part WHERE part_id = ${vehicleId} OR parent_part_id = ${vehicleId}
    `);
            for (const rawPart of rawParts) {
                parts.push({
                    partId: rawPart.part_id,
                    parentPartId: rawPart.parent_part_id,
                    brandedPartId: rawPart.branded_part_id,
                    percentDamage: rawPart.percent_damage,
                    itemWear: rawPart.item_wear,
                    attachmentPointId: rawPart.attachment_point_id,
                    ownerId: rawPart.owner_id,
                    partName: rawPart.part_name,
                    repairCost: rawPart.repair_cost,
                    scrapValue: rawPart.scrap_value,
                });
            }
            return parts;
        },
    );

    if (parts.length === 0) {
        log.error(`No parts found for vehicle with id ${vehicleId}`);
        throw new Error(`No parts found for vehicle with id ${vehicleId}`);
    }

    log.debug({ parts }, 'parts');

    vehicle.parts = parts;

    return vehicle;
}

export async function getOwnedVehiclesForPerson(
    personId: number,
): Promise<
    {
        partId: number;
        parentPartId: number | null;
        brandedPartId: number;
        percentDamage: number;
        itemWear: number;
        attachmentPointId: number;
        ownerId: number;
        partName: string;
        repairCost: number;
        scrapValue: number;
    }[]
> {
    return Sentry.startSpan(
        {
            name: 'Get owned vehicles for person',
            op: 'db.query',
            attributes: {
                sql: 'SELECT p.part_id, p.parent_part_id, p.branded_part_id, p.attachment_point_id, p.owner_id, p.part_name, p.repair_cost, p.scrap_value from public.part p inner join public.vehicle v on v.vehicle_id = p.part_id where p.owner_id = ${personId}',
                db: 'postgres',
            },
        },
        async () => {
            const cars = [];
            const parts = await slonik.many(sql.typeAlias('part')`
        SELECT p.part_id, p.branded_part_id, p.attachment_point_id, p.owner_id, p.part_name, p.repair_cost, p.scrap_value 
from public.part p 
inner join public.vehicle v on v.vehicle_id = p.part_id 
where p.owner_id = ${personId};
    `);
            for (const part of parts) {
                cars.push({
                    partId: part.part_id,
                    parentPartId: null,
                    brandedPartId: part.branded_part_id,
                    percentDamage: 0,
                    itemWear: 0,
                    attachmentPointId: part.attachment_point_id,
                    ownerId: part.owner_id,
                    partName: part.part_name,
                    repairCost: part.repair_cost,
                    scrapValue: part.scrap_value,
                });
            }
            return cars;
        },
    );
}
