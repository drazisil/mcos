/* eslint-disable @typescript-eslint/no-unused-vars */
// Mco-server is a game server, written from scratch, for an old game
// Copyright (C) <2017-2018>  <Joseph W Becher>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Logger } from '@drazisil/mco-logger'
import { Socket } from 'net'
import { EMessageDirection } from '../MCOTS/message-node.js'
import { NPSMessage } from '../MCOTS/nps-msg.js'
import { TCPConnection } from '../MCServer/tcpConnection.js'
import { NPSPersonaMapsMessage } from './nps-persona-maps-msg.js'
import { Buffer } from 'buffer'

const { log } = Logger.getInstance()

/**
 */

/**
 * @class
 * @property {IPersonaRecord[]} personaList
 */
export class PersonaServer {
  static _instance
  personaList
  serviceName

  /**
   *
   * @returns {PersonaServer}
   */
  static getInstance() {
    if (!PersonaServer._instance) {
      PersonaServer._instance = new PersonaServer(false)
    }
    return PersonaServer._instance
  }

  constructor(isNew = true) {
    if (isNew) {
      throw new Error('Please use getInstance()')
    }
    this.personaList = [
      {
        customerId: 2_868_969_472,
        id: Buffer.from([0x00, 0x00, 0x00, 0x01]),
        maxPersonas: Buffer.from([0x01]),
        name: this._generateNameBuffer('Doc Joe'),
        personaCount: Buffer.from([0x00, 0x01]),
        shardId: Buffer.from([0x00, 0x00, 0x00, 0x2c]),
      },
      {
        customerId: 5_551_212,
        id: Buffer.from([0x00, 0x84, 0x5f, 0xed]),
        maxPersonas: Buffer.from([0x02]),
        name: this._generateNameBuffer('Dr Brown'),
        personaCount: Buffer.from([0x00, 0x01]),
        shardId: Buffer.from([0x00, 0x00, 0x00, 0x2c]),
      },
      {
        customerId: 5_551_212,
        id: Buffer.from([0x00, 0x84, 0x5f, 0xee]),
        maxPersonas: Buffer.from([0x02]),
        name: this._generateNameBuffer('Morty Dr'),
        personaCount: Buffer.from([0x00, 0x01]),
        shardId: Buffer.from([0x00, 0x00, 0x00, 0x2c]),
      },
    ]
    this.serviceName = 'mcoserver:PersonaServer'
  }

  /**
   *
   * @param {string} name
   * @returns {Buffer}
   */
  _generateNameBuffer(name) {
    const nameBuffer = Buffer.alloc(30)
    Buffer.from(name, 'utf8').copy(nameBuffer)
    return nameBuffer
  }

  /**
   *
   * @param {Buffer} data
   * @returns {Promise<NPSMessage>}
   */
  async handleSelectGamePersona(data) {
    log('debug', '_npsSelectGamePersona...', { service: this.serviceName })
    const requestPacket = new NPSMessage(
      EMessageDirection.RECEIVED,
    ).deserialize(data)
    log(
      'debug',
      `NPSMsg request object from _npsSelectGamePersona: ${JSON.stringify({
        NPSMsg: requestPacket.toJSON(),
      })}`,
      { service: this.serviceName },
    )

    requestPacket.dumpPacket()

    // Create the packet content
    const packetContent = Buffer.alloc(251)

    // Build the packet
    // Response Code
    // 207 = success
    const responsePacket = new NPSMessage(EMessageDirection.SENT)
    responsePacket.msgNo = 0x2_07
    responsePacket.setContent(packetContent)
    log(
      'debug',
      `NPSMsg response object from _npsSelectGamePersona',
      ${JSON.stringify({
        NPSMsg: responsePacket.toJSON(),
      })}`,
      { service: this.serviceName },
    )

    responsePacket.dumpPacket()

    log(
      'debug',
      `[npsSelectGamePersona] responsePacket's data prior to sending: ${responsePacket.getPacketAsString()}`,
      { service: this.serviceName },
    )
    return responsePacket
  }

