/**
 * @module interfaces
 */

import type { Logger } from "rusty-motors-logger";
import type { SerializedBufferOld } from "./SerializedBufferOld.js";

export const name = "interfaces";

/**
 * @exports
 * @interface
 */

export interface DatabaseManager {
	updateSessionKey: (
		arg0: number,
		arg1: string,
		arg2: string,
		arg3: string,
	) => Promise<void>;
	fetchSessionKeyByCustomerId: (arg0: number) => Promise<SessionKeys>;
}

/**
 * @exports
 */
export interface ConnectionRecord {
	customerId: number;
	connectionId: string;
	sessionKey: string;
	sKey: string;
	contextId: string;
}

interface SessionKeys {
	sessionKey: string;
	sKey: string;
}

export interface GameMessageOpCode {
	name: string;
	value: number;
	module: "Lobby" | "Login";
}

export interface UserRecordMini {
	contextId: string;
	customerId: number;
	userId: number;
}

/**
 * @exports
 */
export interface RaceLobbyRecord {
	lobbyId: number;
	raceTypeId: number;
	turfId: number;
	riffName: string;
	eTurfName: string;
}

export interface ServiceArgs {
	connectionId: string;
	message: SerializedBufferOld;
	log: Logger;
}

export interface KeypressEvent {
	sequence: string;
	name: string;
	ctrl: boolean;
	meta: boolean;
	shift: boolean;
}
