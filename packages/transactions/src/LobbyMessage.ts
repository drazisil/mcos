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
export class LobbyMessage extends SerializedBufferOld {
	_msgNo: number;
	_lobbyCount: number;
	_shouldExpectMoreMessages: boolean;
	_lobbyList: LobbyInfo[];
	constructor() {
		super();
		this._msgNo = 0; // 2 bytes
		this._lobbyCount = 0; // 1 bytes
		this._shouldExpectMoreMessages = false; // 1 byte
		/** @type {LobbyInfo[]} */
		this._lobbyList = []; // 563 bytes each
	}

	override size() {
		return 5 + this._lobbyList.length * 563;
	}

	/**
	 * Add a lobby to the list
	 * @param {LobbyInfo} lobby
	 */
	addLobby(lobby: LobbyInfo) {
		this._lobbyList.push(lobby);
		this._lobbyCount++;
	}

	override serialize() {
		const neededSize = 5 + this._lobbyList.length * 563;
		const buffer = Buffer.alloc(neededSize);
		let offset = 0; // offset is 0
		buffer.writeUInt16LE(this._msgNo, offset);
		offset += 2; // offset is 2
		buffer.writeUInt16LE(this._lobbyCount, offset);
		offset += 2; // offset is 4
		buffer.writeUInt8(this._shouldExpectMoreMessages ? 1 : 0, offset);
		offset += 1; // offset is 5
		for (const lobby of this._lobbyList) {
			lobby.serialize().copy(buffer, offset);
			offset += lobby.size();
		}
		// offset is now 4 + this._lobbyList.length * 563
		return buffer;
	}

	override toString() {
		return `LobbyMessage: msgNo=${this._msgNo} lobbyCount=${this._lobbyCount} shouldExpectMoreMessages=${this._shouldExpectMoreMessages} lobbies=${this._lobbyList.length}`;
	}
}

