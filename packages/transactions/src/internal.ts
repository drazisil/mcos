// mcos is a game server, written from scratch, for an old game
// Copyright (C) <2017>  <Drazi Crendraven>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import { getServerLogger, ServerLogger } from "rusty-motors-shared";


import {
	McosEncryption,
	SerializedBufferOld,
	type State,
} from "rusty-motors-shared";
import {
	fetchStateFromDatabase,
	getEncryption,
	updateEncryption,
} from "rusty-motors-shared";
import { OldServerMessage } from "rusty-motors-shared";
import { messageHandlers, type MessageHandlerResult } from "./handlers.js";
import {
	ServerPacket,
	type BufferSerializer,
} from "rusty-motors-shared-packets";
import { _MSG_STRING } from "./_MSG_STRING.js";



/**
 * Route or process MCOTS commands
 * @param {MessageHandlerArgs} args
 * @returns {Promise<MessageHandlerResult>}
 */
async function processInput({
	connectionId,
	inboundMessage,
	log = getServerLogger( "transactionServer.processInput"),
}: {
	connectionId: string;
	inboundMessage: ServerPacket;
	log?: ServerLogger;
}): Promise<MessageHandlerResult> {
	const currentMessageNo = inboundMessage.getMessageId();
	const currentMessageString = _MSG_STRING(currentMessageNo);

	log.debug(
		`[${connectionId}] Processing message: ${currentMessageNo} (${currentMessageString}), sequence: ${inboundMessage.getSequence()}`,
	);

	const result = messageHandlers.find(
		(msg) => msg.name === currentMessageString,
	);

	if (typeof result !== "undefined") {
		// Turn this into an OldServerMessage for compatibility
		const packet = new OldServerMessage();
		packet.deserialize(inboundMessage.serialize());

		try {
			const responsePackets = await result.handler({
				connectionId,
				packet,
			});
			return responsePackets;
		} catch (error) {
			const err = Error(`[${connectionId}] Error processing message ${error}`, {
				cause: error,
			});
			throw err;
		}
	}

	throw Error(
		`[${connectionId}] Unable to locate handler for message: ${currentMessageNo} (${currentMessageString})`,
	);
}

/**
 * @param {object} args
 * @param {string} args.connectionId
 * @param {SerializedBufferOld} args.message
 * @param {ServerLogger} [args.log=getServerLogger({ name: "transactionServer" })]
 * @returns {Promise<{
 *     connectionId: string,
 *    messages: SerializedBufferOld[]
 * }>}
 */
export async function receiveTransactionsData({
	connectionId,
	message,
	log = getServerLogger( "transactionServer.receiveTransactionsData"),
}: {
	connectionId: string;
	message: BufferSerializer;
	log?: ServerLogger;
}): Promise<{
	connectionId: string;
	messages: SerializedBufferOld[];
}> {

	// Normalize the message

	const inboundMessage = new ServerPacket();
	inboundMessage.deserialize(message.serialize());

	log.debug(
		`[${connectionId}] Received message: ${inboundMessage.toHexString()}`,
	);

	let decryptedMessage: ServerPacket;

	// Is the message encrypted?
	if (inboundMessage.isPayloadEncrypted()) {
		log.debug(`[${connectionId}] Message is encrypted`);
		// Get the encryyption settings for this connection
		const state = fetchStateFromDatabase();

		const encryptionSettings = getEncryption(state, connectionId);

		if (typeof encryptionSettings === "undefined") {
			throw Error(`[${connectionId}] Unable to locate encryption settings`);
		}

		// log the old buffer
		log.debug(
			`[${connectionId}] Inbound buffer: ${inboundMessage.data.toHexString()}`,
		);

		decryptedMessage = decryptMessage(
			encryptionSettings,
			inboundMessage,
			state,
			connectionId,
		);
	} else {
		log.debug(`[${connectionId}] Message is not encrypted`);
		decryptedMessage = inboundMessage;
	}

	// Process the message

	const response = await processInput({
		connectionId,
		inboundMessage: decryptedMessage,
		log,
	});

	// Loop through the outbound messages and encrypt them
	const outboundMessages: ServerPacket[] = [];

	response.messages.forEach((message) => {
		log.debug(`[${connectionId}] Processing outbound message`);

		const outboundMessage = new ServerPacket();
		outboundMessage.deserialize(message.serialize());

		if (outboundMessage.isPayloadEncrypted()) {
			const state = fetchStateFromDatabase();

			const encryptionSettings = getEncryption(state, connectionId);

			if (typeof encryptionSettings === "undefined") {
				throw Error(`[${connectionId}] Unable to locate encryption settings`);
			}

			// log the old buffer
			log.debug(
				`[${connectionId}] Outbound buffer: ${outboundMessage.data.toHexString()}`,
			);

			const encryptedMessage = encryptOutboundMessage(
				encryptionSettings,
				outboundMessage,
				state,
				connectionId,
			);
			outboundMessages.push(encryptedMessage);
		} else {
			log.debug(
				`[${connectionId}] Outbound message: ${outboundMessage.toHexString()}`,
			);
			outboundMessages.push(outboundMessage);
		}
	});

	log.debug(
		`[${connectionId}] Exiting transaction module with ${outboundMessages.length} messages`,
	);

	// Convert the outbound messages to SerializedBufferOld
	const outboundMessagesSerialized = outboundMessages.map((message) => {
		const serialized = new SerializedBufferOld();
		serialized.deserialize(message.serialize());
		return serialized;
	});

	return {
		connectionId,
		messages: outboundMessagesSerialized,
	};
}

