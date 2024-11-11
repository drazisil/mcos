import { BasePacket } from "./BasePacket.js";
import { ServerMessageHeader } from "./ServerMessageHeader.js";
import { ServerMessagePayload } from "./ServerMessagePayload.js";
import type { SerializableMessage } from "./types.js";

export class ServerPacket extends BasePacket implements SerializableMessage {
	protected override header: ServerMessageHeader = new ServerMessageHeader();
	data: ServerMessagePayload = new ServerMessagePayload();

	constructor() {
		super({});
	}

	/**
	 * Creates a copy of the given `ServerPacket` with the option to replace its data.
	 *
	 * @param originalPacket - The original `ServerPacket` to be copied.
	 * @param newData - An optional `Buffer` containing new data to be deserialized into the new packet.
	 *                  If not provided, the data from the original packet will be copied.
	 * @returns A new `ServerPacket` instance with the same message ID and header as the original,
	 *          and either the deserialized new data or a copy of the original data.
	 */
	static copy(originalPacket: ServerPacket, newData?: Buffer): ServerPacket {
		const newPacket = new ServerPacket();
		newPacket.header = ServerMessageHeader.copy(originalPacket.header);

		if (newData) {
			newPacket.data.deserialize(newData);
		} else {
			newPacket.data = ServerMessagePayload.copy(originalPacket.data);
		}

		return newPacket;
	}

	override getDataBuffer(): Buffer {
		return this.data.serialize();
	}
	override setDataBuffer(data: Buffer): ServerPacket {
		if (this.data.getByteSize() > 2) {
			throw new Error(
				`ServerPacket data buffer is already set, use copy() to create a new ServerPacket`,
			);
		}

		this.data.deserialize(data);
		return this;
	}

	/** The message length is the length of the message data, not including the id */
	override getByteSize(): number {
		return this.header.getByteSize() + this.data.getByteSize();
	}

	setSequence(sequence: number): ServerPacket {
		this.header.setSequence(sequence);
		return this;
	}

	setLength(length: number): ServerPacket {
		this.header.setLength(length);
		return this;
	}

	setSignature(signature: string): ServerPacket {
		this.header.setSignature(signature);
		return this;
	}

	setPayloadEncryption(encrypted: boolean): ServerPacket {
		this.header.setPayloadEncryption(encrypted);
		return this;
	}

	getMessageId(): number {
		return this.data.getMessageId();
	}

	setMessageId(messageId: number): ServerPacket {
		this.data.setMessageId(messageId);
		return this;
	}

	getLength(): number {
		return this.header.getLength();
	}

	getSequence(): number {
		return this.header.getSequence();
	}

	isPayloadEncrypted(): boolean {
		return this.header.isPayloadEncrypted();
	}

	isValidSignature(): boolean {
		return this.header.isValidSignature();
	}

	override serialize(): Buffer {
		try {
			this.ensureNonZeroSequence();

			this.ensureValidSignature();

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

	private ensureValidSignature() {
		if (!this.header.isValidSignature()) {
			throw new Error(
				"ServerMessage signature is invalid, it must be set to 'TOMC' before serializing",
			);
		}
	}

	private ensureNonZeroSequence() {
		if (this.header.getSequence() === 0) {
			throw new Error(
				`ServerPacket sequence is 0, it must be set to a non-zero value before serializing`,
			);
		}
	}

	override deserialize(data: Buffer): ThisType<ServerPacket> {
		this._assertEnoughData(data, this.header.getByteSize());

		this.header.deserialize(data);
		this.data.deserialize(data.subarray(this.header.getDataOffset()));

		return this;
	}

	override toString(): string {
		return `ServerPacket {length: ${this.getLength()}, sequence: ${this.getSequence()}, messageId: ${this.getMessageId()}}`;
	}
}
