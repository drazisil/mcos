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

import { decryptBuffer } from "mcos/gateway";
import { MessageNode, Sentry, ServerError } from "mcos/shared";
import {
    IConnection,
    TBufferWithConnection,
    TServerLogger,
    TServiceResponse,
    TServiceRouterArgs,
} from "mcos/shared/interfaces";
import { messageHandlers } from "./handlers.js";
import { Server } from "http";

/**
 *
 *
 * @param {MessageNode} message
 * @param {TBufferWithConnection} dataConnection
 * @return {boolean}
 */
function shouldMessageBeEncrypted(
    message: MessageNode,
    dataConnection: TBufferWithConnection
): boolean {
    return message.flags !== 80 && dataConnection.connection.useEncryption;
}

/**
 *
 *
 * @param {MessageNode} message
 * @param {TBufferWithConnection} dataConnection
 * @param {TServerLogger} log
 * @return {{err: Error | null, data: Buffer | null}}
 */
function decryptTransactionBuffer(
    message: MessageNode,
    dataConnection: TBufferWithConnection, // Legacy
    connection: IConnection,
    log: TServerLogger
): { err: Error | null; data: Buffer | null } {
    const encryptedBuffer = Buffer.from(message.data);
    log(
        "debug",
        `Full packet before decrypting: ${encryptedBuffer.toString("hex")}`
    );

    log(
        "debug",
        `Message buffer before decrypting: ${encryptedBuffer.toString("hex")}`
    );

    const result = decryptBuffer(
        dataConnection,
        connection,
        encryptedBuffer,
        log
    );
    log(
        "debug",
        `Message buffer after decrypting: ${result.data.toString("hex")}`
    );

    if (result.data.readUInt16LE(0) <= 0) {
        return {
            err: new Error("Failure deciphering message, exiting."),
            data: null,
        };
    }
    return { err: null, data: result.data };
}

/**
 *
 *
 * @param {MessageNode} message
 * @param {TBufferWithConnection} dataConnection
 * @param {TServerLogger} log
 * @return {{err: Error | null, data: Buffer | null}}
 */
function tryDecryptBuffer(
    message: MessageNode,
    dataConnection: TBufferWithConnection, // Legacy
    connection: IConnection,
    log: TServerLogger
): { err: Error | null; data: Buffer | null } {
    try {
        return {
            err: null,
            data: decryptTransactionBuffer(
                message,
                dataConnection,
                connection,
                log
            ).data,
        };
    } catch (error) {
        Sentry.captureException(error);
        return {
            err: new Error(
                `Decrypt() exception thrown! Disconnecting...conId:${
                    dataConnection.connectionId
                }: ${String(error)}`
            ),
            data: null,
        };
    }
}

/**
 * Return the string representation of the numeric opcode
 *
 * @param {number} messageID
 * @return {string}
 */
function _MSG_STRING(messageID: number): string {
    const messageIds = [
        { id: 105, name: "MC_LOGIN" },
        { id: 106, name: "MC_LOGOUT" },
        { id: 109, name: "MC_SET_OPTIONS" },
        { id: 141, name: "MC_STOCK_CAR_INFO" },
        { id: 213, name: "MC_LOGIN_COMPLETE" },
        { id: 266, name: "MC_UPDATE_PLAYER_PHYSICAL" },
        { id: 324, name: "MC_GET_LOBBIES" },
        { id: 325, name: "MC_LOBBIES" },
        { id: 438, name: "MC_CLIENT_CONNECT_MSG" },
        { id: 440, name: "MC_TRACKING_MSG" },
    ];
    const result = messageIds.find((id) => id.id === messageID);

    if (typeof result !== "undefined") {
        return result.name;
    }

    return "Unknown";
}

/**
 * Route or process MCOTS commands
 * @param {TBufferWithConnection} dataConnection
 * @param {MessageNode} node
 * @param {TServerLogger} log
 * @returns {Promise<TServiceResponse>}
 */
