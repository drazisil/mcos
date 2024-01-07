/**
 * This class abstracts database methods
 * @see {@link getDatabaseServer()} to get a singleton instance
 */

import { ServerLogger, getServerLogger } from "../../shared/log.js";

/**
 * @module Database
 */

export class Database {
    updateUser(user: { userId: number; userData: Buffer }) {
        try {
            this._users.set(user.userId, user.userData);
        } catch (error) {
            this._log.error(String(error));
        }
    }
    static instance: Database | undefined;
    private _log: ServerLogger;
    private _sessions: interfaces.ConnectionRecord[];
    private _lobbies: interfaces.RaceLobbyRecord[][];
    private _users: Map<number, Buffer>;

    /**
     * Creates an instance of Database.
     *
     * @param {ServerLogger} [log=getServerLogger({ module: "database" })]
     */
    constructor(
        log: ServerLogger = getServerLogger({
            module: "database",
        }),
    ) {
        this._log = log;
        this._sessions = [];
        /**
         * @private
         * @type {interfaces.RaceLobbyRecord[]}
         */
        this._lobbies = [];
        this._users = new Map();
    }

    /**
     * Return the singleton instance of the DatabaseManager class
     *
     * @static
     * @param {ServerLogger} log
     * @returns {Database}
     */
    static getInstance(log: ServerLogger): Database {
        if (!Database.instance) {
            Database.instance = new Database(log);
        }
        const self = Database.instance;
        return self;
    }

    /**
     * Locate customer session encryption key in the database
     *
     * @param {number} customerId
     * @returns {Promise<import("../../interfaces/index.js").ConnectionRecord>}
     * @throws {Error} If the session key is not found
     */
    async fetchSessionKeyByCustomerId(
        customerId: number,
    ): Promise<interfaces.ConnectionRecord> {
        const record = this._sessions.find((session) => {
            return session.customerId === customerId;
        });
        if (typeof record === "undefined") {
            const err = new Error(
                `Session key not found for customer ${customerId}`,
            );
            throw err;
        }
        return record;
    }

    /**
     * Locate customer session encryption key in the database
     *
     * @param {string} connectionId
     * @returns {Promise<interfaces.ConnectionRecord>}
     * @throws {Error} If the session key is not found
     */
    async fetchSessionKeyByConnectionId(
        connectionId: string,
    ): Promise<interfaces.ConnectionRecord> {
        const record = this._sessions.find((session) => {
            return session.connectionId === connectionId;
        });
        if (typeof record === "undefined") {
            const err = new Error(
                `Session key not found for connection ${connectionId}`,
            );
            throw err;
        }
        return record;
    }

    /**
     * Create or overwrite a customer's session key record
     *
     * @param {number} customerId
     * @param {string} sessionKey
     * @param {string} contextId
     * @param {string} connectionId
     * @returns {Promise<void>}
     * @throws {Error} If the session key is not found
     */
    async updateSessionKey(
        customerId: number,
        sessionKey: string,
        contextId: string,
        connectionId: string,
    ): Promise<void> {
        const sKey = sessionKey.slice(0, 16);

        const updatedSession: import("../../interfaces/index.js").ConnectionRecord =
            {
                customerId,
                sessionKey,
                sKey,
                contextId,
                connectionId,
            };

        const record = this._sessions.findIndex((session) => {
            return session.customerId === customerId;
        });
        if (typeof record === "undefined") {
            const err = new Error(
                "Error updating session key: existing key not found",
            );
            throw err;
        }
        this._sessions.splice(record, 1, updatedSession);
    }
}

/**
 * Return the singleton instance of the DatabaseManager class
 *
 * @param {object} options
 * @param {ServerLogger} options.log=getServerLogger({ module: "database" })
 * @returns {Database}
 */

export function getDatabaseServer(
    option = {
        log: getServerLogger({
            module: "database",
        }),
    },
): Database {
    if (!Database.instance) {
        Database.instance = new Database(option.log);
    }
    return Database.getInstance(option.log);
}
