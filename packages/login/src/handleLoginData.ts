import {
	NPSMessage,
	ServerLogger,
} from "rusty-motors-shared";
import { messageHandlers } from "./internal.js";
import { getServerLogger } from "rusty-motors-shared";
import { GamePacket } from "rusty-motors-shared-packets";
import { BytableMessage } from "@rustymotors/binary";
import {getHandlers} from "rusty-motors-personas";

const defaultLogger = getServerLogger("LoginServer");

/**
 * Handles the reception of login data, deserializes the incoming message, and processes it.
 *
 * @param {Object} params - The parameters for the function.
 * @param {string} params.connectionId - The ID of the connection.
 * @param {GamePacket} params.message - The serialized message buffer.
 * @param {ServerLogger} [params.log=defaultLogger] - Optional logger instance.
 * @returns {Promise<{
 *  connectionId: string,
 *  messages: GamePacket[],
 * }>} - The response from the login data handler.
 * @throws {Error} - Throws an error if there is an issue processing the login data.
 */
export async function handleLoginData({
	connectionId,
	message,
	log = defaultLogger,
}: {
	connectionId: string;
	message: BytableMessage;
	log?: ServerLogger;
}): Promise<{
	connectionId: string;
	messages: GamePacket[];
}> {
	log.debug(`[${connectionId}] Entering handleLoginData`);

	// The packet needs to be an NPSMessage
	const inboundMessage = new NPSMessage();
	inboundMessage.deserialize(message.serialize());
	let supportedHandler;

	supportedHandler = messageHandlers.find((h) => {
		return h.opCode === inboundMessage._header.id;
	});

	if (typeof supportedHandler === "undefined") {
		// There is a change this is a message for the persona service
		const handlers = getHandlers();
		supportedHandler = handlers.find((h) => {
			return h.opCode === inboundMessage._header.id;
		});

		if (typeof supportedHandler === "undefined") {
			throw Error(
				`[${connectionId}] UNSUPPORTED_MESSAGECODE: ${inboundMessage._header.id}`,
			);
		}
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
		return  {
			connectionId,
			messages: result.messages,
		}
	} catch (error) {
		const err = Error(`[${connectionId}] Error in login service`, {
			cause: error,
		});
		throw err;
	}
}
