import {
	LegacyMessage,
	SerializedBuffer,
	serializeString,
} from "rusty-motors-shared";

export class MiniRiffMessage extends LegacyMessage {
	private _riffList: MiniRiffInfo[] = [];

	constructor() {
		super();
		/** @type {MiniRiffInfo[]} */
		this._riffList = [];
	}

	size() {
		let size = 4;
		for (const riff of this._riffList) {
			size += riff.size();
		}
		return size;
	}

	/** @param {MiniRiffInfo} riff */
	addRiff(riff: MiniRiffInfo) {
		this._riffList.push(riff);
	}

	/**
	 * @returns {Buffer}
	 */
	override serialize() {
		try {
			const neededSize = this.size();
			this._header.length = neededSize + 4;
			const buffer = Buffer.alloc(this._header.length);
			this._header._doSerialize().copy(buffer);
			let offset = this._header._size; // offset is 4
			buffer.writeUInt16BE(this._riffList.length, offset);
			offset += 4;
			for (const riff of this._riffList) {
				riff.serialize().copy(buffer, offset);
				offset += riff.size();
			}

			return buffer;
		} catch (error) {
			const err = Error("Error serializing MiniRiffMessage");
			err.cause = error;
			throw err;
		}
	}

	override toString() {
		return `MiniRiffMessage: ${this._riffList.length} riff(s)`;
	}
}

export class MiniRiffInfo extends SerializedBuffer {
	private _riffName: string;
	private _riffId: number;
	private _riffPopulation: number;

	constructor() {
		super();
		this._riffName = ""; // max 32 bytes
		this._riffId = 0; // 4 bytes
		this._riffPopulation = 0; // 2 bytes
	}

	override size() {
		return 4 + (4 + this._riffName.length + 1) + 4 + 2;
	}

	/**
	 * @returns {Buffer}
	 */
	override serialize() {
		try {
			const buffer = Buffer.alloc(this.size());
			let offset = 0;
			if (this._riffName.length > 32) {
				throw Error("Riff name is too long");
			}
			offset = serializeString(this._riffName, buffer, offset);

			buffer.writeUInt32BE(this._riffId, offset);
			offset += 4;
			buffer.writeUInt16BE(this._riffPopulation, offset);

			return buffer;
		} catch (error) {
			const err = Error("Error serializing MiniRiffInfo");
			err.cause = error;
			throw err;
		}
	}

	override toString() {
		return `MiniRiffInfo: ${this._riffName} (${this._riffId}) - ${this._riffPopulation}`;
	}
}
