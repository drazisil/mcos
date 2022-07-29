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

import { logger } from 'mcos-logger/src/index.js'
import type { SocketWithConnectionInfo } from 'mcos-types/types.js'
import { randomUUID } from 'node:crypto'
import type { Socket } from 'node:net'
import { EncryptionManager } from './encryption-mgr.js'
import { TCPConnection } from './tcpConnection.js'

const log = logger.child({ service: 'mcos:gateway:connections' })

/**
 *
 *
 * @param {unknown} error
 * @return {string}
 */
 export function errorMessage (error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  return String(error)
}

/** @type {SocketWithConnectionInfo[]} */
const connectionList: SocketWithConnectionInfo[] = []

/**
 *
 *
 * @export
 * @return {SocketWithConnectionInfo[]}
 */
export function getAllConnections (): SocketWithConnectionInfo[] {
  return connectionList
}

/**
   * Return an existing connection, or a new one
   *
   * @param {Socket} socket
   * @return {SocketWithConnectionInfo}
   */
export function selectConnection (socket: Socket): SocketWithConnectionInfo {

  const { localPort, remoteAddress } = socket

  if (typeof localPort === 'undefined' || typeof remoteAddress === 'undefined') {
    const errMessage = `Either localPort or remoteAddress is missing on socket. Can not continue.`
    log.error(errMessage)
    throw new Error(errMessage)
  }

  const existingConnection = connectionList.find(c => {
    return c.socket.remoteAddress === remoteAddress && c.localPort === localPort
  })

  if (typeof existingConnection !== 'undefined') {
    log.info(
        `I have seen connections from ${socket.remoteAddress} on ${socket.localPort} before`
    )
    existingConnection.socket = socket
    log.debug('Returning found connection after attaching socket')
    return existingConnection
  }

  const newConnectionId = randomUUID()
  log.debug(`Creating new connection with id ${newConnectionId}`)
  /** @type {SocketWithConnectionInfo} */
  const newConnection: SocketWithConnectionInfo = {
    seq: 0,
    id: newConnectionId,
    socket,
    remoteAddress: socket.remoteAddress || '',
    localPort: socket.localPort || 0,
    personaId: 0,
    lastMessageTimestamp: 0,
    inQueue: true,
    useEncryption: false
  }

  log.info(
      `I have not seen connections from ${socket.remoteAddress} on ${socket.localPort} before, adding it.`
  )

  connectionList.push(newConnection)

  log.debug(
      `Connection with id of ${newConnection.id} has been added. The connection list now contains ${connectionList.length} connections.`
  )
  return newConnection
}

/**
   * Update the internal connection record
   *
   * @param {string} connectionId
   * @param {SocketWithConnectionInfo} updatedConnection
   */
export function updateConnection (connectionId: string, updatedConnection: SocketWithConnectionInfo): void {
  log.trace(`Updating connection with id: ${connectionId}`)
  try {
    const index = connectionList.findIndex(
      c => {
        return c.id === connectionId
      }
    )
    connectionList.splice(index, 1)
    connectionList.push(updatedConnection)
  } catch (error) {
    throw new Error(
          `Error updating connection, ${errorMessage(error)}`
    )
  }
}

/**
   * Update the internal connection record
   *
   * @param {string} address
   * @param {number} port
   * @param {TCPConnection} newConnection
   * @return {*}  {TCPConnection[]} the updated connection
   */
export function updateConnectionByAddressAndPort (address: string, port: number, newConnection: TCPConnection): SocketWithConnectionInfo[] {
  if (newConnection === undefined) {
    throw new Error(
      `Undefined connection: ${JSON.stringify({
        remoteAddress: address,
        localPort: port
      })}`
    )
  }

  try {
    const index = connectionList.findIndex(
      (c) =>
        c.socket.remoteAddress === address && c.socket.localPort === port
    )
    connectionList.splice(index, 1)
    const newConnectionRecord: SocketWithConnectionInfo = {
      socket: newConnection.sock,
      remoteAddress: address,
      localPort: newConnection.sock.localPort || 0,
      seq: 0,
      id: newConnection.id,
      personaId: newConnection.appId,
      lastMessageTimestamp: newConnection.lastMsg,
      inQueue: newConnection.inQueue,
      useEncryption: newConnection.useEncryption
    }
    connectionList.push(newConnectionRecord)
    return connectionList
  } catch (error) {
    process.exitCode = -1
    throw new Error(
      `Error updating connection, ${JSON.stringify({
        error,
        connections: connectionList
      })}`
    )
  }
}

