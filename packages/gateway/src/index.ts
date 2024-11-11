// mcos is a game server, written from scratch, for an old game
// Copyright (C) <2017>  <Drazi Crendraven>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import { Socket } from "node:net";
import { randomUUID } from "node:crypto";
import { tagSocketWithId } from "./socketUtility.js";
import { getPortRouter } from "./portRouters.js";
import pino, { Logger } from "pino";
const defaultLogger = pino({ name: "gatewayServer" });


/**
 * Handle incoming TCP connections
 *
 * @param {object} options
 * @param {Socket} options.incomingSocket The incoming socket
 * @param {Logger} [options.log=getServerLogger({ name: "onDataHandler" })] The logger to use
 *
 */
export function onSocketConnection({
	incomingSocket,
	log = defaultLogger,
}: {
	incomingSocket: Socket;
	log?: Logger;
}) {
	// Get the local port and remote address
	const { localPort, remoteAddress } = incomingSocket;

	// If the local port or remote address is undefined, throw an error
	if (localPort === undefined || remoteAddress === undefined) {
		throw Error("localPort or remoteAddress is undefined");
	}

	const socketWithId = tagSocketWithId(
		incomingSocket,
		Date.now(),
		randomUUID(),
	);

	/*
	 * At this point, we have a tagged socket with an ID.
	 */

	const portRouter = getPortRouter(localPort);

	// Hand the socket to the port router
	portRouter({ taggedSocket: socketWithId })
		.then(() => {
			log.debug(`[${socketWithId.id}] Port router finished`);
		})
		.catch((error) => {
			throw new Error(`[${socketWithId.id}] Error in port router: ${error}`, {
				cause: error,
			});
		});

	// // Should end here

	// try {
	// 	// Get expected message type
	// 	const messageType = getPortMessageType(localPort);
	// 	log.debug(`[${socketWithId.id}] Expected message type: ${messageType}`);

	// 	switch (messageType) {
	// 		case "Game": {
	// 			// Handle game messages
	// 			// Create a new user status
	// 			const userStatus = UserStatusManager.newUserStatus();
	// 			log.debug(`[${socketWithId.id}] Created new user status`);

	// 			UserStatusManager.addUserStatus(userStatus);
	// 			log.debug(`[${socketWithId.id}] Added user status to manager`);

	// 			break;
	// 		}

	// 		case "Server": {
	// 			// Handle server messages
	// 			break;
	// 		}

	// 		default: {
	// 			log.warn(`[${socketWithId.id}] No message type found`);
	// 			break;
	// 		}
	// 	}
	// } catch (error) {
	// 	log.error(`[${socketWithId.id}] Error handling socket: ${error}`);
	// }

	// socketWithId.socket.on("error", (error) =>
	// 	socketErrorHandler({ connectionId: socketWithId.id, error }),
	// );

	// // Add the data handler to the socket
	// socketWithId.socket.on("data", (data) => {
	// 	socketDataHandler(socketWithId, data, log);
	// });

	// log.debug(
	// 	`[${socketWithId.id}] Socket connection established on port ${localPort} from ${remoteAddress}`,
	// );

	// if (localPort === 7003) {
	// 	// Sent ok to login packet
	// 	log.debug(`[${socketWithId.id}] Sending ok to login packet`);
	// 	socketWithId.socket.write(Buffer.from([0x02, 0x30, 0x00, 0x00]));
	// }
}

// function socketDataHandler(
// 	taggedSocket: TaggedSocket,
// 	incomingDataAsBuffer: Buffer,
// 	log: ServerLogger,
// ) {
// 	log.trace(
// 		`[${taggedSocket.id}] Received data: ${incomingDataAsBuffer.toString("hex")}`,
// 	);

// 	// This is a new TCP socket, so it's probably not using HTTP
// 	// Let's look for a port onData handler
// 	/** @type {OnDataHandler | undefined} */
// 	const portOnDataHandler: OnDataHandler | undefined = getOnDataHandler(
// 		fetchStateFromDatabase(),
// 		taggedSocket.socket.localPort || 0,
// 	);

// 	// If there is no onData handler, log a warning and return
// 	if (!portOnDataHandler) {
// 		log.warn(
// 			`[${taggedSocket.id}] No onData handler found for port ${taggedSocket.socket.localPort}`,
// 		);
// 		return;
// 	}

// 	// Deserialize the raw message
// 	const rawMessage = new BasePacket({
// 		connectionId: taggedSocket.id,
// 		messageId: 0,
// 		sequence: 0,
// 		messageSource: "",
// 	});
// 	rawMessage.deserialize(incomingDataAsBuffer);

// 	// Log the raw message
// 	log.trace(`[${taggedSocket.id}] Raw message: ${rawMessage.toHexString()}`);

// 	log.debug(
// 		`[${taggedSocket.id}] Handling data with ${portOnDataHandler.name}`,
// 	);

// 	Sentry.startSpan(
// 		{
// 			name: "onDataHandler",
// 			op: "onDataHandler",
// 		},
// 		async () => {
// 			portOnDataHandler({
// 				connectionId: taggedSocket.id,
// 				message: rawMessage,
// 			})
// 				.then((response: ServiceResponse) => {
// 					log.debug(
// 						`[${taggedSocket.id}] Data handler returned with ${response.messages.length} messages`,
// 					);
// 					const { messages } = response;

// 					// Log the messages
// 					log.trace(
// 						`[${taggedSocket.id}] Messages: ${messages.map((m) => m.toString()).join(", ")}`,
// 					);

// 					// Serialize the messages
// 					const serializedMessages = messages.map((m) => m.serialize());

// 					try {
// 						// Send the messages
// 						serializedMessages.forEach((m) => {
// 							taggedSocket.socket.write(m);
// 							log.trace(
// 								`[${taggedSocket.id}] Sent message: ${m.toString("hex")}`,
// 							);
// 						});
// 					} catch (error) {
// 						const err = new Error(
// 							`[${taggedSocket.id}] Error sending messages: ${(error as Error).message}`,
// 							{ cause: error },
// 						);
// 						throw err;
// 					}
// 				})
// 				.catch((error: Error) => {
// 					const err = new Error(
// 						`[${taggedSocket.id}] Error in onData handler: ${error.message}`,
// 						{
// 							cause: error,
// 						},
// 					);
// 					log.fatal(`${err.message}`);
// 					const id = Sentry.captureException(err);
// 					console.trace(error);
// 					log.fatal(`Sentry event ID: ${id}`);
// 					void getGatewayServer({}).stop();
// 					Sentry.flush(200).then(() => {
// 						log.debug("Sentry flushed");
// 						// Call server shutdown
// 						void getGatewayServer({}).shutdown();
// 					});
// 				});
// 		},
// 	);
// }
