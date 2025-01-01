import type { TaggedSocket } from "./socketUtility.js";
import { getServerLogger, ServerLogger } from "rusty-motors-shared";

type PortRouter = (portRouterArgs: {
	taggedSocket: TaggedSocket;
	log?: ServerLogger;
}) => Promise<void>;

/**
 * A map that associates port numbers with their corresponding router functions.
 * Each router function takes a `Socket` object as an argument and returns a `Promise<void>`.
 */
const portRouters = new Map<number, PortRouter>();

/**
 * Registers a router function for a specific port.
 *
 * @param port - The port number to associate with the router.
 * @param router - A function that handles the socket connection for the specified port.
 */

export function addPortRouter(port: number, router: PortRouter) {
	if (!Number.isInteger(port) || port < 0 || port > 65535) {
		throw new Error(`Invalid port number: ${port}`);
	}
	portRouters.set(port, router);
}
/**
 * Handles the case where no router is found for the given socket.
 *
 * This function will terminate the socket connection and throw an error
 * indicating that no router was found for the port.
 *
 * @param taggedSocket - The socket connection that could not be routed.
 * @throws {Error} Throws an error indicating no router was found for the port.
 */

async function notFoundRouter({
	taggedSocket,
	log = getServerLogger("gateway.notFoundRouter"),
}: {
	taggedSocket: TaggedSocket;
	log?: ServerLogger;
}) {
	taggedSocket.socket.on("error", (error) => {
		console.error(`[${taggedSocket.id}] Socket error: ${error}`);
	});
	taggedSocket.socket.end();
	log.error(
		`[${taggedSocket.id}] No router found for port ${taggedSocket.socket.localPort}`,
	);
}
/**
 * Retrieves the router function associated with a given port.
 *
 * @param port - The port number for which to retrieve the router.
 * @returns A function that takes a socket and returns a promise resolving to void.
 *          If no router is found for the given port, returns the `notFoundRouter` function.
 */

export function getPortRouter(port: number): PortRouter {
	if (!Number.isInteger(port) || port < 0 || port > 65535) {
		throw new Error(`Invalid port number: ${port}`);
	}
	const router = portRouters.get(port);
	if (typeof router === "undefined") {
		return notFoundRouter;
	}
	return router;
}

/**
 * Clears all entries from the portRouters map.
 *
 * This function removes all key-value pairs from the portRouters map,
 * effectively resetting it to an empty state.
 */
export function clearPortRouters() {
	portRouters.clear();
}
