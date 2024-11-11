import { createDataEncryptionPair } from "rusty-motors-connection";
import type { ServerSocketCallback } from "rusty-motors-mcots";
import {
	ClientConnectionManager,
	ClientConnectionMessage,
	ErrorNoKey,
} from "rusty-motors-mcots";
import { UserStatusManager } from "rusty-motors-nps";
import { ServerPacket } from "rusty-motors-shared-packets";
import { sendSuccess } from "./sendSuccess.js";
import pino from "pino";
const log = pino({ name: "PersonaServer.receivePersonaData" });
export async function processClientConnect(
	connectionId: string,
	message: ServerPacket,
	socketCallback: ServerSocketCallback,
): Promise<void> {
	log.debug(`Processing client connect request: ${message.toString()}`);
	try {
		log.debug(`Processing client connect request: ${message.toString()}`);

		const request = new ClientConnectionMessage(
			message.getDataBuffer().length,
		).deserialize(message.getDataBuffer());

		log.debug(`Received client connect request: ${request.toString()}`);

		const userStatus = UserStatusManager.getUserStatus(request.getCustomerId());

		if (!userStatus) {
			throw new Error(`User status not found for customer ID: ${request.getCustomerId()}`);
		}

		log.debug(`User status found: ${userStatus.toString()}`);

		// Get the connection record
		const connection = ClientConnectionManager.getConnection(connectionId);

		if (!connection) {
			throw new Error(`Connection not found for connection ID: ${connectionId}`);
		}

		log.debug(`Connection found: ${connection.toString()}`);

		const sessionKey = userStatus.getSessionKey();

		if (!sessionKey) {
			throw new Error(`Session key not found for customer ID: ${request.getCustomerId()}`);
		}

		const cipherPair = createDataEncryptionPair(sessionKey.getKey());

		connection.setCipherPair(cipherPair);

		sendSuccess(message, socketCallback);

		return Promise.resolve();
	} catch (error) {
		if (error instanceof ErrorNoKey) {
			log.error(`Error processing client connect request: ${error}`);
		} else {
			throw new Error(`Error processing client connect request: ${error}`, {
				cause: error,
			});
		}
	}
}

// Path: packages/mcots/messageProcessors/processClientConnect.ts
