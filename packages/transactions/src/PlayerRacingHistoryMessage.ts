import { SerializedBufferOld } from "rusty-motors-shared";

export class PlayerRacingHistoryMessage extends SerializedBufferOld {
	_msgId: number; // 2 bytes
	_userId: number; // 4 bytes
	_numRaces: number; // 2 bytes
	_expectMore: boolean; // 1 byte
	
	_raceHistoryRecords: RacingHistoryRecordEntry[]; // 32 bytes each

	constructor() {
		super();
		this._msgId = 0; // 2 bytes
		this._userId = 0; // 4 bytes
		this._numRaces = 0;
		this._expectMore = false; 
		this._raceHistoryRecords = [];
		// total: 39 bytes + 32 bytes * numRaces
	}

	override size(): number {
		return 39 + this._numRaces * 32;
	}

	addRecord(record: RacingHistoryRecordEntry) {
		this._raceHistoryRecords.push(record);
	}

	override deserialize(buffer: Buffer): PlayerRacingHistoryMessage {
		let offset = 0;
		this._msgId = buffer.readInt16LE(offset);
		offset += 2;
		this._userId = buffer.readInt32LE(offset);
		offset += 4;
		const numRaces = buffer.readInt16LE(offset);
		offset += 2;
		this._expectMore = buffer.readInt8(offset) === 1;
		offset += 1;
		for (let i = 0; i < this._numRaces; i++) {
			const record = new RacingHistoryRecordEntry();
			record.deserialize(buffer.subarray(offset, offset + 32));
			offset += 32;
			this._raceHistoryRecords.push(record);
		}

		if (this._numRaces !== numRaces) {
			throw new Error(`Expected
            ${numRaces} records, but found ${this._numRaces}`);
		}

		return this;
	}

	override serialize(): Buffer {
		const buffer = Buffer.alloc(this.size());
		let offset = 0;
		buffer.writeInt16LE(this._msgId, offset);
		offset += 2;
		buffer.writeInt32LE(this._userId, offset);
		offset += 4;
		buffer.writeInt16LE(this._numRaces, offset);
		offset += 2;
		buffer.writeInt8(this._expectMore ? 1 : 0, offset);
		offset += 1;

		for (let i = 0; i < this._numRaces; i++) {
			this._raceHistoryRecords[i]!.serialize().copy(buffer, offset);
			offset += 32;
		}

		return buffer;
	}

	asString(): string {
		let result = `PlayerRacingHistoryMessage: MsgId: ${this._msgId}, UserId: ${this._userId}, NumRaces: ${this._numRaces}, ExpectMore: ${this._expectMore}`;
		for (let i = 0; i < this._numRaces; i++) {
			result += `\n${this._raceHistoryRecords[i]!.asString()}`;
		}

		return result;
	}

	override toString(): string {
		return this.asString();
	}
}

export class RacingHistoryRecordEntry extends SerializedBufferOld {
	raceType: number; // 4 bytes
	numberOfRacesEntered: number; // 4 bytes
	numberOfRacesFinished: number; // 4 bytes
	numberOfRacesWon: number; // 4 bytes
	numberOfCarsWon: number; // 4 bytes
	numberOfCarsLost: number; // 4 bytes
	numberOfChampionshipsWon: number; // 4 bytes
	cashWon: number; // 4 bytes

	constructor() {
		super();
		this.raceType = 0;
		this.numberOfRacesEntered = 0;
		this.numberOfRacesFinished = 0;
		this.numberOfRacesWon = 0;
		this.numberOfCarsWon = 0;
		this.numberOfCarsLost = 0;
		this.numberOfChampionshipsWon = 0;
		this.cashWon = 0;
		// total: 32 bytes
	}

	override size(): number {
		return 32;
	}

	override serialize(): Buffer {
		const buffer = Buffer.alloc(this.size());
		let offset = 0;
		buffer.writeInt32LE(this.raceType, offset);
		offset += 4;
		buffer.writeInt32LE(this.numberOfRacesEntered, offset);
		offset += 4;
		buffer.writeInt32LE(this.numberOfRacesFinished, offset);
		offset += 4;
		buffer.writeInt32LE(this.numberOfRacesWon, offset);
		offset += 4;
		buffer.writeInt32LE(this.numberOfCarsWon, offset);
		offset += 4;
		buffer.writeInt32LE(this.numberOfCarsLost, offset);
		offset += 4;
		buffer.writeInt32LE(this.numberOfChampionshipsWon, offset);
		offset += 4;
		buffer.writeInt32LE(this.cashWon, offset);
		// total: 8 * 4 = 32 bytes

		return buffer;
	}

	override deserialize(buffer: Buffer): RacingHistoryRecordEntry {
		let offset = 0;
		this.raceType = buffer.readInt32LE(offset);
		offset += 4;
		this.numberOfRacesEntered = buffer.readInt32LE(offset);
		offset += 4;
		this.numberOfRacesFinished = buffer.readInt32LE(offset);
		offset += 4;
		this.numberOfRacesWon = buffer.readInt32LE(offset);
		offset += 4;
		this.numberOfCarsWon = buffer.readInt32LE(offset);
		offset += 4;
		this.numberOfCarsLost = buffer.readInt32LE(offset);
		offset += 4;
		this.numberOfChampionshipsWon = buffer.readInt32LE(offset);
		offset += 4;
		this.cashWon = buffer.readInt32LE(offset);
		// total: 8 * 4 = 32 bytes

		return this;
	}

	asString(): string {
		return `RacingHistoryRecord: RaceType: ${this.raceType}, NumberOfRacesEntered: ${this.numberOfRacesEntered}, NumberOfRacesFinished: ${this.numberOfRacesFinished}, NumberOfRacesWon: ${this.numberOfRacesWon}, NumberOfCarsWon: ${this.numberOfCarsWon}, NumberOfCarsLost: ${this.numberOfCarsLost}, NumberOfChampionshipsWon: ${this.numberOfChampionshipsWon}, CashWon: ${this.cashWon}`;
	}
}
