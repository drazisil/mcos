// @ts-check
// mcos is a game server, written from scratch, for an old game
// Copyright (C) <2017-2021>  <Drazi Crendraven>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

const { pino: P } = require("pino");
const { NPSUserInfo } = require("../../message-types/src/index.js");
const { NPSMessage } = require("../../message-types/src/npsMessage.js");
const process = require("process");
const { Buffer } = require("buffer");
const { EMessageDirection } = require("../../transactions/src/types.js");

const log = P().child({ service: "mcos:LobbyServer" });
log.level = process.env["LOG_LEVEL"] || "info";

/**
 * Manages the game connection to the lobby and racing rooms
 * @module LobbyServer
 */

/**
 * @param {import("../../core/src/tcpConnection").TCPConnection} conn
 * @param {Buffer} buffer
 * @return {Promise<import("../../core/src/tcpConnection").TCPConnection>}
 */
async function npsSocketWriteIfOpen(conn, buffer) {
  const { sock } = conn;
  if (sock.writable) {
    // Write the packet to socket
    sock.write(buffer);
  } else {
    throw new Error(
      `Error writing ${buffer.toString("hex")} to ${
        sock.remoteAddress
      } , ${String(sock)}`
    );
  }

  return conn;
}

/**
 * Takes an encrypted command packet and returns the decrypted bytes
 *
 * @return {import("../../core/src/tcpConnection").TCPConnection}
 * @param {import("../../core/src/tcpConnection").TCPConnection} con
 * @param {Buffer} cypherCmd
 */
function decryptCmd(con, cypherCmd) {
  const s = con;
  const decryptedCommand = s.decipherBufferDES(cypherCmd);
  s.decryptedCmd = decryptedCommand;
  log.debug(`[Deciphered Cmd: ${s.decryptedCmd.toString("hex")}`);
  return s;
}

/**
 * Takes an plaintext command packet and return the encrypted bytes
 *
 * @param {import("../../core/src/tcpConnection").TCPConnection} con
 * @param {Buffer} cypherCmd
 * @return {import("../../core/src/tcpConnection").TCPConnection}
 */
function encryptCmd(con, cypherCmd) {
  const s = con;
  s.encryptedCmd = s.cipherBufferDES(cypherCmd);
  return s;
}

/**
 * Takes a plaintext command packet, encrypts it, and sends it across the connection's socket
 *
 * @param {import("../../core/src/tcpConnection").TCPConnection} con
 * @param {Buffer} data
 * @return {Promise<import("../../core/src/tcpConnection").TCPConnection>}
 */
async function sendCommand(con, data) {
  const s = con;

  const decipheredCommand = decryptCmd(
    s,
    Buffer.from(data.slice(4))
  ).decryptedCmd;

  if (decipheredCommand === undefined) {
    throw new Error("There was an error deciphering the NPS command");
  }

  // Marshal the command into an NPS packet
  const incommingRequest = new NPSMessage(EMessageDirection.RECEIVED);
  incommingRequest.deserialize(decipheredCommand);

  incommingRequest.dumpPacket();

  // Create the packet content
  const packetContent = Buffer.alloc(375);

  // Add the response code
  packetContent.writeUInt16BE(0x02_19, 367);
  packetContent.writeUInt16BE(0x01_01, 369);
  packetContent.writeUInt16BE(0x02_2c, 371);

  log.debug("Sending a dummy response of 0x229 - NPS_MINI_USER_LIST");

  // Build the packet
  const packetResult = new NPSMessage(EMessageDirection.SENT);
  packetResult.msgNo = 0x2_29;
  packetResult.setContent(packetContent);
  packetResult.dumpPacket();

  const cmdEncrypted = encryptCmd(s, packetResult.getContentAsBuffer());

  if (cmdEncrypted.encryptedCmd === undefined) {
    throw new Error("There was an error ciphering the NPS command");
  }

  cmdEncrypted.encryptedCmd = Buffer.concat([
    Buffer.from([0x11, 0x01]),
    cmdEncrypted.encryptedCmd,
  ]);

  return cmdEncrypted;
}

/**
 * @class
 */
class LobbyServer {
  /** @type {LobbyServer} */
  static _instance;

  /**
   *
   * @returns {LobbyServer}
   */
  static getInstance() {
    if (!LobbyServer._instance) {
      LobbyServer._instance = new LobbyServer();
    }
    return LobbyServer._instance;
  }

  /** @private */
  constructor() {
    // Intentually empty
  }

  /**
   * @return {NPSMessage}
   */
  _npsHeartbeat() {
    const packetContent = Buffer.alloc(8);
    const packetResult = new NPSMessage(EMessageDirection.SENT);
    packetResult.msgNo = 0x1_27;
    packetResult.setContent(packetContent);
    packetResult.dumpPacket();
    return packetResult;
  }

