import { describe, expect, it } from "vitest";
import { getServerLogger } from "rusty-motors-shared";
import { OldServerMessage } from "rusty-motors-shared";
import { _getPlayerRaceHistory } from "../src/_getPlayerRaceHistory.js";

describe("_getPlayerRaceHistory", () => {
	it("should return a PlayerRacingHistoryMessage", async () => {
		const incomingMessage = new OldServerMessage();
		incomingMessage.internalBuffer = Buffer.from([
			0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x01, 0x00, 0x00, 0x00, 0x00, 0x01,
			0x01, 0x00, 0x00, 0x00, 0x00, 0x01, 0x01, 0x00, 0x00, 0x00, 0x00, 0x01,
		]);
		const result = await _getPlayerRaceHistory({
			connectionId: "0",
			packet: incomingMessage,
			log: getServerLogger({}),
		});

		expect(result).toBeDefined();
	});
});
