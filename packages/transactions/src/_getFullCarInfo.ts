import { fetchStateFromDatabase, findSessionByConnectionId, getServerLogger, OldServerMessage, ServerLogger } from "rusty-motors-shared";
import { GenericRequestMessage } from "./GenericRequestMessage.js";
import type { MessageHandlerResult } from "./handlers.js";
import { IServerMessage } from "rusty-motors-shared-packets";
import { getVehicleById } from "./_getOwnedVehicles.js";
import { Part  } from "./PartsAssemblyMessage.js";
import { Vehicle } from "./Vehicle.js";
import { CarInfoMessage } from "./CarInfoMessage.js";
import { GenericReply } from "./GenericReplyMessage.js";
import { getVehicleAndParts } from 'rusty-motors-database';

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

	const vehicle = await getVehicleAndParts(carId);
    if (!vehicle) {
        log.error({ connectionId, carId }, 'Vehicle not found');
        throw new Error(`Vehicle not found for carId: ${carId}`);
    }

    carInfoMessage._msgNo = 123;
    carInfoMessage._ownerId = vehicle.ownerId;

	const vehicleBody = new Vehicle();
	vehicleBody._vehicleId = vehicle.vehicleId;
	vehicleBody._skinId = vehicle.skinId;
	vehicleBody._flags = vehicle.flags;
    vehicleBody._delta = delta;
    vehicleBody._carClass = vehicle.class;

	log.debug(
        { connectionId, carId, partsLength: vehicle.parts.length },
        'Adding parts to car',
    );

	for (const p of vehicle.parts) {
        const part = new Part();
        part._partId = p.partId;
        part._parentPartId = p.parentPartId || 0;
        part._brandedPartId = p.brandedPartId;
        part._repairPrice = 0;
        part._junkPrice = 0;
        part._wear = 0;
        part._attachmentPoint = p.attachmentPointId;
        log.debug({ connectionId, carId, p }, 'Adding part to car');
        carInfoMessage._partList.push(part);
    }

	carInfoMessage._vehicle = vehicleBody;

	log.debug({ connectionId, carId, carInfoMessage }, "Sending car info");

	const responsePacket = new OldServerMessage();
	responsePacket._header.sequence = packet.sequenceNumber;
	responsePacket._header.flags = 8;

	responsePacket.setBuffer(carInfoMessage.serialize());

	return { connectionId, messages: [responsePacket] };
}
