import { bufferToHexString } from "./toHexString.js";

export class ChatMessage {
	messageId = 0;
	messageLength = 0;
	payload: Buffer = Buffer.alloc(0);

	deserialize(buffer: Buffer): ChatMessage {
		const messageId = buffer.readUInt16BE(0);
		const messageLength = buffer.readUInt16BE(2);
		const payload = buffer.subarray(4);

		this.messageId = messageId;
		this.messageLength = messageLength;
		this.payload = payload;
		return this;
	}

	toBuffer(): Buffer {
		const buffer = Buffer.alloc(this.messageLength);

		buffer.writeUInt16BE(this.messageId, 0);
		buffer.writeUInt16BE(this.messageLength, 2);
		this.payload.copy(buffer, 4);

		return buffer;
	}

	toString(): string {
		return `ChatMessage(${this.messageId}, ${this.messageLength}, ${bufferToHexString(this.payload)})`;
	}
}
