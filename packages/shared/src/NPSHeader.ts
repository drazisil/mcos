import { SerializableMixin, AbstractSerializable } from "./messageFactory.js";

/**
 * A nps header is a 12 byte header with the following fields:
 * - 2 bytes - id
 * - 2 bytes - length
 * - 2 bytes - version
 * - 2 bytes - reserved
 * - 4 bytes - checksum
 *
 * @mixin {SerializableMixin}
 */

export class NPSHeader extends SerializableMixin(AbstractSerializable) {
	_size: number;
	id: number; // 2 bytes
	length: number; // 2 bytes
	version: number; // 2 bytes
	reserved: number; // 2 bytes
	checksum: number; // 4 bytes
	constructor() {
		super();
		this._size = 12;
		this.id = 0; // 2 bytes
		this.length = this._size; // 2 bytes
		this.version = 257; // 2 bytes (0x0101)
		this.reserved = 0; // 2 bytes
		this.checksum = 0; // 4 bytes
	}

	/**
	 * @param {Buffer} buffer
	 * @returns {NPSHeader}
	 * @throws {Error} If the buffer is too short
	 * @throws {Error} If the buffer is malformed
	 */
	deserialize(buffer: Buffer): NPSHeader {
		if (buffer.length < this._size) {
			throw Error(`Buffer length ${buffer.length} is too short to deserialize`);
		}

		try {
			this.id = buffer.readInt16BE(0);
			this.length = buffer.readInt16BE(2);
		} catch (error) {
			throw Error(`Error deserializing buffer: ${String(error)}`);
		}
		return this;
	}

	serialize() {
		const buffer = Buffer.alloc(this._size);
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

	static override get Size() {
		return 12;
	}

	override toString() {
		return `NPSHeader: ${JSON.stringify({
			id: this.id,
			length: this.length,
			version: this.version,
			reserved: this.reserved,
			checksum: this.checksum,
		})}`;
	}
}
