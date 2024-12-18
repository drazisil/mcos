import {
	GameMessage,
	UserInfo,
	getDWord,
	getLenString,
} from "rusty-motors-nps";
import type { GameSocketCallback } from "./index.js";

import type { UserStatus } from "rusty-motors-nps";
import { UserStatusManager, getCustomerId } from "rusty-motors-nps";
import { logger } from "rusty-motors-utilities";
const defaultLogger = logger.child({ name: "nps.processUserLogin" });

export async function processUserLogin(
	_connectionId: string,
	_userStatus: UserStatus,
	message: GameMessage,
	socketCallback: GameSocketCallback,
): Promise<void> {
	defaultLogger.info(`UserLogin: ${message.toString()}`);

	// This message is a BareMessageV0

	const personaId = getDWord(message.getDataAsBuffer(), 0, false);

	const profileName = getLenString(message.getDataAsBuffer(), 4, false);

	// Lookup customerID from personaID
	const customerID = getCustomerId(personaId);

	if (customerID === -1) {
		defaultLogger.error(`CustomerID not found for personaID: ${personaId}`);
		throw new Error(`CustomerID not found for personaID: ${personaId}`);
	}

	defaultLogger.info(`LobbyLogin: ${personaId} ${profileName} ${customerID}`);

	const existingStatus = UserStatusManager.getUserStatus(customerID);

	if (typeof existingStatus === "undefined") {
		defaultLogger.error(`UserStatus not found for customerID: ${customerID}`);
		throw new Error(`UserStatus not found for customerID: ${customerID}`);
	}

	// Update the user status
	_userStatus = existingStatus.setPersonaId(personaId);

	// TODO: send the updated user status

	defaultLogger.info(`LobbyLogin: ${message.toString()}`);

	const response = new UserInfo(personaId, profileName);

	defaultLogger.info(`Sending response: ${response.toString()}`);

	const responseMessage = new GameMessage(0);
	responseMessage.header.setId(0x120);

	responseMessage.setData(response);

	defaultLogger.info(`Response message: ${responseMessage.toString()}`);

	const responseBytes = responseMessage.serialize();

	socketCallback([responseBytes]);
}
