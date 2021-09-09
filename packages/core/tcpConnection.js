/* eslint-disable @typescript-eslint/no-unused-vars */
// Mco-server is a game server, written from scratch, for an old game
// Copyright (C) <2017-2018>  <Joseph W Becher>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Cipher, createCipheriv, createDecipheriv, Decipher } from 'crypto'
import { EncryptionManager } from './encryption-mgr.js'
import { Buffer } from 'buffer'
import { ConnectionManager } from './connection-mgr.js'
import { ConnectionStatus } from 'types'

/**
 * Contains the proporties and methods for a TCP connection
 */

/**
 * @typedef LobbyCiphers
 * @property { Cipher | null } cipher
 * @property { Decipher | null} decipher
 */

/**
 * @class
 * @property {string} id
 * @property {number} appId
 * @property {ConnectionStatus} status
 * @property {string} remoteAddress
 * @property {number} localPort
 * @property {import("net").Socket} sock
 * @property {null} msgEvent
 * @property {number} lastMsg
 * @property {boolean} useEncryption
 * @property {import('types').ILobbyCiphers} encLobby
 * @property {EncryptionManager} enc
 * @property {boolean} isSetupComplete
 * @property {IConnectionManager} mgr
 * @property {boolean} inQueue
 * @property {Buffer} decryptedCmd
 * @property {Buffer} encryptedCmd
 */
export class TCPConnection {
  /**
   *
   * @param {string} connectionId
   * @param {import("net").Socket} sock
   * @param {ConnectionManager} mgr
   */
  constructor(connectionId, sock, mgr) {
    this.id = connectionId
    this.appId = 0
    /**
     * @type {ConnectionStatus}
     */
    this.status = 'Inactive'
    this.remoteAddress = sock.remoteAddress
    this.localPort = sock.localPort
    this.sock = sock
    this.msgEvent = 0
    this.lastMsg = 0
    this.useEncryption = false
    /** @type {import('types').ILobbyCiphers} */
    this.encLobby = {
      cipher: null,
      decipher: null,
    }
    this.enc = new EncryptionManager()
    this.isSetupComplete = false
    this.mgr = mgr
    this.inQueue = true
    this.decryptedCmd = Buffer.alloc(0)
    this.encryptedCmd = Buffer.alloc(0)
  }

  /**
   *
   * @param {Buffer} key
   * @return {void}
   */
  setEncryptionKey(key) {
    this.isSetupComplete = this.enc.setEncryptionKey(key)
  }

  /**
   * SetEncryptionKeyDES
   *
   * @param {string} skey
   * @return {void}
   */
  setEncryptionKeyDES(skey) {
    // Deepcode ignore HardcodedSecret: This uses an empty IV
    const desIV = Buffer.alloc(8)

    try {
      this.encLobby.cipher = createCipheriv(
        'des-cbc',
        Buffer.from(skey, 'hex'),
        desIV,
      )
      this.encLobby.cipher.setAutoPadding(false)
    } catch (error) {
      throw new Error(`Error setting cipher: ${error}`)
    }

    try {
      this.encLobby.decipher = createDecipheriv(
        'des-cbc',
        Buffer.from(skey, 'hex'),
        desIV,
      )
      this.encLobby.decipher.setAutoPadding(false)
    } catch (error) {
      throw new Error(`Error setting decipher: ${error}`)
    }

    this.isSetupComplete = true
  }

  /**
   * CipherBufferDES
   *
   * @param {Buffer} messageBuffer
   * @return {Buffer}
   */
  cipherBufferDES(messageBuffer) {
    if (this.encLobby.cipher) {
      return this.encLobby.cipher.update(messageBuffer)
    }

    throw new Error('No DES cipher set on connection')
  }

  /**
   * DecipherBufferDES
   *
   * @param {Buffer} messageBuffer
   * @return {Buffer}
   */
  decipherBufferDES(messageBuffer) {
    if (this.encLobby.decipher) {
      return this.encLobby.decipher.update(messageBuffer)
    }

    throw new Error('No DES decipher set on connection')
  }
}
