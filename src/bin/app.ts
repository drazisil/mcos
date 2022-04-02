/*
 mcos is a game server, written from scratch, for an old game
 Copyright (C) <2017-2021>  <Drazi Crendraven>
 This Source Code Form is subject to the terms of the Mozilla Public
 License, v. 2.0. If a copy of the MPL was not distributed with this
 file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

import { logger } from "../logger/index";
import { ListenerThread } from "../core/listener-thread";
import { startHTTPListener } from "../server/connectionEndpoints";

const log = logger.child({ service: "mcos" });

startHTTPListener();

const listenerThread = ListenerThread.getInstance();
log.info({}, "Starting the listening sockets...");
const tcpPortList = [
  6660, 8228, 8226, 7003, 8227, 43_200, 43_300, 43_400, 53_303, 9000, 9001,
  9002, 9003, 9004, 9005, 9006, 9007, 9008, 9009, 9010, 9011, 9012, 9013, 9014,
];

for (const port of tcpPortList) {
  listenerThread.startTCPListener(port);
  log.info(`port ${port} listening`);
}

log.info("Listening sockets create successfully.");
