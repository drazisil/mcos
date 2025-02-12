import { BufferSerializer } from "rusty-motors-shared-packets";
import { GameMessageHeader } from "./GameMessageHeader.js";

export class GameMessage extends BufferSerializer {
	_header: GameMessageHeader;
	_recordData: Buffer;
	constructor(gameMessageId: number) {
		super();
		this._header = new GameMessageHeader(gameMessageId);
		this._recordData = Buffer.alloc(0);
	}

	setRecordData(buffer: Buffer) {
		this._recordData = Buffer.alloc(buffer.length);
		buffer.copy(this._recordData);
	}

	/** @deprecated - Use setRecordData instead */
	setBuffer(buffer: Buffer) {
		this._recordData = Buffer.alloc(buffer.length);
		buffer.copy(this._recordData);
	}

	override deserialize(buffer: Buffer) {
		this._header.deserialize(buffer);
		this._recordData = Buffer.alloc(this._header.length - 4);
		buffer.copy(this._recordData, 0, 8);
		return this;
	}

	override serialize() {
		this._header._gameMessageLength = 4 + this._recordData.length;
		this._header.length = this._header._gameMessageLength + 4;
		const buffer = Buffer.alloc(this._header.length);
		let offset = 0; // offset is 0
		this._header.serialize().copy(buffer);
		offset += this._header.size(); // offset is 8

		this._recordData.copy(buffer, offset);
		return buffer;
	}

	override toString() {
		return `GameMessage: ${this.serialize().toString("hex")})}`;
	}
}
