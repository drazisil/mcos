// mcos is a game server, written from scratch, for an old game
// Copyright (C) <2017-2021>  <Drazi Crendraven>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

const t = require("tap");
const { SocketFactory } = require("../../test-helpers/socket-factory.js");
const { ConnectionManager } = require("../src/connection-mgr.js");
const { EncryptionManager } = require("../src/encryption-mgr.js");
const { TCPConnection } = require("../src/tcpConnection.js");
const { Buffer } = require("buffer");

t.test("ConnectionObj", (t) => {
  const testConnection = new TCPConnection("abc", SocketFactory.createSocket());

  testConnection.setManager(ConnectionManager.getInstance());
  testConnection.setEncryptionManager(new EncryptionManager());

  t.equal(testConnection.status, "Inactive");
  t.notOk(testConnection.isSetupComplete);
  testConnection.setEncryptionKey(Buffer.from("abc123", "hex"));
  t.ok(testConnection.isSetupComplete);
  t.end();
});

t.test("ConnectionObj cross-comms", (t) => {
  /** @type {TCPConnection} */
  let testConn1;
  /** @type {TCPConnection} */
  let testConn2;

  t.beforeEach(() => {
    testConn1 = new TCPConnection("def", SocketFactory.createSocket());
    testConn1.setManager(ConnectionManager.getInstance());
    testConn1.setEncryptionManager(new EncryptionManager());

    testConn2 = new TCPConnection("ghi", SocketFactory.createSocket());
    testConn2.setManager(ConnectionManager.getInstance());
    testConn2.setEncryptionManager(new EncryptionManager());

    testConn1.setEncryptionKey(Buffer.from("abc123", "hex"));
    testConn2.setEncryptionKey(Buffer.from("abc123", "hex"));
  });

  const plainText1 = Buffer.from(
    "I'm a very a secret message. Please don't decode me!"
  );
  const cipherText1 = Buffer.from([
    0x71, 0xf2, 0xae, 0x29, 0x91, 0x8d, 0xba, 0x3d, 0x5e, 0x6c, 0x31, 0xb0,
    0x3a, 0x58, 0x82, 0xa3, 0xdd, 0xb9, 0xec, 0x5d, 0x3e, 0x82, 0xd4, 0x4f,
    0xc0, 0xe5, 0xe5, 0x39, 0x03, 0xba, 0x1c, 0x19, 0xc4, 0x16, 0x03, 0x68,
    0xff, 0xc9, 0x6f, 0x72, 0xe4, 0x94, 0x27, 0x40, 0x46, 0x47, 0x56, 0xf0,
    0x79, 0x70, 0xbf, 0x45,
  ]);

  t.test("Connection one is not the same id as connection two", (t) => {
    console.log(1, testConn1.getEncryptionId());
    console.log(2, testConn2.getEncryptionId());
    t.not(testConn1.getEncryptionId(), testConn2.getEncryptionId());
    t.end();
  });

  t.test("Connection Two can decipher Connection One", (t) => {
    const encipheredBuffer = testConn1.encryptBuffer(plainText1);
    t.same(encipheredBuffer, cipherText1);
    t.same(testConn1.decryptBuffer(encipheredBuffer), plainText1);
    t.same(testConn2.decryptBuffer(encipheredBuffer), plainText1);

    // Try again
    const encipheredBuffer2 = testConn1.encryptBuffer(plainText1);
    t.same(testConn1.decryptBuffer(encipheredBuffer2), plainText1);
    t.same(testConn2.decryptBuffer(encipheredBuffer2), plainText1);

    // And again
    const encipheredBuffer3 = testConn1.encryptBuffer(plainText1);
    t.same(testConn1.decryptBuffer(encipheredBuffer3), plainText1);
    t.same(testConn2.decryptBuffer(encipheredBuffer3), plainText1);
    t.end();
  });
  t.end();
});
