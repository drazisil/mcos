import { GameMessage } from "../messageStructs/GameMessage.js";
import { getLenString } from "../src/utils/pureGet.js";
import type { GameSocketCallback } from "./index.js";

import type { UserStatus } from "../messageStructs/UserStatus.js";
import pino from "pino";
const defaultLogger = pino({ name: "nps.processCheckProfileName" });

export async function processCheckProfileName(
	connectionId: string,
	userStatus: UserStatus,
	message: GameMessage,
	socketCallback: GameSocketCallback,
): Promise<void> {
	defaultLogger.info("processCheckProfileName called");
	const customerId = message.serialize().readUInt32BE(8);

	const requestedPersonaName = getLenString(message.serialize(), 12, false);

	defaultLogger.info(
		`Requested persona name: ${requestedPersonaName} for customer ${customerId}`,
	);

	const response = new GameMessage(0);
	response.header.setId(0x601);

	const responseBytes = response.serialize();

	socketCallback([responseBytes]);
	return Promise.resolve();
}
