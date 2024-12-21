// 030c0004cdcdcdcd

import { getLobMiniRiffList } from "./getLobMiniRiffList.js";
import { getLobMiniUserList } from "./getLobMiniUserList.js";

// 0128000800000000

export type lobbyCommandProcessor = (
	commandId: number,
	data: Buffer,
) => Promise<Buffer>;

export const lobbyCommandMap = new Map<number, lobbyCommandProcessor>();
lobbyCommandMap.set(0x30c, getLobMiniRiffList);
lobbyCommandMap.set(0x128, getLobMiniUserList);
