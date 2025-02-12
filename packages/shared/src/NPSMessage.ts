import { SerializableMixin, AbstractSerializable } from "./messageFactory.js";
import { NPSHeader } from "./NPSHeader.js";

/**
 * A NPS message is a message that matches version 1.1 of the nps protocol. It has a 12 byte header. @see {@link NPSHeader}
 *
 * @mixin {SerializableMixin}
 */

export class NPSMessage extends SerializableMixin(AbstractSerializable) {
	_header: NPSHeader;
	constructor() {
		super();
		this._header = new NPSHeader();
	}

	deserialize(buffer: Buffer) {
		this._header.deserialize(buffer);
		this.setBuffer(buffer.subarray(this._header._size));
		return this;
	}

	serialize() {
		const buffer = Buffer.alloc(this._header.length);
		this._header.serialize().copy(buffer);
		this.data.copy(buffer, this._header._size);
		return buffer;
	}

	size() {
		return this._header.length + this.data.length;
	}

	override toString() {
		return `NPSMessage: ${JSON.stringify({
			header: this._header.toString(),
			data: this.data.toString("hex"),
		})}`;
	}
}
