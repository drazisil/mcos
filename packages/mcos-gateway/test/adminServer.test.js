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

import chai, { expect } from "chai";
import { AdminServer } from "../src/adminServer.js";
import { resetQueue } from "../src/resetQueue.js";
import { describe, it } from "mocha";
import { Socket } from "net";

chai.should();

describe("AdminServer", () => {
    describe(".getAdminServer", () => {
        it("should return an instance of AdminServer", () => {
            // Arrange
            /**  @type {import("mcos/shared").TServerLogger} */
            const log = {
                info: () => { return },
                error: () => { return }
            }

            // Act
            const newAdminInstance = AdminServer.getAdminServer(log);

            // Assert
            newAdminInstance.should.be.instanceOf(AdminServer);
        });
        it("should return the same instance of AdminServer on multiple calls", () => {
                        // Arrange
            /**  @type {import("mcos/shared").TServerLogger} */
            const log = {
                info: () => { return },
                error: () => { return }
            }

            // Act
            const admin1 = AdminServer.getAdminServer(log);
            const admin2 = AdminServer.getAdminServer(log);

            // Assert
            admin1.should.equal(admin2);
        });
    });
});

describe("resetQueue()", function () {
    it("should reset the inQueue property to true for all connections", function () {
        // arrange        
        /** @type {import("mcos/shared").TSocketWithConnectionInfo[]} */
        const inputConnectionList = [
            {
                socket: new Socket(),
                seq: 0,
                id: "A",
                remoteAddress: "0.0.0.0",
                localPort: 0,
                personaId: 0,
                lastMessageTimestamp: 0,
                inQueue: false,
                useEncryption: false,
            },
            {
                socket: new Socket(),
                seq: 0,
                id: "A",
                remoteAddress: "0.0.0.0",
                localPort: 0,
                personaId: 0,
                lastMessageTimestamp: 0,
                inQueue: false,
                useEncryption: false,
            },
            {
                socket: new Socket(),
                seq: 0,
                id: "A",
                remoteAddress: "0.0.0.0",
                localPort: 0,
                personaId: 0,
                lastMessageTimestamp: 0,
                inQueue: false,
                useEncryption: false,
            },
        ];
        /** @type {import("mcos/shared").TSocketWithConnectionInfo[]} */
        const expectedConnectionList = [
            {
                socket: new Socket(),
                seq: 0,
                id: "A",
                remoteAddress: "0.0.0.0",
                localPort: 0,
                personaId: 0,
                lastMessageTimestamp: 0,
                inQueue: true,
                useEncryption: false,
            },
            {
                socket: new Socket(),
                seq: 0,
                id: "A",
                remoteAddress: "0.0.0.0",
                localPort: 0,
                personaId: 0,
                lastMessageTimestamp: 0,
                inQueue: true,
                useEncryption: false,
            },
            {
                socket: new Socket(),
                seq: 0,
                id: "A",
                remoteAddress: "0.0.0.0",
                localPort: 0,
                personaId: 0,
                lastMessageTimestamp: 0,
                inQueue: true,
                useEncryption: false,
            },
        ];

        // act
        /** @type {import("mcos/shared").TSocketWithConnectionInfo[]} */
        const result = JSON.parse(resetQueue(inputConnectionList).body);

        // assert
        expect(result[1]?.inQueue).to.equal(expectedConnectionList[1]?.inQueue);
    });
});