export class LobbyInfo extends SerializedBufferOld {
	_lobbyId: number;
	_raceTypeId: number;
	_terfId: number;
	_lobbyName: string;
	_turfName: string;
	_clientArt: string;
	_elementId: number;
	_turfLengthId: number;
	_startSlice: number;
	_endSlice: number;
	_dragStageLeft: number;
	_dragStageRight: number;
	_dragStagingSlice: number;
	_gridSpreadFactor: number;
	_linear: number;
	_minNumberPlayers: number;
	_maxNumberPlayers: number;
	_defaultNumberPlayers: number;
	_numberOfPlayersEnabled: boolean;
	_minLaps: number;
	_maxLaps: number;
	_defaultNumberOfLaps: number;
	_numberOfLapsEnabled: boolean;
	_minNumberRounds: number;
	_maxNumberRounds: number;
	_defaultNumberRounds: number;
	_numberOfRoundsEnabled: boolean;
	_defaultWeather: number;
	_weatherEnabled: boolean;
	_defaultNight: number;
	_nightEnabled: boolean;
	_defaultBackwards: boolean;
	_backwardsEnabled: boolean;
	_defaultTraffic: boolean;
	_trafficEnabled: boolean;
	_defaultDriverAI: boolean;
	_driverAIEnabled: boolean;
	_topDog: string;
	_turfOwner: string;
	_qualifyingTime: number;
	_numberOfClubPlayers: number;
	_numberofClubLaps: number;
	_numberOfClubRounds: number;
	_clubNight: number;
	_clubWeather: number;
	_clubBackwards: number;
	_bestLapTime: number;
	_lobbyDifficulty: number;
	_timetrialPointsToQualify: number;
	_timetrialCashToQualify: number;
	_timetrialPointsBonusIncrements: number;
	_timetrialCashBonusIncrements: number;
	_timetrialTimeIncrements: number;
	_timetrial1stPlaceVictoryPoints: number;
	_timetrial1stPlaceVictoryCash: number;
	_timetrial2ndPlaceVictoryPoints: number;
	_timetrial2ndPlaceVictoryCash: number;
	_timetrial3rdPlaceVictoryPoints: number;
	_timetrial3rdPlaceVictoryCash: number;
	_minLevel: number;
	_minResetSlice: number;
	_maxResetSlice: number;
	_newbieFlag: number;
	_driverHelmetFlag: number;
	_clubMaxNumberPlayers: number;
	_clubMinNumberPlayers: number;
	_clubNumberPlayersDefault: number;
	_minNumberOfClubs: number;
	_maxNumberOfClubs: number;
	_racePointsFactor: number;
	_maxBodyClass: number;
	_maxPowerClass: number;
	_partsPrizeMax: number;
	_partsPrizeWon: number;
	_clubLogoId: number;
	_teamTrialsWeatherFlag: boolean;
	_teamTrialsNightFlag: boolean;
	_teamTrialsBackwardsFlag: boolean;
	_teamTrialsNumberLaps: number;
	_teamTrialsBaseTimeUnderPar: number;
	_raceCashFactor: number;
	constructor() {
		super();
		this._lobbyId = 0; // 4 bytes
		this._raceTypeId = 0; // 4 bytes
		this._terfId = 0; // 4 bytes
		this._lobbyName = ""; // 32 bytes
		this._turfName = ""; // 256 bytes
		this._clientArt = ""; // 11 bytes
		this._elementId = 0; // 4 bytes
		this._turfLengthId = 0; // 4 bytes
		this._startSlice = 0; // 4 bytes
		this._endSlice = 0; // 4 bytes
		this._dragStageLeft = 0; // 4 bytes
		this._dragStageRight = 0; // 4 bytes
		this._dragStagingSlice = 0; // 4 bytes
		this._gridSpreadFactor = 0; // 4 bytes
		this._linear = 0; // 2 bytes
		this._minNumberPlayers = 0; // 2 bytes
		this._maxNumberPlayers = 0; // 2 bytes
		this._defaultNumberPlayers = 0; // 2 bytes
		this._numberOfPlayersEnabled = false; // 2 bytes
		this._minLaps = 0; // 2 bytes
		this._maxLaps = 0; // 2 bytes
		this._defaultNumberOfLaps = 0; // 2 bytes
		this._numberOfLapsEnabled = false; // 2 bytes
		this._minNumberRounds = 0; // 2 bytes
		this._maxNumberRounds = 0; // 2 bytes
		this._defaultNumberRounds = 0; // 2 bytes
		this._numberOfRoundsEnabled = false; // 2 bytes
		this._defaultWeather = 0; // 2 bytes
		this._weatherEnabled = false; // 2 bytes
		this._defaultNight = 0; // 2 bytes
		this._nightEnabled = false; // 2 bytes
		this._defaultBackwards = false; // 2 bytes
		this._backwardsEnabled = false; // 2 bytes
		this._defaultTraffic = false; // 2 bytes
		this._trafficEnabled = false; // 2 bytes
		this._defaultDriverAI = false; // 2 bytes
		this._driverAIEnabled = false; // 2 bytes
		this._topDog = ""; // 13 bytes
		this._turfOwner = ""; // 33 bytes
		this._qualifyingTime = 0; // 4 bytes
		this._numberOfClubPlayers = 0; // 4 bytes
		this._numberofClubLaps = 0; // 4 bytes
		this._numberOfClubRounds = 0; // 4 bytes
		this._clubNight = 0; // 2 bytes
		this._clubWeather = 0; // 2 bytes
		this._clubBackwards = 0; // 2 bytes
		this._bestLapTime = 0; // 4 bytes
		this._lobbyDifficulty = 0; // 4 bytes
		this._timetrialPointsToQualify = 0; // 4 bytes
		this._timetrialCashToQualify = 0; // 4 bytes
		this._timetrialPointsBonusIncrements = 0; // 4 bytes
		this._timetrialCashBonusIncrements = 0; // 4 bytes
		this._timetrialTimeIncrements = 0; // 4 bytes
		this._timetrial1stPlaceVictoryPoints = 0; // 4 bytes
		this._timetrial1stPlaceVictoryCash = 0; // 4 bytes
		this._timetrial2ndPlaceVictoryPoints = 0; // 4 bytes
		this._timetrial2ndPlaceVictoryCash = 0; // 4 bytes
		this._timetrial3rdPlaceVictoryPoints = 0; // 4 bytes
		this._timetrial3rdPlaceVictoryCash = 0; // 4 bytes
		this._minLevel = 0; // 2 bytes
		this._minResetSlice = 0; // 4 bytes
		this._maxResetSlice = 0; // 4 bytes
		this._newbieFlag = 0; // 2 bytes
		this._driverHelmetFlag = 0; // 2 bytes
		this._clubMaxNumberPlayers = 0; // 2 bytes
		this._clubMinNumberPlayers = 0; // 2 bytes
		this._clubNumberPlayersDefault = 0; // 2 bytes
		this._minNumberOfClubs = 0; // 2 bytes
		this._maxNumberOfClubs = 0; // 2 bytes
		this._racePointsFactor = 0; // 4 bytes
		this._maxBodyClass = 0; // 2 bytes
		this._maxPowerClass = 0; // 2 bytes
		this._partsPrizeMax = 0; // 2 bytes
		this._partsPrizeWon = 0; // 2 bytes
		this._clubLogoId = 0; // 4 bytes
		this._teamTrialsWeatherFlag = false; // 2 bytes
		this._teamTrialsNightFlag = false; // 2 bytes
		this._teamTrialsBackwardsFlag = false; // 2 bytes
		this._teamTrialsNumberLaps = 0; // 2 bytes
		this._teamTrialsBaseTimeUnderPar = 0; // 2 bytes
		this._raceCashFactor = 0; // 4 bytes
	}

