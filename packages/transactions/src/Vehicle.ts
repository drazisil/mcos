import { SerializedBufferOld } from "rusty-motors-shared";

export class Part extends SerializedBufferOld {
	_partId: number; // 4 bytes
	_parentPartId: number; // 4 bytes
	_brandedPartId: number; // 4 bytes
	_repairPrice: number; // 4 bytes
	_junkPrice: number; // 4 bytes
	_wear: number; // 4 bytes
	_attachmentPoint: number; // 1 byte
	_damage: number; // 1 byte

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
	}

	override size() {
		return 26;
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

		return buffer;
	}

	override toString() {
		return `Part: partId=${this._partId} parentPartId=${this._parentPartId} brandedPartId=${this._brandedPartId} repairPrice=${this._repairPrice} junkPrice=${this._junkPrice} wear=${this._wear} attachmentPoint=${this._attachmentPoint} damage=${this._damage}`;
	}
}


export class Vehicle extends SerializedBufferOld {
	_vehicleId: number; // 4 bytes
    _skinId: number; // 4 bytes
    _flags: number; // 4 bytes
    _delta: number; // 4 bytes
    _carClass: number; // 1 byte
    _damageLength: number; // 2 bytes
    _damage: Buffer; // 2000 bytes (max)

	constructor() {
		super();
        this._vehicleId = 0; // 4 bytes
        this._skinId = 0; // 4 bytes
        this._flags = 0; // 4 bytes
        this._delta = 0; // 4 bytes
        this._carClass = 0; // 1 byte
        this._damageLength = 0; // 2 bytes
        this._damage = Buffer.alloc(2000); // 2000 bytes (max)
	}

	override size() {
		return 4 + 4 + 4 + 4 + 1 + 2 + (this._damageLength * 1);
	}

	override serialize() {
		const buffer = Buffer.alloc(this.size());
		let offset = 0;
		buffer.writeUInt32LE(this._vehicleId, offset);
		offset += 4; // offset is 4
        buffer.writeUInt32LE(this._skinId, offset);
        offset += 4; // offset is 8
        buffer.writeUInt32LE(this._flags, offset);
        offset += 4; // offset is 12
        buffer.writeUInt32LE(this._delta, offset);
        offset += 4; // offset is 16
        buffer.writeUInt8(this._carClass, offset);
        offset += 1; // offset is 17
        buffer.writeUInt16LE(this._damageLength, offset);
        offset += 2; // offset is 19
        this._damage.copy(buffer, offset);
        offset += this._damageLength; // offset is 19 + this._damageLength

		return buffer;
	}

	override toString() {
		return `Vehicle: vehicleId=${this._vehicleId} skinId=${this._skinId} flags=${this._flags} delta=${this._delta} carClass=${this._carClass} damageLength=${this._damageLength}`;
	}
}
