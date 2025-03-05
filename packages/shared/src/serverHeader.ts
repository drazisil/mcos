import { SerializableMixin, AbstractSerializable } from "./messageFactory.js";

/**
 * A server header is an 11 byte header with the following fields:
 * - 2 bytes - length
 * - 4 bytes - mcoSig
 * - 4 bytes - sequence
 * - 1 byte - flags
 */

export class serverHeader extends SerializableMixin(AbstractSerializable) {
	_size: number;
	length: any;
	mcoSig: string;
	sequence: number;
	flags: number;
	constructor() {
		super();
		this._size = 11;
		this.length = this._size; // 2 bytes
		this.mcoSig = "TOMC"; // 4 bytes
		this.sequence = 0; // 4 bytes
		this.flags = 0; // 1 byte
	}

	size() {
		return this._size;
	}

	/**
	 * @param {Buffer} buffer
	 * @returns {serverHeader}
	 * @throws {Error} If the buffer is too short
	 * @throws {Error} If the buffer is malformed
	 */
	deserialize(buffer: Buffer): serverHeader {
		if (buffer.length < this._size) {
			throw new Error(
				`Buffer length ${buffer.length} is too short to deserialize`,
			);
		}

		try {
			this.length = buffer.readInt16LE(0);
			this.mcoSig = buffer.toString("utf8", 2, 6);
			this.sequence = buffer.readInt32LE(6);
			this.flags = buffer.readInt8(10);
		} catch (error) {
			const err = Error("Error deserializing buffer");
			err.cause = error;
			throw err;
		}
		return this;
	}

	serialize() {
		const buffer = Buffer.alloc(this._size);
		buffer.writeInt16LE(this.length, 0);
		buffer.write(this.mcoSig, 2, 6, "utf8");
		buffer.writeInt32LE(this.sequence, 6);
		buffer.writeInt8(this.flags, 10);
		return buffer;
	}

	override toString() {
		return `ServerHeader: length=${this.length}, mcoSig=${this.mcoSig}, sequence=${this.sequence}, flags=${this.flags}`;
	}
}