	/**
	 * Deserialize a 2 byte boolean
	 *
	 * @param {Buffer} data
	 * @returns {boolean}
	 */
	deserializeBool(data: Buffer): boolean {
		return data.readUInt16LE() === 1;
	}

	/**
	 * Serialize a 2 byte boolean
	 *
	 * @param {number} value
	 * @returns {Buffer}
	 */
	serializeBool(value: number): Buffer {
		const buf = Buffer.alloc(2);
		buf.writeUInt16LE(value ? 1 : 0);
		return buf;
	}

	override size() {
		return 563;
	}

	/**
	 * Deserialize the data
	 *
	 * @param {Buffer} data
	 */
	override deserialize(data: Buffer) {
		if (data.length !== this.size()) {
			throw Error(
				`LobbyInfo.deserialize() expected ${this.size()} bytes but got ${
					data.length
				} bytes`,
			);
		}
		let offset = 0;
		this._lobbyId = data.readUInt32LE(offset);
		offset += 4;
		this._raceTypeId = data.readUInt32LE(offset);
		offset += 4;
		this._terfId = data.readUInt32LE(offset);
		offset += 4;
		this._lobbyName = data.toString("utf8", offset, offset + 32);
		offset += 32;
		this._turfName = data.toString("utf8", offset, offset + 256);
		offset += 256;
		this._clientArt = data.toString("utf8", offset, offset + 11);
		offset += 11;
		this._elementId = data.readUInt32LE(offset);
		offset += 4;
		this._turfLengthId = data.readUInt32LE(offset);
		offset += 4;
		this._startSlice = data.readUInt32LE(offset);
		offset += 4;
		this._endSlice = data.readUInt32LE(offset);
		offset += 4;
		this._dragStageLeft = data.readUInt32LE(offset);
		offset += 4;
		this._dragStageRight = data.readUInt32LE(offset);
		offset += 4;
		this._dragStagingSlice = data.readUInt32LE(offset);
		offset += 4;
		this._gridSpreadFactor = data.readUInt32LE(offset);
		offset += 4;
		this._linear = data.readUInt16LE(offset);
		offset += 2;
		this._minNumberPlayers = data.readUInt16LE(offset);
		offset += 2;
		this._maxNumberPlayers = data.readUInt16LE(offset);
		offset += 2;
		this._defaultNumberPlayers = data.readUInt16LE(offset);
		offset += 2;
		this._numberOfPlayersEnabled = this.deserializeBool(
			data.subarray(offset, offset + 2),
		);
		offset += 2;
		this._minLaps = data.readUInt16LE(offset);
		offset += 2;
		this._maxLaps = data.readUInt16LE(offset);
		offset += 2;
		this._defaultNumberOfLaps = data.readUInt16LE(offset);
		offset += 2;
		this._numberOfLapsEnabled = this.deserializeBool(
			data.subarray(offset, offset + 2),
		);
		offset += 2;
		this._minNumberRounds = data.readUInt16LE(offset);
		offset += 2;
		this._maxNumberRounds = data.readUInt16LE(offset);
		offset += 2;
		this._defaultNumberRounds = data.readUInt16LE(offset);
		offset += 2;
		this._numberOfRoundsEnabled = this.deserializeBool(
			data.subarray(offset, offset + 2),
		);
		offset += 2;
		this._defaultWeather = data.readUInt16LE(offset);
		offset += 2;
		this._weatherEnabled = this.deserializeBool(
			data.subarray(offset, offset + 2),
		);
		offset += 2;
		this._defaultNight = data.readUInt16LE(offset);
		offset += 2;
		this._nightEnabled = this.deserializeBool(
			data.subarray(offset, offset + 2),
		);
		offset += 2;
		this._defaultBackwards = this.deserializeBool(
			data.subarray(offset, offset + 2),
		);
		offset += 2;
		this._backwardsEnabled = this.deserializeBool(
			data.subarray(offset, offset + 2),
		);
		offset += 2;
		this._defaultTraffic = this.deserializeBool(
			data.subarray(offset, offset + 2),
		);
		offset += 2;
		this._trafficEnabled = this.deserializeBool(
			data.subarray(offset, offset + 2),
		);
		offset += 2;
		this._defaultDriverAI = this.deserializeBool(
			data.subarray(offset, offset + 2),
		);
		offset += 2;
		this._driverAIEnabled = this.deserializeBool(
			data.subarray(offset, offset + 2),
		);
		offset += 2;
		this._topDog = data.toString("utf8", offset, offset + 13);
		offset += 13;
		this._turfOwner = data.toString("utf8", offset, offset + 33);
		offset += 33;
		this._qualifyingTime = data.readUInt32LE(offset);
		offset += 4;
		this._numberOfClubPlayers = data.readUInt32LE(offset);
		offset += 4;
		this._numberofClubLaps = data.readUInt32LE(offset);
		offset += 4;
		this._numberOfClubRounds = data.readUInt32LE(offset);
		offset += 4;
		this._clubNight = data.readUInt16LE(offset);
		offset += 2;
		this._clubWeather = data.readUInt16LE(offset);
		offset += 2;
		this._clubBackwards = data.readUInt16LE(offset);
		offset += 2;
		this._bestLapTime = data.readUInt32LE(offset);
		offset += 4;
		this._lobbyDifficulty = data.readUInt32LE(offset);
		offset += 4;
		this._timetrialPointsToQualify = data.readUInt32LE(offset);
		offset += 4;
		this._timetrialCashToQualify = data.readUInt32LE(offset);
		offset += 4;
		this._timetrialPointsBonusIncrements = data.readUInt32LE(offset);
		offset += 4;
		this._timetrialCashBonusIncrements = data.readUInt32LE(offset);
		offset += 4;
		this._timetrialTimeIncrements = data.readUInt32LE(offset);
		offset += 4;
		this._timetrial1stPlaceVictoryPoints = data.readUInt32LE(offset);
		offset += 4;
		this._timetrial1stPlaceVictoryCash = data.readUInt32LE(offset);
		offset += 4;
		this._timetrial2ndPlaceVictoryPoints = data.readUInt32LE(offset);
		offset += 4;
		this._timetrial2ndPlaceVictoryCash = data.readUInt32LE(offset);
		offset += 4;
		this._timetrial3rdPlaceVictoryPoints = data.readUInt32LE(offset);
		offset += 4;
		this._timetrial3rdPlaceVictoryCash = data.readUInt32LE(offset);
		offset += 4;
		this._minLevel = data.readUInt16LE(offset);
		offset += 2;
		this._minResetSlice = data.readUInt32LE(offset);
		offset += 4;
		this._maxResetSlice = data.readUInt32LE(offset);
		offset += 4;
		this._newbieFlag = data.readUInt16LE(offset);
		offset += 2;
		this._driverHelmetFlag = data.readUInt16LE(offset);
		offset += 2;
		this._clubMaxNumberPlayers = data.readUInt16LE(offset);
		offset += 2;
		this._clubMinNumberPlayers = data.readUInt16LE(offset);
		offset += 2;
		this._clubNumberPlayersDefault = data.readUInt16LE(offset);
		offset += 2;
		this._minNumberOfClubs = data.readUInt16LE(offset);
		offset += 2;
		this._maxNumberOfClubs = data.readUInt16LE(offset);
		offset += 2;
		this._racePointsFactor = data.readUInt32LE(offset);
		offset += 4;
		this._maxBodyClass = data.readUInt16LE(offset);
		offset += 2;
		this._maxPowerClass = data.readUInt16LE(offset);
		offset += 2;
		this._partsPrizeMax = data.readUInt16LE(offset);
		offset += 2;
		this._partsPrizeWon = data.readUInt16LE(offset);
		offset += 2;
		this._clubLogoId = data.readUInt32LE(offset);
		offset += 4;
		this._teamTrialsWeatherFlag = this.deserializeBool(
			data.subarray(offset, offset + 2),
		);
		offset += 2;
		this._teamTrialsNightFlag = this.deserializeBool(
			data.subarray(offset, offset + 2),
		);
		offset += 2;
		this._teamTrialsBackwardsFlag = this.deserializeBool(
			data.subarray(offset, offset + 2),
		);
		offset += 2;
		this._teamTrialsNumberLaps = data.readUInt16LE(offset);
		offset += 2;
		this._teamTrialsBaseTimeUnderPar = data.readUInt16LE(offset);
		offset += 2;
		this._raceCashFactor = data.readUInt32LE(offset);
		// 563 total bytes

		return this;
	}

