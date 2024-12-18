import type { GameMessage } from "../messageStructs/GameMessage.js";
import type { UserStatus } from "../messageStructs/UserStatus.js";
import { sendNPSAck } from "../src/utils/sendNPSAck.js";
import type { GameSocketCallback } from "./index.js";

export async function processGameLogout(
	_connectionId: string,
	_userStatus: UserStatus,
	_message: GameMessage,
	socketCallback: GameSocketCallback,
): Promise<void> {
	sendNPSAck(socketCallback);
	return Promise.resolve();
}
