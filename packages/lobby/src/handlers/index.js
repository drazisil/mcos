// eslint-disable-next-line no-unused-vars
import { SerializedBufferOld } from "rusty-motors-shared";
import { handleEncryptedNPSCommand } from "./encryptedCommand.js";
import { _npsHeartbeat } from "./heartbeat.js";
import { _npsRequestGameConnectServer } from "./requestConnectGameServer.js";

/**
 * @typedef {object} ServiceArgs
 * @property {string} connectionId
 * @property {SerializedBufferOld} message
 * @property {import("pino").Logger} log
 */

/**
 * @typedef {object} ServiceResponse
 * @property {string} connectionId
 * @property {SerializedBufferOld[] } messages
 */

/**
 * @exports
 * @typedef {object} GameMessageHandler
 * @property {number} opCode
 * @property {string} name
 * @property {function(ServiceArgs): Promise<ServiceResponse>} handler
 */

/** @type {GameMessageHandler[]} */
export const handlerMap = [
	{
		opCode: 100,
		name: "Connect game server",
		handler: _npsRequestGameConnectServer,
	},
	{ opCode: 217, name: "Heartbeat", handler: _npsHeartbeat },
	{
		opCode: 1101,
		name: "Encrypted command",
		handler: handleEncryptedNPSCommand,
	},
];
