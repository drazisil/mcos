// mco-server is a game server, written from scratch, for an old game
// Copyright (C) <2017-2018>  <Joseph W Becher>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { NPSUserInfo } from '../src/services/MCServer/LobbyServer/npsUserInfo.js'
import { expect } from 'chai'

/* eslint-env mocha */

it('NPSUserInfo', () => {
  const testPacket = Buffer.concat([
    Buffer.from([0x00, 0x00, 0x00, 0x00, 0x00, 0x84, 0x5f, 0xed]),
    Buffer.alloc(98)
  ])
  const npsUserInfo = new NPSUserInfo('RECEIVED')
  npsUserInfo.deserialize(testPacket)
  expect(npsUserInfo.userId).equals(8675309)
})
