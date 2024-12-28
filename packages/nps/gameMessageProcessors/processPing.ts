import { GameMessage } from "rusty-motors-nps";
import type { GameSocketCallback } from "./index.js";

import type { UserStatus } from "rusty-motors-nps";
import { sendNPSAck } from "rusty-motors-nps";
import { getServerLogger } from "rusty-motors-shared";

const defaultLogger = getServerLogger("nps.processPing");

export async function processPing(
	connectionId: string,
	userStatus: UserStatus,
	message: GameMessage,
	socketCallback: GameSocketCallback,
): Promise<void> {
	defaultLogger.info(`Ping: ${message.toString()}`);

	sendNPSAck(socketCallback);
	return Promise.resolve();
}
