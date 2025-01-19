import { Bytable } from "./Bytable";

export class BytableHeader extends Bytable {
	protected messageId_: number = 0;
	protected messageLength_: number = 0;
	protected messageVersion_: 0 | 1 = 0;
	protected reserved_: number = 0;
	protected checksum_: number = 0;
	protected data_: Buffer = Buffer.alloc(0);

	static override fromBuffer(buffer: Buffer, offset: number) {
		const header = new this();
		header.deserialize(buffer.subarray(offset));

		return header;
	}

	override get json() {
		return {
			name: this.name,
			id: this.messageId,
			len: this.messageLength,
			version: this.messageVersion,
			serializeSize: this.serializeSize,
		};
	}

	override toString(): string {
		return `Message ID: ${this.messageId}, Message Length: ${this.messageLength}, Message Version: ${this.messageVersion}`;
	}

	setMessageId(messageId: number) {
		this.messageId_ = messageId;
	}

	setMessageLength(messageLength: number) {
		this.messageLength_ = messageLength;
	}

	setMessageVersion(messageVersion: 0 | 1) {
		this.messageVersion_ = messageVersion;
	}

	setReserved(reserved: number) {
		this.reserved_ = reserved;
	}

	setChecksum(checksum: number) {
		this.checksum_ = checksum;
	}

	get messageId() {
		return this.messageId_;
	}

	get messageLength() {
		return this.messageLength_;
	}

	get messageVersion() {
		return this.messageVersion_;
	}

	get reserved() {
		return this.reserved_;
	}

	get checksum() {
		return this.checksum_;
	}

	override get serializeSize() {
		return this.messageVersion === 0 ? 4 : 12;
	}

	override serialize() {
		const buffer = Buffer.alloc(this.serializeSize);
		buffer.writeUInt16BE(this.messageId, 0);
		buffer.writeUInt16BE(this.messageLength, 2);
		if (this.messageVersion !== 0) {
			buffer.writeUInt16BE(257, 4);
			buffer.writeUInt16BE(this.reserved, 6);
			buffer.writeUInt32BE(this.checksum, 8);
		}
		return buffer;
	}

	override deserialize(buffer: Buffer) {
		super.deserialize(buffer);
		this.setMessageId(this.getUint16(0));
		this.setMessageLength(this.getUint16(2));
		// Skipping the version bytes

		if (buffer.byteLength >= 12 && this.getUint16(4) === 257) {
			this.setMessageVersion(1);
		} else {
			this.setMessageVersion(0);
		}

		if (this.messageVersion === 1) {
			this.setReserved(this.getUint16(6));
			this.setChecksum(this.getUint32(8));
		}
	}
}
