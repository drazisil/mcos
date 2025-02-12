import { getPersonasByPersonaId } from "rusty-motors-personas";
import { LoginInfoMessage } from "../LoginInfoMessage.js";

import {
	createCommandEncryptionPair,
	createDataEncryptionPair,
} from "rusty-motors-gateway";
import {
	McosEncryption,
	addEncryption,
	fetchStateFromDatabase,
	getEncryption,
} from "rusty-motors-shared";
import { SerializedBufferOld } from "rusty-motors-shared";
import { databaseManager } from "rusty-motors-database";
import { getServerLogger } from "rusty-motors-shared";
import { BytableMessage } from "@rustymotors/binary";


/**
 * Convert to zero padded hex
 *
 * @export
 * @param {Buffer} data
 * @return {string}
 */
export function toHex(data: Buffer): string {
	/** @type {string[]} */
	const bytes: string[] = [];
	data.forEach((b: number) => {
		bytes.push(b.toString(16).toUpperCase().padStart(2, "0"));
	});
	return bytes.join("");
}

/**
 * Handle a request to connect to a game server packet
 *
 * @private
 * @param {ServiceArgs} args
 * @returns {Promise<{
 *  connectionId: string,
 * messages: SerializedBufferOld[],
 * }>}
 */
export async function _npsRequestGameConnectServer({
	connectionId,
	message,
	log = getServerLogger("handlers/_npsRequestGameConnectServer"),
}: {
	connectionId: string;
	message: BytableMessage;
	log?: ReturnType<typeof getServerLogger>;
}): Promise<{
	connectionId: string;
	messages: SerializedBufferOld[];
}> {
	// This is a NPS_LoginInfo packet
	// As a legacy packet, it used the old NPSMessage format
	// of a 4 byte header, followed by a 4 byte length, followed
	// by the data payload.

	const inboundMessage = new LoginInfoMessage();
	inboundMessage.deserialize(message.serialize());

	log.debug(`LoginInfoMessage: ${inboundMessage.toString()}`);

	const personas = await getPersonasByPersonaId({
		personaId: inboundMessage._userId,
	});
	if (typeof personas[0] === "undefined") {
		const err = Error("No personas found.");
		throw err;
	}

	const { customerId } = personas[0];

	const state = fetchStateFromDatabase();

	const existingEncryption = getEncryption(state, connectionId);

	if (!existingEncryption) {
		// Set the encryption keys on the lobby connection
		const keys = await databaseManager.fetchSessionKeyByCustomerId(customerId);

		if (keys === undefined) {
			throw Error("Error fetching session keys!");
		}

		// We have the session keys, set them on the connection
		try {
			const newCommandEncryptionPair = createCommandEncryptionPair(
				keys.sessionKey,
			);

			const newDataEncryptionPair = createDataEncryptionPair(keys.sessionKey);

			const newEncryption = new McosEncryption({
				connectionId,
				commandEncryptionPair: newCommandEncryptionPair,
				dataEncryptionPair: newDataEncryptionPair,
			});

			addEncryption(state, newEncryption).save();
		} catch (error) {
			const err = Error(`Error creating encryption`);
			err.cause = error;
			throw err;
		}
	}

	// We have a session, we are good to go!
	// Send the response packet

	const responsePacket = new BytableMessage();
	responsePacket.header.setMessageVersion(0);
	responsePacket.header.setMessageId(0x120);

	responsePacket.setSerializeOrder([
		{ name: "userId", field: "Dword" },
		{ name: "userName", field: "Container" },
		{ name: "userData", field: "Buffer" },
	])

	responsePacket.setFieldValueByName("userId", inboundMessage._userId);
	responsePacket.setFieldValueByName("userName", inboundMessage._userName);
	responsePacket.setFieldValueByName("userData", inboundMessage._userData);

	// log the packet
	log.debug(
		`!!! outbound lobby login response packet: ${responsePacket.toString()}`,
	);

	const outboundMessage = new SerializedBufferOld();
	outboundMessage.deserialize(responsePacket.serialize());

	log.debug(`[${connectionId}] Returning with ${outboundMessage.toHexString()}`);

	return {
		connectionId,
		messages: [outboundMessage],
	};
}