/**
   * Locate connection by remoteAddress and localPort in the connections array
   * @param {string} remoteAddress
   * @param {number} localPort
   * @return {{ legacy: TCPConnection, modern: ISocketWithConnectionInfo} | null}
   */
function findConnectionByAddressAndPort (remoteAddress: string, localPort: number): { legacy: TCPConnection; modern: SocketWithConnectionInfo } | null {
  const record =
      connectionList.find((c) => {
        const match =
        c.socket.remoteAddress === remoteAddress  &&
        c.localPort === localPort
        return match
      }) || null
  if (!record) {
    return null
  }
  const newConnection = new TCPConnection(record.id, record.socket)
  return { legacy: newConnection, modern: record }
}

/**
   * Creates a new connection object for the socket and adds to list
   * @param {string} connectionId
   * @param {Socket} socket
   * @returns {{ legacy: TCPConnection, modern: SocketWithConnectionInfo}}
   */
function createNewConnection (connectionId: string, socket: Socket): { legacy: TCPConnection; modern: SocketWithConnectionInfo } {
  const newConnection = new TCPConnection(connectionId, socket)

  const { localPort, remoteAddress } = socket

  if (typeof localPort === 'undefined' || typeof remoteAddress === 'undefined') {
    const errMessage = `Either localPort or remoteAddress is missing on socket. Can not continue.`
    log.error(errMessage)
    throw new Error(errMessage)
  }

  /** @type {SocketWithConnectionInfo} */
  const newConnectionRecord: SocketWithConnectionInfo = {
    socket,
    remoteAddress,
    localPort,
    seq: 0,
    id: connectionId,
    personaId: 0,
    lastMessageTimestamp: 0,
    inQueue: true,
    useEncryption: false
  }
  newConnection.setEncryptionManager(new EncryptionManager())
  return { legacy: newConnection, modern: newConnectionRecord }
}

/**
   * Add new connection to internal list
   *
   * @param {SocketWithConnectionInfo} connection
   * @return {SocketWithConnectionInfo[]}
   */
function addConnection (connection: SocketWithConnectionInfo): SocketWithConnectionInfo[] {
  connectionList.push(connection)
  return connectionList
}

/**
   * Return an existing connection, or a new one
   *
   * @param {Socket} socket
   * @return {{ legacy: TCPConnection, modern: SocketWithConnectionInfo} | null}
   */
export function findOrNewConnection (socket: Socket): { legacy: TCPConnection; modern: SocketWithConnectionInfo } | null {
  const { localPort, remoteAddress } = socket

  if (typeof localPort === 'undefined' || typeof remoteAddress === 'undefined') {
    const errMessage = `Either localPort or remoteAddress is missing on socket. Can not continue.`
    log.error(errMessage)
    throw new Error(errMessage)
  }

  const existingConnection = findConnectionByAddressAndPort(
    remoteAddress,
    localPort
  )
  if (existingConnection) {
    log.info(
      `I have seen connections from ${socket.remoteAddress} on ${socket.localPort} before`
    )

    // Legacy
    existingConnection.legacy.sock = socket
    log.debug('[L] Returning found connection after attaching socket')

    // Modern
    existingConnection.modern.socket = socket
    log.debug('[M] Returning found connection after attaching socket')
    return existingConnection
  }

  const newConnectionId = randomUUID()
  log.debug(`Creating new connection with id ${newConnectionId}`)
  const newConnection = createNewConnection(newConnectionId, socket)
  log.info(
    `I have not seen connections from ${socket.remoteAddress} on ${socket.localPort} before, adding it.`
  )
  const updatedConnectionList = addConnection(newConnection.modern)
  log.debug(
    `Connection with id of ${newConnection.modern.id} has been added. The connection list now contains ${updatedConnectionList.length} connections.`
  )
  return newConnection
}

// /**
//    * Get the name connected to the NPS opcode
//    * @param {number} opCode
//    * @return {string}
//    */
// function getNameFromOpCode (opCode: number): string {
//   const opCodeName = NPS_COMMANDS.find((code) => code.value === opCode)
//   if (opCodeName === undefined) {
//     throw new Error(`Unable to locate name for opCode ${opCode}`)
//   }

//   return opCodeName.name
// }

/**
 * Is this an MCOT bound packet?
 *
 * @export
 * @param {Buffer} inputBuffer
 * @return {boolean}
 */
export function isMCOT (inputBuffer: Buffer): boolean {
  return inputBuffer.toString('utf8', 2, 6) === 'TOMC'
}

