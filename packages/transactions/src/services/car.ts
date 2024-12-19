// import { logger } from "rusty-motors-logger";

// import {
//     PartSchema,
//     VehicleSchema,
// 	db,
//     sql,
// } from "rusty-motors-database";


// async function findPartChildren(
//     partId: number,
// ): Promise<number[]> {

//     const childParts: typeof PartSchema[] = [];

//     const parts = await PartSchema(db).find({ parent_part_id: partId }).all();

//     if (!parts) {
//         throw new Error(`No parts found for part with parent id ${partId}`);
//     }

//     for (const part of parts as typeof PartSchema[]) {

//         if (!part) {
//             continue;
//         }

//         const children = await findPartChildren(part.part_id);

//         childParts.push(part);
//     }

//     logger.debug(`Found ${childParts.length} child parts for part with id ${partId}`);
// }

// export async function getFullCarInfo(
//     carId: number,
// ): Promise<Buffer> {
//     const vehicle = await VehicleSchema(db).findOne({ vehicle_id: carId });

//     if (!vehicle) {
//         throw new Error(`Vehicle with id ${carId} not found`);
//     }

//     const topPart = await PartSchema(db).findOne({ part_id: carId });

//     if (!topPart) {
//         throw new Error(`Part with id ${carId} not found`);
//     }


// }