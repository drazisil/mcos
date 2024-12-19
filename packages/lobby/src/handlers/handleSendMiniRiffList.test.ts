import { describe, expect, it } from "vitest";
import { LegacyMessage } from "rusty-motors-shared";
import { handleSendMiniRiffList } from "./handleSendMiniRiffList.js";

describe("handleSendMiniRiffList", () => {
	it("should return a buffer", async () => {
		// arrange
		const incomingMessage = new LegacyMessage();

		const result = await handleSendMiniRiffList({
			connectionId: "test",
			message: incomingMessage,
		});

		expect(result.message).toBeInstanceOf(LegacyMessage);
	});
});
