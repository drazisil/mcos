import { OldServerMessage } from "rusty-motors-shared";
import { GenericReplyMessage } from "./GenericReplyMessage.js";
import type { MessageHandlerArgs, MessageHandlerResult } from "./handlers.js";
import { logger } from "rusty-motors-logger";
const defaultLogger = logger.child({ name: "transactions.trackingPing" });

/**
 * @param {MessageHandlerArgs} args
 * @return {Promise<MessageHandlerResult>}
 */
export async function trackingPing({
	connectionId,
	packet,
	log = defaultLogger,
}: MessageHandlerArgs): Promise<MessageHandlerResult> {
	// Create new response packet
	const pReply = new GenericReplyMessage();
	pReply.msgNo = 101;
	pReply.msgReply = 440;
	const rPacket = new OldServerMessage();
	rPacket._header.sequence = packet._header.sequence;
	rPacket._header.flags = 8;

	rPacket.setBuffer(pReply.serialize());

	log.debug(`TrackingPing: ${rPacket.toString()}`);

	return { connectionId, messages: [] };
}
