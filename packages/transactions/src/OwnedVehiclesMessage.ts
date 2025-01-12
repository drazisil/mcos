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
 * A message listing the player's owned vehicles
 * This is the body of a MessageNode
 */
export class OwnedVehiclesMessage extends SerializedBufferOld {
	_msgNo: number;
	_numberOfVehicles: number;
	_vehicleList: OwnedVehicle[];
	constructor() {
		super();
		this._msgNo = 0; // 2 bytes
		this._numberOfVehicles = 0; // 1 bytes
		/** @type {OwnedVehicle[]} */
		this._vehicleList = []; // 8 bytes each
	}

	override size() {
		return 5 + this._vehicleList.length * 8;
	}

	/**
	 * Add a lobby to the list
	 * @param {GameUrl} lobby
	 */
	addVehicle(vehicle: OwnedVehicle) {
		this._vehicleList.push(vehicle);
		this._numberOfVehicles++;
	}

	override serialize() {
		const neededSize = 4 + this._vehicleList.length * 8;
		const buffer = Buffer.alloc(neededSize);
		let offset = 0; // offset is 0
		buffer.writeUInt16LE(this._msgNo, offset);
		offset += 2; // offset is 2
		buffer.writeInt8(this._numberOfVehicles, offset);
		offset += 1; // offset is 3
		for (const vehicle of this._vehicleList) {
			const vehicleBuffer = vehicle.serialize();
			vehicleBuffer.copy(buffer, offset);
			offset += vehicleBuffer.length;
		}

		return buffer;
	}

	override toString() {
		return `OwnedVehiclesMessage: msgNo=${this._msgNo} numberOfVehicles=${this._numberOfVehicles}`;
	}
}

export class OwnedVehicle extends SerializedBufferOld {
	_vehicleId: number;
	_brandedPartId: number;
	constructor() {
		super();
		this._vehicleId = 0; // 4 bytes
		this._brandedPartId = 0; // 4 bytes
	}

	override size() {
		return 8;
	}

	override serialize() {
		const buffer = Buffer.alloc(this.size());
		let offset = 0; // offset is 0
		buffer.writeUInt32LE(this._vehicleId, offset);
		offset += 4; // offset is 4
		buffer.writeUInt32LE(this._brandedPartId, offset);

		return buffer;
	}

	override toString() {
		return `OwnedVehicle: vehicleId=${this._vehicleId} brandedPartId=${this._brandedPartId}`;
	}
}
