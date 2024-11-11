import {
	GameMessage,
	ProfileList,
	getAsHex,
	getDWord,
	getGameProfilesForCustomerId,
} from "rusty-motors-nps";
import type { GameSocketCallback } from "./index.js";

import type { UserStatus } from "rusty-motors-nps";
import pino from "pino";
const defaultLogger = pino({ name: "nps.processGetProfileMaps" });

export async function processGetProfileMaps(
	connectionId: string,
	userStatus: UserStatus,
	message: GameMessage,
	socketCallback: GameSocketCallback,
): Promise<void> {
	// This message is a version 257, but it's version is set to 0
	// This is a bug in the client, so we need to generate a new message
	// with the correct version
	const requestMessage = GameMessage.fromGameMessage(257, message);

	defaultLogger.info(`GetProfileMaps (257): ${requestMessage.toString()}`);

	const customerId = getDWord(requestMessage.getDataAsBuffer(), 0, false);

	defaultLogger.info(`GetProfileMaps: ${customerId}`);

	// Look up the profiles for the customer ID
	const profiles = getGameProfilesForCustomerId(customerId);

	// Create a new NPSList of profiles
	const list = new ProfileList();

	// Add each profile to the list
	if (profiles) {
		for (const profile of profiles) {
			// Log the profile
			defaultLogger.info(`GetProfileMaps: ${profile.toString()}`);

			list.addProfile(profile);
		}
	}

	// Send the list back to the client
	try {
		const outMessage = new GameMessage(257);
		outMessage.header.setId(0x607);

		// Log the message data
		defaultLogger.info(`GetProfileMaps: ${getAsHex(outMessage.serialize())}`);

		outMessage.setData(list);

		// Log the message
		defaultLogger.info(`GetProfileMaps: ${outMessage.toString()}`);

		defaultLogger.info("===========================================");

		socketCallback([outMessage.serialize()]);
		return Promise.resolve();
	} catch (error) {
		defaultLogger.error(`Error sending profile info: ${error as string}`);
		throw new Error("Error sending profile info");
	}
}
