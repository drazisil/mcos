import {
	GameMessage,
	SerializableData,
} from "../messageStructs/GameMessage.js";
import {
	type EncryptionSession,
	getEncryptionSession,
	newEncryptionSession,
	setEncryptionSession,
} from "../src/EncryptionSession.js";
import { getAsHex } from "../src/utils/pureGet.js";
import type { GameSocketCallback } from "./index.js";
import { lobbyCommandMap } from "./lobbyCommands.js";

import type { UserStatus } from "../messageStructs/UserStatus.js";
import { logger } from "rusty-motors-logger";
const defaultLogger = logger.child({ name: "nps.processEncryptedGameCommand" });

export async function processEncryptedGameCommand(
	connectionId: string,
	userStatus: UserStatus,
	message: GameMessage,
	socketCallback: GameSocketCallback,
): Promise<void> {
	defaultLogger.debug("processEncryptedGameCommand called");
	defaultLogger.info(`Attempting to decrypt message: ${message.toString()}`);

	// Get the encryption session
	let encryptionSession: EncryptionSession | undefined =
		getEncryptionSession(connectionId);

	// If the encryption session doesn't exist, attempt to create it
	if (typeof encryptionSession === "undefined") {
		try {
			// Create the encryption session
			const newSession = newEncryptionSession({
				connectionId,
				customerId: userStatus.getCustomerId(),
				sessionKey: userStatus.getSessionKey().getKey().substring(0, 16),
			});
			setEncryptionSession(newSession);
			encryptionSession = newSession;
		} catch (error) {
			defaultLogger.error(
				`Error creating encryption session: ${error as string}`,
			);
			throw new Error("Error creating encryption session");
		}

		// Log the encryption session
		defaultLogger.info(
			`Created encryption session for ${userStatus.getCustomerId()}`,
		);
	}

	// Attempt to decrypt the message
	const decryptedbytes = encryptionSession.gameDecipher.update(
		message.getDataAsBuffer(),
	);

	// Log the decrypted bytes
	defaultLogger.info(`Decrypted bytes: ${getAsHex(decryptedbytes)}`);

	// Set the decrypted bytes as a new message
	const decryptedMessage = new GameMessage(0);
	decryptedMessage.deserialize(decryptedbytes);

	// Log the decrypted message id
	defaultLogger.info(
		`Decrypted message ID: ${decryptedMessage.header.getId()}`,
	);

	// Do we have a valid message processor?
	const processor = lobbyCommandMap.get(decryptedMessage.header.getId());

	if (typeof processor === "undefined") {
		const err = `No processor found for message ID: ${decryptedMessage.header.getId()}`;
		defaultLogger.fatal(err);
		throw Error(err);
	}

	// Process the message
	const response = await processor(
		decryptedMessage.header.getId(),
		decryptedMessage.getDataAsBuffer(),
	);

	// Log the response
	defaultLogger.info(
		`Response: ${response.length} bytes, ${getAsHex(response)}`,
	);

	// Encrypt the response
	const encryptedResponse = encryptionSession.gameCipher.update(response);
	setEncryptionSession(encryptionSession);

	// Log the encrypted response
	defaultLogger.info(
		`Encrypted response: ${encryptedResponse.length} bytes, ${getAsHex(
			encryptedResponse,
		)}`,
	);

	const responsePacket = new GameMessage(0);
	responsePacket.header.setId(0x1101);

	const responseData = new SerializableData(encryptedResponse.length);
	responseData.deserialize(encryptedResponse);

	responsePacket.setData(responseData);
	defaultLogger.info(
		`Response packet: ${responsePacket.header.getLength()} bytes, ${getAsHex(
			responsePacket.serialize(),
		)}`,
	);
	const responseBytes = responsePacket.serialize();

	socketCallback([responseBytes]);
	return Promise.resolve();
}
