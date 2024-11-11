import type { Socket } from "net";
import { Logger } from "pino";
import type { Configuration } from "rusty-motors-shared";

/**
 * Options for the GatewayServer.
 */
export type GatewayOptions = {
	config?: Configuration;
	log?: Logger;
	backlogAllowedCount?: number;
	listeningPortList?: number[];
	socketConnectionHandler?: ({
		incomingSocket,
		log,
	}: {
		incomingSocket: Socket;
		log?: Logger;
	}) => void;
};
