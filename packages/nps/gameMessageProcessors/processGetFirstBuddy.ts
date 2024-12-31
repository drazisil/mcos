import {
	GameMessage,
	// ProfileList,
	SerializableData,
	getDWord,
	// getGameProfilesForCustomerId,
} from "rusty-motors-nps";
import type { GameSocketCallback } from "./index.js";

import type { UserStatus } from "rusty-motors-nps";
import { getServerLogger } from "rusty-motors-shared";

const defaultLogger = getServerLogger("nps.processFirstBuddy");

export async function processFirstBuddy(
	_connectionId: string,
	_userStatus: UserStatus,
	message: GameMessage,
	socketCallback: GameSocketCallback,
): Promise<void> {
	defaultLogger.info("processFirstBuddy called");
	const profileId = getDWord(message.getDataAsBuffer(), 0, false);

	defaultLogger.info(`GetFirstBuddy profile: ${profileId}`);

	// TO: Look up the profiles for the customer ID
	// const _profiles = getGameProfilesForCustomerId(profileId);

	// TO: Create a new NPSList of profiles
	// const _list = new ProfileList();

	const outMessage = new GameMessage(257);
	outMessage.header.setId(0x614);
	outMessage.setData(new SerializableData(4));

	// Log the message
	defaultLogger.info(`GetFirstBuddy: ${outMessage.toString()}`);

	defaultLogger.info("===========================================");

	socketCallback([outMessage.serialize()]);
	return Promise.resolve();
}
