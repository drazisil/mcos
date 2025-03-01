import { getServerLogger } from 'rusty-motors-shared';
import * as Sentry from '@sentry/node';
import { setVehiclePartTree } from '../cache.js';
import { getSlonik } from '../services/database.js';
import type { TPart } from './Part.js';

const level1PartTypes = [1001, 2001, 4001, 5001, 6001, 15001, 36001, 37001];

const partNumbersMap = new Map<number, number>();

const log = getServerLogger();

export type TVehicle = {
    vehicleId: number;
    skinId: number;
    flags: number;
    class: number;
    infoSetting: number;
    damageInfo: Buffer | null;
};

export type VehiclePartTreeType = {
    vehicleId: number;
    skinId: number;
    flags: number;
    class: number;
    infoSetting: number;
    damageInfo: Buffer | null;
    isStock: boolean;
    // One of the following two properties is required
    ownedLotId: number | null;
    ownerID: number | null;
    partId: number;
    parentPartId: null;
    brandedPartId: number;
    partTree: {
        level1: {
            partId: number;
            parts: TPart[];
        };
        level2: {
            partId: number;
            parts: TPart[];
        };
    };
};

async function getNextPartId(): Promise<number> {
    const result = await Sentry.startSpan(
        {
            name: 'Get next part id',
            op: 'db.query',
            attributes: {
                sql: "SELECT nextval('part_partid_seq')",
                db: 'postgres',
            },
        },
        async () => {
            const { slonik, sql } = await getSlonik();
            const { nextval } = await slonik.one(sql.typeAlias('nextPartId')`
            SELECT nextval('part_partid_seq')
        `);
            return Number(nextval);
        },
    );
    return result;
}

export async function savePart(part: TPart): Promise<void> {
    await Sentry.startSpan(
        {
            name: 'Save part',
            op: 'db.query',
            attributes: {
                sql: 'INSERT INTO part (partid, parentpartid, brandedpartid, percentdamage, itemwear, attachmentpointid, ownerid, partname, repaircost, scrapvalue) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
                db: 'postgres',
            },
        },
        async () => {
            const { slonik, sql } = await getSlonik();
            return slonik.query(sql.typeAlias('dbPart')`
        INSERT INTO part (
            partid,
            parentpartid,
            brandedpartid,
            percentdamage,
            itemwear,
            attachmentpointid,
            ownerid,
            partname,
            repaircost,
            scrapvalue
        ) VALUES (
            ${part.partId},
            ${part.parentPartId},
            ${part.brandedPartId},
            ${part.percentDamage},
            ${part.itemWear},
            ${part.attachmentPointId},
            ${part.ownerID},
            ${part.partName},
            ${part.repairCost},
            ${part.scrapValue}
        )
    `);
        },
    );
}

export async function saveVehicle(
    vehiclePartTree: VehiclePartTreeType,
): Promise<void> {
    try {
        const vehiclePart: TPart = {
            partId: vehiclePartTree.vehicleId,
            parentPartId: null,
            brandedPartId: vehiclePartTree.brandedPartId,
            percentDamage: 0,
            itemWear: 0,
            attachmentPointId: null,
            ownerID: vehiclePartTree.ownerID || null,
            partName: null,
            repairCost: 0,
            scrapValue: 0,
        };

        log.debug(`Saving vehicle part: ${JSON.stringify(vehiclePart)}`);
        await savePart(vehiclePart);

        const newVehicle: TVehicle = {
            vehicleId: vehiclePartTree.vehicleId,
            skinId: vehiclePartTree.skinId,
            flags: vehiclePartTree.flags,
            class: vehiclePartTree.class,
            infoSetting: vehiclePartTree.infoSetting,
            damageInfo: vehiclePartTree.damageInfo,
        };

        log.debug(`Saving vehicle: ${JSON.stringify(newVehicle)}`);

        await Sentry.startSpan(
            {
                name: 'Save vehicle',
                op: 'db.query',
                attributes: {
                    sql: 'INSERT INTO vehicle (vehicleid, skinid, flags, class, infosetting, damageinfo) VALUES ($1, $2, $3, $4, $5, $6)',
                    db: 'postgres',
                },
            },
            async () => {
                const { slonik, sql } = await getSlonik();
                return slonik.query(sql.typeAlias('vehicle')`
            INSERT INTO vehicle (
                vehicleid,
                skinid,
                flags,
                class,
                infosetting,
                damageinfo
            ) VALUES (
                ${newVehicle.vehicleId},
                ${newVehicle.skinId},
                ${newVehicle.flags},
                ${newVehicle.class},
                ${newVehicle.infoSetting},
                ${newVehicle.damageInfo}
            )
        `);
            },
        );
    } catch (error) {
        log.error(`Error saving vehicle: ${error}`);
        throw error;
    }
}

