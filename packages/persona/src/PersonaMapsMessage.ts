import { NPSMessage } from "rusty-motors-shared";
import { NPSHeader } from "rusty-motors-shared";

/**
 *
 * This is type UserGameData
 */
export class PersonaRecord  {
	customerId: number; // 4
	personaName: string; // 33
	serverDataId: number; // 4
	createDate: number; // 4
	lastLogin: number; // 4
	numberOfGames: number; // 4
	personaId: number; // 4
	isOnline: number; // 2
	purchaseTimestamp: number; // 4
	gameSerialNumber: string; // 33
	timeOnline: number; // 4
	timeInGame: number; // 4
	extraData: Buffer; // 512
	personaData: Buffer; // 256
	pictureData: Buffer; // 1
	dnd: number; // 2
	startedPlayingTimestamp: number; // 4
	hashedKey: string; // 400
	personaLevel: number; // 2
	shardId: number; // 2
	constructor() {
		this.customerId = 0;
		this.personaName = "";
		this.serverDataId = 0;
		this.createDate = 0;
		this.lastLogin = 0;
		this.numberOfGames = 0;
		this.personaId = 0;
		this.isOnline = 0;
		this.purchaseTimestamp = 0;
		this.gameSerialNumber = "";
		this.timeOnline = 0;
		this.timeInGame = 0;
		this.extraData = Buffer.alloc(512);
		this.personaData = Buffer.alloc(256);
		this.pictureData = Buffer.alloc(1);
		this.dnd = 0;
		this.startedPlayingTimestamp = 0;
		this.hashedKey = "";
		this.personaLevel = 0;
		this.shardId = 0;
	}

	/**
	 *
	 * @param {Buffer} buffer
	 * @returns {PersonaRecord}
	 */
	deserialize(buffer: Buffer): PersonaRecord {
		let offset = 0;
		this.customerId = buffer.readUInt32BE(offset); // 4
		offset += 4;
		this.personaName = buffer.toString("utf8", offset, offset + 33); // 33
		offset += 33;
		this.serverDataId = buffer.readUInt32BE(offset); // 4
		offset += 4;
		this.createDate = buffer.readUInt32BE(offset); // 4
		offset += 4;
		this.lastLogin = buffer.readUInt32BE(offset); // 4
		offset += 4;
		this.numberOfGames = buffer.readUInt32BE(offset); // 4
		offset += 4;
		this.personaId = buffer.readUInt32BE(offset); // 4
		offset += 4;
		this.isOnline = buffer.readUInt16BE(offset); // 2
		offset += 2;
		this.purchaseTimestamp = buffer.readUInt32BE(offset); // 4
		offset += 4;
		this.gameSerialNumber = buffer
			.subarray(offset, offset + 33)
			.toString("utf8"); // 33
		offset += 33;
		this.timeOnline = buffer.readUInt32BE(offset); // 4
		offset += 4;
		this.timeInGame = buffer.readUInt32BE(offset); // 4
		offset += 4;
		this.extraData = buffer.subarray(offset, offset + 512); // 512
		offset += 512;
		this.personaData = buffer.subarray(offset, offset + 256); // 256
		offset += 256;
		this.pictureData = buffer.subarray(offset, offset + 1); // 1
		offset += 1;
		this.dnd = buffer.readUInt16BE(offset); // 2
		offset += 2;
		this.startedPlayingTimestamp = buffer.readUInt32BE(offset); // 4
		offset += 4;
		this.hashedKey = buffer.subarray(offset, offset + 400).toString("utf8"); // 400
		offset += 400;
		this.personaLevel = buffer.readUInt16BE(offset); // 2
		offset += 2;
		this.shardId = buffer.readUInt32BE(offset); // 2
		// Offset 1285
		return this;
	}

