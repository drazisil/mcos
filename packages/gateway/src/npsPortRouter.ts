import type { TaggedSocket } from "./socketUtility.js";
import {
	GamePacket,
	type SerializableInterface,
} from "rusty-motors-shared-packets";
import { receiveLobbyData } from "rusty-motors-lobby";
import { receiveChatData } from "rusty-motors-chat";
import { receivePersonaData } from "rusty-motors-personas";
import { receiveLoginData } from "rusty-motors-login";
import { getServerLogger, ServerLogger } from "rusty-motors-shared";
import { BytableMessage, createRawMessage } from "@rustymotors/binary";
import { getMCOProtocolInstance } from "@rustymotors/protocol";

/**
 * Handles routing for the NPS (Network Play System) ports.
 *
 * @param taggedSocket - The socket that has been tagged with additional metadata.
 */

export async function npsPortRouter({
	taggedSocket,
	log = getServerLogger("gateway.npsPortRouter"),
}: {
	taggedSocket: TaggedSocket;
	log?: ServerLogger;
}): Promise<void> {
	const { rawSocket: socket, connectionId: id } = taggedSocket;

	const port = socket.localPort || 0;

	if (port === 0) {
		log.error(`[${id}] Local port is undefined`);
		socket.end();
		return;
	}
	log.debug(`[${id}] NPS port router started for port ${port}`);

	getMCOProtocolInstance().acceptIncomingSocket({
		connectionId: id,
		port,
		socket,
	});

	return;

	// if (port === 7003) {
	// 	// Sent ok to login packet
	// 	log.debug(`[${id}] Sending ok to login packet`);
	// 	socket.write(Buffer.from([0x02, 0x30, 0x00, 0x04]));
	// }

	// // Handle the socket connection here
	// socket.on("data", async (data) => {
	// 	try {
	// 		log.debug(`[${id}] Received data: ${data.toString("hex")}`);
	// 		const initialPacket = parseInitialMessage(data);
	// 		log.debug(`[${id}] Initial packet(str): ${initialPacket}`);
	// 		log.debug(`[${id}] initial Packet(hex): ${initialPacket.toString()}`);
	// 		await routeInitialMessage(id, port, initialPacket)
	// 			.then((response) => {
	// 				// Send the response back to the client
	// 				log.debug(
	// 					`[${id}] Sending response to socket: ${response.toString("hex")}`,
	// 				);
	// 				socket.write(response);
	// 			})
	// 			.catch((error) => {
	// 				throw new Error(
	// 					`[${id}] Error routing initial nps message: ${error}`,
	// 					{
	// 						cause: error,
	// 					},
	// 				);
	// 			});
	// 	} catch (error) {
	// 		if (error instanceof RangeError) {
	// 			log.warn(`[${id}] Error parsing initial nps message: ${error}`);
	// 		} else {
	// 			Sentry.captureException(error);
	// 			log.error(`[${id}] Error handling data: ${error}`);
	// 		}
	// 	}
	// });

	// socket.on("end", () => {
	// 	// log.debug(`[${id}] Socket closed by client for port ${port}`);
	// });

	// socket.on("error", (error) => {
	// 	if (error.message.includes("ECONNRESET")) {
	// 		log.debug(`[${id}] Connection reset by client`);
	// 		return;
	// 	}
	// 	log.error(`[${id}] Socket error: ${error}`);
	// });
}

/**
 * Parses the initial message from a buffer and returns a `GamePacket` object.
 *
 * @param data - The buffer containing the initial message data.
 * @returns A `GamePacket` object deserialized from the buffer.
 */
function parseInitialMessage(data: Buffer): BytableMessage {
	try {
		const message = createRawMessage();
		message.setVersion(1);

		// There are a few messages here that need special handling due to length
		const id = data.readUInt16BE(0);
		if ([0x217, 0x532].includes(id)) {
			message.setVersion(0);
		}
		getServerLogger("gateway.npsPortRouter/parseInitialMessage").debug(
			`Parsing initial message: ${data.toString("hex")}`,
		);

		message.deserialize(data);

		getServerLogger("gateway.npsPortRouter/parseInitialMessage").debug(
			`Parsed initial message: ${message.serialize().toString("hex")}`,
		);
		return message;
	} catch (error) {
		const err = new Error(`Error parsing initial message: ${error}`, {
			cause: error,
		});
		getServerLogger("gateway.npsPortRouter/parseInitialMessage").error(
			(err as Error).message,
		);
		throw err;
	}
}

/**
 * Routes the initial message to the appropriate handler based on the port number.
 * Handles different types of packets such as lobby data, login data, chat data, and persona data.
 * Logs the routing process and the number of responses sent back to the client.
 *
 * @param id - The connection ID of the client.
 * @param port - The port number to determine the type of packet.
 * @param initialPacket - The initial packet received from the client.
 * @param log - The logger to use for logging messages.
 * @returns A promise that resolves to a Buffer containing the serialized responses.
 */
async function routeInitialMessage(
	id: string,
	port: number,
	initialPacket: BytableMessage,
	log = getServerLogger("gateway.npsPortRouter/routeInitialMessage"),
): Promise<Buffer> {
	// Route the initial message to the appropriate handler
	// Messages may be encrypted, this will be handled by the handler

	log.debug(`Routing message for port ${port}: ${initialPacket.toString()}`);

	const packet = new GamePacket();
	packet.deserialize(initialPacket.serialize());

	let responses: SerializableInterface[] = [];

	switch (port) {
		case 7003:
			// Handle lobby packet
			log.debug(
				`[${id}] Passing packet to lobby handler: ${packet.serialize().toString("hex")}`,
			);
			responses = (
				await receiveLobbyData({ connectionId: id, message: initialPacket })
			).messages;
			log.debug(`[${id}] Lobby Responses: ${responses.map((r) => r.serialize().toString("hex"))}`);
			break;
		case 8226:
			// Handle login packet
			log.debug(
				`[${id}] Passing packet to login handler: ${packet.serialize().toString("hex")}`,
			);
			responses = (
				await receiveLoginData({ connectionId: id, message: initialPacket })
			).messages;
			log.debug(`[${id}] Login Responses: ${responses.map((r) => r.serialize().toString("hex"))}`);
			break;
		case 8227:
			// Handle chat packet
			log.debug(
				`[${id}] Passing packet to chat handler: ${packet.serialize().toString("hex")}`,
			);
			responses = (await receiveChatData({ connectionId: id, message: packet }))
				.messages;
			log.debug(`[${id}] Chat Responses: ${responses.map((r) => r.serialize().toString("hex"))}`);
			break;
		case 8228:
			log.debug(
				`[${id}] Passing packet to persona handler: ${packet.serialize().toString("hex")}`,
			);
			// responses =Handle persona packet
			responses = (
				await receivePersonaData({ connectionId: id, message: packet })
			).messages;
			log.debug(`[${id}] Persona Responses: ${responses.map((r) => r.serialize().toString("hex"))}`);
			break;
		default:
			// No handler
			log.warn(
				`${id}] No handler found for port ${port}: ${packet.serialize().toString("hex")}`,
			);
			break;
	}

	// Send responses back to the client
	log.debug(`[${id}] Sending ${responses.length} responses`);

	// Serialize the responses
	const serializedResponses = responses.map((response) => response.serialize());

	return Buffer.concat(serializedResponses);
}
