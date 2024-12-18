/**
 * Commands from the game client to the login server
 * @export
 * @readonly
 * @type {TNPS_COMMAND_MAP[]}
 */

import { GameMessageOpCode } from "rusty-motors-shared";

export const NPS_LOGINCLIENT_COMMANDS: GameMessageOpCode[] = [
	{ name: "NPS_USER_LOGIN", value: 1281, module: "Login" },
	{ name: "NPS_GAME_LOGIN", value: 1282, module: "Login" },
	{ name: "NPS_REGISTER_GAME_LOGIN", value: 1283, module: "Login" },
	{ name: "NPS_SET_GAME_BLOB", value: 1284, module: "Login" },
	{ name: "NPS_GET_NEXT_SERVER", value: 1285, module: "Login" },
	{ name: "NPS_NEW_EA_ACCOUNT", value: 1286, module: "Login" },
	{ name: "NPS_NEW_GAME_ACCOUNT", value: 1287, module: "Login" },
	{ name: "NPS_UPDATE_EA_ACCOUNT", value: 1288, module: "Login" },
	{ name: "NPS_UPDATE_GAME_ACCOUNT", value: 1289, module: "Login" },
	{ name: "NPS_LOCATE_PLAYER", value: 1290, module: "Login" },
	{ name: "NPS_GET_BUDDY_LIST", value: 1291, module: "Login" },
	{ name: "NPS_ADD_BUDDY_LIST", value: 1292, module: "Login" },
	{ name: "NPS_DELETE_BUDDY_LIST", value: 1293, module: "Login" },
	{ name: "NPS_CLEAR_BUDDY_LIST", value: 1294, module: "Login" },
	{ name: "NPS_REGISTER_GAME_LOGOUT", value: 1295, module: "Login" },
	{ name: "NPS_GET_GENERIC_HS_DATA", value: 1296, module: "Login" },
	{ name: "NPS_PUT_GENERIC_HS_DATA", value: 1297, module: "Login" },
	{ name: "NPS_DELETE_GAME_PERSONA", value: 1298, module: "Login" },
	{ name: "NPS_READ_SERVER_DATA_LIST", value: 1299, module: "Login" },
	{ name: "NPS_DELETE GENERIC_HS_DATA", value: 1300, module: "Login" },
	{ name: "NPS_GET_PLAYER_RANK", value: 1301, module: "Login" },
	{ name: "NPS_GET_TOP_PLAYERS", value: 1302, module: "Login" },
	{ name: "NPS_ADD_BUDDY_BY_NAME", value: 1303, module: "Login" },
	{ name: "NPS_GET_BUDDY_INFO", value: 1304, module: "Login" },
	{ name: "NPS_GET_PERSONA_INFO", value: 1305, module: "Login" },
	{ name: "NPS_GET_LEADER_BOARD", value: 1306, module: "Login" },
	{ name: "NPS_SRP_USERNAME", value: 1307, module: "Login" },
	{ name: "NPS_SRP_NGS", value: 1308, module: "Login" },
	{ name: "NPS_SRP_A", value: 1309, module: "Login" },
	{ name: "NPS_SRP_B", value: 1310, module: "Login" },
	{ name: "NPS_SRP_USER_VERIFY", value: 1311, module: "Login" },
	{ name: "NPS_SRP_SERVER_VERIFY", value: 1312, module: "Login" },
	{ name: "NPS_FILE_BUG_REPORT", value: 1313, module: "Login" },
	{ name: "NPS_GET_GENERIC_FIELD_RANKING", value: 1314, module: "Login" },
	{ name: "NPS_SEND_EMAIL", value: 1315, module: "Login" },
	{ name: "NPS_RECEIVE_EMAIL", value: 1316, module: "Login" },
	{ name: "NPS_DELETE_EMAILS", value: 1317, module: "Login" },
	{ name: "NPS_LIST_EMAILS", value: 1318, module: "Login" },
	{ name: "NPS_AAI_REQUEST", value: 1328, module: "Login" },
	{ name: "NPS_AAI_CRACK", value: 1329, module: "Login" },
	{ name: "NPS_GET_PERSONA_MAPS", value: 1330, module: "Login" },
	{ name: "NPS_VALIDATE_PERSONA_NAME", value: 1331, module: "Login" },
	{ name: "NPS_CHECK_TOKEN", value: 1332, module: "Login" },
	{ name: "NPS_GET_USER_STATUS", value: 1333, module: "Login" },
];
