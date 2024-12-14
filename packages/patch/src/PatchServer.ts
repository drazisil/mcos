import { Buffer } from "node:buffer";
import { IncomingMessage, ServerResponse } from "node:http";
import { logger, type Logger } from "rusty-motors-utilities";
const defaultLogger = logger.child({ name: "PatchServer.receivePatchData" });

export const CastanetResponse = {
	body: Buffer.from([
		0xca, 0xfe, 0xbe, 0xef, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03,
	]),
	header: {
		type: "Content-Type",
		value: "application/octet-stream",
	},
};

/**
 * The PatchServer class handles HTTP requests from the client for patching and upgrades
 * Please use {@link getPatchServer()} to access
 * @export
 * @class PatchServer
 */

export class PatchServer {
	/**
	 *
	 *
	 * @static
	 * @type {PatchServer}
	 * @memberof PatchServer
	 */
	static _instance: PatchServer;

	/**
	 *
	 *
	 * @private
	 * @type {import("pino").Logger}
	 */
	_log: Logger;

	/**
	 * Creates an instance of PatchServer.
	 * Please use getInstance() instead
	 * @param {import("pino").Logger} log
	 * @memberof PatchServer
	 */
	constructor(log: Logger) {
		this._log = log;
	}

	/**
	 * Return the instance of the PatchServer class
	 *
	 * @static
	 * @param {import("pino").Logger} log
	 * @return {PatchServer}
	 * @memberof PatchServer
	 */
	static getInstance(log: Logger = defaultLogger): PatchServer {
		if (!PatchServer._instance) {
			PatchServer._instance = new PatchServer(log);
		}
		return PatchServer._instance;
	}

	/**
	 * Returns the hard-coded value that tells the client there are no updates or patches
	 * @param {IncomingMessage} request
	 * @param {ServerResponse} response
	 * @returns {ServerResponse}
	 */
	castanetResponse(
		request: IncomingMessage,
		response: ServerResponse,
	): ServerResponse {
		this._log.debug(
			`[PATCH] Request from ${request.socket.remoteAddress} for ${request.method} ${request.url}.`,
		);

		response.setHeader(
			CastanetResponse.header.type,
			CastanetResponse.header.value,
		);
		return response.end(CastanetResponse.body);
	}

	/**
	 * Routes incomming HTTP requests
	 * @param {IncomingMessage} request
	 * @param {ServerResponse} response
	 * @returns {ServerResponse}
	 */
	handleRequest(
		request: IncomingMessage,
		response: ServerResponse,
	): ServerResponse {
		if (
			request.url === "/games/EA_Seattle/MotorCity/UpdateInfo" ||
			request.url === "/games/EA_Seattle/MotorCity/NPS" ||
			request.url === "/games/EA_Seattle/MotorCity/MCO"
		) {
			return this.castanetResponse(request, response);
		}
		response.statusCode = 404;
		return response.end("");
	}
}
/**
 * Return the instance of the PatchServer class
 * @returns {PatchServer}
 */

export function getPatchServer(): PatchServer {
	return PatchServer.getInstance(defaultLogger);
}
