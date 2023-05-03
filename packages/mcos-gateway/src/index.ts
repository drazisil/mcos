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

import { Socket, createServer as createSocketServer } from "node:net";
import { findOrNewConnection } from "./connections.js";
import { dataHandler } from "./sockets.js";
import { httpListener as httpHandler } from "./web.js";
export { getAllConnections } from "./connections.js";
export { AdminServer } from "./adminServer.js";
import Sentry from "@sentry/node";
import type { TServerConfiguration, TServerLogger } from "mcos/shared";
import { Server } from "node:http";

Sentry.init({
    dsn: "https://9cefd6a6a3b940328fcefe45766023f2@o1413557.ingest.sentry.io/4504406901915648",

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
});

const listeningPortList = [
    3000, 6660, 7003, 8228, 8226, 8227, 9000, 9001, 9002, 9003, 9004, 9005,
    9006, 9007, 9008, 9009, 9010, 9011, 9012, 9013, 9014, 43200, 43300, 43400,
    53303,
];

/**
 *
 * @param {any} error
 * @param {TServerLogger} log
 * @returns {void}
 */
function onSocketError(sock: Socket, error: Error, log: TServerLogger): void {
    const message = String(error);
    if (message.includes("ECONNRESET")) {
        log("debug", "Connection was reset");
        return;
    }
    Sentry.captureException(error);
    throw new Error(`Socket error: ${String(error)}`);
}

/**
 *
 * @param {Socket} incomingSocket
 * @param {TServerConfiguration} config
 * @param {TServerLogger} log
 */
function TCPListener(
    incomingSocket: Socket,
    config: TServerConfiguration,
    log: TServerLogger
) {
    // Get a connection record
    const connectionRecord = findOrNewConnection(incomingSocket, log);

    const { localPort, remoteAddress } = incomingSocket;
    log("debug", `Client ${remoteAddress} connected to port ${localPort}`);

    incomingSocket.on("end", () => {
        log(
            "debug",
            `Client ${remoteAddress} disconnected from port ${localPort}`
        );
    });
    incomingSocket.on("data", (data) => {
            dataHandler(data, connectionRecord, config, log).catch(
                (reason: Error) => log(
                    "err",
                    `There was an error in the data handler: ${reason.message}`
                )
            );
        });
    incomingSocket.on("error", (err) => {
        onSocketError(incomingSocket, err, log);
    });
}

/**
 *
 * @param {Socket} incomingSocket
 * @param {TServerConfiguration} config
 * @param {TServerLogger} log
 * @returns {void}
 */
function socketListener(
    incomingSocket: Socket,
    config: TServerConfiguration,
    log: TServerLogger
): void {
    log(
        "debug",
        `[gate]Connection from ${incomingSocket.remoteAddress} on port ${incomingSocket.localPort}`
    );

    // Is this an HTTP request?
    if (incomingSocket.localPort === 3000) {
        log("debug", "Web request");
        const newServer = new Server((req, res) => {
            httpHandler(req, res, config, log);
        });
        // Send the socket to the http server instance
        newServer.emit("connection", incomingSocket);

        return;
    }

    // This is a 'normal' TCP socket
    TCPListener(incomingSocket, config, log);
}

/**
 *
 * @param {number} port
 * @param {TServerLogger} log
 */
function serverListener(port: number, log: TServerLogger) {
    const listeningPort = String(port).length ? String(port) : "unknown";
    log("debug", `Listening on port ${listeningPort}`);
}

/**
 *
 * Start listening on ports
 * @author Drazi Crendraven
 * @param {TServerConfiguration} config
 * @param {TServerLogger} log
 */
export function startListeners(
    config: TServerConfiguration,
    log: TServerLogger
) {
    log("info", "Server starting");

    listeningPortList.forEach((port) => {
        const newServer = createSocketServer((s) => {
            socketListener(s, config, log);
        });
        newServer.listen(port, "0.0.0.0", 0, () => {
            return serverListener(port, log);
        });
    });
}
