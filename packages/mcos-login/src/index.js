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

import { DatabaseManager } from "../../mcos-database/src/index.js";
import { handleData } from "./internal.js";
import log from '../../../log.js'

/**
 * Manages the initial game connection setup and teardown.
 * @module LoginServer
 */

/**
 * @global
 * @typedef {object} UserRecordMini
 * @property {string} contextId
 * @property {number} customerId
 * @property {number} userId
 */


/**
 * Please use {@link LoginServer.getInstance()}
 * @classdesc
 * @property {DatabaseManager} databaseManager
 */
export class LoginServer {
    /**
     *
     *
     * @static
     * @type {LoginServer}
     * @memberof LoginServer
     */
    static _instance;
    databaseManager = DatabaseManager.getInstance();
    /**
     * Get the single instance of the login server
     *
     * @static
     * @return {LoginServer}
     * @memberof LoginServer
     */
    static getInstance() {
        if (typeof LoginServer._instance === "undefined") {
            LoginServer._instance = new LoginServer();
        }
        return LoginServer._instance;
    }

    

    /**
     *
     * @private
     * @param {string} contextId
     * @return {UserRecordMini}
     */
    _npsGetCustomerIdByContextId(contextId) {
        log.info(">>> _npsGetCustomerIdByContextId");
        /** @type {UserRecordMini[]} */
        const users = [
            {
                contextId: "5213dee3a6bcdb133373b2d4f3b9962758",
                customerId: 0xac_01_00_00,
                userId: 0x00_00_00_02,
            },
            {
                contextId: "d316cd2dd6bf870893dfbaaf17f965884e",
                customerId: 0x00_54_b4_6c,
                userId: 0x00_00_00_01,
            },
        ];
        if (contextId.toString() === "") {
            throw new Error(`Unknown contextId: ${contextId.toString()}`);
        }

        const userRecord = users.filter((user) => user.contextId === contextId);
        if (typeof userRecord[0] === "undefined" || userRecord.length !== 1) {
            log.info(
                `preparing to leave _npsGetCustomerIdByContextId after not finding record',
        ${JSON.stringify({
            contextId,
        })}`
            );
            throw new Error(
                `Unable to locate user record matching contextId ${contextId}`
            );
        }

        log.info(
            `preparing to leave _npsGetCustomerIdByContextId after finding record',
      ${JSON.stringify({
          contextId,
          userRecord,
      })}`
        );
        return userRecord[0];
    }
}


/**
 * Entry and exit point of the Login service
 *
 * @export
 * @param {import("../../mcos-gateway/src/sockets.js").BufferWithConnection} dataConnection
 * @return {Promise<import("../../mcos-gateway/src/sockets.js").ServiceResponse>}
 */
export async function receiveLoginData(
    dataConnection
) {
    try {
        log.info('Entering login module')
        const response = await handleData(dataConnection);
        log.info(`There are ${response.messages.length} messages`);
        log.info('Exiting login module')
        return response;
    } catch (error) {
        throw new Error(`There was an error in the login service: ${String(
            error
        )}`);
    }
}
