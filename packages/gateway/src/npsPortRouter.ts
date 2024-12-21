import type { TaggedSocket } from "./socketUtility.js";
import {
	GamePacket,
	type SerializableInterface,
} from "rusty-motors-shared-packets";
import { receiveLobbyData } from "rusty-motors-lobby";
import { receiveChatData } from "rusty-motors-chat";
import { receivePersonaData } from "rusty-motors-personas";
import { receiveLoginData } from "rusty-motors-login";
import { logger, type Logger } from "rusty-motors-logger";
const defaultLogger = logger.child({ name: "gatewayServer.npsPortRouter" });
import * as Sentry from "@sentry/node";

type gamePacketHandler = (arg0: {
	connectionId: string;
	message: GamePacket;
	log?: Logger;
}) => Promise<{ connectionId: string; messages: SerializableInterface[] }>;

const npsPortHandlers = new Map<number, gamePacketHandler>();
npsPortHandlers.set(7003, receiveLobbyData);
npsPortHandlers.set(8226, receiveLoginData);
npsPortHandlers.set(8227, receiveChatData);
npsPortHandlers.set(8228, receivePersonaData);

const socketConnectionPool = new Map<string, TaggedSocket>();

function validatePort(
	port: number | undefined,
	id: string,
	log: Logger,
): boolean {
	if (typeof port === "undefined") {
		log.error(`[${id}] Local port is undefined`);
		return false;
	}
	return true;
}


/**
 * Handles routing for the NPS (Network Play System) ports.
 *
 * @param taggedSocket - The socket that has been tagged with additional metadata.
 */

export async function npsPortRouter({
	taggedSocket,
	log = defaultLogger,
}: {
	taggedSocket: TaggedSocket;
	log?: Logger;
}): Promise<void> {
	const { socket, id } = taggedSocket;

	if (!validatePort(socket.localPort, id, log)) {
		socket.end();
		return;
	}

	// At this point, we know that the port is defined
	const port: number = socket.localPort!;
	
	socketConnectionPool.set(id, taggedSocket);
	
	if (!npsPortHandlers.has(port)) {
		log.error(`[${id}] No handler found for port ${port}`);
		socket.end();
	}

	maybeSendQueueLoginOk(port, log, id, taggedSocket);


	socket.on("data", async (data) =>
		handleSocketData(data, id, port, socket, log),
	);
	socket.on("end", () => log.debug(`[${id}] Socket closed`));
	socket.on("error", (error) => log.error(`[${id}] Socket error: ${error}`));
}

function maybeSendQueueLoginOk(port: number, log: Logger, id: string, taggedSocket: TaggedSocket) {
	if (port === 7003) {
		// Sent ok to login packet
		log.debug(`[${id}] Sending ok to login packet`);
		taggedSocket.socket.write(Buffer.from([0x02, 0x30, 0x00, 0x00]));
	}
}

async function handleSocketData(
	data: Buffer,
	id: string,
	port: number,
	socket: TaggedSocket["socket"],
	log: Logger,
) {
	try {
		log.debug(`[${id}] Received data: ${data.toString("hex")}`);
		const initialPacket = parseInitialMessage(id, data);
		log.debug(`[${id}] Initial packet(hex): ${initialPacket.toHexString()}`);
		const response = await routeInitialMessage(id, port, initialPacket);
		log.debug(`[${id}] Sending response: ${response.toString("hex")}`);
		socket.write(response);
	} catch (error) {
		handleError(error, id, log);
	}
}

function handleError(error: unknown, id: string, log: Logger) {
	if (error instanceof RangeError) {
		log.warn(`[${id}] Error parsing initial nps message: ${error}`);
	} else {
		Sentry.captureException(error);
		log.error(`[${id}] Error handling data: ${error}`);
	}
}

/**
 * Parses the initial message from a buffer and returns a GamePacket instance.
 *
 * @param data - The buffer containing the initial message data.
 * @returns A GamePacket instance with the deserialized data.
 */
export function parseInitialMessage(id: string, data: Buffer): GamePacket {
	const initialPacket = new GamePacket({ connectionId: id });
	initialPacket.deserialize(data);
	return initialPacket;
}

async function routeInitialMessage(
	id: string,
	port: number,
	initialPacket: GamePacket,
	log = defaultLogger,
): Promise<Buffer> {
	// Route the initial message to the appropriate handler
	// Messages may be encrypted, this will be handled by the handler

	log.debug(`Routing message for port ${port}: ${initialPacket.toHexString()}`);
	let responses: SerializableInterface[] = [];



	const handler = npsPortHandlers.get(port);
	if (handler) {
		responses = (await handler({ connectionId: id, message: initialPacket }))
			.messages;
	} else {
		log.error(`No handler found for port ${port}`);
		return Buffer.alloc(0);
	}

	// Send responses back to the client
	log.debug(`[${id}] Sending ${responses.length} responses`);

	// Serialize the responses
	const serializedResponses = responses.map((response) => response.serialize());

	return Buffer.concat(serializedResponses);
}
