// mcos is a game server, written from scratch, for an old game
// Copyright (C) <2017-2021>  <Drazi Crendraven>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

const { pino: P } = require("pino");
const { createServer } = require("net");

const log = P().child({ service: "mcos:ListenerThread" });
log.level = process.env["LOG_LEVEL"] || "info";

class ListenerThread {
  /** @type {ListenerThread} */
  static _instance;

  /**
   *
   * @returns {ListenerThread}
   */
  static getInstance() {
    if (!ListenerThread._instance) {
      ListenerThread._instance = new ListenerThread();
    }
    return ListenerThread._instance;
  }

  /** @private */
  constructor() {
    // Intentually empty
  }

  /**
   * The onData handler
   * takes the data buffer and creates a IRawPacket object
   * @param {Buffer} data
   * @param {import("./tcpConnection").TCPConnection} connection
   * @returns {Promise<void>}
   */
  async _onData(data, connection) {
    const { localPort, remoteAddress } = connection.sock;
    /** @type {import("../../transactions/src/tcp-manager").UnprocessedPacket} */
    const rawPacket = {
      connectionId: connection.id,
      connection,
      data,
      localPort,
      remoteAddress,
      timestamp: Date.now(),
    };
    // Dump the raw packet
    log.debug(
      `rawPacket's data prior to proccessing, { data: ${rawPacket.data.toString(
        "hex"
      )}}`
    );
    /** @type {import("./tcpConnection").TCPConnection} */
    let newConnection;
    try {
      newConnection = await connection.processPacket(rawPacket);
    } catch (error) {
      if (error instanceof Error) {
        const newError = new Error(
          `There was an error processing the packet: ${error.message}`
        );
        log.error(newError.message);
        throw newError;
      }
      throw error;
    }

    if (!connection.remoteAddress) {
      throw new Error(`Remote address is empty: ${connection.toString()}`);
    }

    try {
      await connection.updateConnectionByAddressAndPort(
        connection.remoteAddress,
        connection.localPort,
        newConnection
      );
    } catch (error) {
      if (error instanceof Error) {
        const newError = new Error(
          `There was an error updating the connection: ${error.message}`
        );
        log.error(newError.message);
        throw newError;
      }
      throw error;
    }
  }

  /**
   * Server listener method
   * @private
   * @param {Socket} socket
   * @param {ConnectionManager} connectionMgr
   */
  _listener(socket, connectionMgr) {
    // Received a new connection
    // Turn it into a connection object
    const connection = connectionMgr.findOrNewConnection(socket);

    const { localPort, remoteAddress } = socket;
    log.info(`Client ${remoteAddress} connected to port ${localPort}`);
    if (socket.localPort === 7003 && connection.inQueue) {
      /**
       * Debug seems hard-coded to use the connection queue
       * Craft a packet that tells the client it's allowed to login
       */

      // socket.write(Buffer.from([0x02, 0x30, 0x00, 0x00]))
      connection.inQueue = false;
    }

    socket.on("end", () => {
      log.info(`Client ${remoteAddress} disconnected from port ${localPort}`);
    });
    socket.on("data", (data) => {
      this._onData(data, connection);
    });
    socket.on("error", (error) => {
      if (!error.message.includes("ECONNRESET")) {
        throw new Error(`Socket error: ${error}`);
      }
    });
  }

  /**
   * Given a port and a connection manager object,
   * create a new TCP socket listener for that port
   * @param {number} localPort
   * @param {ConnectionManager}
   * @returns {Promise<Server>}
   */
  async startTCPListener(localPort, connectionMgr) {
    log.debug(`Attempting to bind to port ${localPort}`);
    return createServer((socket) => {
      this._listener(socket, connectionMgr);
    }).listen({ port: localPort, host: "0.0.0.0" });
  }
}
module.exports = { ListenerThread };
