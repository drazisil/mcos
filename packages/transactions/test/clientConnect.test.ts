import { describe, expect, it, vi } from "vitest";
import { TClientConnectMessage } from "../src/TClientConnectMessage.js";
import { clientConnect } from "../src/clientConnect.js";
import { ConnectionRecord, ServerLogger } from "rusty-motors-shared";

vi.mock("rusty-motors-database", () => ({
	databaseManager: {
		updateSessionKey: vi.fn(),
		fetchSessionKeyByConnectionId: vi.fn(),
		fetchSessionKeyByCustomerId: vi.fn().mockImplementation(() => {
			return Promise.reject(new Error("Session key not found"));
		}),
		updateUser: vi.fn(),
	},
}));

const mockDatabaseManager = vi.mocked(
	await import("rusty-motors-database"),
).databaseManager;

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

		const log: ServerLogger = {
			debug: () => vi.fn(),
			error: () => vi.fn(),
			fatal: () => vi.fn(),
			info: () => vi.fn(),
			trace: () => vi.fn(),
			warn: () => vi.fn(),
			child: () => log,
		};
		mockDatabaseManager.updateSessionKey(
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
				new Error("Session key not found"),
			);
		}
	});
});
