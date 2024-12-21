import { describe, it, expect, vi, Mock } from "vitest";
import { processCheckProfileName } from "./processCheckProfileName.js";
import { GameMessage } from "../messageStructs/GameMessage.js";
import { getLenString } from "../utils/pureGet.js";
import { UserStatus } from "../messageStructs/UserStatus.js";

vi.mock("../utils/pureGet", () => ({
	getLenString: vi.fn(),
}));

vi.mock("rusty-motors-logger", () => ({
	logger: {
		child: () => ({
			info: vi.fn(),
		}),
	},
}));

describe("processCheckProfileName", () => {
	it("should log the process and send a response", async () => {
		const connectionId = "test-connection-id";
		const userStatus = {} as UserStatus;
		const message = new GameMessage(0);
		const socketCallback = vi.fn();

		message.serialize = vi.fn().mockReturnValue({
			readUInt32BE: vi.fn().mockReturnValue(12345),
		});

		(getLenString as Mock).mockReturnValue("testPersonaName");

		await processCheckProfileName(
			connectionId,
			userStatus,
			message,
			socketCallback,
		);

		expect(getLenString).toHaveBeenCalledWith(message.serialize(), 12, false);
		expect(socketCallback).toHaveBeenCalledWith([expect.any(Buffer)]);
	});

	it("should handle different persona names and customer IDs", async () => {
		const connectionId = "test-connection-id";
		const userStatus = {} as UserStatus;
		const message = new GameMessage(0);
		const socketCallback = vi.fn();

		message.serialize = vi.fn().mockReturnValue({
			readUInt32BE: vi.fn().mockReturnValue(67890),
		});

		(getLenString as Mock).mockReturnValue("anotherPersonaName");

		await processCheckProfileName(
			connectionId,
			userStatus,
			message,
			socketCallback,
		);

		expect(getLenString).toHaveBeenCalledWith(message.serialize(), 12, false);
		expect(socketCallback).toHaveBeenCalledWith([expect.any(Buffer)]);
	});
});