  /**
   *
   * @param {Buffer} data
   * @returns {Promise<NPSMessage>}
   */
  async createNewGameAccount(data) {
    const requestPacket = new NPSMessage(
      EMessageDirection.RECEIVED,
    ).deserialize(data)
    log(
      'debug',
      `NPSMsg request object from _npsNewGameAccount',
      ${JSON.stringify({
        NPSMsg: requestPacket.toJSON(),
      })}`,
      { service: this.serviceName },
    )

    requestPacket.dumpPacket()

    const rPacket = new NPSMessage(EMessageDirection.SENT)
    rPacket.msgNo = 0x6_01
    log(
      'debug',
      `NPSMsg response object from _npsNewGameAccount',
      ${JSON.stringify({
        NPSMsg: rPacket.toJSON(),
      })}`,
      { service: this.serviceName },
    )

    rPacket.dumpPacket()

    return rPacket
  }

  //  * TODO: Change the persona record to show logged out. This requires it to exist first, it is currently hard-coded
  //  * TODO: Locate the connection and delete, or reset it.
  /**
   *
   * @param {Buffer} data
   * @returns {Promise<NPSMessage>}
   */
  async logoutGameUser(data) {
    log('debug', '[personaServer] Logging out persona...', {
      service: this.serviceName,
    })
    const requestPacket = new NPSMessage(
      EMessageDirection.RECEIVED,
    ).deserialize(data)
    log(
      'debug',
      `NPSMsg request object from _npsLogoutGameUser',
      ${JSON.stringify({
        NPSMsg: requestPacket.toJSON(),
      })}`,
      { service: this.serviceName },
    )

    requestPacket.dumpPacket()

    // Create the packet content
    const packetContent = Buffer.alloc(257)

    // Build the packet
    const responsePacket = new NPSMessage(EMessageDirection.SENT)
    responsePacket.msgNo = 0x6_12
    responsePacket.setContent(packetContent)
    log(
      'debug',
      `NPSMsg response object from _npsLogoutGameUser',
      ${JSON.stringify({
        NPSMsg: responsePacket.toJSON(),
      })}`,
      { service: this.serviceName },
    )

    responsePacket.dumpPacket()

    log(
      'debug',
      `[npsLogoutGameUser] responsePacket's data prior to sending: ${responsePacket.getPacketAsString()}`,
      { service: this.serviceName },
    )
    return responsePacket
  }

  /**
   * Handle a check token packet
   *
   * @param {Buffer} data
   * @return {Promise<NPSMessage>}
   */
  async validateLicencePlate(data) {
    log('debug', '_npsCheckToken...', { service: this.serviceName })
    const requestPacket = new NPSMessage(
      EMessageDirection.RECEIVED,
    ).deserialize(data)
    log(
      'debug',
      `NPSMsg request object from _npsCheckToken',
      ${JSON.stringify({
        NPSMsg: requestPacket.toJSON(),
      })}`,
      { service: this.serviceName },
    )

    requestPacket.dumpPacket()

    const customerId = data.readInt32BE(12)
    const plateName = data.slice(17).toString()
    log('debug', `customerId: ${customerId}`, { service: this.serviceName })
    log('debug', `Plate name: ${plateName}`, { service: this.serviceName })

    // Create the packet content

    const packetContent = Buffer.alloc(256)

    // Build the packet
    // NPS_ACK = 207
    const responsePacket = new NPSMessage(EMessageDirection.SENT)
    responsePacket.msgNo = 0x2_07
    responsePacket.setContent(packetContent)
    log(
      'debug',
      `NPSMsg response object from _npsCheckToken',
      ${JSON.stringify({
        NPSMsg: responsePacket.toJSON(),
      })}`,
      { service: this.serviceName },
    )
    responsePacket.dumpPacket()

    log(
      'debug',
      `[npsCheckToken] responsePacket's data prior to sending: ${responsePacket.getPacketAsString()}`,
      { service: this.serviceName },
    )
    return responsePacket
  }

