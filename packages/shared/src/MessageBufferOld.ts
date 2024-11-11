import { MessageHeader } from "./MessageHeader.js";
import { SerializedBufferOld } from "./SerializedBufferOld.js";

export class MessageBufferOld extends SerializedBufferOld {
	_header: MessageHeader;
	_buffer: Buffer;
	constructor() {
		super();
		this._header = new MessageHeader();
		this._buffer = Buffer.alloc(4);
	}

	/**
	 * @param {number} id - The ID of the message
	 * @param {Buffer} buffer - The buffer to deserialize
	 * @returns {MessageBufferOld}
	 */
	static createGameMessage(id: number, buffer: Buffer): MessageBufferOld {
		const message = new MessageBufferOld();
		message._header._messageId = id;
		message.buffer = buffer;
		return message;
	}

	get messageId() {
		return this._header.messageId;
	}

	get messageLength() {
		return this._header.messageLength;
	}

	override get data() {
		return this._buffer;
	}

	override set data(buffer) {
		this.buffer = buffer;
	}

	/**
	 * @param {Buffer} buffer
	 */
	set buffer(buffer: Buffer) {
		// const log = getServerLogger({ name: "MessageBuffer" });
		// log.level = getServerConfiguration({}).logLevel ?? "info";
		this._buffer = Buffer.alloc(buffer.length);
		this._buffer = buffer;
		this._header._messageLength = 4 + buffer.length;
		// log.debug(`Message length: ${this._header._messageLength}`);
		// log.debug(`Buffer length: ${this._buffer.length}`);
		// Pad the buffer to a multiple of 8 bytes
		// let extraBytes = 0;
		// const x = (this._buffer.length + 4) % 8;
		// extraBytes = 8 - x;
		// log.debug(`Extra bytes: ${extraBytes}`);
		// if (extraBytes !== 0) {
		//     this._buffer = Buffer.concat([
		//         this._buffer,
		//         Buffer.alloc(extraBytes),
		//     ]);
		//     log.debug(`Buffer length: ${this._buffer.length}`);
		this._header._messageLength = this._buffer.length + 4;
		// log.debug(`Message length: ${this._header._messageLength}`);
		// }
	}

	/** @param {Buffer} buffer */
	override setBuffer(buffer: Buffer) {
		this.buffer = buffer;

		return this._buffer;
	}

	get buffer() {
		return this._buffer;
	}

	serializeSizeOf() {
		return 4 + this._buffer.length;
	}

	/**
	 * @param {Buffer} buffer
	 * @returns {MessageBufferOld}
	 */
	override deserialize(buffer: Buffer): MessageBufferOld {
		this._header.deserialize(buffer.subarray(0, 8));
		if (buffer.length < 4 + this._header.messageLength) {
			throw Error(`Buffer length ${buffer.length} is too short to deserialize`);
		}
		this.buffer = buffer.subarray(4);
		return this;
	}

	override serialize() {
		const buffer = Buffer.alloc(4 + this._buffer.length);
		if (this.buffer.length < 0) {
			throw Error(
				`Buffer length ${this.buffer.length} is too short to serialize`,
			);
		}
		if (this.messageId <= 0) {
			throw Error(`Message ID ${this.messageId} is invalid to serialize`);
		}
		this._header.serialize().copy(buffer);
		this._buffer.copy(buffer, 4);
		return buffer;
	}

	override toString() {
		return `MessageBuffer: ${JSON.stringify({
			header: this._header.toString(),
			bufferLength: this._buffer.length,
			buffer: this._buffer.toString("hex"),
		})}`;
	}

	asJSON() {
		return {
			header: this._header,
			buffer: this._buffer.toString("hex"),
		};
	}
}
