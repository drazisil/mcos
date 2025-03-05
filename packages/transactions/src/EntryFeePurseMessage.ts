// mcos is a game server, written from scratch, for an old game
// Copyright (C) <2017>  <Drazi Crendraven>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import { BytableStructure } from "@rustymotors/binary";
import { SerializedBufferOld } from "rusty-motors-shared";

/**
 * A message listing the entry fees and purses for each entry fee
 * This is the body of a MessageNode
 */
export class EntryFeePurseMessage extends SerializedBufferOld {
	_msgNo: number;
	_numberOfPurseEntries: number;
	_shouldExpectMoreMessages: boolean;
	_purseEntries: PurseEntry[];
	constructor() {
		super();
		this._msgNo = 408; // 2 bytes
		this._numberOfPurseEntries = 0; // 1 bytes
		this._shouldExpectMoreMessages = false; // 1 byte
		/** @type {PurseEntry[]} */
		this._purseEntries = []; // 8 bytes each
	}

	override size() {
		return 5 + this._purseEntries.length * 8;
	}

	/**
	 * Add a lobby to the list
	 * @param {PurseEntry} lobby
	 */
	addEntry(purseEntry: PurseEntry) {
		this._purseEntries.push(purseEntry);
		this._numberOfPurseEntries++;
	}

	override serialize() {
		const neededSize = 5 + this._purseEntries.length * 563;
		const buffer = Buffer.alloc(neededSize);
		let offset = 0; // offset is 0
		buffer.writeUInt16LE(this._msgNo, offset);
		offset += 2; // offset is 2
		buffer.writeUInt16LE(this._numberOfPurseEntries, offset);
		offset += 2; // offset is 4
		buffer.writeUInt8(this._shouldExpectMoreMessages ? 1 : 0, offset);
		offset += 1; // offset is 5
		for (const entry of this._purseEntries) {
			entry.serialize().copy(buffer, offset);
			offset += entry.serializeSize
		}
		// offset is now 4 + this._lobbyList.length * 563
		return buffer;
	}

	override toString() {
		return `EntryFeePurseMessage: msgNo=${this._msgNo} numberOfPurseEntries=${this._numberOfPurseEntries} shouldExpectMoreMessages=${this._shouldExpectMoreMessages} purseEntries=${this._purseEntries}`;
	}
}

export class PurseEntry extends BytableStructure {
	_entryFee: number; // 4 bytes
	_purse: number; // 4 bytes
	constructor() {
		super();
		this._entryFee = 0;
		this._purse = 0;
	}

	override get serializeSize() {
		return 8;
	}

	/**
	 * Deserialize the data
	 *
	 * @param {Buffer} data
	 */
	override deserialize(data: Buffer) {
		if (data.length !== this.serializeSize) {
			throw Error(
				`PurseEntry.deserialize() expected ${this.serializeSize} bytes but got ${
					data.length
				} bytes`,
			);
		}
		let offset = 0;
		this._entryFee = data.readUInt32LE(offset);
		offset += 4; // offset is 4
		this._purse = data.readUInt32LE(offset);
		// offset is 8

		return this;
	}

	override serialize() {
		const buf = Buffer.alloc(this.serializeSize);
		let offset = 0; // offset is 0
		buf.writeUInt32LE(this._entryFee, offset);
		offset += 4; // offset is 4
		buf.writeUInt32LE(this._purse, offset);
		// offset is 8

		return buf;
	}

	override toString() {
		return `PurseEntry: entryFee=${this._entryFee} purse=${this._purse}`;
	}
}
