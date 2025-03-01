import type { TBrand } from "./models/Brand.js";
import type { VehiclePartTreeType } from "./models/VehiclePartTree.js";
import { getSlonik } from "./services/database.js";
import * as Sentry from "@sentry/node";

const brandCache = new Map<string, TBrand>();

export async function getBrand(brandName: string): Promise<TBrand | undefined> {
    if (brandCache.has(brandName)) {
        return brandCache.get(brandName);
    }

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
            const { slonik, sql } = await getSlonik();

            const brand = await slonik.one(sql.typeAlias("brand")`
        SELECT brandid, brand, isstock FROM brand WHERE brandname = ${brandName}
    `);
            brandCache.set(brandName, brand);
            return brand;
        },
    );
}

const vehiclePartTreeCache = new Map<number, VehiclePartTreeType>();

export async function getVehiclePartTree(
    vehicleId: number,
): Promise<VehiclePartTreeType | undefined> {
    if (vehiclePartTreeCache.has(vehicleId)) {
        return vehiclePartTreeCache.get(vehicleId);
    }

    return undefined;
}

export async function setVehiclePartTree(
    vehicleId: number,
    vehiclePartTree: VehiclePartTreeType,
): Promise<void> {
    vehiclePartTreeCache.set(vehicleId, vehiclePartTree);
}