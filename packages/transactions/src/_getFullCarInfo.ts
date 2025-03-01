import { fetchStateFromDatabase, findSessionByConnectionId, getServerLogger, OldServerMessage, ServerLogger } from "rusty-motors-shared";
import { GenericRequestMessage } from "./GenericRequestMessage.js";
import type { MessageHandlerResult } from "./handlers.js";
import { IServerMessage } from "rusty-motors-shared-packets";
import { getVehicleById } from "./_getOwnedVehicles.js";
import { Part  } from "./PartsAssemblyMessage.js";
import { Vehicle } from "./Vehicle.js";
import { CarInfoMessage } from "./CarInfoMessage.js";


export async function _getFullCarInfo({
		connectionId,
		packet,
		log = getServerLogger("transactions._getFullCarInfo")
}: {
		connectionId: string;
		packet: IServerMessage;
		log?: ServerLogger;
}): Promise<MessageHandlerResult> {
	const getFullCarInfoMessage = new GenericRequestMessage();
	getFullCarInfoMessage.deserialize(packet.data);

	log.debug(`Received Message: ${getFullCarInfoMessage.toString()}`);

	const session = findSessionByConnectionId(fetchStateFromDatabase(), connectionId);
	if (!session) {
		log.error({ connectionId }, "Session not found");
		throw new Error(`Session not found for connectionId: ${connectionId}`);
	}

	const carId = getFullCarInfoMessage.data.readUInt32LE(0);	

	const delta = getFullCarInfoMessage.data2.readUInt32LE(0);

	log.debug({ connectionId, carId, delta }, "Received getFullCarInfo");


	const carInfoMessage = new CarInfoMessage(session.gameId);

	const vehicle = await getVehicleById(carId);
	if (!vehicle) {
		log.error({ connectionId, carId }, "Vehicle not found");
		throw new Error(`Vehicle not found for carId: ${carId}`);
	}

	carInfoMessage._msgNo = 123;
	carInfoMessage._ownerId = vehicle.personId;
	carInfoMessage._numberOfParts = 1;

	log.debug({ connectionId, carId, vehicle }, "Found vehicle");

	const vehicleBody = new Vehicle();
	vehicleBody._vehicleId = vehicle.vehicleId;
	vehicleBody._skinId = vehicle.skinId;
	vehicleBody._flags = 0;
	vehicleBody._delta = delta;
	vehicleBody._carClass = 0
	vehicleBody._damageLength = 0

	const part1 = new Part();
	part1._partId = vehicle.vehicleId;
	part1._parentPartId = 0;
	part1._brandedPartId = vehicle.brandedPartId;
	part1._repairPrice = 0;
	part1._junkPrice = 0;
	part1._wear = 0;
	part1._attachmentPoint = 0;
	part1._damage = 0;

	log.debug({ connectionId, carId, part1 }, "Adding part to car");

	carInfoMessage._partList.push(part1);

	log.debug({ connectionId, carId, carInfoMessage }, "Sending car info");

	const responsePacket = new OldServerMessage();
	responsePacket._header.sequence = packet.sequenceNumber;
	responsePacket._header.flags = 8;

	responsePacket.setBuffer(carInfoMessage.serialize());

	return { connectionId, messages: [responsePacket] };
}
