import { SerializedBufferOld } from "./SerializedBufferOld.js";

export class MessageHeader extends SerializedBufferOld {
	_size: number;
	_messageId: number;
	_messageLength: number;
	constructor() {
		super();
		this._size = 4;
		this._messageId = 0; // 4 bytes
		this._messageLength = 0; // 4 bytes
	}

	get messageId() {
		return this._messageId;
	}

	get messageLength() {
		return this._messageLength;
	}

	serializeSizeOf() {
		return this._size;
	}

	override size() {
		return this._size;
	}

	get id() {
		return this._messageId;
	}

	get length() {
		return this._messageLength;
	}

	/**
	 * @param {Buffer} buffer
	 * @returns {MessageHeader}
	 */
	override deserialize(buffer: Buffer): this {
		this._messageId = buffer.readInt16BE(0);
		this._messageLength = buffer.readInt16BE(2);
		return this;
	}

	override serialize() {
		const buffer = Buffer.alloc(4);
		buffer.writeInt16BE(this._messageId, 0);
		buffer.writeInt16BE(this._messageLength, 2);
		return buffer;
	}

	override toString() {
		return `MessageHeader: ${JSON.stringify({
			messageId: this._messageId,
			messageLength: this._messageLength,
		})}`;
	}
}
