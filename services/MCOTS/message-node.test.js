// Mco-server is a game server, written from scratch, for an old game
// Copyright (C) <2017-2018>  <Joseph W Becher>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { expect, it } from '@jest/globals'
import { MessageNode } from './message-node'
import { Buffer } from 'buffer'

const messageNode1 = new MessageNode('Recieved')
messageNode1.deserialize(
  Buffer.from([
    0x00, 0x00, 0x54, 0x4f, 0x4d, 0x43, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  ]),
)

it('MessageNode', () => {
  expect(() => {
    new MessageNode('Recieved').deserialize(Buffer.from([0x00, 0x00]))
  }).toThrow('[MessageNode] Not long enough to deserialize, only 2 bytes long')

  expect(messageNode1.isMCOTS()).toBeTruthy()
  try {
    messageNode1.dumpPacket()
  } catch (error) {
    expect(error).not.toBeNull()
  }
})
