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

import { randomUUID } from "node:crypto";
import {
	type OnDataHandler,
	type ServerLogger,
	type ServiceResponse,
	addSocket,
	fetchStateFromDatabase,
	getOnDataHandler,
	removeSocket,
	wrapSocket,
} from "rusty-motors-shared";
import { getServerLogger } from "rusty-motors-shared";

import { Socket } from "node:net";
import { getGatewayServer } from "./GatewayServer.js";
import { getPortMessageType, UserStatusManager } from "rusty-motors-nps";
import { BasePacket } from "rusty-motors-shared-packets";
import * as Sentry from "@sentry/node";

/**
 * @typedef {object} OnDataHandlerArgs
 * @property {object} args
 * @property {string} args.connectionId The connection id of the socket that
 *                                  received the data.
 * @property {module:packages/shared/RawMessage} args.message The data that was received.
 * @property {module:shared/log.ServerLogger} [args.log=getServerLogger({ name: "gateway" })] The logger to use.
 *                                                                    response
 *                                                                to the
 *                                                           data.
 */

/**
 * @typedef {function} OnDataHandler
 * @param {OnDataHandlerArgs} args The arguments for the handler.
 * @returns {ServiceResponse} The
 *                                                                     response
 *                                                                  to the
 *                                                            data.
 */

/**
 * Handle socket errors
 */
export function socketErrorHandler({
	connectionId,
	error,
	log = getServerLogger({
		name: "socketErrorHandler",
	}),
}: {
	connectionId: string;
	error: NodeJS.ErrnoException;
	log?: ServerLogger;
}) {
	// Handle socket errors
	if (error.code == "ECONNRESET") {
		log.debug(`Connection ${connectionId} reset`);
		return;
	}
	throw Error(`Socket error: ${error.message} on connection ${connectionId}`);
}

/**
 * Handle the end of a socket connection
 *
 * @param {object} options
 * @param {string} options.connectionId The connection ID
 * @param {import("pino").Logger} [options.log=getServerLogger({ name: "socketEndHandler" })] The logger to use
 */
export function socketEndHandler({
	connectionId,
	log = getServerLogger({
		name: "socketEndHandler",
	}),
}: {
	connectionId: string;
	log?: ServerLogger;
}) {
	log.debug(`Connection ${connectionId} ended`);

	// Remove the socket from the global state
	removeSocket(fetchStateFromDatabase(), connectionId).save();
}

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
	log = getServerLogger({
		name: "onDataHandler",
	}),
}: {
	incomingSocket: Socket;
	log?: ServerLogger;
}) {
	// Get the local port and remote address
	const { localPort, remoteAddress } = incomingSocket;

	if (localPort === undefined || remoteAddress === undefined) {
		throw Error("localPort or remoteAddress is undefined");
	}

	// This is a new connection so generate a new connection ID
	const newConnectionId = randomUUID();

	// Wrap the socket and add it to the global state
	const wrappedSocket = wrapSocket(incomingSocket, newConnectionId);

	// Add the socket to the global state
	addSocket(fetchStateFromDatabase(), wrappedSocket).save();

	// =======================
	// Handle incoming socket in shadow mode
	// =======================

	try {
		// Get expected message type
		const messageType = getPortMessageType(localPort);
		log.debug(`[${newConnectionId}] Expected message type: ${messageType}`);

		switch (messageType) {
			case "Game": {
				// Handle game messages
				// Create a new user status
				const userStatus = UserStatusManager.newUserStatus();
				log.debug(`[${newConnectionId}] Created new user status`);

				UserStatusManager.addUserStatus(userStatus);
				log.debug(`[${newConnectionId}] Added user status to manager`);

				break;
			}

			case "Server": {
				// Handle server messages
				break;
			}

			default: {
				log.warn(`[${newConnectionId}] No message type found`);
				break;
			}
		}
	} catch (error) {
		log.error(`[${newConnectionId}] Error handling socket: ${error}`);
	}

	// This is a new TCP socket, so it's probably not using HTTP
	// Let's look for a port onData handler
	/** @type {OnDataHandler | undefined} */
	const portOnDataHandler: OnDataHandler | undefined = getOnDataHandler(
		fetchStateFromDatabase(),
		localPort,
	);

	// Throw an error if there is no onData handler
	if (!portOnDataHandler) {
		log.warn(`No onData handler for port ${localPort}`);
		return;
	}

	incomingSocket.on("error", (error) =>
		socketErrorHandler({ connectionId: newConnectionId, error }),
	);

	// Add the data handler to the socket
	incomingSocket.on(
		"data",
		function socketDataHandler(incomingDataAsBuffer: Buffer) {
			
			log.trace(
				`Incoming data on port ${localPort}: ${incomingDataAsBuffer.toString(
					"hex",
				)}`,
			);

			// Deserialize the raw message
			const rawMessage = new BasePacket();
			rawMessage.deserialize(incomingDataAsBuffer);

			// Log the raw message
			log.trace(`Raw message: ${rawMessage.toString()}`);

			log.debug("Calling onData handler");

			Sentry.startSpan(
				{
					name: "onDataHandler",
					op: "onDataHandler",
				},
				async () => {
					portOnDataHandler({
						connectionId: newConnectionId,
						message: rawMessage,
					})
						.then((response: ServiceResponse) => {
							log.debug("onData handler returned");
							const { messages } = response;

							// Log the messages
							log.trace(`Messages: ${messages.map((m) => m.toString())}`);

							// Serialize the messages
							const serializedMessages = messages.map((m) => m.serialize());

							try {
								// Send the messages
								serializedMessages.forEach((m) => {
									incomingSocket.write(m);
									log.trace(`Sent data: ${m.toString("hex")}`);
								});
							} catch (error) {
								log.error(`Error sending data: ${String(error)}`);
							}
						})
						.catch((error: Error) => {
							log.fatal(`Error handling data: ${String(error)}`);
							Sentry.captureException(error);
							void getGatewayServer({}).stop();
							Sentry.flush(200).then(() => {
								log.debug("Sentry flushed");
								// Call server shutdown
								void getGatewayServer({}).shutdown();
							});
						});
				},
			);
		},
	);

	log.debug(`Client ${remoteAddress} connected to port ${localPort}`);

	if (localPort === 7003) {
		// Sent ok to login packet
		incomingSocket.write(Buffer.from([0x02, 0x30, 0x00, 0x00]));
	}
}
