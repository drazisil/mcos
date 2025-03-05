import { SerializableMixin, AbstractSerializable } from "./messageFactory.js";
import { legacyHeader } from "./legacyHeader.js";

/**
 * A legacy message is an older nps message type. It has a 4 byte header. @see {@link legacyHeader}
 *
 * @mixin {SerializableMixin}
 */

export class LegacyMessage extends SerializableMixin(AbstractSerializable) {
	_header: legacyHeader;
	constructor() {
		super();
		this._header = new legacyHeader();
	}

	getMessageId() {
		return this._header.id;
	}

	setMessageId(id: number) {
		this._header.id = id;
	}

	/**
	 * Deserializes the given buffer and updates the current instance with the deserialized data.
	 *
	 * @param buffer - The buffer containing the serialized data.
	 * @returns The current instance with the deserialized data.
	 */
	deserialize(buffer: Buffer) {
		this._header.deserialize(buffer);
		this.setBuffer(buffer.subarray(this._header._size));
		return this;
	}

	serialize() {
		const buffer = Buffer.alloc(this._header.length);
		this._header.serialize().copy(buffer);
		super.data.copy(buffer, this._header._size);
		return buffer;
	}

	/**
	 * @param {Buffer} buffer
	 */
	override setBuffer(buffer: Buffer) {
		super.setBuffer(buffer);
		this._header.length = buffer.length + 4;
	}

	asJSON() {
		return {
			header: this._header,
			data: super.data.toString("hex"),
		};
	}

	override toString() {
		return `LegacyMessage: ${JSON.stringify({
			header: this._header.toString(),
			data: super.data.toString("hex"),
		})}`;
	}

	toHexString() {
		return this.serialize().toString("hex");
	}
}
