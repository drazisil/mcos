import { BasePacket } from "./BasePacket.js";
import { GameMessageHeader } from "./GameMessageHeader.js";
import { GameMessagePayload } from "./GameMessagePayload.js";
import type { SerializableMessage } from "./types.js";

export class GamePacket extends BasePacket implements SerializableMessage {
	protected override header: GameMessageHeader = new GameMessageHeader();
	data: GameMessagePayload = new GameMessagePayload();

	constructor() {
		super({});
	}

	/**
	 * Creates a copy of the given `GamePacket` with the option to replace its data.
	 *
	 * @param originalPacket - The original `GamePacket` to be copied.
	 * @param newData - An optional `Buffer` containing new data to be deserialized into the new packet.
	 *                  If not provided, the data from the original packet will be copied.
	 * @returns A new `GamePacket` instance with the same message ID and header as the original,
	 *          and either the deserialized new data or a copy of the original data.
	 */
	static copy(originalPacket: GamePacket, newData?: Buffer): GamePacket {
		const newPacket = new GamePacket();
		newPacket.deserialize(originalPacket.serialize());

		if (newData) {
			newPacket.data.deserialize(newData);
		} else {
			newPacket.data.deserialize(originalPacket.data.serialize());
		}

		return newPacket;
	}

	override getDataBuffer(): Buffer {
		return this.data.serialize();
	}

	getVersion(): number {
		return this.header.getVersion();
	}

	override setDataBuffer(data: Buffer): GamePacket {
		if (this.data.getByteSize() > 2) {
			throw new Error(
				`GamePacket data buffer is already set, use copy() to create a new ServerPacket`,
			);
		}

		this.data.deserialize(data);
		return this;
	}

	/** The message length is the length of the message data, not including the id */
	override getByteSize(): number {
		return this.header.getByteSize() + this.data.getByteSize();
	}

	setLength(length: number): GamePacket {
		this.header.setLength(length);
		return this;
	}

	setPayloadEncryption(encrypted: boolean): GamePacket {
		this.header.setPayloadEncryption(encrypted);
		return this;
	}

	getMessageId(): number {
		return this.header.getId();
	}

	getLength(): number {
		return this.header.getLength();
	}

	isPayloadEncrypted(): boolean {
		return this.header.isPayloadEncrypted();
	}

	override serialize(): Buffer {
		try {
			const buffer = Buffer.alloc(this.getByteSize());
			this.header.serialize().copy(buffer);
			this.data.serialize().copy(buffer, this.header.getByteSize());

			return buffer;
		} catch (error) {
			const err = new Error("Error serializing ServerMessage");
			err.cause = error;
			throw error;
		}
	}

	override deserialize(data: Buffer): GamePacket {
		this._assertEnoughData(data, 4);

		const version = this.identifyVersion(data);
		this.header.setVersion(version);

		this._assertEnoughData(data, this.header.getByteSize());

		this.header.deserialize(data);

		this._assertEnoughData(data, this.header.getLength());

		this.data.deserialize(data.subarray(this.header.getByteSize()));

		return this;
	}

	override toString(): string {
		return `GamePacket {length: ${this.getLength()}, messageId: ${this.getMessageId()}}`;
	}

	private identifyVersion(data: Buffer): 0 | 257 {
		if (data.length < 6) {
			return 0;
		}

		return data.readUInt16BE(4) === 0x101 ? 257 : 0;
	}
}
