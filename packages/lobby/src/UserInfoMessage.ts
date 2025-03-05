import { deserializeString } from "rusty-motors-shared";
import { LegacyMessage } from "rusty-motors-shared";
import { serializeString } from "rusty-motors-shared";
// eslint-disable-next-line no-unused-vars
import { LoginInfoMessage } from "./LoginInfoMessage.js";
import { Bytable, BytableContainer, BytableStructure } from "@rustymotors/binary";
import { CarDecal } from "./CarDecal.js";

export class CarId extends Bytable {
	// 00000000000000000000000005000000a5ceffff0d45acffffffffff00d8ffff0000000000000000
	private carId_: Buffer = Buffer.alloc(4);
	private brandedPartId_: Buffer = Buffer.alloc(4);
	private skinId_: Buffer = Buffer.alloc(4);
	private driverModelType_: Buffer = Buffer.alloc(1);
	private driverSkinColor_: Buffer = Buffer.alloc(4);
	private driverHairColor_: Buffer = Buffer.alloc(4);
	private driverShirtColor_: Buffer = Buffer.alloc(4);
	private driverPantsColor_: Buffer = Buffer.alloc(4);
	private flags_: Buffer = Buffer.alloc(1);
	private skinFlags_: Buffer = Buffer.alloc(1);
	private decal_ = new CarDecal();

	override get serializeSize(): number {
		return 40;
	}

	override serialize(): Buffer {
		const buffer = Buffer.alloc(this.serializeSize);
		let offset = 0;
		this.carId_.copy(buffer, offset);
		offset += 4;
		this.brandedPartId_.copy(buffer, offset);
		offset += 4;
		this.skinId_.copy(buffer, offset);
		offset += 4;
		this.driverModelType_.copy(buffer, offset);
		offset += 1;
		this.driverSkinColor_.copy(buffer, offset);
		offset += 4;
		this.driverHairColor_.copy(buffer, offset);
		offset += 4;
		this.driverShirtColor_.copy(buffer, offset);
		offset += 4;
		this.driverPantsColor_.copy(buffer, offset);
		offset += 4;
		this.flags_.copy(buffer, offset);
		offset += 1;
		this.skinFlags_.copy(buffer, offset);
		offset += 1;
		this.decal_.serialize().copy(buffer, offset);
		return buffer;
	}

	override deserialize(buffer: Buffer): void {
		let offset = 0;
		this.carId_ = buffer.subarray(offset, offset + 4);
		offset += 4;
		this.brandedPartId_ = buffer.subarray(offset, offset + 4);
		offset += 4;
		this.skinId_ = buffer.subarray(offset, offset + 4);
		offset += 4;
		this.driverModelType_ = buffer.subarray(offset, offset + 1);
		offset += 1;
		this.driverSkinColor_ = buffer.subarray(offset, offset + 4);
		offset += 4;
		this.driverHairColor_ = buffer.subarray(offset, offset + 4);
		offset += 4;
		this.driverShirtColor_ = buffer.subarray(offset, offset + 4);
		offset += 4;
		this.driverPantsColor_ = buffer.subarray(offset, offset + 4);
		offset += 4;
		this.flags_ = buffer.subarray(offset, offset + 1);
		offset += 1;
		this.skinFlags_ = buffer.subarray(offset, offset + 1);
		offset += 1;
		this.decal_.deserialize(buffer.subarray(offset));
	}

	override toString(): string {
		return `Car ID: ${this.carId_.readUInt32LE(0)}, Branded Part ID: ${this.brandedPartId_.readUInt32LE(0)}, Skin ID: ${this.skinId_.readUInt32LE(0)}, Driver Model Type: ${this.driverModelType_.readUInt8(0)}, Driver Skin Color: ${this.driverSkinColor_.readUInt32LE(0)}, Driver Hair Color: ${this.driverHairColor_.readUInt32LE(0)}, Driver Shirt Color: ${this.driverShirtColor_.readUInt32LE(0)}, Driver Pants Color: ${this.driverPantsColor_.readUInt32LE(0)}, Flags: ${this.flags_.readUInt8(0)}, Skin Flags: ${this.skinFlags_.readUInt8(0)}, Decal: ${this.decal_.toString()}`;	
	}

	toJSON(): any {
		return {
			carId: this.carId_.readUInt32LE(0),
			brandedPartId: this.brandedPartId_.readUInt32LE(0),
			skinId: this.skinId_.readUInt32LE(0),
			driverModelType: this.driverModelType_.readUInt8(0),
			driverSkinColor: this.driverSkinColor_.readUInt32LE(0),
			driverHairColor: this.driverHairColor_.readUInt32LE(0),
			driverShirtColor: this.driverShirtColor_.readUInt32LE(0),
			driverPantsColor: this.driverPantsColor_.readUInt32LE(0),
			flags: this.flags_.readUInt8(0),
			skinFlags: this.skinFlags_.readUInt8(0),
			decal: this.decal_.toJSON(),
		};
	}
}

