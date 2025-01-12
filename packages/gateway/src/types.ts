import type { TaggedSocket } from "./socketUtility.js";
import type { Configuration, ServerLogger } from "rusty-motors-shared";
import type { Socket } from "node:net";

export type PortRouterArgs = {
	taggedSocket: TaggedSocket;
	log?: ServerLogger;
};

export type PortRouter = (portRouterArgs: PortRouterArgs) => Promise<void>;

export interface GatewayOptions {
	config?: Configuration;
	log?: ServerLogger;
	backlogAllowedCount?: number;
	listeningPortList?: number[];
	socketConnectionHandler?: ({
		incomingSocket,
		log,
	}: { incomingSocket: Socket; log?: ServerLogger }) => void;
}
