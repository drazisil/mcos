import { privateDecrypt } from "node:crypto";
import { readFileSync } from "node:fs";

import { Configuration,  } from "rusty-motors-shared";
import { LegacyMessage } from "rusty-motors-shared";
import pino, { Logger } from "pino";
const defaultLogger = pino({ name: "nps.NPSUserStatus" });


/**
 * @typedef {import("../../shared/Configuration.js").Configuration} Configuration
 */

/**
 *
 *
 * @export
 * @typedef {object} NPSMessageValues
 * @property {number} msgNo
 * @property {number} msgVersion
 * @property {number} reserved
 * @property {Buffer} content
 * @property {number} msgLength
 * @property {"sent" | "received"} direction
 * @property {string} serviceName
 */
/**
 *
 * @class NPSUserStatus
 * @property {string} sessionKey
 * @property {string} opCode
 * @property {Buffer} buffer
 */

export class NPSUserStatus extends LegacyMessage {
	_config: Configuration;
	log: Logger;
	sessionKey: string;
	opCode: number;
	contextId: string;
	buffer: Buffer;
	/**
	 *
	 * @param {Buffer} packet
	 * @param {Configuration} config
	 * @param {import("pino").Logger} log
	 */
	constructor(packet: Buffer, config: Configuration, log: Logger) {
		super();
		this._config = config;
		this.log = log;
		log.debug("Constructing NPSUserStatus");
		this._header._doDeserialize(packet);
		this.sessionKey = "";

		// Save the NPS opCode
		this.opCode = packet.readInt16BE(0);

		// Save the contextId
		this.contextId = packet.subarray(14, 48).toString();

		// Save the raw packet
		this.buffer = packet;
	}

	/**
	 * ExtractSessionKeyFromPacket
	 *
	 * Take 128 bytes
	 * They are the utf-8 of the hex bytes that are the key
	 *
	 * @param {Buffer} rawPacket
	 * @return {void}
	 */
	extractSessionKeyFromPacket(rawPacket: Buffer): void {
		this.log.debug("Extracting key");

		// Extract the session key which is 128 acsii characters (256 bytes)
		const sessionKeyAsAscii = rawPacket.subarray(52, 308).toString("utf8");
		this.log.trace(`Session key: ${sessionKeyAsAscii}`);

		// length of the session key should be 128 bytes
		const sessionkeyString = Buffer.from(sessionKeyAsAscii, "hex");
		// Decrypt the sessionkey
		try {
			if (!this._config.privateKeyFile) {
				throw Error("No private key file specified");
			}
			const privatekeyContents = readFileSync(this._config.privateKeyFile);

			const decrypted = privateDecrypt(
				{
					key: privatekeyContents,
				},
				sessionkeyString,
			); // length of decrypted should be 128 bytes
			this.sessionKey = decrypted.subarray(2, -4).toString("hex"); // length of session key should be 12 bytes
		} catch (error) {
			this.log.trace(`Session key: ${sessionkeyString.toString("utf8")}`); // 128 bytes
			this.log.trace(`decrypted: ${this.sessionKey}`); // 12 bytes
			this.log.fatal(`Error decrypting session key: ${String(error)}`);
			const err = new Error("Error decrypting session key");
			err.cause = error;
			throw err;
		}
	}

	toJSON() {
		this.log.debug("Returning as JSON");
		return {
			msgNo: this._header.id,
			msgLength: this._header.length,
			content: this.data.toString("hex"),
			contextId: this.contextId,
			sessionKey: this.sessionKey,
			rawBuffer: this.buffer.toString("hex"),
		};
	}

	/**
	 * @return {string}
	 */
	dumpPacket(): string {
		this.log.debug("Returning as string");
		let message = this._header.toString();
		message = message.concat(
			`NPSUserStatus,
        ${JSON.stringify({
					contextId: this.contextId,
					sessionkey: this.sessionKey,
				})}`,
		);
		return message;
	}
}
