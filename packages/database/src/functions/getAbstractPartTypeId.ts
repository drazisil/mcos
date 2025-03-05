import { eq } from "drizzle-orm";
import { getDatabase } from "rusty-motors-database";
import {
	brandedPart as brandedPartSchema,
	part as partSchema,
	partType as partTypeSchema,
} from "rusty-motors-schema";
import { getServerLogger } from "rusty-motors-shared";

/**
 * Get the abstract part type id from the partId
 *
 * @param partId The part id
 * @returns The abstract part type id
 * @throws {Error} If the part ID is not found
 * @throws {Error} If the abstract part type ID is not found
 */
export async function getAbstractPartTypeId(partId: number): Promise<number> {
	const log = getServerLogger();
	log.setName("getAbstractPartTypeId");

	log.debug(`Getting abstract part type ID for part ${partId}`);

	const db = getDatabase();

	const abstractPartTypeId = await db
		.select()
		.from(partSchema)
		.leftJoin(
			brandedPartSchema,
			eq(partSchema.brandedPartId, brandedPartSchema.brandedPartId),
		)
		.leftJoin(
			partTypeSchema,
			eq(brandedPartSchema.partTypeId, partTypeSchema.partTypeId),
		)
		.where(eq(partSchema.partId, partId))
		.limit(1)
		.then((rows) => {
			if (rows.length === 0) {
				throw new Error(`Part ${partId} not found`);
			}

			return rows[0]?.part_type?.abstractPartTypeId;
		});

	if (typeof abstractPartTypeId === "undefined") {
		log.error(`Abstract part type ID not found for part ${partId}`);
		throw new Error(`Abstract part type ID not found for part ${partId}`);
	}

	return abstractPartTypeId;
}