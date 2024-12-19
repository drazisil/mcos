import crypto from "node:crypto";
import fs from "node:fs";
import { GameMessage } from "../messageStructs/GameMessage.js";
import { SessionKey } from "../messageStructs/SessionKey.js";
import { getLenString } from "../src/utils/pureGet.js";
import type { GameSocketCallback } from "./index.js";

import type { UserStatus } from "../messageStructs/UserStatus.js";
import { logger } from "rusty-motors-logger";
const defaultLogger = logger.child({ name: "nps.processDeleteProfile" });

export function loadPrivateKey(path: string): string {
	const privateKey = fs.readFileSync(path);

	return privateKey.toString("utf8");
}

export function decryptSessionKey(
	encryptedSessionKey: string,
	privateKey: string,
): string {
	const sessionKeyStructure = crypto.privateDecrypt(
		privateKey,
		Buffer.from(encryptedSessionKey, "hex"),
	);

	return sessionKeyStructure.toString("hex");
}

export function unpackUserLoginMessage(message: GameMessage): {
	sessionKey: string;
	gameId: string;
	contextToken: string;
} {
	// Get the context token
	const ticket = getLenString(message.getDataAsBuffer(), 0, false);

	let dataOffset = ticket.length + 2;

	//  The next data structure is a container with an empty id, a length, and a data structure

	// Skip the empty id
	dataOffset += 2;

	// Get the next data length
	const nextDataLength = message.getDataAsBuffer().readUInt16BE(dataOffset);

	// This value is the encrypted session key hex, stored as a string
	const encryptedSessionKey = message
		.getDataAsBuffer()
		.subarray(dataOffset + 2, dataOffset + 2 + nextDataLength)
		.toString("utf8");

	// Load the private key
	const privateKey = loadPrivateKey("./data/private_key.pem");

	// Decrypt the session key
	const sessionKey = decryptSessionKey(encryptedSessionKey, privateKey);

	// Unpack the session key
	const sessionKeyStructure = SessionKey.fromBytes(
		Buffer.from(sessionKey, "hex"),
	);

	// Update the data offset
	dataOffset += 2 + nextDataLength;

	// Get the next data length
	const nextDataLength2 = message.getDataAsBuffer().readUInt16BE(dataOffset);

	// This value is the game id (used by server to identify the game)
	const gameId = message
		.getDataAsBuffer()
		.subarray(dataOffset + 2, dataOffset + 2 + nextDataLength2)
		.toString("utf8");

	// Update the data offset
	dataOffset += 2 + nextDataLength2;

	// Return the session key, game id, and context token
	return {
		sessionKey: sessionKeyStructure.getKey(),
		gameId,
		contextToken: ticket,
	};
}

export async function processDeleteProfile(
	_connectionId: string,
	_userStatus: UserStatus,
	message: GameMessage,
	socketCallback: GameSocketCallback,
): Promise<void> {
	defaultLogger.debug("processDeleteProfile called");
	// Log the message
	defaultLogger.info(`Delete profile request: ${message.toString()}`);

	// TODO: Delete the profile

	// Create a new message - Login ACK
	const loginACK = new GameMessage(0);
	loginACK.header.setId(0x60c);

	// Send the ack
	socketCallback([loginACK.serialize()]);
	return Promise.resolve();
}
