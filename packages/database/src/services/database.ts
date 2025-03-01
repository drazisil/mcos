import { createPool, type DatabasePool, createSqlTag } from "slonik";
import { z } from "zod";

let slonik: DatabasePool;
let sql: ReturnType<typeof createSqlTag>;

function initSQL() {
    return createSqlTag({
        typeAliases: {
            vehicleWithOwner: z.object({
                vehicleid: z.number(),
                skinid: z.number(),
                flags: z.number(),
                class: z.number(),
                damageinfo: z.instanceof(Buffer) || z.null(),
                ownerid: z.number(),
            }),
            dbPart: z.object({
                partid: z.number(),
                parentpartid: z.number(),
                brandedpartid: z.number(),
                percentdamage: z.number(),
                itemwear: z.number(),
                attachmentpointid: z.number(),
                ownerid: z.number(),
                partname: z.string() || z.null(),
                repaircost: z.number(),
                scrapvalue: z.number(),
            }),
            id: z.number(),
            brandedPart: z.object({
                partid: z.number() || z.null(),
                parentpartid: z.number() || z.null(),
                brandedpartid: z.number() || z.null(),
                attachmentpointid: z.number() || z.null(),
            }),
            part: z.object({
                partid: z.number(),
                parentpartid: z.number(),
                brandedpartid: z.number(),
                percentdamage: z.number(),
                itemwear: z.number(),
                attachmentpointid: z.number(),
                partname: z.string() || z.null(),
                ownerid: z.number(),
            }),
            abstractPartType: z.object({
                abstractparttypeid: z.number(),
            }),
            ptSkin: z.object({
                skinid: z.number(),
                defaultflag: z.number(),
            }),
            nextPartId: z.object({
                nextval: z.bigint(),
            }),
            detailedPart: z.object({
                brandedpartid: z.number(),
                parttypeid: z.number(),
                abstractparttypeid: z.number(),
                parentabstractparttypeid: z.number(),
                attachmentpointid: z.number(),
            }),
            vehicle: z.object({
                vehicleid: z.number(),
                skinid: z.number(),
                flags: z.number(),
                class: z.number(),
                infosetting: z.number(),
                damageinfo: z.instanceof(Buffer) || z.null(),
            }),
            brand: z.object({
                brandId: z.number(),
                brand: z.string(),
                isStock: z.boolean(),
            }),
        },
    });
}

export async function getSlonik(): Promise<{
    slonik: DatabasePool;
    sql: ReturnType<typeof createSqlTag>;
}> {
    if (!slonik) {
        slonik = await createPool(process.env["DATABASE_URL"]!);
    }
    if (!sql) {
        sql = initSQL();
    }
    return { slonik, sql };
}

export async function getDatabase() {
    const { slonik, sql } = await getSlonik();
    return { slonik, sql };
}