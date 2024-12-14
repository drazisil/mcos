import { OldServerMessage } from "rusty-motors-shared";
import { GameUrl, GameUrlsMessage } from "./GameUrlsMessage.js";
import { GenericRequestMessage } from "./GenericRequestMessage.js";
import type { MessageHandlerArgs, MessageHandlerResult } from "./handlers.js";
import { logger, type Logger } from "rusty-motors-utilities";
const defaultLogger = logger.child({ name: "transactions.getGameUrls" });

/**
 * @param {MessageHandlerArgs} args
 * @return {Promise<MessageHandlerResult>}
 */
export async function _getGameUrls({
	connectionId,
	packet,
	log = defaultLogger,
}: MessageHandlerArgs): Promise<MessageHandlerResult> {
	const getGameUrlsMessage = new GenericRequestMessage();
	getGameUrlsMessage.deserialize(packet.data);

	log.debug(`Received Message: ${getGameUrlsMessage.toString()}`);

	const gameUrlsMessage = new GameUrlsMessage();
	gameUrlsMessage._msgNo = 364;

	const url1 = new GameUrl();
	url1._urlId = 1;
	url1.urlRef = "http://localhost:8080";
	gameUrlsMessage.addURL(url1);

	const responsePacket = new OldServerMessage();
	responsePacket._header.sequence = packet._header.sequence;
	responsePacket._header.flags = 8;

	responsePacket.setBuffer(gameUrlsMessage.serialize());

	return { connectionId, messages: [responsePacket] };
}
