import { OldServerMessage } from "rusty-motors-shared";
import { GenericRequestMessage } from "./GenericRequestMessage.js";
import { TunablesMessage } from "./TunablesMessage.js";
import type { MessageHandlerArgs, MessageHandlerResult } from "./handlers.js";
import { getServerLogger } from "rusty-motors-shared";

const defaultLogger = getServerLogger("handlers/_getTunables");

/**
 * @param {MessageHandlerArgs} args
 * @return {Promise<MessageHandlerResult>}
 */
export async function _getTunables({
	connectionId,
	packet,
	log = defaultLogger,
}: MessageHandlerArgs): Promise<MessageHandlerResult> {
	const getTunablesMessage = new GenericRequestMessage();
	getTunablesMessage.deserialize(packet.data);

	log.debug(`Received Message: ${getTunablesMessage.toString()}`);

	const tunablesMessage = new TunablesMessage();
	tunablesMessage._msgNo = 390;

	const responsePacket = new OldServerMessage();
	responsePacket._header.sequence = packet.sequenceNumber;
	responsePacket._header.flags = 8;

	responsePacket.setBuffer(tunablesMessage.serialize());

	return { connectionId, messages: [responsePacket] };
}
