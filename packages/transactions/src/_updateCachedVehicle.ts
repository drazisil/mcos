import { getServerLogger, ServerLogger, findSessionByConnectionId, fetchStateFromDatabase, OldServerMessage } from "rusty-motors-shared";
import { IServerMessage } from "rusty-motors-shared-packets";
import { GenericReply } from "./GenericReplyMessage.js";
import { GenericRequestMessage } from "./GenericRequestMessage.js";
import type { MessageHandlerResult } from "./handlers.js";


export async function _updateCachedVehicle({
	connectionId, packet, log = getServerLogger("transactions._updateCachedVehicle")
}: {
	connectionId: string;
	packet: IServerMessage;
	log?: ServerLogger;
}): Promise<MessageHandlerResult> {
	const updateCachedVehicleMessage = new GenericRequestMessage();
    updateCachedVehicleMessage.deserialize(packet.data);

	log.debug(`Received Message: ${updateCachedVehicleMessage.toString()}`);

	const session = findSessionByConnectionId(fetchStateFromDatabase(), connectionId);
	if (!session) {
		log.error({ connectionId }, "Session not found");
		throw new Error(`Session not found for connectionId: ${connectionId}`);
	}

	const carId = updateCachedVehicleMessage.data.readUInt32LE(0);

	log.debug({ connectionId, carId }, "Received updateCachedVehicle");


	const reply = new GenericReply();
    reply.msgNo = 101;
	reply.msgReply = 163;

	const responsePacket = new OldServerMessage();
	responsePacket._header.sequence = packet.sequenceNumber;
	responsePacket._header.flags = 8;

	responsePacket.setBuffer(reply.serialize());

	return { connectionId, messages: [responsePacket] };
}
