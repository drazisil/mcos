export class RawMessageHeader {
    id: number;
    length: number;
    version: number;
    reserved: number;
    checksum: number;

	constructor() {
		this.id = 0; // 2 bytes
		this.length = 0; // 2 bytes
		this.version = 257; // 2 bytes (0x0101)
		this.reserved = 0; // 2 bytes
		this.checksum = 0; // 4 bytes
	}

	/**
	 * @param {Buffer} buffer
	 * @returns {RawMessageHeader}
	 * @throws {Error} If the buffer is too short
	 * @throws {Error} If the buffer is malformed
	 */
	deserialize(buffer: Buffer) {
		if (buffer.length < 4) {
			throw new Error(
				`Buffer length ${buffer.length} is too short to deserialize`,
			);
		}

		try {
			this.id = buffer.readInt16BE(0);
			this.length = buffer.readInt16BE(2);
		} catch (error) {
			throw new Error(`Error deserializing buffer: ${String(error)}`);
		}
		return this;
	}

	/**
	 * @returns {Buffer}
	 * @throws {Error} If there is an error serializing the buffer
	 */
	serialize() {
		const buffer = Buffer.alloc(RawMessageHeader.size());
		this.checksum = this.length;
		buffer.writeInt16BE(this.id, 0);
		buffer.writeInt16BE(this.length, 2);
		buffer.writeInt16BE(this.version, 4);
		buffer.writeInt16BE(this.reserved, 6);
		buffer.writeInt32BE(this.checksum, 8);
		return buffer;
	}

	static size() {
		return 12;
	}

	toString() {
		return `id: ${this.id}, length: ${this.length}`;
	}
}
