import {
	fetchStateFromDatabase,
	findSessionByConnectionId,
} from "rusty-motors-shared";
import { OldServerMessage } from "rusty-motors-shared";
import { GenericRequestMessage } from "./GenericRequestMessage.js";
import { PartsAssemblyMessage } from "./PartsAssemblyMessage.js";
import type { MessageHandlerArgs, MessageHandlerResult } from "./handlers.js";
import { logger, type Logger } from "rusty-motors-utilities";
const defaultLogger = logger.child({ name: "transactions.getOwnedParts" });

export async function _getOwnedParts({
	connectionId,
	packet,
	log = defaultLogger,
}: MessageHandlerArgs): Promise<MessageHandlerResult> {
	const getOwnedPartsMessage = new GenericRequestMessage();
	getOwnedPartsMessage.deserialize(packet.data);

	log.debug(`Received Message: ${getOwnedPartsMessage.toString()}`);

	const state = fetchStateFromDatabase();

	const session = findSessionByConnectionId(state, connectionId);

	if (!session) {
		throw Error("Session not found");
	}

	const ownedPartsMessage = new PartsAssemblyMessage(session.gameId);
	ownedPartsMessage._msgNo = 175;

	const responsePacket = new OldServerMessage();
	responsePacket._header.sequence = packet._header.sequence;
	responsePacket._header.flags = 8;

	responsePacket.setBuffer(ownedPartsMessage.serialize());

	return { connectionId, messages: [responsePacket] };
}