export async function saveVehiclePartTree(
    vehiclePartTree: VehiclePartTreeType,
): Promise<void> {
    try {
        const partIds = new Set<number>();

        const partTree = vehiclePartTree.partTree;

        for (const part of partTree.level1.parts) {
            partIds.add(part.partId);
        }

        for (const part of partTree.level2.parts) {
            partIds.add(part.partId);
        }

        for (const partId of partIds) {
            const part =
                partTree.level1.parts.find((p) => p.partId === partId) ||
                partTree.level2.parts.find((p) => p.partId === partId);
            if (!part) {
                log.error(`Part with partId ${partId} not found`);
                throw new Error(`Part with partId ${partId} not found`);
            }
            await savePart(part);
        }

        // Save the vehicle part tree in the cache
        setVehiclePartTree(vehiclePartTree.vehicleId, vehiclePartTree);
    } catch (error) {
        log.error(`Error saving vehicle part tree: ${error}`);
        throw error;
    }
}

export async function buildVehiclePartTreeFromDB(
    vehicleId: number,
): Promise<VehiclePartTreeType> {
    const vehicle = await Sentry.startSpan(
        {
            name: 'Get vehicle',
            op: 'db.query',
            attributes: {
                sql: 'SELECT vehicleid, skinid, flags, class, infosetting, damageinfo FROM vehicle WHERE vehicleid = $1',
                db: 'postgres',
            },
        },
        async () => {
            const { slonik, sql } = await getSlonik();
            return slonik.one(sql.typeAlias('vehicle')`
        SELECT vehicleid, skinid, flags, class, infosetting, damageinfo
        FROM vehicle
        WHERE vehicleid = ${vehicleId}
    `);
        },
    );

    if (!vehicle) {
        log.error(`Vehicle with id ${vehicleId} does not exist`);
        throw new Error(`Vehicle with id ${vehicleId} does not exist`);
    }

    const vehiclePartTree: VehiclePartTreeType = {
        vehicleId: vehicle.vehicleid,
        skinId: vehicle.skinid,
        flags: vehicle.flags,
        class: vehicle.class,
        infoSetting: vehicle.infosetting,
        damageInfo: vehicle.damageinfo,
        isStock: false,
        ownedLotId: null,
        ownerID: null,
        partId: vehicle.vehicleid,
        parentPartId: null,
        brandedPartId: 0,
        partTree: {
            level1: {
                partId: 0,
                parts: [],
            },
            level2: {
                partId: 0,
                parts: [],
            },
        },
    };

    // Get first part
    const part = await Sentry.startSpan(
        {
            name: 'Get part',
            op: 'db.query',
            attributes: {
                sql: 'SELECT partid, parentpartid, brandedpartid, percentdamage, itemwear, attachmentpointid, ownerid, partname, repaircost, scrapvalue FROM part WHERE partid = $1',
                db: 'postgres',
            },
        },
        async () => {
            const { slonik, sql } = await getSlonik();
            return slonik.one(sql.typeAlias('part')`
        SELECT partid, parentpartid, brandedpartid, percentdamage, itemwear, attachmentpointid, ownerid, partname, repaircost, scrapvalue
        FROM part
        WHERE partid = ${vehicleId}
    `);
        },
    );

    if (!part) {
        log.error(`Part with id ${vehicleId} does not exist`);
        throw new Error(`Part with id ${vehicleId} does not exist`);
    }

    vehiclePartTree.brandedPartId = part.brandedpartid;
    vehiclePartTree.ownerID = part.ownerid;

    const level1Parts = await Sentry.startSpan(
        {
            name: 'Get level 1 parts',
            op: 'db.query',
            attributes: {
                sql: 'SELECT partid, parentpartid, brandedpartid, percentdamage, itemwear, attachmentpointid, ownerid, partname, repaircost, scrapvalue FROM part WHERE parentpartid = $1',
                db: 'postgres',
            },
        },
        async () => {
            const { slonik, sql } = await getSlonik();
            return slonik.many(sql.typeAlias('dbPart')`
        SELECT partid, parentpartid, brandedpartid, percentdamage, itemwear, attachmentpointid, ownerid, partname, repaircost, scrapvalue
        FROM part
        WHERE parentpartid = ${vehicleId}
    `);
        },
    );

    if (level1Parts.length === 0) {
        log.error(`Vehicle with id ${vehicleId} has no parts`);
        throw new Error(`Vehicle with id ${vehicleId} has no parts`);
    }

    log.debug(`We got parts!`);
    log.debug(
        `There are ${level1Parts.length} level 1 parts in the vehicle assembly`,
    );

    const level1PartsIds = level1Parts.map((part) => part.partid);

    log.debug(`level1PartsIds: ${level1PartsIds}`);

    for (const part of level1Parts) {
        log.debug(
            `Adding part: ${JSON.stringify(part)} to vehicle part tree level 1`,
        );

        const newPart: TPart = {
            partId: part.partid,
            parentPartId: part.parentpartid,
            brandedPartId: part.brandedpartid,
            percentDamage: part.percentdamage,
            itemWear: part.itemwear,
            attachmentPointId: part.attachmentpointid,
            ownerID: part.ownerid,
            partName: part.partname,
            repairCost: part.repaircost,
            scrapValue: part.scrapvalue,
        };

        vehiclePartTree.partTree.level1.parts.push(newPart);
    }

    const level2Parts = await Sentry.startSpan(
        {
            name: 'Get level 2 parts',
            op: 'db.query',
            attributes: {
                sql: 'SELECT partid, parentpartid, brandedpartid, percentdamage, itemwear, attachmentpointid, ownerid, partname, repaircost, scrapvalue FROM part WHERE parentpartid IN ($1)',
                db: 'postgres',
            },
        },
        async () => {
            const { slonik, sql } = await getSlonik();
            return slonik.many(sql.typeAlias('dbPart')`
        SELECT partid, parentpartid, brandedpartid, percentdamage, itemwear, attachmentpointid, ownerid, partname, repaircost, scrapvalue
        FROM part
        WHERE parentpartid IN (${sql.join(level1PartsIds, sql.fragment`, `)})
    `);
        },
    );

    if (level2Parts.length === 0) {
        log.error(`Vehicle with id ${vehicleId} has no level 2 parts`);
        throw new Error(`Vehicle with id ${vehicleId} has no level 2 parts`);
    }

    log.debug(`We got parts!`);
    log.debug(
        `There are ${level2Parts.length} level 2 parts in the vehicle assembly`,
    );

    for (const part of level2Parts) {
        const newPart: TPart = {
            partId: part.partid,
            parentPartId: part.parentpartid,
            brandedPartId: part.brandedpartid,
            percentDamage: part.percentdamage,
            itemWear: part.itemwear,
            attachmentPointId: part.attachmentpointid,
            ownerID: part.ownerid,
            partName: part.partname,
            repairCost: part.repaircost,
            scrapValue: part.scrapvalue,
        };

        vehiclePartTree.partTree.level2.parts.push(newPart);
    }

    log.debug(`Vehicle part tree populated`);
    log.debug(`Vehicle part tree: ${JSON.stringify(vehiclePartTree)}`);

    setVehiclePartTree(vehiclePartTree.vehicleId, vehiclePartTree);

    return vehiclePartTree;
}

