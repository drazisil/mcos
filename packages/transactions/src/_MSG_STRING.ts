/**
 * Return the string representation of the numeric opcode
 *
 * @param {number} messageID
 * @return {string}
 */
export function _MSG_STRING(messageID: number): string {
	const messageIds = [
		{ id: 105, name: "MC_LOGIN" }, // 0x69
		{ id: 106, name: "MC_LOGOUT" }, // 0x6a
		{ id: 108, name: "MC_GET_PLAYER_INFO" }, // 0x6c
		{ id: 109, name: "MC_SET_OPTIONS" }, // 0x6d
		{ id: 122, name: "MC_PLAYER_INFO" }, // 0x7a"}
		{ id: 141, name: "MC_STOCK_CAR_INFO" }, // 0x8d
        { id: 142, name: "MC_PURCHASE_STOCK_CAR" }, // 0x8e
		{ id: 145, name: "MC_GET_COMPLETE_VEHICLE_INFO" }, // 0x91
		{ id: 163, name: "MC_UPDATE_CACHED_VEHICLE" }, // 0xa3
		{ id: 172, name: "MC_GET_OWNED_VEHICLES" }, // 0xac"}
		{ id: 173, name: "MC_OWNED_VEHICLES_LIST" }, // 0xad"}
		{ id: 174, name: "MC_GET_OWNED_PARTS" }, // 0xae"}
		{ id: 213, name: "MC_LOGIN_COMPLETE" }, // 0xd5
		{ id: 264, name: "MC_GET_PLAYER_PHYSICAL" }, // 0x108
		{ id: 265, name: "MC_PLAYER_PHYSICAL_INFO" }, // 0x109
		{ id: 363, name: "MC_GET_GAME_URLS" }, // 0x16b"}
		{ id: 266, name: "MC_UPDATE_PLAYER_PHYSICAL" }, // 0x10a
		{ id: 322, name: "MC_GET_ARCADE_CARS" }, // 0x142"}
		{ id: 324, name: "MC_GET_LOBBIES" }, // 0x144
		{ id: 325, name: "MC_LOBBIES" }, // 0x145
		{ id: 361, name: "MC_GET_PLAYER_RACING_HISTORY" }, // 0x169"}
		{ id: 362, name: "MC_PLAYER_RACING_HISTORY" }, // 0x16a"}
		{ id: 389, name: "MC_GET_MCO_TUNABLES" }, // 0x185"}
		{ id: 391, name: "MC_CLUB_GET_INVITATIONS" }, // 0x187
		{ id: 438, name: "MC_CLIENT_CONNECT_MSG" }, // 0x1b6
		{ id: 440, name: "MC_TRACKING_MSG" },
	];
	const result = messageIds.find((id) => id.id === messageID);

	if (typeof result !== "undefined") {
		return result.name;
	}

	return "Unknown";
}