/**
 * Decrypts an inbound message using the provided encryption settings and updates the state.
 *
 * @param encryptionSettings - The encryption settings to use for decryption.
 * @param inboundMessage - The message to be decrypted.
 * @param state - The current state of the server.
 * @param log - The logger to use for logging. Defaults to a logger named "transactionServer.decryptMessage".
 * @param connectionId - The ID of the connection associated with the message.
 * @returns The decrypted message as a `ServerPacket`.
 * @throws Will throw an error if the message cannot be decrypted.
 */
function decryptMessage(
	encryptionSettings: McosEncryption,
	inboundMessage: ServerPacket,
	state: State,
	connectionId: string,
	log: ServerLogger = getServerLogger("transactionServer.decryptMessage"),
): ServerPacket {
	try {
		const decryptedMessage = encryptionSettings.dataEncryption.decrypt(
			inboundMessage.data.serialize(),
		);
		updateEncryption(state, encryptionSettings).save();

		// Verify the length of the message
		verifyLength(inboundMessage.data.serialize(), decryptedMessage);

		// Assuming the message was decrypted successfully, update the buffer
		log.debug(
			`[${connectionId}] Decrypted buffer: ${decryptedMessage.toString("hex")}`,
		);

		const outboundMessage = ServerPacket.copy(inboundMessage, decryptedMessage);
		outboundMessage.setPayloadEncryption(false);

		log.debug(
			`[${connectionId}] Decrypted message: ${inboundMessage.toHexString()}`,
		);

		return outboundMessage;
	} catch (error) {
		const err = Error(`[${connectionId}] Unable to decrypt message`, {
			cause: error,
		});
		throw err;
	}
}

function encryptOutboundMessage(
	encryptionSettings: McosEncryption,
	unencryptedMessage: ServerPacket,
	state: State,
	connectionId: string,
	log = getServerLogger("transactionServer.encryptOutboundMessage"),
): ServerPacket {
	try {
		const encryptedMessage = encryptionSettings.dataEncryption.encrypt(
			unencryptedMessage.data.serialize(),
		);
		updateEncryption(state, encryptionSettings).save();

		// Verify the length of the message
		verifyLength(unencryptedMessage.data.serialize(), encryptedMessage);

		// Assuming the message was decrypted successfully, update the buffer
		log.debug(
			`[${connectionId}] Encrypted buffer: ${encryptedMessage.toString("hex")}`,
		);

		const outboundMessage = ServerPacket.copy(
			unencryptedMessage,
			encryptedMessage,
		);
		outboundMessage.setPayloadEncryption(true);

		log.debug(
			`[${connectionId}] Encrypted message: ${outboundMessage.toHexString()}`,
		);

		return outboundMessage;
	} catch (error) {
		const err = Error(`[${connectionId}] Unable to encrypt message`, {
			cause: error,
		});
		throw err;
	}
}

/**
 * @param {Buffer} buffer
 * @param {Buffer} buffer2
 */
export function verifyLength(buffer: Buffer, buffer2: Buffer) {
	if (buffer.length !== buffer2.length) {
		throw Error(`Length mismatch: ${buffer.length} !== ${buffer2.length}`);
	}
}
