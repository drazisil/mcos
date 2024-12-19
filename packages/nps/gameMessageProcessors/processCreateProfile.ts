import { GameMessage } from "../messageStructs/GameMessage.js";
import { GameProfile } from "../messageStructs/GameProfile.js";
import type { UserStatus } from "../messageStructs/UserStatus.js";
import { addGameProfile } from "../services/profile.js";
import type { GameSocketCallback } from "./index.js";
import { logger } from "rusty-motors-logger";
const defaultLogger = logger.child({ name: "nps.processCreateProfile" });

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
	defaultLogger.info(
		`ProcessCreateProfile request: ${createProfileMessage.toString()}`,
	);

	// Add the profile
	addGameProfile(createProfileMessage);

	// TODO: Send the response
	const response = new GameMessage(257);
	response.header.setId(0x601);

	response.setData(message.getData());

	// Log the response
	defaultLogger.info(`ProcessCreateProfile response: ${response.toString()}`);

	socketCallback([response.serialize()]);
	return Promise.resolve();
}
