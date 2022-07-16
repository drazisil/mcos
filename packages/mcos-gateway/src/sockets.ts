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

import { receiveLobbyData } from "mcos-lobby";
import { receiveLoginData } from "mcos-login";
import { receivePersonaData } from "mcos-persona";
import { errorMessage, logAndThrow, TCPConnection, toHex } from "mcos-shared";
import { logger } from "mcos-shared/logger";
import {
  BufferWithConnection,
  GServiceResponse,
  MessageNode,
  SocketWithConnectionInfo,
  TServiceResponse,
} from "mcos-shared/types";
import { receiveTransactionsData } from "mcos-transactions";
import { Socket } from "net";
import {
  processData,
  selectConnection,
  updateConnection,
} from "./connections.js";

const log = logger.child({ service: "mcos:gateway:sockets" });

// TODO: #1193 Remove commented out code

/**
 * The onData handler
 * takes the data buffer and creates a {@link BufferWithConnection} object
 * @param {Buffer} data
 * @param {import('mcos-shared/types').SocketWithConnectionInfo} connection
 * @return {Promise<void>}
 */
async function onData(
  data: Buffer,
  connection: SocketWithConnectionInfo
): Promise<void> {
  log.debug(`data prior to proccessing: ${data.toString("hex")}`);

  // Link the data and the connection together
  /** @type {import("mcos-shared/types").BufferWithConnection} */
  const networkBuffer: import("mcos-shared/types").BufferWithConnection = {
    connectionId: connection.id,
    connection,
    data,
    timestamp: Date.now(),
  };

  const { localPort, remoteAddress } = networkBuffer.connection.socket;

  if (typeof localPort === "undefined") {
    // Somehow we have recived a connection without a local post specified
    log.error(
      `Error locating target port for socket, connection id: ${networkBuffer.connectionId}`
    );
    log.error("Closing socket.");
    networkBuffer.connection.socket.end();
    return;
  }

  if (typeof remoteAddress === "undefined") {
    // Somehow we have recived a connection without a local post specified
    log.error(
      `Error locating remote address for socket, connection id: ${networkBuffer.connectionId}`
    );
    log.error("Closing socket.");
    networkBuffer.connection.socket.end();
    return;
  }

  // Move remote address and local port forward
  networkBuffer.connection.remoteAddress = remoteAddress;
  networkBuffer.connection.localPort = localPort;

  let result: GServiceResponse | TServiceResponse = {
    err: null,
    response: undefined,
  };

  // Route the data to the correct service
  // There are 2 happy paths from this point
  // * GameService
  // * TransactionService

  log.debug(`I have a packet on port ${localPort}`);

  // These are game services

  result = await handleInboundGameData(localPort, networkBuffer);

  if (typeof result.response === "undefined") {
    // Possibly a tranactions packet?

    // This is a transaction response.

    result = await handleInboundTransactionData(localPort, networkBuffer);
  }

  if (result.err !== null) {
    log.error(
      `[socket]There was an error processing the packet: ${errorMessage(
        result.err
      )}`
    );
    process.exitCode = -1;
    return;
  }

  if (typeof result.response === "undefined") {
    // This is probably an error, let's assume it's not. For now.
    // TODO: #1169 verify there are no happy paths where the services would return zero packets
    const message = "There were zero packets returned for processing";
    log.info(message);
    return;
  }

  const messages = result.response.messages;

  const outboundConnection = result.response.connection;

  const packetCount = messages.length;
  log.debug(`There are ${packetCount} messages ready for sending`);
  if (messages.length >= 1) {
    messages.forEach((f: { serialize: () => Buffer }) => {
      if (
        outboundConnection.useEncryption === true &&
        f instanceof MessageNode
      ) {
        if (
          typeof outboundConnection.encryptionSession === "undefined" ||
          typeof f.data === "undefined"
        ) {
          const errMessage =
            "There was a fatal error attempting to encrypt the message!";
          log.trace(
            `usingEncryption? ${outboundConnection.useEncryption}, packetLength: ${f.data.byteLength}/${f.dataLength}`
          );
          logAndThrow(log.service, errMessage);
        } else {
          log.trace(`Message prior to encryption: ${toHex(f.serialize())}`);
          f.updateBuffer(
            outboundConnection.encryptionSession.tsCipher.update(f.data)
          );
        }
      }

      log.trace(`Sending Message: ${toHex(f.serialize())}`);
      outboundConnection.socket.write(f.serialize());
    });
  }

  // Update the connection
  try {
    updateConnection(outboundConnection.id, outboundConnection);
  } catch (error) {
    const errMessage = `There was an error updating the connection: ${errorMessage(
      error
    )}`;

    logAndThrow(log.service, errMessage);
  }
}