async function processInput(
    dataConnection: TBufferWithConnection,
    node: MessageNode,
    log: TServerLogger
): Promise<TServiceResponse> {
    const currentMessageNo = node.msgNo;
    const currentMessageString = _MSG_STRING(currentMessageNo);

    log(
        "debug",
        `We are attempting to process a message with id ${currentMessageNo}(${currentMessageString})`
    );

    const result = messageHandlers.find(
        (msg) => msg.name === currentMessageString
    );

    if (typeof result !== "undefined") {
        try {
            const responsePackets = await result.handler(
                dataConnection.connection,
                node,
                log
            );
            return responsePackets;
        } catch (error) {
            Sentry.captureException(error);
            const err = new Error(`Error handling packet: ${String(error)}`);
            Sentry.addBreadcrumb({ level: "error", message: err.message });
            throw err;
        }
    }

    node.setAppId(dataConnection.connection.personaId);

    const err = new Error(
        `Message Number Not Handled: ${currentMessageNo} (${currentMessageString}`
    );
    Sentry.addBreadcrumb({ level: "error", message: err.message });
    throw err;
}

/**
 *
 * @param {MessageNode} message
 * @param {TBufferWithConnection} dataConnection
 * @param {TServerLogger} log
 * @returns {Promise<TServiceResponse>}
 */
async function messageReceived(
    message: MessageNode,
    dataConnection: TBufferWithConnection, // Legacy
    connection: IConnection,
    log: TServerLogger
): Promise<TServiceResponse> {
    // If not a Heartbeat
    if (shouldMessageBeEncrypted(message, dataConnection)) {
        if (
            typeof dataConnection.connection.encryptionSession === "undefined"
        ) {
            const err = new Error(
                `Unabel to locate the encryptors on connection id ${dataConnection.connectionId}`
            );
            Sentry.addBreadcrumb({ level: "error", message: err.message });
            throw err;
        }

        if (message.flags - 8 >= 0) {
            const result = tryDecryptBuffer(
                message,
                dataConnection,
                connection,
                log
            );
            if (result.err !== null || result.data === null) {
                const err = new Error(String(result.err));
                Sentry.addBreadcrumb({ level: "error", message: err.message });
                throw err;
            }
            // Update the MessageNode with the deciphered buffer
            message.updateBuffer(result.data);
        }
    }

    log("debug", "Calling processInput()");
    return processInput(dataConnection, message, log);
}

export async function handleData(
    args: TServiceRouterArgs
): Promise<TServiceResponse> {
    const { legacyConnection: dataConnection, connection, log } = args;
    const { connection: legacyConnection, data } = dataConnection;
    const { remoteAddress, localPort } = legacyConnection.socket;

    if (
        typeof localPort === "undefined" ||
        typeof remoteAddress === "undefined"
    ) {
        const err = new Error(
            "Either localPort or remoteAddress is missing on socket.Can not continue."
        );
        throw err;
    }

    const messageNode = new MessageNode("received");
    messageNode.deserialize(data);

    log(
        "debug",
        `[handle]Received TCP packet',
      ${JSON.stringify({
          localPort,
          remoteAddress,
          direction: messageNode.direction,
          data: data.toString("hex"),
      })} `
    );
    messageNode.dumpPacket();

    if (typeof connection === "undefined") {
        const err = new ServerError(
            `Unable to locate connection for socket ${remoteAddress}:${localPort}`
        );
        Sentry.addBreadcrumb({ level: "error", message: err.message });
        throw err;
    }

    try {
        const processedPacket = await messageReceived(
            messageNode,
            dataConnection,
            connection,
            log
        );
        log("debug", "Back in transacation server");
        return {
            connection: processedPacket.connection,
            messages: processedPacket.messages,
            log,
        };
    } catch (error) {
        Sentry.captureException(error);
        const err = new Error(`Error processing packet: ${String(error)} `);
        Sentry.addBreadcrumb({ level: "error", message: err.message });
        throw err;
    }
}
