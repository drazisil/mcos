import { SerializedBufferOld } from "rusty-motors-shared";

export class PartsAssemblyMessage extends SerializedBufferOld {
	_msgNo: number;
	_ownerId: number;
	_numberOfParts: number;
	_partList: Part[];
	constructor(owerId: number) {
		super();
		this._msgNo = 0; // 2 bytes
		this._ownerId = owerId; // 4 bytes
		this._numberOfParts = 0; // 1 bytes
		/** @type {Part[]} */
		this._partList = []; // 34 bytes each
	}

	override size() {
		return 7 + this._partList.length * 34;
	}

	override serialize() {
		const buffer = Buffer.alloc(this.size());
		let offset = 0; // offset is 0
		buffer.writeUInt16LE(this._msgNo, offset);
		offset += 2; // offset is 2
		buffer.writeUInt32LE(this._ownerId, offset);
		offset += 4; // offset is 6
		buffer.writeInt8(this._numberOfParts, offset);
		offset += 1; // offset is 7
		for (const part of this._partList) {
			const partBuffer = part.serialize();
			partBuffer.copy(buffer, offset);
			offset += partBuffer.length;
		}

		return buffer;
	}
}

export class Part extends SerializedBufferOld {
	_partId: number; // 4 bytes
	_parentPartId: number; // 4 bytes
	_brandedPartId: number; // 4 bytes
	_repairPrice: number; // 4 bytes
	_junkPrice: number; // 4 bytes
	_wear: number; // 4 bytes
	_attachmentPoint: number; // 1 byte
	_damage: number; // 1 byte
	_retailPrice: number; // 4 bytes
	_maxWear: number; // 4 bytes

	constructor() {
		super();
		this._partId = 0; // 4 bytes
		this._parentPartId = 0; // 4 bytes
		this._brandedPartId = 0; // 4 bytes
		this._repairPrice = 0; // 4 bytes
		this._junkPrice = 0; // 4 bytes
		this._wear = 0; // 4 bytes
		this._attachmentPoint = 0; // 1 byte
		this._damage = 0; // 1 byte
		this._retailPrice = 0; // 4 bytes
		this._maxWear = 0; // 4 bytes
		// 33 bytes total
	}

	override size() {
		return 34;
	}

	override serialize() {
		const buffer = Buffer.alloc(this.size());
		let offset = 0;
		buffer.writeUInt32LE(this._partId, offset);
		offset += 4; // offset is 4
		buffer.writeUInt32LE(this._parentPartId, offset);
		offset += 4; // offset is 8
		buffer.writeUInt32LE(this._brandedPartId, offset);
		offset += 4; // offset is 12
		buffer.writeUInt32LE(this._repairPrice, offset);
		offset += 4; // offset is 16
		buffer.writeUInt32LE(this._junkPrice, offset);
		offset += 4; // offset is 20
		buffer.writeUInt32LE(this._wear, offset);
		offset += 4; // offset is 24
		buffer.writeUInt8(this._attachmentPoint, offset);
		offset += 1; // offset is 25
		buffer.writeUInt8(this._damage, offset);
		offset += 1; // offset is 26
		buffer.writeUInt32LE(this._retailPrice, offset);
		offset += 4; // offset is 30
		buffer.writeUInt32LE(this._maxWear, offset);
		// offset += 4; // offset is 34

		return buffer;
	}

	override toString() {
		return `Part: partId=${this._partId} parentPartId=${this._parentPartId} brandedPartId=${this._brandedPartId} repairPrice=${this._repairPrice} junkPrice=${this._junkPrice} wear=${this._wear} attachmentPoint=${this._attachmentPoint} damage=${this._damage} retailPrice=${this._retailPrice} maxWear=${this._maxWear}`;
	}
}