export class UserData extends BytableStructure {
	// 00000000000000000000000005000000a5ceffff0d45acffffffffff00d8ffff0000000000000000010000000000000008000000000000000001000000000000

	constructor() {
		super();
		this.setSerializeOrder([
			{ name: "carIds", field: "Structure" },
			{ name: "lobbyId", field: "Dword" },
			{ name: "clubId", field: "Dword" },
			{ name: "inLobby", field: "Boolean" },
			{ name: "inMovement", field: "Boolean" },
			{ name: "inRace", field: "Boolean" },
			{ name: "isDataValid", field: "Boolean" },
			{ name: "unused", field: "Boolean" },
			{ name: "performance", field: "Dword" },
			{ name: "points", field: "Dword" },
			{ name: "level", field: "Short" },
		]);
	}
}

export class MiniUserInfo extends BytableStructure {
	constructor() {
		super();
		this.setSerializeOrder([
			{ name: "userId", field: "Dword" },
			{ name: "userName", field: "String" },
		]);
	}
}


export class UserInfo {
	_userId: number;
	_userName: string;
	_userData: Buffer;
	constructor() {
		this._userId = 0; // 4 bytes
		this._userName = ""; // 2 bytes + string
		this._userData = Buffer.alloc(64); // 64 bytes
	}

	deserialize(buffer: Buffer) {
		let offset = 0;
		this._userId = buffer.readInt32BE(offset);
		offset += 4;
		this._userName = deserializeString(buffer.subarray(offset));
		offset += 4 + this._userName.length;
		buffer.copy(this._userData, 0, offset, offset + 64);
		return this;
	}

	serialize() {
		const buffer = Buffer.alloc(this.size());
		let offset = 0;
		buffer.writeInt32BE(this._userId, offset);
		offset += 4;
		offset = serializeString(this._userName, buffer, offset);

		this._userData.copy(buffer, offset);
		return buffer;
	}

	size() {
		let size = 4; // userId
		size += 4 + this._userName.length + 1;
		size += this._userData.length;
		return size;
	}
}

function align8(value: number) {
	return value + (8 - (value % 8));
}

export class UserInfoMessage extends LegacyMessage {
	_userId: number;
	_userName: string;
	_userData: Buffer;
	constructor() {
		super();
		this._userId = 0; // 4 bytes
		this._userName = ""; // 2 bytes + string
		this._userData = Buffer.alloc(64); // 64 bytes
	}

	/**
	 * @param {Buffer} buffer
	 * @returns {UserInfoMessage}
	 */
	override deserialize(buffer: Buffer): this {
		try {
			this._header.deserialize(buffer);
			let offset = this._header._size;
			this._userId = buffer.readInt32BE(offset);
			offset += 4;
			this._userName = deserializeString(buffer.subarray(offset));
			offset += 4 + this._userName.length + 1;
			buffer.copy(this._userData, 0, offset, offset + 64);

			return this;
		} catch (error) {
			const err = Error(
				`Error deserializing UserInfoMessage: ${String(error)}`,
			);
			err.cause = error;
			throw err;
		}
	}

	/**
	 * @returns {Buffer}
	 */
	override serialize(): Buffer {
		try {
			const leangth8 = align8(this._header.length);
			this._header.length = leangth8;
			const buffer = Buffer.alloc(leangth8);
			this._header.serialize().copy(buffer);
			let offset = this._header._size;
			buffer.writeInt32BE(this._userId, offset);
			offset += 4;

			const username = new BytableContainer();
			username.setValue(this._userName);

			username.serialize().copy(buffer, offset);
			offset += username.serializeSize;
			this._userData.copy(buffer, offset);

			return buffer;
		} catch (error) {
			const err = Error(`Error serializing UserInfoMessage: ${String(error)}`);
			err.cause = error;
			throw err;
		}
	}

	/**
	 * @param {LoginInfoMessage} loginInfoMessage
	 */
	fromLoginInfoMessage(loginInfoMessage: LoginInfoMessage) {
		this._userId = loginInfoMessage._userId;
		this._userName = loginInfoMessage._userName;
		this._userData = loginInfoMessage._userData;
		this._header.length = this.calculateLength();
		return this;
	}

	calculateLength() {		
		this._header.length = this._header._size + 4 + 2 + this._userName.length + 64;
		return this._header.length;
	}

	override toString() {
		return `UserInfoMessage: ${JSON.stringify({
			userId: this._userId,
			userName: this._userName,
			userData: this._userData.toString("hex"),
		})}`;
	}
}
