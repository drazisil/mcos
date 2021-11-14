// mcos is a game server, written from scratch, for an old game
// Copyright (C) <2017-2021>  <Drazi Crendraven>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { createCipheriv, createDecipheriv } from "crypto";
import { Socket } from "net";
import P from "pino";
import { ConnectionManager } from "./connection-mgr";
import { EncryptionManager } from "./encryption-mgr";

const log = P().child({ service: "mcoserver:TCPConnection" });
log.level = process.env["LOG_LEVEL"] || "info";

export class TCPConnection {
  /** @type {string} */
  id;
  /** @type {number} */
  appId;
  /** @type {EConnectionStatus} */
  status;
  /** @type {string | undefined} */
  remoteAddress;
  /** @type {number} */
  localPort;
  /** @type {Socket} */
  sock;
  msgEvent = null;
  /** @type {number} */
  lastMsg;
  /** @type {boolean} */
  useEncryption;
  /**
   * @private
   * @type {LobbyCiphers}
   */
  encLobby;
  /**
   * @private
   * @type {EncryptionManager | undefined}
   */
  enc;
  /** @type {boolean} */
  isSetupComplete;
  /**
   * @private
   * @type {ConnectionManager | undefined}
   */
  mgr;
  /** @type {boolean} */
  inQueue;
  /**
   * @type {Buffer | undefined}
   */
  encryptedCmd;
  /** @type {Buffer | undefined} */
  decryptedCmd;

  constructor(connectionId: string, sock: Socket) {
    if (typeof sock.localPort === "undefined") {
      throw new Error(
        `localPort is undefined, unable to create connection object`
      );
    }
    this.id = connectionId;
    this.appId = 0;
    this.status = EConnectionStatus.INACTIVE;
    this.remoteAddress = sock.remoteAddress || "";
    this.localPort = sock.localPort;
    this.sock = sock;
    this.msgEvent = null;
    this.lastMsg = 0;
    this.useEncryption = false;
    /** @type {LobbyCiphers} */
    this.encLobby = {};
    this.isSetupComplete = false;
    this.inQueue = true;
  }
  isLobbyKeysetReady(): boolean {
    return (
      this.encLobby.cipher !== undefined && this.encLobby.decipher !== undefined
    );
  }
  async updateConnectionByAddressAndPort(
    remoteAddress: string,
    localPort: number,
    newConnection: ITCPConnection
  ): Promise<void> {
    if (this.mgr === undefined) {
      throw new Error("Connection manager not set");
    }
    this.mgr._updateConnectionByAddressAndPort(
      remoteAddress,
      localPort,
      newConnection
    );
  }

  setManager(manager: IConnectionManager): void {
    this.mgr = manager;
  }

  setEncryptionManager(encryptionManager: IEncryptionManager): void {
    this.enc = encryptionManager;
  }

  getEncryptionId(): string {
    if (this.enc === undefined) {
      throw new Error("Encryption manager not set");
    }
    return this.enc.getId();
  }

  encryptBuffer(buffer: Buffer): Buffer {
    if (this.enc === undefined) {
      throw new Error("Encryption manager not set");
    }
    return this.enc.encrypt(buffer);
  }

  decryptBuffer(buffer: Buffer): Buffer {
    if (this.enc === undefined) {
      throw new Error("Encryption manager not set");
    }
    return this.enc.decrypt(buffer);
  }

  /**
   *
   * @param {Buffer} key
   * @return {void}
   */
  setEncryptionKey(key: Buffer): void {
    if (this.enc === undefined) {
      throw new Error("Encryption manager is not set");
    }
    this.isSetupComplete = this.enc.setEncryptionKey(key);
  }

  /**
   * SetEncryptionKeyDES
   *
   * @param {string} skey
   * @return {void}
   */
  setEncryptionKeyDES(skey: string): void {
    // Deepcode ignore HardcodedSecret: This uses an empty IV
    const desIV = Buffer.alloc(8);

    try {
      this.encLobby.cipher = createCipheriv(
        "des-cbc",
        Buffer.from(skey, "hex"),
        desIV
      );
      this.encLobby.cipher.setAutoPadding(false);
    } catch (error) {
      throw new Error(`Error setting cipher: ${error}`);
    }

    try {
      this.encLobby.decipher = createDecipheriv(
        "des-cbc",
        Buffer.from(skey, "hex"),
        desIV
      );
      this.encLobby.decipher.setAutoPadding(false);
    } catch (error) {
      throw new Error(`Error setting decipher: ${error}`);
    }

    this.isSetupComplete = true;
  }

  /**
   * CipherBufferDES
   *
   * @param {Buffer} messageBuffer
   * @return {Buffer}
   */
  cipherBufferDES(messageBuffer: Buffer): Buffer {
    if (this.encLobby.cipher) {
      return this.encLobby.cipher.update(messageBuffer);
    }

    throw new Error("No DES cipher set on connection");
  }

  /**
   * DecipherBufferDES
   *
   * @param {Buffer} messageBuffer
   * @return {Buffer}
   */
  decipherBufferDES(messageBuffer: Buffer): Buffer {
    if (this.encLobby.decipher) {
      return this.encLobby.decipher.update(messageBuffer);
    }

    throw new Error("No DES decipher set on connection");
  }

  async processPacket(packet: UnprocessedPacket): Promise<ITCPConnection> {
    if (this.mgr === undefined) {
      throw new Error("Connection manager is not set");
    }
    try {
      return this.mgr.processData(packet);
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
  }
}
