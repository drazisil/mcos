import {
	type WarehouseInventory,
	getWarehouseInventory,
} from "rusty-motors-database";
import { StockCarInfo, StockCar } from "rusty-motors-mcots";
import { getServerLogger } from "rusty-motors-shared";
import {
	GenericRequestPayload,
	ServerPacket,
} from "rusty-motors-shared-packets";
import type { ServerSocketCallback } from "./index.js";

const log = getServerLogger({
	name: "processStockCarInfo",
});

// 1300 544f4d43 01 00000000 8d00 [08000000 00000000]

export async function processStockCarInfo(
	_connectionId: string,
	message: ServerPacket,
	socketCallback: ServerSocketCallback,
): Promise<void> {
	try {
		log.debug(`Processing stock car info message`);

		const request = new GenericRequestPayload().deserialize(
			message.data.serialize(),
		);

		log.debug(`Received stock car info request: ${request.toString()}`);

		const lotOwnerId = request.data;
		const brandId = request.data2;

		log.debug(`Lot owner ID: ${lotOwnerId} Brand ID: ${brandId}`);

		const inventoryCars: WarehouseInventory = await getWarehouseInventory(
			lotOwnerId,
			brandId,
		);

		log.debug(
			`Sending car info for lot owner ${lotOwnerId} and brand ${brandId}`,
		);

		const responsePacket = new StockCarInfo();

		responsePacket.setMessageId(141);
		responsePacket.setStarterCash(100);
		responsePacket.setDealerId(lotOwnerId);
		responsePacket.setBrandId(brandId);

		const response = new ServerPacket();
		response.setMessageId(141);

		if (inventoryCars.inventory.length > StockCarInfo.MAX_CARS_PER_MESSAGE) {
			log.error(
				`Too many cars in inventory: ${inventoryCars.inventory.length}`,
			);
			return;
		}

		log.debug(`Sending ${inventoryCars.inventory.length} cars`);

		while (inventoryCars.inventory.length > 0) {
			const car = inventoryCars.inventory.shift();

			if (typeof car === "undefined") {
				throw new Error(`Car not found`);
			}

			const stockCar = new StockCar();

			stockCar.setBrandedPartId(car.brandedPartId);
			stockCar.setIsDealOfTheDay(car.isDealOfTheDay === 1);

			let carCost = car.retailPrice || 0;

			if (car.isDealOfTheDay === 1) {
				const discount = carCost * inventoryCars.dealOfTheDayDiscount;
				carCost -= discount;
			}

			stockCar.setRetailPrice(carCost);

			responsePacket.addCar(stockCar);
		}

		log.debug(`Sending ${responsePacket.getNumberOfCars()} cars...complete`);

		responsePacket.setMoreCars(false);

		response.setDataBuffer(responsePacket.serialize());
		response.setSequence(message.sequence);
		return socketCallback([response]);
	} catch (error) {
		throw new Error(`Error processing stock car info: ${error}`, {
			cause: error,
		});
	}
}

// Path: packages/mcots/messageProcessors/processStockCarInfo.ts
