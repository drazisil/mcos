import { SerializedBufferOld, type ServiceResponse } from "rusty-motors-shared";
import { type BufferSerializer } from "rusty-motors-shared-packets";
import { ChatMessage } from "./ChatMessage.js";
import {
	handleListInGameEmailsMessage,
	handleReceiveEmailMessage,
} from "./inGameEmails.js";
import { bufferToHexString } from "./toHexString.js";
import * as Sentry from "@sentry/node";
import { logger } from "rusty-motors-utilities";
const defaultLogger = logger.child({ name: "chat.receiveChatData" });

const handlers = new Map<number, (message: ChatMessage) => Buffer[]>();
handlers.set(0x0524, handleReceiveEmailMessage);
handlers.set(0x0526, handleListInGameEmailsMessage);

/**
 * Receive chat data
 *
 * @param connectionId - Connection ID
 * @param message - Message
 * @returns Service response
 */
async function receiveChatData({
	connectionId,
	message,
}: {
	connectionId: string;
	message: BufferSerializer;
}): Promise<ServiceResponse> {
	defaultLogger.info(`Received chat data from connection ${connectionId}`);
	defaultLogger.debug(`Message: ${message.toHexString()}`);

	let inboundMessage: ChatMessage;

	try {
		inboundMessage = ChatMessage.fromBuffer(message.serialize());
	} catch (error) {
		const err = new Error(`[${connectionId}] Error deserializing message`, {
			cause: error,
		});
		defaultLogger.error(err.message);
		Sentry.captureException(err);
		return {
			connectionId,
			messages: [],
		};
	}
	defaultLogger.debug(`Deserialized message: ${inboundMessage.toString()}`);

	const id = inboundMessage.messageId;

	defaultLogger.debug(`Message ID: ${id}`);

	const handler = handlers.get(id);

	if (handler) {
		defaultLogger.debug(`Handling message with ID ${id}`);
		const responses = handler(inboundMessage);
		defaultLogger.debug(
			`Responses: ${responses.map((response) => bufferToHexString(response))}`,
		);
		const messages = responses.map((response) => {
			const responseBuffer = new SerializedBufferOld();
			responseBuffer._doDeserialize(response);
			return responseBuffer;
		});

		return {
			connectionId,
			messages,
		};
	}

	throw new Error(
		`Unable to process chat data from connection ${connectionId}, data: ${message.toHexString()}`,
	);
}

export { receiveChatData };
