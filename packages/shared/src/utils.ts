/**
 * Convert to zero padded hex
 *
 * @export
 * @param {Buffer} data
 * @return {string}
 */

export function toHex(data: Buffer): string {
	/** @type {string[]} */
	const bytes: string[] = [];
	data.forEach((b) => {
		bytes.push(b.toString(16).toUpperCase().padStart(2, "0"));
	});
	return bytes.join("");
}
