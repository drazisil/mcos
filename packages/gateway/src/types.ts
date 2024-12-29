import type { Socket } from "net";
import type { Configuration, ServerLogger } from "rusty-motors-shared";
import http from "node:http";

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

export type WebHandlerResponse = {
	headers: { [key: string]: string };
	body: unknown;
};

export type WebHandler = (
	request: http.IncomingMessage,
	response: http.ServerResponse,
) => WebHandlerResponse;
