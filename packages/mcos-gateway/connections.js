import { errorMessage } from 'mcos-shared'
import { logger } from 'mcos-shared/logger'
import { randomUUID } from 'node:crypto'

const log = logger.child({ service: 'mcos:gateway:connections' })

/** @type {import("mcos-shared/types").SocketWithConnectionInfo[]} */
const connectionList = []

/**
   * Return an existing connection, or a new one
   *
   * @param {import("node:net").Socket} socket
   * @return {import('mcos-shared/types').SocketWithConnectionInfo}
   */
export function selectConnection (socket) {
  const existingConnection = connectionList.find(c => {
    return c.socket.remoteAddress === socket.remoteAddress && c.socket.localPort === socket.localPort
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
  /** @type {import("mcos-shared/types").SocketWithConnectionInfo} */
  const newConnection = {
    seq: 0,
    id: newConnectionId,
    socket,
    appId: 0,
    lastMsg: 0,
    inQueue: true
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
   * @param {import("mcos-shared/types").SocketWithConnectionInfo} updatedConnection
   */
export function updateConnection (connectionId, updatedConnection) {
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
