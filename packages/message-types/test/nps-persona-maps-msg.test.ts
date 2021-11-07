// mcos is a game server, written from scratch, for an old game
// Copyright (C) <2017-2021>  <Drazi Crendraven>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import t from "tap";
import { EMessageDirection } from "../../types/src/index";
import { NPSPersonaMapsMessage } from "../src/index";

t.test("NPSPersonaMapsMsg", (t) => {
  const npsPersonaMapsMessage = new NPSPersonaMapsMessage(
    EMessageDirection.RECEIVED
  );
  t.equal(npsPersonaMapsMessage.direction, EMessageDirection.RECEIVED);
  t.equal(npsPersonaMapsMessage.msgNo, 0x6_07);
  t.end();
});
