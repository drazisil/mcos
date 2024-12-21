import { GameMessage } from "../messageStructs/GameMessage.js";
import type { UserStatus } from "../messageStructs/UserStatus.js";
import { processCheckPlateText } from "./processCheckPlateText.js";
import { processCheckProfileName } from "./processCheckProfileName.js";
import { processCreateProfile } from "./processCreateProfile.js";
import { processDeleteProfile } from "./processDeleteProfile.js";
import { processEncryptedGameCommand } from "./processEncryptedGameCommand.js";
import { processGameLogin } from "./processGameLogin.js";
import { processGameLogout } from "./processGameLogout.js";
import { processFirstBuddy } from "./processGetFirstBuddy.js";
import { processGetProfileInfo } from "./processGetProfileInfo.js";
import { processGetProfileMaps } from "./processGetProfileMaps.js";
import { processPing } from "./processPing.js";
import { processSelectPersona } from "./processSelectPersona.js";
import { processUserLogin } from "./processUserLogin.js";

export type GameSocketCallback = (messages: Buffer[]) => void;

export type MessageProcessor = (
	connectionId: string,
	userStatus: UserStatus,
	message: GameMessage,
	socketCallback: GameSocketCallback,
) => Promise<void>;

export class MessageProcessorError extends Error {
	constructor(id: number, message: string) {
		super(`MessageProcessorError: ${id}: ${message}`);
	}
}

export const gameMessageProcessors = new Map<number, MessageProcessor>([]);

export function populateGameMessageProcessors(
	processors: Map<number, MessageProcessor>,
): void {
	processors.set(256, processUserLogin); // 0x100
	processors.set(535, processPing); // 0x217
	processors.set(1281, processGameLogin); // 0x501
	processors.set(1283, processSelectPersona); // 0x503
	processors.set(1287, processCreateProfile); // 0x507
	processors.set(1291, processFirstBuddy); // 0x50b
	processors.set(1295, processGameLogout); // 0x50f
	processors.set(1298, processDeleteProfile); // 0x512
	processors.set(1305, processGetProfileInfo); // 0x519
	processors.set(1330, processGetProfileMaps); // 0x532
	processors.set(1331, processCheckProfileName); // 0x533
	processors.set(1332, processCheckPlateText); // 0x534
	processors.set(4353, processEncryptedGameCommand); // 0x1101
}

export function getGameMessageProcessor(messageId: number) {
	if (gameMessageProcessors.has(messageId) === true) {
		return gameMessageProcessors.get(messageId) as MessageProcessor;
	}

	return undefined;
}

export class PortMapError extends Error {
	port: number;
	constructor(port: number, message: string) {
		super(message);
		this.name = "PortMapError";
		this.port = port;
	}

	override toString(): string {
		return `${this.name}: ${this.message}`;
	}
}

export const portToMessageTypes = new Map<number, string>([]);

export function populatePortToMessageTypes(portMap: Map<number, string>): void {
	portMap.set(7003, "Game");
	portMap.set(8226, "Game");
	portMap.set(8227, "Game");
	portMap.set(8228, "Game");
	portMap.set(9000, "Game");
	portMap.set(43300, "Server");
}

export function getPortMessageType(port: number): string {
	if (portToMessageTypes.has(port) === true) {
		// @ts-expect-error - Since has() is true, the return value is NOT undefined
		return portToMessageTypes.get(port);
	}
	throw new PortMapError(port, "No message type found");
}