	override serialize() {
		const buf = Buffer.alloc(this.size());
		let offset = 0; // offset is 0
		buf.writeUInt32LE(this._lobbyId, offset);
		offset += 4; // offset is 4
		buf.writeUInt32LE(this._raceTypeId, offset);
		offset += 4; // offset is 8
		buf.writeUInt32LE(this._terfId, offset);
		offset += 4; // offset is 12
		buf.write(this._lobbyName, offset, 32);
		offset += 32; // offset is 44
		buf.write(this._turfName, offset, 256);
		offset += 256; // offset is 300
		buf.write(this._clientArt, offset, 11);
		offset += 11; // offset is 311
		buf.writeUInt32LE(this._elementId, offset);
		offset += 4; // offset is 315
		buf.writeUInt32LE(this._turfLengthId, offset);
		offset += 4; // offset is 319
		buf.writeUInt32LE(this._startSlice, offset);
		offset += 4; // offset is 323
		buf.writeUInt32LE(this._endSlice, offset);
		offset += 4; // offset is 327
		buf.writeUInt32LE(this._dragStageLeft, offset);
		offset += 4; // offset is 331
		buf.writeUInt32LE(this._dragStageRight, offset);
		offset += 4; // offset is 335
		buf.writeUInt32LE(this._dragStagingSlice, offset);
		offset += 4; // offset is 339
		buf.writeUInt32LE(this._gridSpreadFactor, offset);
		offset += 4; // offset is 343
		buf.writeUInt16LE(this._linear, offset);
		offset += 2; // offset is 345
		buf.writeUInt16LE(this._minNumberPlayers, offset);
		offset += 2; // offset is 347
		buf.writeUInt16LE(this._maxNumberPlayers, offset);
		offset += 2; // offset is 349
		buf.writeUInt16LE(this._defaultNumberPlayers, offset);
		offset += 2; // offset is 351
		buf.writeUInt16LE(this._numberOfPlayersEnabled ? 1 : 0, offset);
		offset += 2; // offset is 353
		buf.writeUInt16LE(this._minLaps, offset);
		offset += 2; // offset is 355
		buf.writeUInt16LE(this._maxLaps, offset);
		offset += 2; // offset is 357
		buf.writeUInt16LE(this._defaultNumberOfLaps, offset);
		offset += 2; // offset is 359
		buf.writeUInt16LE(this._numberOfLapsEnabled ? 1 : 0, offset);
		offset += 2; // offset is 361
		buf.writeUInt16LE(this._minNumberRounds, offset);
		offset += 2; // offset is 363
		buf.writeUInt16LE(this._maxNumberRounds, offset);
		offset += 2; // offset is 365
		buf.writeUInt16LE(this._defaultNumberRounds, offset);
		offset += 2; // offset is 367
		buf.writeUInt16LE(this._numberOfRoundsEnabled ? 1 : 0, offset);
		offset += 2; // offset is 369
		buf.writeUInt16LE(this._defaultWeather, offset);
		offset += 2; // offset is 371
		buf.writeUInt16LE(this._weatherEnabled ? 1 : 0, offset);
		offset += 2; // offset is 373
		buf.writeUInt16LE(this._defaultNight, offset);
		offset += 2; // offset is 375
		buf.writeUInt16LE(this._nightEnabled ? 1 : 0, offset);
		offset += 2; // offset is 377
		buf.writeUInt16LE(this._defaultBackwards ? 1 : 0, offset);
		offset += 2; // offset is 379
		buf.writeUInt16LE(this._backwardsEnabled ? 1 : 0, offset);
		offset += 2; // offset is 381
		buf.writeUInt16LE(this._defaultTraffic ? 1 : 0, offset);
		offset += 2; // offset is 383
		buf.writeUInt16LE(this._trafficEnabled ? 1 : 0, offset);
		offset += 2; // offset is 385
		buf.writeUInt16LE(this._defaultDriverAI ? 1 : 0, offset);
		offset += 2; // offset is 387
		buf.writeUInt16LE(this._driverAIEnabled ? 1 : 0, offset);
		offset += 2; // offset is 389
		buf.write(this._topDog, offset, 13);
		offset += 13; // offset is 402
		buf.write(this._turfOwner, offset, 33);
		offset += 33; // offset is 435
		buf.writeUInt32LE(this._qualifyingTime, offset);
		offset += 4; // offset is 439
		buf.writeUInt32LE(this._numberOfClubPlayers, offset);
		offset += 4; // offset is 443
		buf.writeUInt32LE(this._numberofClubLaps, offset);
		offset += 4; // offset is 447
		buf.writeUInt32LE(this._numberOfClubRounds, offset);
		offset += 4; // offset is 451
		buf.writeUInt16LE(this._clubNight, offset);
		offset += 2; // offset is 453
		buf.writeUInt16LE(this._clubWeather, offset);
		offset += 2; // offset is 455
		buf.writeUInt16LE(this._clubBackwards, offset);
		offset += 2; // offset is 457
		buf.writeUInt32LE(this._bestLapTime, offset);
		offset += 4; // offset is 461
		buf.writeUInt32LE(this._lobbyDifficulty, offset);
		offset += 4; // offset is 465
		buf.writeUInt32LE(this._timetrialPointsToQualify, offset);
		offset += 4; // offset is 469
		buf.writeUInt32LE(this._timetrialCashToQualify, offset);
		offset += 4; // offset is 473
		buf.writeUInt32LE(this._timetrialPointsBonusIncrements, offset);
		offset += 4; // offset is 477
		buf.writeUInt32LE(this._timetrialCashBonusIncrements, offset);
		offset += 4; // offset is 481
		buf.writeUInt32LE(this._timetrialTimeIncrements, offset);
		offset += 4; // offset is 485
		buf.writeUInt32LE(this._timetrial1stPlaceVictoryPoints, offset);
		offset += 4; // offset is 489
		buf.writeUInt32LE(this._timetrial1stPlaceVictoryCash, offset);
		offset += 4; // offset is 493
		buf.writeUInt32LE(this._timetrial2ndPlaceVictoryPoints, offset);
		offset += 4; // offset is 497
		buf.writeUInt32LE(this._timetrial2ndPlaceVictoryCash, offset);
		offset += 4; // offset is 501
		buf.writeUInt32LE(this._timetrial3rdPlaceVictoryPoints, offset);
		offset += 4; // offset is 505
		buf.writeUInt32LE(this._timetrial3rdPlaceVictoryCash, offset);
		offset += 4; // offset is 509
		buf.writeUInt16LE(this._minLevel, offset);
		offset += 2; // offset is 511
		buf.writeUInt32LE(this._minResetSlice, offset);
		offset += 4; // offset is 515
		buf.writeUInt32LE(this._maxResetSlice, offset);
		offset += 4; // offset is 519
		buf.writeUInt16LE(this._newbieFlag, offset);
		offset += 2; // offset is 521
		buf.writeUInt16LE(this._driverHelmetFlag, offset);
		offset += 2; // offset is 523
		buf.writeUInt16LE(this._clubMaxNumberPlayers, offset);
		offset += 2; // offset is 525
		buf.writeUInt16LE(this._clubMinNumberPlayers, offset);
		offset += 2; // offset is 527
		buf.writeUInt16LE(this._clubNumberPlayersDefault, offset);
		offset += 2; // offset is 529
		buf.writeUInt16LE(this._minNumberOfClubs, offset);
		offset += 2; // offset is 531
		buf.writeUInt16LE(this._maxNumberOfClubs, offset);
		offset += 2; // offset is 533
		buf.writeUInt32LE(this._racePointsFactor, offset);
		offset += 4; // offset is 537
		buf.writeUInt16LE(this._maxBodyClass, offset);
		offset += 2; // offset is 539
		buf.writeUInt16LE(this._maxPowerClass, offset);
		offset += 2; // offset is 541
		buf.writeUInt16LE(this._partsPrizeMax, offset);
		offset += 2; // offset is 543
		buf.writeUInt16LE(this._partsPrizeWon, offset);
		offset += 2; // offset is 545
		buf.writeUInt32LE(this._clubLogoId, offset);
		offset += 4; // offset is 549
		buf.writeUInt16LE(this._teamTrialsWeatherFlag ? 1 : 0, offset);
		offset += 2; // offset is 551
		buf.writeUInt16LE(this._teamTrialsNightFlag ? 1 : 0, offset);
		offset += 2; // offset is 553
		buf.writeUInt16LE(this._teamTrialsBackwardsFlag ? 1 : 0, offset);
		offset += 2; // offset is 555
		buf.writeUInt16LE(this._teamTrialsNumberLaps, offset);
		offset += 2; // offset is 557
		buf.writeUInt16LE(this._teamTrialsBaseTimeUnderPar, offset);
		offset += 2; // offset is 559
		buf.writeUInt32LE(this._raceCashFactor, offset);
		// offset is 563

		return buf;
	}

