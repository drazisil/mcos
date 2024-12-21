import type { ISerializable } from "rusty-motors-nps";
import { putLenString } from "rusty-motors-nps";
import {
	getAsHex,
	getLenBlob,
	getLenString,
	getShortBool,
} from "rusty-motors-nps";

export class GameProfile implements ISerializable {
	customerId: number; // 4 bytes
	profileName: string; // 32 bytes - max length
	serverId: number; // 4 bytes
	createStamp: number; // 4 bytes
	lastLoginStamp: number; // 4 bytes
	numberGames: number; // 4 bytes
	profileId: number; // 4 bytes
	isOnline: boolean; // 2 bytes
	gamePurchaseStamp: number; // 4 bytes
	gameSerialNumber: string; // 32 bytes - max length
	timeOnline: number; // 4 bytes
	timeInGame: number; // 4 bytes
	gameBlob: Buffer; // 512 bytes - max length
	personalBlob: Buffer; // 256 bytes - max length
	pictureBlob: Buffer; // 1 byte
	dnd: boolean; // 2 bytes
	gameStartStamp: number; // 4 bytes
	currentKey: string; // 400 bytes - max length
	profileLevel: number; // 2 bytes
	shardId: number; // 4 bytes

	constructor() {
		this.customerId = 0;
		this.profileName = "";
		this.serverId = 0;
		this.createStamp = 0;
		this.lastLoginStamp = 0;
		this.numberGames = 0;
		this.profileId = 0;
		this.isOnline = false;
		this.gamePurchaseStamp = 0;
		this.gameSerialNumber = "";
		this.timeOnline = 0;
		this.timeInGame = 0;
		this.gameBlob = Buffer.alloc(0);
		this.personalBlob = Buffer.alloc(0);
		this.pictureBlob = Buffer.alloc(0);
		this.dnd = false;
		this.gameStartStamp = 0;
		this.currentKey = "";
		this.profileLevel = 0;
		this.shardId = 0;
	}
	serialize(): Buffer {
		return this.toBytes();
	}
	deserialize(data: Buffer): GameProfile {
		return GameProfile.fromBytes(data);
	}
	getByteSize(): number {
		throw new Error("Method not implemented.");
	}

	static new(): GameProfile {
		return new GameProfile();
	}

	static fromBytes(data: Buffer): GameProfile {
		const message = new GameProfile();
		let offset = 0;
		message.customerId = data.readUInt32BE(offset);
		offset += 4;
		message.profileName = getLenString(data, offset, false);
		offset += message.profileName.length + 2;
		message.serverId = data.readUInt32BE(offset);
		offset += 4;
		message.createStamp = data.readUInt32BE(offset);
		offset += 4;
		message.lastLoginStamp = data.readUInt32BE(offset);
		offset += 4;
		message.numberGames = data.readUInt32BE(offset);
		offset += 4;
		message.profileId = data.readUInt32BE(offset);
		offset += 4;
		message.isOnline = getShortBool(data, offset);
		offset += 2;
		message.gamePurchaseStamp = data.readUInt32BE(offset);
		offset += 4;
		message.gameSerialNumber = getLenString(data, offset, false);
		offset += message.gameSerialNumber.length + 2;
		message.timeOnline = data.readUInt32BE(offset);
		offset += 4;
		message.timeInGame = data.readUInt32BE(offset);
		offset += 4;
		message.gameBlob = getLenBlob(data, offset, false);
		offset += message.gameBlob.length + 2;
		message.personalBlob = getLenBlob(data, offset, false);
		offset += message.personalBlob.length + 2;
		message.pictureBlob = data.subarray(offset, offset + 1);
		offset += message.pictureBlob.length;
		message.dnd = getShortBool(data, offset);
		offset += 2;
		message.gameStartStamp = data.readUInt32BE(offset);
		offset += 4;
		message.currentKey = getLenString(data, offset, false);
		offset += message.currentKey.length + 2;
		message.profileLevel = data.readUInt16BE(offset);
		offset += 2;
		message.shardId = data.readUInt32BE(offset);

		return message;
	}

	toBytes(): Buffer {
		const buffer = Buffer.alloc(this.getSize());
		let offset = 0;
		buffer.writeUInt32BE(this.customerId, offset);
		offset += 4; // offset  is now 4
		buffer.writeUInt16BE(3341, offset);
		offset += 2; // offset is now 6
		buffer.writeUInt32BE(this.profileId, offset);
		offset += 4; // offset is now 10
		buffer.writeUInt32BE(this.shardId, offset);
		offset += 4; // offset is now 14
		offset += 2; // offset is now 16
		putLenString(buffer, offset, this.profileName, false);

		// buffer.writeUInt32BE(this.serverId, offset);
		// offset += this.profileName.length + 2;
		// buffer.writeUInt32BE(this.createStamp, offset);
		// offset += 4;
		// buffer.writeUInt32BE(this.lastLoginStamp, offset);
		// offset += 4;
		// buffer.writeUInt32BE(this.numberGames, offset);
		// offset += 4;
		// putShortBool(buffer, offset, this.isOnline);
		// offset += 2;
		// buffer.writeUInt32BE(this.gamePurchaseStamp, offset);
		// offset += 4;
		// putLenString(buffer, offset, this.gameSerialNumber, false);
		// offset += this.gameSerialNumber.length + 2;
		// buffer.writeUInt32BE(this.timeOnline, offset);
		// offset += 4;
		// buffer.writeUInt32BE(this.timeInGame, offset);
		// offset += 4;
		// putLenBlob(buffer, offset, this.gameBlob, false);
		// offset += this.gameBlob.length + 2;
		// putLenBlob(buffer, offset, this.personalBlob, false);
		// offset += this.personalBlob.length + 2;
		// this.pictureBlob.copy(buffer, offset, 0, 1);
		// offset += 1;
		// putShortBool(buffer, offset, this.dnd);
		// offset += 2;
		// buffer.writeUInt32BE(this.gameStartStamp, offset);
		// offset += 4;
		// putLenString(buffer, offset, this.currentKey, false);
		// offset += this.currentKey.length + 2;
		// buffer.writeUInt16BE(this.profileLevel, offset);
		// offset += 2;
		return buffer;
	}
	toString(): string {
		return `GameProfile:
        customerID: ${this.customerId}
        profileName: ${this.profileName}
        serverId: ${this.serverId}
        createStamp: ${this.createStamp}
        lastLoginStamp: ${this.lastLoginStamp}
        numberGames: ${this.numberGames}
        profileId: ${this.profileId}
        isOnline: ${this.isOnline}
        gamePurchaseStamp: ${this.gamePurchaseStamp}
        gameSerialNumber: ${this.gameSerialNumber}
        timeOnline: ${this.timeOnline}
        timeInGame: ${this.timeInGame}
        gameBlob: ${getAsHex(this.gameBlob)}
        personalBlob: ${getAsHex(this.personalBlob)}
        pictureBlob: ${getAsHex(this.pictureBlob)}
        dnd: ${this.dnd}
        gameStartStamp: ${this.gameStartStamp}
        currentKey: ${this.currentKey}
        profileLevel: ${this.profileLevel}
        shardId: ${this.shardId}
        `;
	}
	toHex(): string {
		return getAsHex(this.toBytes());
	}

	getSize(): number {
		return 52;
	}
}
