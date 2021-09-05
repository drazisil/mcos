/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-check
// Mco-server is a game server, written from scratch, for an old game
// Copyright (C) <2017-2018>  <Joseph W Becher>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Logger } from '@drazisil/mco-logger'
import { NPSMessage } from '../MCOTS/nps-msg.js'
import { TCPConnection } from '../MCServer/tcpConnection.js'
import { PersonaServer } from '../PersonaServer/persona-server.js'
import { DatabaseManager } from '../shared/database-manager.js'
import { NPSUserInfo } from './nps-user-info.js'
import { Buffer } from 'buffer'
import process from 'process'

const { log } = Logger.getInstance()

/**
 * Manages the game connection to the lobby and racing rooms
 */

const databaseManager = DatabaseManager.getInstance()

/**
 *
 * @param {TCPConnection} conn
 * @param {Buffer} buffer
 * @return {Promise<TCPConnection>}
 */
async function npsSocketWriteIfOpen(conn, buffer) {
  const { sock } = conn
  if (sock.writable) {
    // Write the packet to socket
    sock.write(buffer)
  } else {
    throw new Error(
      `[Lobby] Error writing ${buffer.toString('hex')} to ${
        sock.remoteAddress
      } , ${sock}`,
    )
  }

  return conn
}

/**
 * Takes an encrypted command packet and returns the decrypted bytes
 *
 * @return {TCPConnection}
 * @param {TCPConnection} con
 * @param {Buffer} cypherCmd
 */
function decryptCmd(con, cypherCmd) {
  const s = con
  const decryptedCommand = s.decipherBufferDES(cypherCmd)
  s.decryptedCmd = decryptedCommand
  log('debug', `[lobby] Deciphered Cmd: ${s.decryptedCmd.toString('hex')}`, {
    service: 'mcoserver:LobbyServer',
  })
  return s
}

/**
 * Takes an plaintext command packet and return the encrypted bytes
 *
 * @param {TCPConnection} con
 * @param {Buffer} cypherCmd
 * @return {TCPConnection}
 */
function encryptCmd(con, cypherCmd) {
  const s = con
  s.encryptedCmd = s.cipherBufferDES(cypherCmd)
  return s
}

/**
 * Takes a plaintext command packet, encrypts it, and sends it across the connection's socket
 *
 * @param {TCPConnection} con
 * @param {Buffer} data
 * @return {Promise<TCPConnection>}
 */
async function sendCommand(con, data) {
  const s = con

  const decipheredCommand = decryptCmd(
    s,
    Buffer.from(data.slice(4)),
  ).decryptedCmd

  // Marshal the command into an NPS packet
  const incommingRequest = new NPSMessage('Recieved')
  incommingRequest.deserialize(decipheredCommand)

  incommingRequest.dumpPacket()

  // Create the packet content
  const packetContent = Buffer.alloc(375)

  // Add the response code
  packetContent.writeUInt16BE(0x02_19, 367)
  packetContent.writeUInt16BE(0x01_01, 369)
  packetContent.writeUInt16BE(0x02_2c, 371)

  log('debug', 'Sending a dummy response of 0x229 - NPS_MINI_USER_LIST', {
    service: 'mcoserver:LobbyServer',
  })

  // Build the packet
  const packetResult = new NPSMessage('Sent')
  packetResult.msgNo = 0x2_29
  packetResult.setContent(packetContent)
  packetResult.dumpPacket()

  const cmdEncrypted = encryptCmd(s, packetResult.getContentAsBuffer())

  cmdEncrypted.encryptedCmd = Buffer.concat([
    Buffer.from([0x11, 0x01]),
    cmdEncrypted.encryptedCmd,
  ])

  return cmdEncrypted
}

/**
 * @class
 */
export class LobbyServer {
  /**
   *
   * @return {NPSMessage}
   */
  _npsHeartbeat() {
    const packetContent = Buffer.alloc(8)
    const packetResult = new NPSMessage('Sent')
    packetResult.msgNo = 0x1_27
    packetResult.setContent(packetContent)
    packetResult.dumpPacket()
    return packetResult
  }

