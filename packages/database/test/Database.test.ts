import { P } from "vitest/dist/reporters-5f784f42.js";
import { getServerLogger } from "../../shared/log.js";
import { Database } from "../src/DatabaseManager.js";
import { describe, it, expect, vi } from "vitest";
import { ServerError } from "../../shared/errors/ServerError.js";
import { mockPino } from "../../../test/factoryMocks.js";

describe("Database", () => {
    it("returns the same instance", () => {
        // arrange
        vi.mock("pino", async () => {
            const actual = await vi.importActual("pino");
            return {
                ...(actual as P),
            };
        });
        const log = getServerLogger({});
        // act
        const instance1 = Database.getInstance(log);
        const instance2 = Database.getInstance(log);
        // assert
        expect(instance1).toEqual(instance2);
    });

    describe("fetchSessionKeyByCustomerId", () => {
        it("throws when session key is not found", async () => {
            // arrange
            mockPino();
            const log = getServerLogger({});
            const instance = Database.getInstance(log);
            const customerId = 1234;
            // act
            try {
                await instance.fetchSessionKeyByCustomerId(customerId);
            } catch (error) {
                // assert
                expect(error).toEqual(
                    new ServerError(
                        `Session key not found for customer ${customerId}`,
                    ),
                );
            }
        });
    });
});