	/**
	 *
	 * @returns {Buffer}
	 */
	serialize(): Buffer {
		const buffer = Buffer.alloc(PersonaRecord.size());
		try {
			let offset = 0;
			buffer.writeUInt32BE(this.customerId, offset); // 4 - Unknown if this is correct
			offset += 4; // offset = 4
			buffer.writeUInt16BE(3341, offset); // 2 - unknown if this is correct
			offset += 2; // offset = 6
			buffer.writeUInt32BE(this.personaId, offset); // 4 - Known to be correct
			offset += 4; // offset = 10
			buffer.writeUInt32BE(this.shardId, offset); // 4 - Known to be correct
			offset += 4; // offset = 14
			// We don't know what goes here yet
			offset += 4; // offset = 18
			serializeString(this.personaName).copy(buffer, offset); // 34 - Known to be correct
			// offset = 52

			// buffer.writeUInt32BE(this.serverDataId, offset); // 4
			// offset += 4; // offset = 56
			// buffer.writeUInt32BE(this.createDate, offset); // 4
			// offset += 4; // offset = 60
			// buffer.writeUInt32BE(this.lastLogin, offset); // 4
			// offset += 4; // offset = 64
			// buffer.writeUInt32BE(this.numberOfGames, offset); // 4 (Max personas))
			// offset += 4; // offset = 68
			// buffer.writeUInt16BE(this.isOnline, offset); // 2
			// offset += 2; // offset = 70
			// buffer.writeUInt32BE(this.purchaseTimestamp, offset); // 4
			// offset += 4; // offset = 74
			// buffer.write(this.gameSerialNumber, offset, 33, "utf8"); // 33
			// offset += 33; // offset = 107
			// buffer.writeUInt32BE(this.timeOnline, offset); // 4
			// offset += 4; // offset = 111
			// buffer.writeUInt32BE(this.timeInGame, offset); // 4
			// offset += 4; // offset = 115
			// this.extraData.copy(buffer, offset, 512); // 512
			// offset += 512; // offset = 627
			// this.personaData.copy(buffer, offset, 256); // 256
			// offset += 256; // offset = 883
			// this.pictureData.copy(buffer, offset, 1); // 1
			// offset += 1; // offset = 884
			// buffer.writeUInt16BE(this.dnd, offset); // 2
			// offset += 2; // offset = 886
			// buffer.writeUInt32BE(this.startedPlayingTimestamp, offset); // 4
			// offset += 4; // offset = 890
			// buffer.write(this.hashedKey, offset, 400, "utf8"); // 400
			// offset += 400; // offset = 1290
			// buffer.writeUInt16BE(this.personaLevel, offset); // 2
			// offset += 2; // offset = 1292
		} catch (error) {
			const err = Error(
				`Error serializing PersonaRecord buffer: ${String(error)}`,
			);
			err.cause = error;
			throw err;
		}
		return buffer;
	}

	static size() {
		return 52;
	}

	toJSON() {
		return {
			customerId: this.customerId,
			personaId: this.personaId,
			personaName: this.personaName,
			shardId: this.shardId,
			serverDataId: this.serverDataId,
			// createDate: this.createDate,
			// lastLogin: this.lastLogin,
			// numberOfGames: this.numberOfGames,
			// isOnline: this.isOnline,
			// purchaseTimestamp: this.purchaseTimestamp,
			// gameSerialNumber: this.gameSerialNumber,
			// timeOnline: this.timeOnline,
			// timeInGame: this.timeInGame,
			// extraData: this.extraData,
			// personaData: this.personaData,
			// pictureData: this.pictureData,
			// dnd: this.dnd,
			// startedPlayingTimestamp: this.startedPlayingTimestamp,
			// hashedKey: this.hashedKey,
			// personaLevel: this.personaLevel,
		};
	}

	asJSON() {
		return this.toJSON();
	}

	toString() {
		return `PersonaRecord: ${JSON.stringify(this.toJSON())}`;
	}
}

