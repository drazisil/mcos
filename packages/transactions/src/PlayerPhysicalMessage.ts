import { SerializedBufferOld } from "rusty-motors-shared";

export class PlayerPhysicalMessage extends SerializedBufferOld {
	_msgNo: number; // 2 bytes
	_playerId: number; // 4 bytes
	_bodytype: number; // 4 bytes
	_hairColor: number; // 4 bytes
	_skinColor: number; // 4 bytes
	_shirtColor: number; // 4 bytes
	_pantsColor: number; // 4 bytes
	constructor() {
		super();
		this._msgNo = 0; // 2 bytes
		this._playerId = 0; // 4 bytes
		this._bodytype = 0; // 4 bytes
		this._hairColor = 0; // 4 bytes
		this._skinColor = 0; // 4 bytes
		this._shirtColor = 0; // 4 bytes
		this._pantsColor = 0; // 4 bytes
		// total: 26 bytes
	}

	override size() {
		return 26;
	}

	override serialize() {
		const buffer = Buffer.alloc(this.size());
		let offset = 0;
		buffer.writeUInt16LE(this._msgNo, offset);
		offset += 2;
		buffer.writeUInt32LE(this._playerId, offset);
		offset += 4;
		buffer.writeUInt32LE(this._bodytype, offset);
		offset += 4;
		buffer.writeInt32LE(this._hairColor, offset);
		offset += 4;
		buffer.writeInt32LE(this._skinColor, offset);
		offset += 4;
		buffer.writeInt32LE(this._shirtColor, offset);
		offset += 4;
		buffer.writeInt32LE(this._pantsColor, offset);

		return buffer;
	}

	override toString() {
		return `PlayerPhysicalMessage: msgNo=${this._msgNo} playerId=${this._playerId} bodytype=${this._bodytype} hairColor=${this._hairColor} skinColor=${this._skinColor} shirtColor=${this._shirtColor} pantsColor=${this._pantsColor}`;
	}
}
