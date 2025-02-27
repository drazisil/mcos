import { db, getTuneables, sql } from "../../index.js";
import { getServerLogger } from "rusty-motors-shared";

export type WarehouseInventory = {
	inventory: {
		brandedPartId: number;
		retailPrice: number | null;
		isDealOfTheDay: number;
	}[];
	dealOfTheDayDiscount: number;
};

export async function getWarehouseInventory(
	warehouseId: number,
	brandId: number,
): Promise<WarehouseInventory> {
	const log = getServerLogger({ name: "getWarehouseInventory" });

	log.debug(
		`Getting warehouse inventory for part ${brandId} in warehouse ${warehouseId}`,
	);

	let inventoryCars: {
		brandedPartId: number;
		retailPrice: number | null;
		isDealOfTheDay: number;
	}[] = [];

	const tunables = getTuneables();

	const dealOfTheDayDiscount = tunables.getDealOfTheDayDiscount();
	const dealOfTheDayBrandedPartId = tunables.getDealOfTheDayBrandedPartId();

	if (dealOfTheDayDiscount < 1) {
		log.warn("Deal of the day not found");
	}

	if (brandId > 0) {
		inventoryCars = await db.query(sql`
            SELECT
                brandedPartId: warehouseSchema.brandedPartId,
                retailPrice: stockVehicleAttributesSchema.retailPrice,
                isDealOfTheDay: warehouseSchema.isDealOfTheDay,
            FROM warehouse w
            LEFT JOIN branded_part bp ON w.brandedPartId = bp.brandedPartId
            LEFT JOIN model m ON bp.modelId = m.modelId
            LEFT JOIN stock_vehicle_attributes sva ON w.brandedPartId = sva.brandedPartId
            WHERE w.playerId = ${warehouseId} AND m.brandId = ${brandId}
        `);
	} else {
		inventoryCars = await db.query(sql`
            SELECT
                brandedPartId: warehouseSchema.brandedPartId,
                retailPrice: stockVehicleAttributesSchema.retailPrice,
                isDealOfTheDay: warehouseSchema.isDealOfTheDay,
            FROM warehouse w
            LEFT JOIN branded_part bp ON w.brandedPartId = bp.brandedPartId
            LEFT JOIN model m ON bp.modelId = m.modelId
            LEFT JOIN stock_vehicle_attributes sva ON w.brandedPartId = sva.brandedPartId
            WHERE w.playerId = ${warehouseId}
        `);
	}

	const inventory = {
		inventory: inventoryCars,
		dealOfTheDayDiscount: dealOfTheDayDiscount ?? 0,
	};

	return inventory;
}