export class PersonaList {
	_personaRecords: PersonaRecord[];
	constructor() {
		/** @type {PersonaRecord[]} */
		this._personaRecords = [];
	}

	/**
	 *
	 * @param {Buffer} buffer
	 * @returns {PersonaList}
	 */
	deserialize(buffer: Buffer): PersonaList {
		let offset = 0;
		const personaRecordCount = buffer.readUInt16BE(offset);
		offset += 2;
		for (let i = 0; i < personaRecordCount; i++) {
			const personaRecord = new PersonaRecord();
			personaRecord.deserialize(buffer.subarray(offset));
			offset += PersonaRecord.size();
			this._personaRecords.push(personaRecord);
		}
		return this;
	}

	/**
	 *
	 * @returns {Buffer}
	 */
	serialize(): Buffer {
		const NEEDED_SIZE = PersonaRecord.size() * this._personaRecords.length;
		const buffer = Buffer.alloc(NEEDED_SIZE);
		try {
			let offset = 0;
			if (!this._personaRecords) {
				throw Error("PersonaRecords is undefined");
			}
			for (const personaRecord of this._personaRecords) {
				personaRecord.serialize().copy(buffer, offset);
				offset += PersonaRecord.size();
			}
		} catch (error) {
			throw Error(`Error serializing PersonaList buffer: ${String(error)}`);
		}
		return buffer;
	}

	/**
	 * @param {PersonaRecord} personaRecord
	 */
	addPersonaRecord(personaRecord: PersonaRecord) {
		this._personaRecords.push(personaRecord);
	}

	personaCount() {
		return this._personaRecords.length;
	}

	size() {
		return PersonaRecord.size() * this._personaRecords.length;
	}

	asJSON() {
		return {
			personaRecords: this._personaRecords,
		};
	}

	toString() {
		return `PersonaList: ${JSON.stringify(this._personaRecords)}`;
	}
}
export class PersonaMapsMessage extends NPSMessage {
	_personaRecords: PersonaList | undefined;
	raw: Buffer | undefined;
	constructor() {
		super();
		/** @type {PersonaList | undefined} */
		this._personaRecords = undefined;
	}

	/**
	 * @param {Buffer} buffer
	 * @returns {PersonaMapsMessage}
	 */
	deserialize(buffer: Buffer): PersonaMapsMessage {
		try {
			this._header.deserialize(buffer);
			this.setBuffer(buffer.subarray(NPSHeader.size()));
			this.raw = buffer;
			return this;
		} catch (error) {
			const err = Error(
				`Error deserializing PersonaMapsMessage: ${String(error)}`,
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
			if (!this._personaRecords) {
				throw Error("PersonaRecords is undefined");
			}
			this._header.length = NPSHeader.size() + 2 + this._personaRecords.size();
			const buffer = Buffer.alloc(this._header.length);
			this._header.serialize().copy(buffer);

			// Write the persona count. This is known to be correct at offset 12
			buffer.writeUInt16BE(this._personaRecords.personaCount(), 12);
			// This is a serialized PersonaList
			this.data.copy(buffer, NPSHeader.size() + 2);
			return buffer;
		} catch (error) {
			const err = Error(
				`Error serializing PersonaMapsMessage: ${String(error)}`,
			);
			err.cause = error;
			throw err;
		}
	}

	asJSON() {
		return {
			header: this._header,
			personaRecords: this._personaRecords,
		};
	}

	override toString() {
		return `PersonaMapsMessage: ${JSON.stringify({
			header: this._header,
			personaRecords: this._personaRecords,
		})}`;
	}
}

/**
 * Serializes a string to a buffer. The buffer will be prefixed with the length of the string.
 * @param {string} str
 * @returns {Buffer}
 */
export function serializeString(str: string): Buffer {
	const buf = Buffer.alloc(str.length + 2);

	buf.writeUInt16BE(str.length);
	buf.write(str, 2);

	return buf;
}
