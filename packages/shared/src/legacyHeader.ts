import { SerializableMixin, AbstractSerializable } from "./messageFactory.js";

/**
 * A legacy header is a 4 byte header with the following fields:
 * - 2 bytes - id
 * - 2 bytes - length
 *
 *
 */

export class legacyHeader extends SerializableMixin(AbstractSerializable) {
	_size: number;
	id: number;
	length: number;
	constructor() {
		super();
		this._size = 4;
		this.id = 0; // 2 bytes
		this.length = this._size; // 2 bytes
	}



	deserialize(buffer: Buffer) {
		if (buffer.length < 4) {
			throw Error(`Buffer length ${buffer.length} is too short to deserialize`);
		}
	
		try {
			this.id = buffer.readInt16BE(0);
			this.length = buffer.readInt16BE(2);
		} catch (error) {
			const err = Error("Error deserializing buffer");
			err.cause = error;
			throw err;
		}
		return this;
	}

	serialize() {
		const buffer = Buffer.alloc(this._size);
		buffer.writeInt16BE(this.id, 0);
		buffer.writeInt16BE(this.length, 2);
		return buffer;
	}

	override toString() {
		return `LegacyHeader: ${JSON.stringify({
			id: this.id,
			length: this.length,
		})}`;
	}

	static override get Size() {
		return 4;
	}
}
