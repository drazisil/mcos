import { describe, expect, it } from "vitest";
import { OldServerMessage } from "rusty-motors-shared";
import { login } from "../src/login.js";

describe("login", () => {
	it("returns a message", async () => {
		// arrange
		const connectionId = "test";
		const incomingMessage = new OldServerMessage();
		incomingMessage._header.sequence = 1;
		const imcommingBuffer = Buffer.from(JSON.stringify(incomingMessage));
		incomingMessage.setBuffer(imcommingBuffer);

		// act
		const result = await login({
			connectionId,
			packet: incomingMessage,
		});

		// assert
		expect(result.messages[0]).toBeInstanceOf(OldServerMessage);
	});
});
