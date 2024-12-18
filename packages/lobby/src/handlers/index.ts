import { handleEncryptedNPSCommand } from "./encryptedCommand.js";
import { _npsHeartbeat } from "./heartbeat.js";
import { _npsRequestGameConnectServer } from "./requestConnectGameServer.js";

export const handlerMap = [
	{
		opCode: 100,
		name: "Connect game server",
		handler: _npsRequestGameConnectServer,
	},
	{ opCode: 217, name: "Heartbeat", handler: _npsHeartbeat },
	{
		opCode: 1101,
		name: "Encrypted command",
		handler: handleEncryptedNPSCommand,
	},
];
