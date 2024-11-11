import { BufferSerializer } from "./BufferSerializer.js";
import type { SerializableInterface } from "./types.js";

export class ServerMessagePayload
	extends BufferSerializer
	implements SerializableInterface
{
	protected messageId: number = 0; // 2 bytes	
	private previousMessageId: number = 0; // Not serialized
	private isEncrypted: boolean = false; // Not serialized

	static copy(payload: ServerMessagePayload): ServerMessagePayload {
		const newPayload = new ServerMessagePayload();
		newPayload.deserialize(payload.serialize());
		return newPayload;
	}

	override getByteSize(): number {
		return 2 + this._data.length;
	}

	override serialize(): Buffer {
		const buffer = Buffer.alloc(this.getByteSize());
		buffer.writeUInt16LE(this.messageId, 0);
		this._data.copy(buffer, 2);

		return buffer;
	}

	override deserialize(data: Buffer): ServerMessagePayload {
		this._assertEnoughData(data, 2);

		this.messageId = data.readUInt16LE(0);
		this._data = data.subarray(2);

		return this;
	}

	getMessageId(): number {
		return this.messageId;
	}

	setMessageId(messageId: number): ServerMessagePayload {
		this.messageId = messageId;
		return this;
	}

	getPreviousMessageId(): number {
		return this.previousMessageId;
	}

	setPreviousMessageId(previousMessageId: number): ServerMessagePayload {
		this.previousMessageId = previousMessageId;
		return this;
	}

	isPayloadEncrypted(): boolean {
		return this.isEncrypted;
	}

	setEncrypted(encrypted: boolean): ServerMessagePayload {
		this.isEncrypted = encrypted;
		return this;
	}
}