  /**
   * Handle a get persona maps packet
   *
   * @param {Buffer} data
   * @return {Promise<NPSMessage>}
   */
  async validatePersonaName(data) {
    log('debug', '_npsValidatePersonaName...', { service: this.serviceName })
    const requestPacket = new NPSMessage(
      EMessageDirection.RECEIVED,
    ).deserialize(data)

    log(
      'debug',
      `NPSMsg request object from _npsValidatePersonaName',
      ${JSON.stringify({
        NPSMsg: requestPacket.toJSON(),
      })}`,
      { service: this.serviceName },
    )
    requestPacket.dumpPacket()

    const customerId = data.readInt32BE(12)
    const requestedPersonaName = data
      .slice(18, data.lastIndexOf(0x00))
      .toString()
    const serviceName = data.slice(data.indexOf(0x0a) + 1).toString()
    log(
      'debug',
      JSON.stringify({ customerId, requestedPersonaName, serviceName }),
      {
        service: this.serviceName,
      },
    )

    // Create the packet content
    // TODO: Create a real personas map packet, instead of using a fake one that (mostly) works

    const packetContent = Buffer.alloc(256)

    // Build the packet
    // NPS_USER_VALID     validation succeeded
    const responsePacket = new NPSMessage(EMessageDirection.SENT)
    responsePacket.msgNo = 0x6_01
    responsePacket.setContent(packetContent)

    log(
      'debug',
      `NPSMsg response object from _npsValidatePersonaName',
      ${JSON.stringify({
        NPSMsg: responsePacket.toJSON(),
      })}`,
      { service: this.serviceName },
    )
    responsePacket.dumpPacket()

    log(
      'debug',
      `[npsValidatePersonaName] responsePacket's data prior to sending: ${responsePacket.getPacketAsString()}`,
      { service: this.serviceName },
    )
    return responsePacket
  }

  /**
   *
   *
   * @param {Socket} socket
   * @param {NPSMessage} packet
   * @return {void}
   */
  sendPacket(socket, packet) {
    try {
      socket.write(packet.serialize())
    } catch (error) {
      if (error instanceof Error) {
        throw new TypeError(`Unable to send packet: ${error}`)
      }

      throw new Error('Unable to send packet, error unknown')
    }
  }

  /**
   *
   * @param {number} customerId
   * @return {Promise<IPersonaRecord[]>}
   */
  async getPersonasByCustomerId(customerId) {
    const results = this.personaList.filter(
      persona => persona.customerId === customerId,
    )
    if (results.length === 0) {
      return Promise.reject(
        new Error(`Unable to locate a persona for customerId: ${customerId}`),
      )
    }

    return results
  }

  /**
   *
   * @param {number} id
   * @return {Promise<IPersonaRecord[]>}
   */
  async getPersonasByPersonaId(id) {
    const results = this.personaList.filter(persona => {
      const match = id === persona.id.readInt32BE(0)
      return match
    })
    if (results.length === 0) {
      throw new Error(`Unable to locate a persona for id: ${id}`)
    }

    return results
  }

  /**
   * Lookup all personas owned by the customer id
   * TODO: Store in a database, instead of being hard-coded
   *
   * @param {number} customerId
   * @return {Promise<IPersonaRecord[]>}
   */
  async getPersonaMapsByCustomerId(customerId) {
    switch (customerId) {
      case 2_868_969_472:
      case 5_551_212:
        return this.getPersonasByCustomerId(customerId)
      default:
        return []
    }
  }

