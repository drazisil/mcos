import { OldServerMessage } from "rusty-motors-shared";
import { GenericRequestMessage } from "./GenericRequestMessage.js";
import { OwnedVehicle, OwnedVehiclesMessage } from "./OwnedVehiclesMessage.js";
import type { MessageHandlerArgs, MessageHandlerResult } from "./handlers.js";
import { getServerLogger } from "rusty-motors-shared";

const defaultLogger = getServerLogger("handlers/_getOwnedVehicles");

const vehicleList: {
	personId: number;
	vehicleId: number;
	brandedPartId: number;
	skinId: number;
}[] = [];

export function getVehiclesForPerson(personId: number) {
	return vehicleList.filter((vehicle) => vehicle.personId === personId);
}

export async function getVehicleById(vehicleId: number) {
	return vehicleList.find((vehicle) => vehicle.vehicleId === vehicleId);
}

export async function _getOwnedVehicles({
	connectionId,
	packet,
	log = defaultLogger,
}: MessageHandlerArgs): Promise<MessageHandlerResult> {
	const getOwnedVehiclesMessage = new GenericRequestMessage();
	getOwnedVehiclesMessage.deserialize(packet.data);

	log.debug(`Received Message: ${getOwnedVehiclesMessage.toString()}`);

	const personId = getOwnedVehiclesMessage.data.readUInt32LE(0);

	const ownedVehiclesMessage = new OwnedVehiclesMessage();

	const vehicles = getVehiclesForPerson(personId);

	for (const vehicle of vehicles) {
		const ownedVehicle = new OwnedVehicle();
		ownedVehicle._vehicleId = vehicle.vehicleId;
		ownedVehicle._brandedPartId = vehicle.brandedPartId;
		ownedVehiclesMessage.addVehicle(ownedVehicle);
	}

	ownedVehiclesMessage._msgNo = 173;

	const responsePacket = new OldServerMessage();
	responsePacket._header.sequence = packet.sequenceNumber;
	responsePacket._header.flags = 8;

	responsePacket.setBuffer(ownedVehiclesMessage.serialize());

	return { connectionId, messages: [responsePacket] };
}

export function addVehicle(
	personId: number,
	vehicleId: number,
	brandedPartId: number,
	skinId: number,
) {
	vehicleList.push({ personId, vehicleId, brandedPartId, skinId });
}
