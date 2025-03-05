import { privateDecrypt } from "node:crypto";
import { readFileSync } from "node:fs";

import { Configuration, getServerLogger, ServerLogger,  } from "rusty-motors-shared";
import { LegacyMessage } from "rusty-motors-shared";

const SESSION_KEY_START = 52;

type NPSSessionKey = {
	sessionKeyLength: number;
	sessionKey: string;
	expires: number;
};


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
	log: ServerLogger;
	sessionKey: string;
	opCode: number;
	contextId: string;
	buffer: Buffer;
	/**
	 *
	 * @param {Buffer} packet
	 * @param {Configuration} config
	 * @param {Serverogger} log
	 */
	constructor(packet: Buffer, config: Configuration, log: ServerLogger) {
		super();
		this._config = config;
		this.log = getServerLogger("NPSUserStatus");
		log.debug("Constructing NPSUserStatus");
		this._header.deserialize(packet);
		this.sessionKey = "";

		// Save the NPS opCode
		this.opCode = packet.readInt16BE(0);

		// Save the contextId
		this.contextId = packet.subarray(14, 48).toString();

		// Save the raw packet
		this.buffer = packet;
	}




	/**
	 * Extracts the session key from the provided raw packet buffer.
	 * 
	 * This method reads the session key length from the packet, extracts the session key,
	 * decrypts it using the private key, and parses the decrypted session key.
	 * 
	 * @param rawPacket - The raw packet buffer containing the session key.
	 * 
	 * @throws {Error} Throws an error if there is an issue decrypting the session key.
	 */
	extractSessionKeyFromPacket(rawPacket: Buffer): void {
		this.log.debug("Extracting key");

		const keyLength = rawPacket.readInt16LE(SESSION_KEY_START);

		// Extract the session key which is 128 acsii characters (256 bytes)
		const sessionKeyAsAscii = rawPacket.subarray(SESSION_KEY_START, SESSION_KEY_START + keyLength).toString("utf8");

		// length of the session key should be 128 bytes
		const sessionkeyString = Buffer.from(sessionKeyAsAscii, "hex");
		// Decrypt the sessionkey
		const privatekeyContents = this.loadPrivateKeyContents();
		try {

			const decrypted = privateDecrypt(
				{
					key: privatekeyContents,
				},
				sessionkeyString,
			); // length of decrypted should be 128 bytes

			const parsedSessionKey = parseNPSSessionKey(decrypted);

			this.sessionKey = parsedSessionKey.sessionKey; // length of session key should be 12 bytes
		} catch (error: unknown) {
			this.log.trace(`Session key: ${sessionkeyString.toString("utf8")}`); // 128 bytes
			this.log.trace(`decrypted: ${this.sessionKey}`); // 12 bytes
			this.log.fatal(`Error decrypting session key: ${(error as Error).message}`);
			const err = new Error(`Error decrypting session key: ${(error as Error).message}`);
			err.cause = error;
			throw err;
		}
	}

	private loadPrivateKeyContents() {
		if (this._config.privateKeyFile === "") {
			throw Error("No private key file specified");
		}
		const privatekeyContents = readFileSync(this._config.privateKeyFile);
		return privatekeyContents;
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

/**
 * Parses a buffer to extract the NPS session key and its expiration time.
 *
 * @param buffer - The buffer containing the session key data.
 * @returns An object containing the session key length, session key (in hex format), and expiration time.
 */
export function parseNPSSessionKey(buffer: Buffer): NPSSessionKey {
try {
		const sessionKeyLength = buffer.readInt16BE(0);
		const sessionKey = buffer.subarray(2, sessionKeyLength + 2).toString("hex");
		const expires = buffer.readInt32BE(sessionKeyLength + 2);
		return { sessionKeyLength, sessionKey, expires };
} catch (error) {
	const err = new Error(`Error parsing session key: ${(error as Error).message}`);
	err.cause = error;
	throw err;
}
}
