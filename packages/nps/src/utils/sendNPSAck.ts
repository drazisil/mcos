import type { GameSocketCallback } from "../gameMessageProcessors/index.js";
import { GameMessage } from "../messageStructs/GameMessage.js";

export function sendNPSAck(socketCallback: GameSocketCallback) {
	const response = new GameMessage(0);
	response.header.setId(519);

	const responseBytes = response.serialize();

	socketCallback([responseBytes]);
}