	override toString() {
		return `LobbyInfo {
    lobbyId: ${this._lobbyId},
    raceTypeId: ${this._raceTypeId},
    terfId: ${this._terfId},
    lobbyName: ${this._lobbyName},
    turfName: ${this._turfName},
    clientArt: ${this._clientArt},
    elementId: ${this._elementId},
    turfLengthId: ${this._turfLengthId},
    startSlice: ${this._startSlice},
    endSlice: ${this._endSlice},
    dragStageLeft: ${this._dragStageLeft},
    dragStageRight: ${this._dragStageRight},
    dragStagingSlice: ${this._dragStagingSlice},
    gridSpreadFactor: ${this._gridSpreadFactor},
    linear: ${this._linear},
    minNumberPlayers: ${this._minNumberPlayers},
    maxNumberPlayers: ${this._maxNumberPlayers},
    defaultNumberPlayers: ${this._defaultNumberPlayers},
    numberOfPlayersEnabled: ${this._numberOfPlayersEnabled},
    minLaps: ${this._minLaps},
    maxLaps: ${this._maxLaps},
    defaultNumberOfLaps: ${this._defaultNumberOfLaps},
    numberOfLapsEnabled: ${this._numberOfLapsEnabled},
    minNumberRounds: ${this._minNumberRounds},
    maxNumberRounds: ${this._maxNumberRounds},
    defaultNumberRounds: ${this._defaultNumberRounds},
    numberOfRoundsEnabled: ${this._numberOfRoundsEnabled},
    defaultWeather: ${this._defaultWeather},
    weatherEnabled: ${this._weatherEnabled},
    defaultNight: ${this._defaultNight},
    nightEnabled: ${this._nightEnabled},
    defaultBackwards: ${this._defaultBackwards},
    backwardsEnabled: ${this._backwardsEnabled},
    defaultTraffic: ${this._defaultTraffic},
    trafficEnabled: ${this._trafficEnabled},
    defaultDriverAI: ${this._defaultDriverAI},
    driverAIEnabled: ${this._driverAIEnabled},
    topDog: ${this._topDog},
    turfOwner: ${this._turfOwner},
    qualifyingTime: ${this._qualifyingTime},
    numberOfClubPlayers: ${this._numberOfClubPlayers},
    numberofClubLaps: ${this._numberofClubLaps},
    numberOfClubRounds: ${this._numberOfClubRounds},
    clubNight: ${this._clubNight},
    clubWeather: ${this._clubWeather},
    clubBackwards: ${this._clubBackwards},
    bestLapTime: ${this._bestLapTime},
    lobbyDifficulty: ${this._lobbyDifficulty},
    timetrialPointsToQualify: ${this._timetrialPointsToQualify},
    timetrialCashToQualify: ${this._timetrialCashToQualify},
    timetrialPointsBonusIncrements: ${this._timetrialPointsBonusIncrements},
    timetrialCashBonusIncrements: ${this._timetrialCashBonusIncrements},
    timetrialTimeIncrements: ${this._timetrialTimeIncrements},
    timetrial1stPlaceVictoryPoints: ${this._timetrial1stPlaceVictoryPoints},
    timetrial1stPlaceVictoryCash: ${this._timetrial1stPlaceVictoryCash},
    timetrial2ndPlaceVictoryPoints: ${this._timetrial2ndPlaceVictoryPoints},
    timetrial2ndPlaceVictoryCash: ${this._timetrial2ndPlaceVictoryCash},
    timetrial3rdPlaceVictoryPoints: ${this._timetrial3rdPlaceVictoryPoints},
    timetrial3rdPlaceVictoryCash: ${this._timetrial3rdPlaceVictoryCash},
    minLevel: ${this._minLevel},
    minResetSlice: ${this._minResetSlice},
    maxResetSlice: ${this._maxResetSlice},
    newbieFlag: ${this._newbieFlag},
    driverHelmetFlag: ${this._driverHelmetFlag},
    clubMaxNumberPlayers: ${this._clubMaxNumberPlayers},
    clubMinNumberPlayers: ${this._clubMinNumberPlayers},
    clubNumberPlayersDefault: ${this._clubNumberPlayersDefault},
    minNumberOfClubs: ${this._minNumberOfClubs},
    maxNumberOfClubs: ${this._maxNumberOfClubs},
    racePointsFactor: ${this._racePointsFactor},
    maxBodyClass: ${this._maxBodyClass},
    maxPowerClass: ${this._maxPowerClass},
    partsPrizeMax: ${this._partsPrizeMax},
    partsPrizeWon: ${this._partsPrizeWon},
    clubLogoId: ${this._clubLogoId},
    teamTrialsWeatherFlag: ${this._teamTrialsWeatherFlag},
    teamTrialsNightFlag: ${this._teamTrialsNightFlag},
    teamTrialsBackwardsFlag: ${this._teamTrialsBackwardsFlag},
    teamTrialsNumberLaps: ${this._teamTrialsNumberLaps},
    teamTrialsBaseTimeUnderPar: ${this._teamTrialsBaseTimeUnderPar},
    raceCashFactor: ${this._raceCashFactor},    
}`;
	}
}
