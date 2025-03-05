import { eq } from "drizzle-orm";
import { getDatabase } from "rusty-motors-database";
import {
	part as partSchema,
	player as playerSchema,
	vehicle as vehicleSchema,
} from "rusty-motors-schema";
import { getServerLogger } from "rusty-motors-shared";
import { getAbstractPartTypeId } from "./getAbstractPartTypeId.js";

const ABSTRACT_PART_TYPE_ID_CAR = 101;

/**
 * Transfer a part assembly
 *
 * This function transfers a part assembly from one owner to another, including all child parts.
 *
 * This function does NOT use a transaction.
 *
 * @param {number} partId
 * @param {number} newOwnerId
 *
 * @returns {Promise<void>}
 * @throws {Error} If the part ID is not found
 * @throws {Error} If the new owner ID is not found
 * @throws {Error} If the part cannot be transferred
 */
export async function transferPartAssembly(
	partId: number,
	newOwnerId: number,
): Promise<void> {
	const log = getServerLogger();
	const db = getDatabase();
	log.setName("transferPartAssembly");

	log.debug(`Transferring part assembly ${partId} to new owner ${newOwnerId}`);

	const topPart = await db
		.select()
		.from(partSchema)
		.where(eq(partSchema.partId, partId))
		.limit(1)
		.then((rows) => rows[0]);

	if (typeof topPart === "undefined") {
		log.error(`Part ${partId} not found`);
		throw new Error(`Part ${partId} not found`);
	}

	if (topPart.ownerId === null) {
		log.error(`Part ${partId} has no owner`);
		throw new Error(`Part ${partId} has no owner`);
	}

	if (topPart.ownerId === newOwnerId) {
		log.error(`Part ${partId} is already owned by ${newOwnerId}`);
		throw new Error(`Part ${partId} is already owned by ${newOwnerId}`);
	}

	const newOwnerExists = await db
		.select()
		.from(playerSchema)
		.where(eq(playerSchema.playerId, newOwnerId))
		.limit(1)
		.then((rows) => rows[0] !== undefined);

	if (!newOwnerExists) {
		log.error(`Owner ${newOwnerId} not found`);
		throw new Error(`Owner ${newOwnerId} not found`);
	}

	const children = await db
		.select()
		.from(partSchema)
		.where(eq(partSchema.parentPartId, partId))
		.then((rows) => rows);

	if (children.length === 0) {
		log.error(`Part ${partId} has no children`);
		throw new Error(`Part ${partId} has no children`);
	}

	try {
		// If the part is a car, update the owner ID in the vehicle table
		const isPartACar = await getAbstractPartTypeId(topPart.brandedPartId).then(
			(abstractPartTypeId) => abstractPartTypeId === ABSTRACT_PART_TYPE_ID_CAR,
		);

		if (isPartACar) {
			const car = await db
				.select()
				.from(vehicleSchema)
				.where(eq(vehicleSchema.vehicleId, partId))
				.limit(1)
				.then((rows) => rows[0]);

			if (typeof car === "undefined") {
				log.error(`Vehicle ${partId} not found`);
				throw Error(`Vehicle ${partId} not found`);
			}

			// Remove the vehicle from the old owner's lot
			const oldOwner = await db
				.select()
				.from(playerSchema)
				.where(eq(playerSchema.playerId, topPart.ownerId))
				.limit(1)
				.then((rows) => rows[0]);

			if (typeof oldOwner === "undefined") {
				log.error(`Owner ${topPart.ownerId} not found`);
				throw Error(`Owner ${topPart.ownerId} not found`);
			}

			if (oldOwner.numCarsOwned > 0) {
				oldOwner.numCarsOwned--;
				try {
					await db
						.update(playerSchema)
						.set(oldOwner)
						.where(eq(playerSchema.playerId, topPart.ownerId));
				} catch (error) {
					log.error(
						`Error updating old owner ${topPart.ownerId}: ${String(error)}`,
					);
					throw new Error(
						`Error updating old owner ${topPart.ownerId}: ${String(error)}`,
					);
				}
			} else {
				log.error(`Owner ${topPart.ownerId} has no cars`);
				throw Error(`Owner ${topPart.ownerId} has no cars`);
			}
		}

		// Transfer the children

		for (const child of children) {
			await transferPartAssembly(child.partId, newOwnerId);
		}

		// Update the parent part's owner ID
		await db
			.update(partSchema)
			.set({ ownerId: newOwnerId })
			.where(eq(partSchema.partId, partId));
	} catch (error) {
		log.error(`Error transferring part ${partId}: ${String(error)}`);
		throw new Error(`Error transferring part ${partId}: ${String(error)}`);
	}

	log.debug(`Part assembly ${partId} transferred to new owner ${newOwnerId}`);
}
