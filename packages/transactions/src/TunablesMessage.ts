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
export class TunablesMessage extends SerializedBufferOld {
	_msgNo: number;
	_clubCreationCost: number;
	_clubCreationRequiredLevel: number;
	_clubOfficerRequiredLevel: number;
	_inventorySizePerLevel: number;
	_carsPerLevel: number;
	_maxEZStreetLevel: number;
	_clubSwitchCooldown: number;
	_universalRepairCostModifier: number;
	_universalScrapValueModifier: number;
	_addCost1Day: number;
	_addCost2Days: number;
	_addCost3Days: number;
	_addCost4Days: number;
	_addCost5Days: number;
	_addCost6Days: number;
	_addCost7Days: number;
	_tradeinModifier: number;
	_simStreetMaxWager: number;
	saleryPerLevel: number;
	_clubMaxMembers: number;
	_clubRegistrationCost: number;
	_clubReRegistrationCost: number;
	_classifiedAdRate: number;
	_classifiedAdMaxDuration: number;
	_classifiedAdMaxSize: number;
	_classifiedAdMaxCountPerPlayer: number;
	constructor() {
		super();
		this._msgNo = 0; // 2 bytes
		this._clubCreationCost = 150; // 4 bytes
		this._clubCreationRequiredLevel = 1; // 4 bytes
		this._clubOfficerRequiredLevel = 1; // 4 bytes
		this._inventorySizePerLevel = 20; // 4 bytes
		this._carsPerLevel = 3; // 4 bytes
		this._maxEZStreetLevel = 5; // 4 bytes
		this._clubSwitchCooldown = 1; // 4 bytes
		this._universalRepairCostModifier = 3.6; // 8 bytes
		this._universalScrapValueModifier = 3.6; // 8 bytes
		this._addCost1Day = 1; // 4 bytes
		this._addCost2Days = 2; // 4 bytes
		this._addCost3Days = 3; // 4 bytes
		this._addCost4Days = 4; // 4 bytes
		this._addCost5Days = 5; // 4 bytes
		this._addCost6Days = 6; // 4 bytes
		this._addCost7Days = 7; // 4 bytes
		this._tradeinModifier = 3.6; // 8 bytes
		this._simStreetMaxWager = 20; // 4 bytes
		this.saleryPerLevel = 6; // 4 bytes
		this._clubMaxMembers = 4; // 4 bytes
		this._clubRegistrationCost = 2; // 4 bytes
		this._clubReRegistrationCost = 3; // 4 bytes
		this._classifiedAdRate = 10; // 4 bytes
		this._classifiedAdMaxDuration = 4; // 4 bytes
		this._classifiedAdMaxSize = 17; // 4 bytes
		this._classifiedAdMaxCountPerPlayer = 2; // 4 bytes
		// total: 118 bytes
	}

	override size() {
		return 118; // This needs to 124 bytes, but the last 6 bytes are unknown
	}

	override serialize() {
		const buffer = Buffer.alloc(this.size());
		let offset = 0; // offset is 0
		buffer.writeUInt16LE(this._msgNo, offset);
		offset += 2; // offset is 2
		buffer.writeUInt32LE(this._clubCreationCost, offset);
		offset += 4; // offset is 6
		buffer.writeUInt32LE(this._clubCreationRequiredLevel, offset);
		offset += 4; // offset is 10
		buffer.writeUInt32LE(this._clubOfficerRequiredLevel, offset);
		offset += 4; // offset is 14
		buffer.writeUInt32LE(this._inventorySizePerLevel, offset);
		offset += 4; // offset is 18
		buffer.writeUInt32LE(this._carsPerLevel, offset);
		offset += 4; // offset is 22
		buffer.writeUInt32LE(this._maxEZStreetLevel, offset);
		offset += 4; // offset is 26
		buffer.writeUInt32LE(this._clubSwitchCooldown, offset);
		offset += 4; // offset is 30
		buffer.writeDoubleLE(this._universalRepairCostModifier, offset);
		offset += 8; // offset is 38
		buffer.writeDoubleLE(this._universalScrapValueModifier, offset);
		offset += 8; // offset is 46
		buffer.writeUInt32LE(this._addCost1Day, offset);
		offset += 4; // offset is 50
		buffer.writeUInt32LE(this._addCost2Days, offset);
		offset += 4; // offset is 54
		buffer.writeUInt32LE(this._addCost3Days, offset);
		offset += 4; // offset is 58
		buffer.writeUInt32LE(this._addCost4Days, offset);
		offset += 4; // offset is 62
		buffer.writeUInt32LE(this._addCost5Days, offset);
		offset += 4; // offset is 66
		buffer.writeUInt32LE(this._addCost6Days, offset);
		offset += 4; // offset is 70
		buffer.writeUInt32LE(this._addCost7Days, offset);
		offset += 4; // offset is 74
		buffer.writeDoubleLE(this._tradeinModifier, offset);
		offset += 8; // offset is 82
		buffer.writeUInt32LE(this._simStreetMaxWager, offset);
		offset += 4; // offset is 86
		buffer.writeUInt32LE(this.saleryPerLevel, offset);
		offset += 4; // offset is 90
		buffer.writeUInt32LE(this._clubMaxMembers, offset);
		offset += 4; // offset is 94
		buffer.writeUInt32LE(this._clubRegistrationCost, offset);
		offset += 4; // offset is 98
		buffer.writeUInt32LE(this._clubReRegistrationCost, offset);
		offset += 4; // offset is 102
		buffer.writeUInt32LE(this._classifiedAdRate, offset);
		offset += 4; // offset is 106
		buffer.writeUInt32LE(this._classifiedAdMaxDuration, offset);
		offset += 4; // offset is 110
		buffer.writeUInt32LE(this._classifiedAdMaxSize, offset);
		offset += 4; // offset is 114
		buffer.writeUInt32LE(this._classifiedAdMaxCountPerPlayer, offset);
		// offset is 118

		return buffer;
	}

	override toString() {
		return `
            TunablesMessage:

            msgNo=${this._msgNo}
            clubCreationCost=${this._clubCreationCost}  
            clubCreationRequiredLevel=${this._clubCreationRequiredLevel}
            clubOfficerRequiredLevel=${this._clubOfficerRequiredLevel}
            inventorySizePerLevel=${this._inventorySizePerLevel}
            carsPerLevel=${this._carsPerLevel}
            maxEZStreetLevel=${this._maxEZStreetLevel}
            clubSwitchCooldown=${this._clubSwitchCooldown}
            universalRepairCostModifier=${this._universalRepairCostModifier}
            universalScrapValueModifier=${this._universalScrapValueModifier}
            addCost1Day=${this._addCost1Day}
            addCost2Days=${this._addCost2Days}
            addCost3Days=${this._addCost3Days}
            addCost4Days=${this._addCost4Days}
            addCost5Days=${this._addCost5Days}
            addCost6Days=${this._addCost6Days}
            addCost7Days=${this._addCost7Days}
            tradeinModifier=${this._tradeinModifier}
            simStreetMaxWager=${this._simStreetMaxWager}
            saleryPerLevel=${this.saleryPerLevel}
            clubMaxMembers=${this._clubMaxMembers}
            clubRegistrationCost=${this._clubRegistrationCost}
            clubReRegistrationCost=${this._clubReRegistrationCost}
            classifiedAdRate=${this._classifiedAdRate}
            classifiedAdMaxDuration=${this._classifiedAdMaxDuration}
            classifiedAdMaxSize=${this._classifiedAdMaxSize}
            classifiedAdMaxCountPerPlayer=${this._classifiedAdMaxCountPerPlayer}
        `;
	}
}
