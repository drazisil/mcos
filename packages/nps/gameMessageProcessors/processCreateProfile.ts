import { GameMessage } from "../messageStructs/GameMessage.js";
import { GameProfile } from "../messageStructs/GameProfile.js";
import type { UserStatus } from "../messageStructs/UserStatus.js";
import type { GameSocketCallback } from "./index.js";
import pino from "pino";
const defaultLogger = pino({ name: "nps.processCreateProfile" });

export async function processCreateProfile(
	_connectionId: string,
	_userStatus: UserStatus,
	message: GameMessage,
	socketCallback: GameSocketCallback,
): Promise<void> {
	// Log the request
	defaultLogger.info(`ProcessCreateProfile request: ${message.toString()}`);

	const createProfileMessage = GameProfile.fromBytes(message.getDataAsBuffer());

	// Log the request
	defaultLogger.info(`ProcessCreateProfile request: ${createProfileMessage.toString()}`);

	// TODO: Add the profile

	// TODO: Send the response
	const response = new GameMessage(257);
	response.header.setId(0x601);

	response.setData(message.getData());

	// Log the response
	defaultLogger.info(`ProcessCreateProfile response: ${response.toString()}`);

	socketCallback([response.serialize()]);
	return Promise.resolve();
}