  /**
   * Handle a get persona maps packet
   * @param {Buffer} data
   * @return {Promise<NPSMessage>}
   */
  async getPersonaMaps(data) {
    log('debug', '_npsGetPersonaMaps...', { service: this.serviceName })
    const requestPacket = new NPSMessage(
      EMessageDirection.RECEIVED,
    ).deserialize(data)

    log(
      'debug',
      `NPSMsg request object from _npsGetPersonaMaps',
      ${JSON.stringify({
        NPSMsg: requestPacket.toJSON(),
      })}`,
      { service: this.serviceName },
    )
    log(
      'debug',
      `NPSMsg request object from _npsGetPersonaMaps',
      ${JSON.stringify({
        NPSMsg: requestPacket.toJSON(),
      })}`,
      { service: this.serviceName },
    )
    requestPacket.dumpPacket()

    const customerId = Buffer.alloc(4)
    data.copy(customerId, 0, 12)
    const personas = await this.getPersonaMapsByCustomerId(
      customerId.readUInt32BE(0),
    )
    log(
      'debug',
      `${personas.length} personas found for ${customerId.readUInt32BE(0)}`,
      { service: this.serviceName },
    )

    let responsePacket

    const personaMapsMessage = new NPSPersonaMapsMessage(EMessageDirection.SENT)

    if (personas.length === 0) {
      throw new Error(
        `No personas found for customer Id: ${customerId.readUInt32BE(0)}`,
      )
    } else {
      try {
        personaMapsMessage.loadMaps(personas)

        responsePacket = new NPSMessage(EMessageDirection.SENT)
        responsePacket.msgNo = 0x6_07
        responsePacket.setContent(personaMapsMessage.serialize())
        log(
          'debug',
          `NPSMsg response object from _npsGetPersonaMaps: ${JSON.stringify({
            NPSMsg: responsePacket.toJSON(),
          })}`,
          { service: this.serviceName },
        )

        responsePacket.dumpPacket()
      } catch (error) {
        if (error instanceof Error) {
          throw new TypeError(`Error serializing personaMapsMsg: ${error}`)
        }

        throw new Error('Error serializing personaMapsMsg, error unknonw')
      }
    }

    return responsePacket
  }

  /**
   *
   * @param {IRawPacket} rawPacket
   * @returns {Promise<TCPConnection>}
   */
  async dataHandler(rawPacket) {
    const { connection, data, localPort, remoteAddress } = rawPacket
    const { sock } = connection
    const updatedConnection = connection
    log(
      'debug',
      `Received Persona packet',
      ${JSON.stringify({
        localPort,
        remoteAddress,
        data: rawPacket.data.toString('hex'),
      })}`,
      { service: this.serviceName },
    )
    const requestCode = data.readUInt16BE(0).toString(16)
    let responsePacket

    switch (requestCode) {
      case '503':
        // NPS_REGISTER_GAME_LOGIN = 0x503
        responsePacket = await this.handleSelectGamePersona(data)
        this.sendPacket(sock, responsePacket)
        return updatedConnection

      case '507':
        // NPS_NEW_GAME_ACCOUNT == 0x507
        responsePacket = await this.createNewGameAccount(data)
        this.sendPacket(sock, responsePacket)
        return updatedConnection

      case '50f':
        // NPS_REGISTER_GAME_LOGOUT = 0x50F
        responsePacket = await this.logoutGameUser(data)
        this.sendPacket(sock, responsePacket)
        return updatedConnection

      case '532':
        // NPS_GET_PERSONA_MAPS = 0x532
        responsePacket = await this.getPersonaMaps(data)
        this.sendPacket(sock, responsePacket)
        return updatedConnection

      case '533':
        // NPS_VALIDATE_PERSONA_NAME   = 0x533
        responsePacket = await this.validatePersonaName(data)
        this.sendPacket(sock, responsePacket)
        return updatedConnection

      case '534':
        // NPS_CHECK_TOKEN   = 0x534
        responsePacket = await this.validateLicencePlate(data)
        this.sendPacket(sock, responsePacket)
        return updatedConnection

      default:
        throw new Error(
          `[personaServer] Unknown code was received ${JSON.stringify({
            requestCode,
            localPort,
          })}`,
        )
    }
  }
}
