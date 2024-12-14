import {
	GameMessage,
	ProfileList,
	SerializableData,
	getDWord,
	getGameProfilesForCustomerId,
} from "rusty-motors-nps";
import type { GameSocketCallback } from "./index.js";

import type { UserStatus } from "rusty-motors-nps";
import { logger } from "rusty-motors-utilities";
const defaultLogger = logger.child({ name: "nps.processFirstBuddy" });

export async function processFirstBuddy(
	connectionId: string,
	userStatus: UserStatus,
	message: GameMessage,
	socketCallback: GameSocketCallback,
): Promise<void> {
	defaultLogger.info("processFirstBuddy called");
	const profileId = getDWord(message.getDataAsBuffer(), 0, false);

	defaultLogger.info(`GetFirstBuddy profile: ${profileId}`);

	// Look up the profiles for the customer ID
	const profiles = getGameProfilesForCustomerId(profileId);

	// Create a new NPSList of profiles
	const list = new ProfileList();

	const outMessage = new GameMessage(257);
	outMessage.header.setId(0x614);
	outMessage.setData(new SerializableData(4));

	// Log the message
	defaultLogger.info(`GetFirstBuddy: ${outMessage.toString()}`);

	defaultLogger.info("===========================================");

	socketCallback([outMessage.serialize()]);
	return Promise.resolve();
}
