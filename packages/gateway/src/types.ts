import type { Socket } from "net";
import type { Configuration, ServerLogger } from "rusty-motors-shared";

/**
 * Options for the GatewayServer.
 */
export type GatewayOptions = {
	config?: Configuration;
	log?: ServerLogger;
	backlogAllowedCount?: number;
	listeningPortList?: number[];
	socketConnectionHandler?: ({
		incomingSocket,
		log,
	}: {
		incomingSocket: Socket;
		log?: ServerLogger;
	}) => void;
};
