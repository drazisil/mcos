import { describe, expect, it } from "vitest";
import { updateSessionKey } from "rusty-motors-database";
import { TClientConnectMessage } from "../index.js";
import { clientConnect } from "./clientConnect.js";

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


		updateSessionKey(customerId, sessionKey, contextId, connectionId);

		// act
		try {
			await clientConnect({
				connectionId,
				packet: incomingMessage,
			});
		} catch (error) {
			// assert
			expect(error).toEqual(
				new Error(`Encryption not found for connection ${connectionId}`),
			);
		}
	});
});
