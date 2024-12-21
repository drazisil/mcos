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
import {logger, type Logger } from "rusty-motors-logger";
const defaultLogger = logger.child({ name: "gatewayServer" });

import * as Sentry from "@sentry/node";


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

	const socketWithId = tagSocketWithId({
		socket: incomingSocket,
		connectionStamp: Date.now(),
		id: randomUUID(),
	}
	);

	/*
	 * At this point, we have a tagged socket with an ID.
	 */

	const portRouter = getPortRouter(localPort);

	// Hand the socket to the port router
	portRouter({ taggedSocket: socketWithId }).catch((error) => {
		Sentry.captureException(error);
		log.error(`Error in port router: ${error.message}`);
	});
}
