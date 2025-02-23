import { Bytable } from "./Bytable.js";

export class BytableHeader extends Bytable {
	protected messageId_: number = 0;
	protected messageLength_: number = 0;
	protected messageVersion_: 0 | 1 = 0;
	protected reserved_: number = 0;
	protected checksum_: number = 0;
	protected data_: Buffer = Buffer.alloc(0);

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
		this.setMessageId(buffer.readUInt16BE(0));
		this.setMessageLength(buffer.readUInt16BE(2));

		// If the length is less than 12, there is no room for the message, so we assume version 0
		if (buffer.byteLength >= 12 && buffer.readUInt16BE(4) === 257) {
			this.setMessageVersion(1);
		} else {
			this.setMessageVersion(0);
		}

		if (this.messageVersion === 1) {
			this.setReserved(buffer.readUInt16BE(6));
			this.setChecksum(buffer.readUInt32BE(8));
		}
	}
}
