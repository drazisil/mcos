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

import { SerializedBufferOld } from "rusty-motors-shared";

/**
 * A message listing the lobbies
 * This is the body of a MessageNode
 */
export class ArcadeCarMessage extends SerializedBufferOld {
	_msgNo: number;
	_carCount: number;
	_shouldExpectMoreMessages: boolean;
	_carList: ArcadeCarInfo[];
	constructor() {
		super();
		this._msgNo = 0; // 2 bytes
		this._carCount = 0; // 1 bytes
		this._shouldExpectMoreMessages = false; // 1 byte
		/** @type {ArcadeCarInfo[]} */
		this._carList = []; // 8 bytes each
	}

	override size() {
		return 5 + this._carList.length * 8;
	}

	/**
	 * Add a lobby to the list
	 * @param {ArcadeCarInfo} lobby
	 */
	addCar(lobby: ArcadeCarInfo) {
		this._carList.push(lobby);
		this._carCount++;
	}

	override serialize() {
		const neededSize = 5 + this._carList.length * 8;
		const buffer = Buffer.alloc(neededSize);
		let offset = 0; // offset is 0
		buffer.writeUInt16LE(this._msgNo, offset);
		offset += 2; // offset is 2
		buffer.writeUInt16LE(this._carCount, offset);
		offset += 2; // offset is 4
		buffer.writeInt8(this._shouldExpectMoreMessages ? 1 : 0, offset);
		offset += 1; // offset is 5
		for (const car of this._carList) {
			car.serialize().copy(buffer, offset);
			offset += car.size();
		}
		// offset is now 4 + this._lobbyList.length * 563
		return buffer;
	}

	override toString() {
		return `ArcadeCarMessage: msgNo=${this._msgNo} careCount=${this._carCount} shouldExpectMoreMessages=${this._shouldExpectMoreMessages} cars=${this._carList.length}`;
	}
}

export class ArcadeCarInfo extends SerializedBufferOld {
	_brandedPartId: number;
	_lobbyId: number;
	constructor() {
		super();
		this._brandedPartId = 0; // 4 bytes
		this._lobbyId = 0; // 4 bytes
	}

	override size() {
		return 8;
	}

	override serialize() {
		const buffer = Buffer.alloc(this.size());
		let offset = 0; // offset is 0
		buffer.writeUInt32LE(this._brandedPartId, offset);
		offset += 4; // offset is 4
		buffer.writeUInt32LE(this._lobbyId, offset);
		// offset is 8
		return buffer;
	}

	override toString() {
		return `ArcadeCarInfo: brandedPartId=${this._brandedPartId} lobbyId=${this._lobbyId}`;
	}
}
