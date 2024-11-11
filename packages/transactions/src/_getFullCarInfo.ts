import { OldServerMessage } from "rusty-motors-shared";
import { GenericRequestMessage } from "./GenericRequestMessage.js";
import { OwnedVehicle, OwnedVehiclesMessage } from "./OwnedVehiclesMessage.js";
import type { MessageHandlerArgs, MessageHandlerResult } from "./handlers.js";


const vehicleList = [
	{
		personId: 1,
		vehicleId: 1,
		brandedPartId: 113,
	},
];

export async function _getFullCarInfo(
	args: MessageHandlerArgs,
): Promise<MessageHandlerResult> {
	const getFullCarInfoMessage = new GenericRequestMessage();
	getFullCarInfoMessage.deserialize(args.packet.data);

	args.log.debug(`Received Message: ${getFullCarInfoMessage.toString()}`);

	const carId = getFullCarInfoMessage.data.readUInt32LE(0);

	

	const delta = getFullCarInfoMessage.data.readUInt32LE(4);

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
	responsePacket._header.sequence = args.packet._header.sequence;
	responsePacket._header.flags = 8;

	responsePacket.setBuffer(ownedVehiclesMessage.serialize());

	return { connectionId: args.connectionId, messages: [responsePacket] };
}
