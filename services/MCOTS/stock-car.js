// Mco-server is a game server, written from scratch, for an old game
// Copyright (C) <2017-2018>  <Joseph W Becher>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Logger } from '@drazisil/mco-logger'
import { Buffer } from 'buffer'

const { log } = Logger.getInstance()

/**
 * Container objest for Stock cars
 */

// DWORD   brandedPartID;
// DWORD   retailPrice;
// WORD    bIsDealOfTheDay;

/**
 * @class
 * @property {number} brandedPartId
 * @property {number} retailPrice
 * @property {0 | 1} bIsDealOfTheDay
 */
export class StockCar {
  brandedPartId
  retailPrice
  bIsDealOfTheDay
  serviceName
  /**
   * @param {number} brandedPartId
   * @param {number} retailPrice
   * @param {0|1} bIsDealOfTheDay
   */
  constructor(brandedPartId, retailPrice, bIsDealOfTheDay) {
    this.brandedPartId = brandedPartId
    this.retailPrice = retailPrice
    this.bIsDealOfTheDay = bIsDealOfTheDay
    this.serviceName = 'mcoserver:StockCar'
  }

  /**
   *
   * @return {Buffer}
   */
  serialize() {
    const packet = Buffer.alloc(10)
    packet.writeInt32LE(this.brandedPartId, 0)
    packet.writeInt32LE(this.retailPrice, 4)
    packet.writeInt16LE(this.bIsDealOfTheDay, 8)
    return packet
  }

  /**
   * DumpPacket
   * @return {void}
   */
  dumpPacket() {
    log(
      'debug',
      `
    [StockCar]======================================
    brandedPartId:     ${this.brandedPartId}
    retailPrice:       ${this.retailPrice}
    isDealOfTheDay:    ${this.bIsDealOfTheDay}
    logger.log('[/StockCar]======================================`,
      { service: this.serviceName },
    )
  }
}