export async function buildVehiclePartTree({
    brandedPartId,
    skinId,
    ownedLotId,
    ownerID,
    isStock,
}: {
    brandedPartId: number;
    skinId: number;
    ownedLotId?: number;
    ownerID?: number;
    isStock: boolean;
}): Promise<VehiclePartTreeType> {
    if (ownedLotId === undefined && ownerID === undefined) {
        log.error(`ownedLotId or ownerID is required`);
        throw new Error('ownedLotId or ownerID is required');
    }

    const skinFlags = await Sentry.startSpan(
        {
            name: 'Get skin flags',
            op: 'db.query',
            attributes: {
                sql: 'SELECT default_flag FROM pt_skin WHERE skin_id = $1',
                db: 'postgres',
            },
        },
        async () => {
            const { slonik, sql } = await getSlonik();
            return slonik.one(sql.typeAlias('ptSkin')`
        SELECT default_flag
        FROM pt_skin
        WHERE skin_id = ${skinId}
    `);
        },
    );

    if (!skinFlags) {
        log.error(`Skin with id ${skinId} does not exist`);
        throw new Error(`Skin with id ${skinId} does not exist`);
    }

    // Get the vehicle assembly from the database
    const vehicleAssembly = await Sentry.startSpan(
        {
            name: 'Get vehicle assembly',
            op: 'db.query',
            attributes: {
                sql: 'SELECT bp.branded_part_id, bp.part_type_id, a.attachment_point_id, pt.abstract_part_type_id, apt.parent_abstract_part_type_id FROM stock_assembly a INNER JOIN branded_part bp ON a.child_branded_part_id = bp.branded_part_id inner join part_type pt on pt.part_type_id = bp.part_type_id inner join abstract_part_type apt on apt.abstract_part_type_id = pt.abstract_part_type_id WHERE a.parent_branded_part_id = $1',
                db: 'postgres',
            },
        },        
        async () => {
            log.debug(`Getting vehicle assembly for vehicle with branded part id ${brandedPartId}`);
            const { slonik, sql } = await getSlonik();
            return slonik.many(sql.typeAlias('detailedPart')`
        SELECT bp.branded_part_id, bp.part_type_id, a.attachment_point_id, pt.abstract_part_type_id, apt.parent_abstract_part_type_id
        FROM stock_assembly a
        INNER JOIN branded_part bp ON a.child_branded_part_id = bp.branded_part_id
        inner join part_type pt on pt.part_type_id = bp.part_type_id
        inner join abstract_part_type apt on apt.abstract_part_type_id = pt.abstract_part_type_id
        WHERE a.parent_branded_part_id = ${brandedPartId}
    `);
        },
    );

    if (vehicleAssembly.length === 0) {
        log.error(
            `Vehicle assembly with branded part id ${brandedPartId} does not exist`,
        );
        throw new Error(
            `Vehicle assembly with branded part id ${brandedPartId}`,
        );
    }

    // But we did get parts, right?
    log.debug(`We got parts!`);
    log.debug(
        `There are ${vehicleAssembly.length} parts in the vehicle assembly`,
    );

    const topPartId = await getNextPartId();

    partNumbersMap.set(101, topPartId);

    const vehiclePartTree: VehiclePartTreeType = {
        vehicleId: topPartId,
        skinId,
        isStock,
        flags: skinFlags.defaultflag,
        class: 0,
        infoSetting: 0,
        damageInfo: null,
        ownedLotId: ownedLotId || null,
        ownerID: ownerID || null,
        partId: topPartId,
        parentPartId: null,
        brandedPartId,
        partTree: {
            level1: {
                partId: 0,
                parts: [],
            },
            level2: {
                partId: 0,
                parts: [],
            },
        },
    };

    log.debug(`Vehicle part tree created`);
    log.debug(`Vehicle part tree: ${JSON.stringify(vehiclePartTree)}`);

    // Populate the vehicle part tree
    for (const part of vehicleAssembly) {
        const parentPartId = partNumbersMap.get(part.parentabstractparttypeid);

        log.debug(
            `parentAbstractPartTypeId: ${part.parentabstractparttypeid}, parentPartId: ${parentPartId}`,
        );

        if (parentPartId === undefined) {
            log.error(
                `parentPartId is undefined for part with parentabstractparttypeid ${part.parentabstractparttypeid}`,
            );
            throw new Error(
                `parentPartId is undefined for part with parentabstractparttypeid ${part.parentabstractparttypeid}`,
            );
        }

        const thisPartId = await getNextPartId();

        if (!partNumbersMap.has(part.abstractparttypeid)) {
            partNumbersMap.set(part.abstractparttypeid, thisPartId);
        }

        const newPart: TPart = {
            partId: thisPartId,
            parentPartId: parentPartId,
            brandedPartId: part.brandedpartid,
            percentDamage: 0,
            itemWear: 0,
            attachmentPointId: part.attachmentpointid,
            ownerID: ownerID || null,
            partName: null,
            repairCost: 0,
            scrapValue: 0,
        };

        const partDepth = level1PartTypes.includes(part.abstractparttypeid)
            ? 1
            : 2;

        if (partDepth === 1) {
            vehiclePartTree.partTree.level1.parts.push(newPart);
        } else if (partDepth === 2) {
            vehiclePartTree.partTree.level2.parts.push(newPart);
        } else {
            log.error(`Part depth ${partDepth} is not supported`);
            throw new Error(`Part depth ${partDepth} is not supported`);
        }
    }

    log.debug(`Vehicle part tree populated`);
    log.debug(`Vehicle part tree: ${JSON.stringify(vehiclePartTree)}`);

    return vehiclePartTree;
}
