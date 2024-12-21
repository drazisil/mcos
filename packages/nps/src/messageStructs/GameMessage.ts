import type { IMessage, IMessageHeader, ISerializable } from "rusty-motors-nps";

export class MessageHeader implements IMessageHeader {
	private version: 0 | 257;
	private id: number;
	private length: number;

	constructor(version: 0 | 257, id: number, length: number) {
		if (version !== 0 && version !== 257) {
			throw new Error(`Invalid version ${parseInt(version)}`);
		}
		this.version = version;
		this.id = id;
		this.length = length !== 0 ? length : this.getByteSize();
	}
	getDataOffset(): number {
		return this.getVersion() === 0 ? 4 : 12;
	}
	getByteSize(): number {
		return this.getVersion() === 0 ? 4 : 12;
	}

	getVersion(): number {
		return this.version;
	}
	getId(): number {
		return this.id;
	}
	getLength(): number {
		return this.length;
	}
	setVersion(version: 0 | 257): void {
		if (version !== 0 && version !== 257) {
			throw new Error(`Invalid version ${parseInt(version)}`);
		}
		this.version = version;
	}
	setId(id: number): void {
		this.id = id;
	}
	setLength(length: number): void {
		this.length = length;
	}

	private serializeV0(): Buffer {
		const buffer = Buffer.alloc(this.getByteSize());
		buffer.writeUInt16BE(this.id, 0);
		buffer.writeUInt16BE(this.length, 2);

		return buffer;
	}

	private serializeV1(): Buffer {
		const buffer = Buffer.alloc(this.getByteSize());
		buffer.writeUInt16BE(this.id, 0);
		buffer.writeUInt16BE(this.length, 2);
		buffer.writeUInt16BE(this.version, 4);
		buffer.writeUInt16BE(0, 6);
		buffer.writeUInt32BE(this.length, 8);

		return buffer;
	}

	serialize(): Buffer {
		return this.version === 0 ? this.serializeV0() : this.serializeV1();
	}

	private deserializeV0(data: Buffer): void {
		this.id = data.readUInt16BE(0);
		this.length = data.readUInt16BE(2);
	}

	private deserializeV1(data: Buffer): void {
		this.id = data.readUInt16BE(0);
		this.length = data.readUInt16BE(2);
		// Skip version
		// Skip padding
		this.length = data.readUInt32BE(8);
	}

	deserialize(data: Buffer): void {
		if (data.length < 4) {
			throw new Error(
				`Data is too short. Expected at least 4 bytes, got ${data.length} bytes`,
			);
		}

		if (this.version === 0) {
			this.deserializeV0(data);
		} else {
			this.deserializeV1(data);
		}
	}
}

export class SerializableData implements ISerializable {
	private data: Buffer;
	constructor(requestedSize: number) {
		this.data = Buffer.alloc(requestedSize);
	}

	serialize(): Buffer {
		return this.data;
	}

	deserialize(data: Buffer): void {
		if (data.length > this.data.length) {
			throw new Error(
				`Data is too long. Expected at most ${this.data.length} bytes, got ${data.length} bytes`,
			);
		}
		this.data = data;
	}

	getByteSize(): number {
		return this.data.length;
	}

	toString(): string {
		return `EmptyData(length=${this.data.length}, data=${this.data.toString(
			"hex",
		)})`;
	}
}

export class GameMessage implements IMessage {
	header: MessageHeader;
	data: ISerializable;

	constructor(version: 0 | 257) {
		this.header = new MessageHeader(version, 0, 0);
		this.data = new SerializableData(0);
	}

	getId() {
		return this.header.getId();
	}

	getDataAsBuffer(): Buffer {
		return this.data.serialize();
	}

	/** The message length is the length of the message data, not including the id */
	getByteSize(): number {
		return this.header.getLength();
	}
	getData(): ISerializable {
		return this.data;
	}
	setData(data: ISerializable): void {
		this.data = data;
		this.header.setLength(data.getByteSize() + this.header.getByteSize());
	}
	serialize(): Buffer {
		const buffer = Buffer.alloc(this.getByteSize());
		const headerData = this.header.serialize();
		headerData.copy(buffer, 0);
		const messageData = this.data.serialize();
		messageData.copy(buffer, this.header.getDataOffset());
		return buffer;
	}
	deserialize(data: Buffer): GameMessage {
		if (data.length < this.header.getDataOffset()) {
			throw new Error(
				`Data is too short. Expected at least ${this.header.getDataOffset()} bytes, got ${
					data.length
				} bytes`,
			);
		}
		this.header.deserialize(data);
		const messageData = data.subarray(this.header.getDataOffset());

		// Update the message data to the required size
		this.data = new SerializableData(this.header.getLength());

		this.data.deserialize(messageData.subarray(0, this.header.getLength()));
		return this;
	}

	toString(): string {
		return `Id: ${this.header.getId()}
        Length: ${this.header.getLength()}
        Data: ${this.data.toString()}`;
	}

	static identifyVersion(data: Buffer): 0 | 257 {
		if (data.length < 6) {
			return 0;
		}

		const version = data.readUInt16BE(4);
		if (version !== 257) {
			return 0;
		}

		return 257;
	}

	static fromGameMessage(version: 0 | 257, source: GameMessage): GameMessage {
		const message = new GameMessage(version);
		message.deserialize(source.serialize());
		return message;
	}
}
