import { State } from "../../shared/State.js";
import { getServerLogger } from "../../shared/log.js";
import { clientConnect } from "../src/clientConnect.js";
import { describe, it, expect } from "vitest";
import { ServerError } from "../../shared/errors/ServerError.js";
import { getDatabaseServer } from "../../database/src/DatabaseManager.js";
import { TClientConnectMessage } from "../src/TClientConnectMessage.js";
import { mockPino } from "../../../test/factoryMocks.js";

describe("clientConnect", () => {
    it("throws when connection is not found", async () => {
        // arrange
        const customerId = 1234;
        const connectionId = "test";
        const sessionKey =
            "1234567890123456123456789012345612345678901234561234567890123456";
        const contextId = "test";
        const incomingMessage = new TClientConnectMessage();
        incomingMessage._customerId = customerId;

        mockPino();
        const log = getServerLogger({});
        const state: State = {
            encryptions: {},
            sessions: {},
            filePaths: {},
            sockets: {},
            queuedConnections: {},
            onDataHandlers: {},
            save() {},
        };
        getDatabaseServer().updateSessionKey(
            customerId,
            sessionKey,
            contextId,
            connectionId,
        );

        // act
        try {
            await clientConnect({
                connectionId,
                packet: incomingMessage,
                log,
            });
        } catch (error) {
            // assert
            expect(error).toEqual(
                new ServerError(
                    `Encryption not found for connection ${connectionId}`,
                ),
            );
        }
    });
});
