import type { TaggedSocket } from "./socketUtility.js";
import {
	ServerPacket,
	type SerializableInterface,
} from "rusty-motors-shared-packets";
import { receiveTransactionsData } from "rusty-motors-transactions";
import { logger, type Logger } from "rusty-motors-utilities";
const defaultLogger = logger.child({ name: "GatewayServer" });
import * as Sentry from "@sentry/node";

/**
 * Handles the routing of messages for the MCOTS (Motor City Online Transaction Server) ports.
 *
 * @param taggedSocket - The socket object that contains the tagged information for routing.
 */

export async function mcotsPortRouter({
	taggedSocket,
	log = defaultLogger,
}: {
	taggedSocket: TaggedSocket;
	log?: Logger;
}): Promise<void> {
	const { socket, id } = taggedSocket;

	const port = socket.localPort || 0;

	if (port === 0) {
		log.error(`[${id}] Local port is undefined`);
		socket.end();
		return;
	}

	log.debug(`[${taggedSocket.id}] MCOTS port router started for port ${port}`);

	// Handle the socket connection here
	socket.on("data", async (data) => {
		try {
			log.debug(`[${id}] Received data: ${data.toString("hex")}`);
			const initialPacket = parseInitialMessage(data);
			log.debug(`[${id}] Initial packet(str): ${initialPacket}`);
			log.debug(`[${id}] initial Packet(hex): ${initialPacket.toHexString()}`);
			await routeInitialMessage(id, port, initialPacket)
				.then((response) => {
					// Send the response back to the client
					log.debug(`[${id}] Sending response: ${response.toString("hex")}`);
					socket.write(response);
				})
				.catch((error) => {
					throw new Error(
						`[${id}] Error routing initial mcots message: ${error}`,
						{
							cause: error,
						},
					);
				});
		} catch (error) {
			Sentry.captureException(error);
			log.error(`[${id}] Error handling data: ${error}`);
		}
	});

	socket.on("end", () => {
		log.debug(`[${id}] Socket closed`);
	});

	socket.on("error", (error) => {
		log.error(`[${id}] Socket error: ${error}`);
	});
}

function parseInitialMessage(data: Buffer): ServerPacket {
	const initialPacket = new ServerPacket();
	initialPacket.deserialize(data);
	return initialPacket;
}

async function routeInitialMessage(
	id: string,
	port: number,
	initialPacket: ServerPacket,
	log = defaultLogger,
): Promise<Buffer> {
	// Route the initial message to the appropriate handler
	// Messages may be encrypted, this will be handled by the handler

	log.debug(`Routing message for port ${port}: ${initialPacket.toHexString()}`);
	let responses: SerializableInterface[] = [];

	switch (port) {
		case 43300:
			// Handle transactions packet
			responses = (
				await receiveTransactionsData({
					connectionId: id,
					message: initialPacket,
				})
			).messages;
			break;
		default:
			console.log(`No handler found for port ${port}`);
			break;
	}

	// Send responses back to the client
	log.debug(`[${id}] Sending ${responses.length} responses`);

	// Serialize the responses
	const serializedResponses = responses.map((response) => response.serialize());

	return Buffer.concat(serializedResponses);
}
