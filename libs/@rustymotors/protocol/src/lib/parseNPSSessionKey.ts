/**
 * Parses a buffer to extract the NPS session key and its expiration time.
 *
 * @param buffer - The buffer containing the session key data.
 * @returns An object containing the session key length, session key (in hex format), and expiration time.
 */

export function parseNPSSessionKey(buffer: Buffer): {
	sessionKeyLength: number;
	sessionKey: string;
	expires: number;
} {
	try {
		const sessionKeyLength = buffer.readInt16BE(0);
		const sessionKey = buffer.subarray(2, sessionKeyLength + 2).toString("hex");
		const expires = buffer.readInt32BE(sessionKeyLength + 2);
		return { sessionKeyLength, sessionKey, expires };
	} catch (error) {
		const err = new Error(
			`Error parsing session key: ${(error as Error).message}`
		);
		err.cause = error;
		throw err;
	}
}
