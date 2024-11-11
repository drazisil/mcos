import {
	SerializedBufferOld,
	NPSMessage,
} from "rusty-motors-shared";
import { messageHandlers } from "./internal.js";
import pino, { Logger } from "pino";
const defaultLogger = pino({ name: "LoginServer.handleLoginData" });

/**
 * Entry and exit point of the Login service
 *
 * @export
 * @param {object} args
 * @param {string} args.connectionId
 * @param {SerializedBufferOld} args.message
 * @param {import("pino").Logger} [args.log=getServerLogger({ name: "LoginServer" })]
 * @returns {Promise<{
 *  connectionId: string,
 * messages: SerializedBufferOld[],
 * }>}
 */

export async function handleLoginData({
	connectionId,
	message,
	log = defaultLogger,
}: {
	connectionId: string;
	message: SerializedBufferOld;
	log?: Logger;
}): Promise<{
	connectionId: string;
	messages: SerializedBufferOld[];
}> {
	log.debug(`[${connectionId}] Entering handleLoginData`);

	// The packet needs to be an NPSMessage
	const inboundMessage = new NPSMessage();
	inboundMessage._doDeserialize(message.serialize());

	const supportedHandler = messageHandlers.find((h) => {
		return h.opCode === inboundMessage._header.id;
	});

	if (typeof supportedHandler === "undefined") {
		// We do not yet support this message code
		throw Error(
			`[${connectionId}] UNSUPPORTED_MESSAGECODE: ${inboundMessage._header.id}`,
		);
	}

	try {
		const result = await supportedHandler.handler({
			connectionId,
			message,
			log,
		});
		log.debug(
			`[${connectionId}] Leaving handleLoginData with ${result.messages.length} messages`,
		);
		return result;
	} catch (error) {
		const err = Error(`[${connectionId}] Error in login service`, {
			cause: error,
		});
		throw err;
	}
}