/**
 * Server listener method
 *
 * @param {import("node:net").Socket} socket
 * @return {void}
 */
export function socketListener(socket: Socket): void {
  // Received a new connection
  // Turn it into a connection object
  const connectionRecord = selectConnection(socket);

  const { localPort, remoteAddress } = socket;
  log.info(`Client ${remoteAddress} connected to port ${localPort}`);
  if (socket.localPort === 7003 && connectionRecord.inQueue === true) {
    /**
     * Debug seems hard-coded to use the connection queue
     * Craft a packet that tells the client it's allowed to login
     */

    log.info("Sending OK to Login packet");
    log.trace("[listen2] In tcpListener(pre-queue)");
    socket.write(Buffer.from([0x02, 0x30, 0x00, 0x00]));
    log.trace("[listen2] In tcpListener(post-queue)");
    connectionRecord.inQueue = false;
  }

  socket.on("end", () => {
    log.info(`Client ${remoteAddress} disconnected from port ${localPort}`);
  });
  socket.on("data", async (data): Promise<void> => {
    await onData(data, connectionRecord);
  });
  socket.on("error", (error) => {
    const message = errorMessage(error);
    if (message.includes("ECONNRESET") === true) {
      return log.warn("Connection was reset");
    }
    log.error(`Socket error: ${errorMessage(error)}`);
  });
}

/**
 *
 *
 * @param {number} localPort
 * @param {import('mcos-shared/types').BufferWithConnection} networkBuffer
 * @return {Promise<import('mcos-shared/types').GServiceResponse>}
 */
async function handleInboundGameData(
  localPort: number,
  networkBuffer: BufferWithConnection
): Promise<import("mcos-shared/types").GServiceResponse> {
  /** @type {import('mcos-shared/types').GServiceResponse} */
  let result: GServiceResponse = { err: null, response: undefined };
  let handledPackets = false;

  if (localPort === 8226) {
    result = await receiveLoginData(networkBuffer);
    log.debug("Back in socket manager");
    handledPackets = true;
  }

  if (localPort === 8228) {
    result = await receivePersonaData(networkBuffer);
    log.debug("Back in socket manager");
    handledPackets = true;
  }

  if (localPort === 7003) {
    result = await receiveLobbyData(networkBuffer);
    log.debug("Back in socket manager");
    handledPackets = true;
  }

  if (!handledPackets) {
    log.debug("The packet was not for a game service");
    return result;
  }

  // TODO: #1170 Create compression method and compress packet if needed
  return result;
}

/**
 *
 *
 * @param {number} localPort
 * @param {import('mcos-shared/types').BufferWithConnection} networkBuffer
 * @return {Promise<import('mcos-shared/types').TServiceResponse>}
 */
async function handleInboundTransactionData(
  localPort: number,
  networkBuffer: BufferWithConnection
): Promise<import("mcos-shared/types").TServiceResponse> {
  let result: TServiceResponse = { err: null, response: undefined };
  let handledPackets = false;

  if (localPort === 43300) {
    result = await receiveTransactionsData(networkBuffer);
    log.debug("Back in socket manager");
    handledPackets = true;
  }

  if (!handledPackets) {
    log.debug("The packet was not for a transactions service");
    return result;
  }

  // TODO: #1170 Create compression method and compress packet if needed
  return result;
}

/**
 * Replays the unproccessed packet to the connection manager
 * @param {{connection: import("mcos-shared").TCPConnection, data: Buffer}} packet
 * @returns {Promise<{err: Error | null, data: import("mcos-shared").TCPConnection | null}>}
 */
export async function processPacket(packet: {
  connection: TCPConnection;
  data: Buffer;
}): Promise<{
  err: Error | null;
  data: import("mcos-shared").TCPConnection | null;
}> {
  // Locate the conection manager
  try {
    return await processData(packet);
  } catch (error) {
    log.error(errorMessage(error));
    return {
      err: new Error(
        `There was an error processing the packet: ${errorMessage(error)}`
      ),
      data: null,
    };
  }
}