  /**
   * @param {import("../../transactions/src/types").UnprocessedPacket} rawPacket
   * @param {import("../../persona/src/index").PersonaServer} personaServer
   * @param {import("../../database/src/index").DatabaseManager} databaseManager
   * @return {Promise<import("../../core/src/tcpConnection").TCPConnection>}
   */
  async dataHandler(rawPacket, personaServer, databaseManager) {
    const { localPort, remoteAddress } = rawPacket;
    log.debug(
      `Received Lobby packet: ${JSON.stringify({ localPort, remoteAddress })}`
    );
    const { connection, data } = rawPacket;
    const requestCode = data.readUInt16BE(0).toString(16);

    switch (requestCode) {
      // _npsRequestGameConnectServer
      case "100": {
        const responsePacket = await this._npsRequestGameConnectServer(
          connection,
          data,
          personaServer,
          databaseManager
        );
        log.debug(
          `Connect responsePacket's data prior to sending: ${JSON.stringify({
            data: responsePacket.getPacketAsString(),
          })}`
        );
        // TODO: Investigate why this crashes retail
        try {
          return npsSocketWriteIfOpen(connection, responsePacket.serialize());
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(`Unable to send Connect packet: ${error}`);
          }
          throw new Error(`Unable to send Connect packet: unknown error`);
        }
      }

      // NpsHeartbeat

      case "217": {
        const responsePacket = this._npsHeartbeat();
        log.debug(
          `Heartbeat responsePacket's data prior to sending: ${JSON.stringify({
            data: responsePacket.getPacketAsString(),
          })}`
        );
        return npsSocketWriteIfOpen(connection, responsePacket.serialize());
      }

      // NpsSendCommand

      case "1101": {
        // This is an encrypted command
        // Fetch session key

        const updatedConnection = await sendCommand(connection, data);
        const { encryptedCmd } = updatedConnection;

        if (encryptedCmd === undefined) {
          throw new Error(
            `Error with encrypted command, dumping connection: ${JSON.stringify(
              { updatedConnection }
            )}`
          );
        }

        log.debug(
          `encrypedCommand's data prior to sending: ${JSON.stringify({
            data: encryptedCmd.toString("hex"),
          })}`
        );
        return npsSocketWriteIfOpen(connection, encryptedCmd);
      }

      default:
        throw new Error(
          `Unknown code ${requestCode} was received on port 7003`
        );
    }
  }

  /**
   * @param {string} key
   * @return {Buffer}
   */
  _generateSessionKeyBuffer(key) {
    const nameBuffer = Buffer.alloc(64);
    Buffer.from(key, "utf8").copy(nameBuffer);
    return nameBuffer;
  }

  /**
   * Handle a request to connect to a game server packet
   *
   * @param {import("../../core/src/tcpConnection").TCPConnection} connection
   * @param {import("../../persona/src/index").PersonaServer} personaServer
   * @param {import("../../database/src/index").DatabaseManager} databaseManager
   * @param {Buffer} rawData
   * @return {Promise<NPSMessage>}
   */
  async _npsRequestGameConnectServer(connection, rawData, personaServer, databaseManager) {
    const { sock } = connection;
    log.debug(
      `_npsRequestGameConnectServer: ${JSON.stringify({
        remoteAddress: sock.remoteAddress,
        data: rawData.toString("hex"),
      })}`
    );

    // Return a _NPS_UserInfo structure
    const userInfo = new NPSUserInfo(EMessageDirection.RECEIVED);
    userInfo.deserialize(rawData);
    userInfo.dumpInfo();

    const personas = await personaServer.getPersonasByPersonaId(
      userInfo.userId
    );
    if (typeof personas[0] === "undefined") {
      throw new Error("No personas found.");
    }

    const { customerId } = personas[0];

    // Set the encryption keys on the lobby connection
    const keys = await databaseManager
      .fetchSessionKeyByCustomerId(customerId)
      .catch((error) => {
        if (error instanceof Error) {
          log.debug(
            `Unable to fetch session key for customerId ${customerId.toString()}: ${
              error.message
            })}`
          );
        }
        log.error(
          `Unable to fetch session key for customerId ${customerId.toString()}: unknown error}`
        );
        return undefined;
      });
    if (keys === undefined) {
      throw new Error("Error fetching session keys!");
    }

    const s = connection;

    // Create the cypher and decipher only if not already set
    if (!s.isLobbyKeysetReady()) {
      try {
        s.setEncryptionKeyDES(keys.skey);
      } catch (error) {
        if (error instanceof Error) {
          throw new TypeError(
            `Unable to set session key: ${JSON.stringify({ keys, error })}`
          );
        }

        throw new Error(
          `Unable to set session key: ${JSON.stringify({
            keys,
            error: "unknown",
          })}`
        );
      }
    }

    const packetContent = Buffer.alloc(72);

    // This response is a NPS_UserStatus

    // Ban and Gag

    // NPS_USERID - User ID - persona id - long
    Buffer.from([0x00, 0x84, 0x5f, 0xed]).copy(packetContent);

    // SessionKeyStr (32)
    this._generateSessionKeyBuffer(keys.sessionkey).copy(packetContent, 4);

    // // SessionKeyLen - int
    packetContent.writeInt16BE(32, 66);

    // Build the packet
    const packetResult = new NPSMessage(EMessageDirection.SENT);
    packetResult.msgNo = 0x1_20;
    packetResult.setContent(packetContent);
    packetResult.dumpPacket();

    return packetResult;
  }
}
module.exports = { LobbyServer };
