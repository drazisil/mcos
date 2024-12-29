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

import { OldServerMessage, ServerLogger  } from "rusty-motors-shared";
import { ServerMessage } from "rusty-motors-shared";
import { _getArcadeCarInfo } from "./_getArcadeCarInfo.js";
import { _getGameUrls } from "./_getGameUrls.js";
import { _getOwnedParts } from "./_getOwnedParts.js";
import { _getOwnedVehicles } from "./_getOwnedVehicles.js";
import { _getPlayerInfo } from "./_getPlayerInfo.js";
import { _getPlayerPhysical } from "./_getPlayerPhysical.js";
import { _getPlayerRaceHistory } from "./_getPlayerRaceHistory.js";
import { _getStockCarInfo } from "./_getStockCarInfo.js";
import { _getTunables } from "./_getTunables.js";
import { _logout } from "./_logout.js";
import { clientConnect } from "./clientConnect.js";
import { getLobbies } from "./getLobbies.js";
import { login } from "./login.js";
import { trackingPing } from "./trackingPing.js";
import { _buyCarFromDealer } from "./_buyCarFromDealer.js";

export interface MessageHandlerArgs {
	connectionId: string;
	packet: OldServerMessage;
	log?: ServerLogger;
}

export interface MessageHandlerResult {
	connectionId: string;
	messages: OldServerMessage[] | ServerMessage[];
}

export interface MessageHandler {
	name: string;
	handler: (args: MessageHandlerArgs) => Promise<MessageHandlerResult>;
}

export const messageHandlers: MessageHandler[] = [
	{
		name: "MC_TRACKING_MSG",
		handler: trackingPing,
	},
	{
		name: "MC_CLIENT_CONNECT_MSG",
		handler: clientConnect,
	},
	{
		name: "MC_LOGIN",
		handler: login,
	},
	{
		name: "MC_LOGOUT",
		handler: _logout,
	},
	// {
	// 	name: "MC_GET_COMPLETE_VEHICLE_INFO",
	// 	handler: _getFullCarInfo,
	// }
	{
		name: "MC_GET_LOBBIES",
		handler: getLobbies,
	},
	{
		name: "MC_STOCK_CAR_INFO",
		handler: _getStockCarInfo,
	},
	{
		name: "MC_GET_ARCADE_CARS",
		handler: _getArcadeCarInfo,
	},
	{
		name: "MC_GET_GAME_URLS",
		handler: _getGameUrls,
	},
	{
		name: "MC_GET_MCO_TUNABLES",
		handler: _getTunables,
	},
	{
		name: "MC_GET_OWNED_VEHICLES",
		handler: _getOwnedVehicles,
	},
	{
		name: "MC_GET_PLAYER_INFO",
		handler: _getPlayerInfo,
	},
	{
		name: "MC_GET_PLAYER_PHYSICAL",
		handler: _getPlayerPhysical,
	},
	{
		name: "MC_GET_OWNED_PARTS",
		handler: _getOwnedParts,
	},
	{
		name: "MC_GET_PLAYER_RACING_HISTORY",
		handler: _getPlayerRaceHistory,
	},
	{
		name: "MC_PURCHASE_STOCK_CAR",
		handler: _buyCarFromDealer,
	}
];