  /**
   *
   * @param {IRawPacket} rawPacket
   * @return {Promise<TCPConnection>}
   */
  async dataHandler(rawPacket) {
    const { localPort, remoteAddress } = rawPacket
    log(
      'debug',
      `Received Lobby packet: ${JSON.stringify({ localPort, remoteAddress })}`,
      { service: 'mcoserver:LobbyServer' },
    )
    const { connection, data } = rawPacket
    let updatedConnection = connection
    const requestCode = data.readUInt16BE(0).toString(16)

    switch (requestCode) {
      // _npsRequestGameConnectServer
      case '100': {
        const responsePacket = await this._npsRequestGameConnectServer(
          connection,
          data,
        )
        log(
          'debug',
          `Connect responsePacket's data prior to sending: ${JSON.stringify({
            data: responsePacket.getPacketAsString(),
          })}`,
          { service: 'mcoserver:LobbyServer' },
        )
        // TODO: Investigate why this crashes retail
        try {
          npsSocketWriteIfOpen(connection, responsePacket.serialize())
        } catch (error) {
          process.exitCode = -1
          throw new Error(`Unable to send Connect packet: ${error}`)
        }

        break
      }

      // NpsHeartbeat
      case '217': {
        const responsePacket = this._npsHeartbeat()
        log(
          'debug',
          `Heartbeat responsePacket's data prior to sending: ${JSON.stringify({
            data: responsePacket.getPacketAsString(),
          })}`,
          { service: 'mcoserver:LobbyServer' },
        )
        npsSocketWriteIfOpen(connection, responsePacket.serialize())
        break
      }

      // NpsSendCommand
      case '1101': {
        // This is an encrypted command
        // Fetch session key

        updatedConnection = await sendCommand(connection, data)
        const { encryptedCmd } = updatedConnection

        if (encryptedCmd === null) {
          throw new Error(
            `Error with encrypted command, dumping connection: ${JSON.stringify(
              { updatedConnection },
            )}`,
          )
        }

        log(
          'debug',
          `encrypedCommand's data prior to sending: ${JSON.stringify({
            data: encryptedCmd.toString('hex'),
          })}`,
          { service: 'mcoserver:LobbyServer' },
        )
        npsSocketWriteIfOpen(connection, encryptedCmd)
        break
      }

      default:
        throw new Error(
          `[Lobby] Unknown code ${requestCode} was received on port 7003`,
        )
    }

    return updatedConnection
  }

  /**
   *
   * @param {string} key
   * @return {Buffer}
   */
  _generateSessionKeyBuffer(key) {
    const nameBuffer = Buffer.alloc(64)
    Buffer.from(key, 'utf8').copy(nameBuffer)
    return nameBuffer
  }

  /**
   * Handle a request to connect to a game server packet
   *
   * @param {TCPConnection} connection
   * @param {Buffer} rawData
   * @return {Promise<NPSMessage>}
   */
  async _npsRequestGameConnectServer(connection, rawData) {
    const { sock } = connection
    log(
      'debug',
      `_npsRequestGameConnectServer: ${JSON.stringify({
        remoteAddress: sock.remoteAddress,
        data: rawData.toString('hex'),
      })}`,
      { service: 'mcoserver:LobbyServer' },
    )

    // Return a _NPS_UserInfo structure
    const userInfo = new NPSUserInfo('Recieved')
    userInfo.deserialize(rawData)
    userInfo.dumpInfo()

    const personaManager = PersonaServer.getInstance()

    const personas = await personaManager.getPersonasByPersonaId(
      userInfo.userId,
    )
    if (personas.length === 0) {
      throw new Error('No personas found.')
    }

    const { customerId } = personas[0]

    // Set the encryption keys on the lobby connection
    const keys = await databaseManager
      .fetchSessionKeyByCustomerId(customerId)
      .catch(error => {
        log(
          'error',
          `Unable to fetch session key for customerId ${customerId}: ${error}`,
          {
            service: 'mcoserver:LobbyServer',
          },
        )
        return undefined
      })
    if (keys === undefined) {
      throw new Error('Error fetching session keys!')
    }

    const s = connection

    // Create the cypher and decipher only if not already set
    if (!s.encLobby.decipher) {
      try {
        s.setEncryptionKeyDES(keys.skey)
      } catch (error) {
        if (error instanceof Error) {
          throw new TypeError(
            `Unable to set session key: ${JSON.stringify({ keys, error })}`,
          )
        }

        throw new Error(
          `Unable to set session key: ${JSON.stringify({
            keys,
            error: 'unknown',
          })}`,
        )
      }
    }

    const packetContent = Buffer.alloc(72)

    // This response is a NPS_UserStatus

    // Ban and Gag

    // NPS_USERID - User ID - persona id - long
    Buffer.from([0x00, 0x84, 0x5f, 0xed]).copy(packetContent)

    // SessionKeyStr (32)
    this._generateSessionKeyBuffer(keys.sessionkey).copy(packetContent, 4)

    // // SessionKeyLen - int
    packetContent.writeInt16BE(32, 66)

    // Build the packet
    const packetResult = new NPSMessage('Sent')
    packetResult.msgNo = 0x1_20
    packetResult.setContent(packetContent)
    packetResult.dumpPacket()

    return packetResult
  }
}
