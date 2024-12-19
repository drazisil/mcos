import { GameMessage } from "../messageStructs/GameMessage.js";
import type { UserStatus } from "../messageStructs/UserStatus.js";
import { getLenString } from "../src/utils/pureGet.js";
import { sendNPSAck } from "../src/utils/sendNPSAck.js";
import type { GameSocketCallback } from "./index.js";
import { logger } from "rusty-motors-logger";
const defaultLogger = logger.child({ name: "nps.processCheckPlateText" });

export async function processCheckPlateText(
	_connectionId: string,
	_userStatus: UserStatus,
	message: GameMessage,
	socketCallback: GameSocketCallback,
): Promise<void> {
	defaultLogger.info("processCheckPlateText called");
	const plateType = message.getDataAsBuffer().readUInt32BE(0);

	const requestedPlateText = getLenString(message.getDataAsBuffer(), 4, false);

	defaultLogger.info(
		`Requested plate text: ${requestedPlateText} for plate type ${plateType}`,
	);

	sendNPSAck(socketCallback);
	return Promise.resolve();
}
