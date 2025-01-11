import { describe, it, expect, vi, beforeEach } from "vitest";
import { mcotsPortRouter } from "../src/mcotsPortRouter.js";
import type { TaggedSocket } from "../src/socketUtility.js";
import { ServerPacket } from "rusty-motors-shared-packets";

vi.mock("rusty-motors-database", () => ({
	databaseManager: {
		updateSessionKey: vi.fn(),
		fetchSessionKeyByConnectionId: vi.fn(),
		fetchSessionKeyByCustomerId: vi.fn(),
		updateUser: vi.fn(),
	},
}));

vi.mocked(
	await import("rusty-motors-database"),
).databaseManager;

describe("mcotsPortRouter", () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	it("should log an error and close the socket if local port is undefined", async () => {
		const mockSocket = {
			localPort: undefined,
			end: vi.fn(),
			on: vi.fn(),
		};
		const taggedSocket: TaggedSocket = {
			rawSocket: mockSocket,
			connectionId: "test-id",
		};

try {
			await mcotsPortRouter({ taggedSocket });
	
} catch (error) {
	expect(error).toBeUndefined();
}		expect(mockSocket.end).toHaveBeenCalled();
	});

	it("should handle data event and route initial message", async () => {
		const mockSocket = {
			localPort: 43300,
			write: vi.fn(),
			on: vi.fn((event, callback) => {
				if (event === "data") {
					callback(Buffer.from([0x74, 0x65, 0x73, 0x74, 0x2d, 0x64, 0x61, 0x74, 0x61]));
				}
			}),
		};
		const taggedSocket: TaggedSocket = {
			rawSocket: mockSocket,
			connectionId: "test-id-mcots",
		};

		const mockServerPacket = {
			deserialize: vi.fn(),
			toHexString: vi.fn().mockReturnValue("746573742d64617461"),
		};
		vi.spyOn(ServerPacket.prototype, "deserialize").mockImplementation(
			mockServerPacket.deserialize,
		);
		vi.spyOn(ServerPacket.prototype, "toHexString").mockImplementation(
			mockServerPacket.toHexString,
		);

		try {
			await mcotsPortRouter({ taggedSocket });
		} catch (error) {
			expect(error).toBeUndefined();
		}
	});

	it("should log socket end event", async () => {
		const mockSocket = {
			localPort: 43300,
			on: vi.fn((event, callback) => {
				if (event === "end") {
					callback();
				}
			}),
		};
		const taggedSocket: TaggedSocket = {
			rawSocket: mockSocket,
			connectionId: "test-id",
		};

	try {
				await mcotsPortRouter({ taggedSocket });
	} catch (error) {
		expect(error).toBeUndefined();
	}
	});

	it("should log socket error event", async () => {
		const mockSocket = {
			localPort: 43300,
			on: vi.fn((event, callback) => {
				if (event === "error") {
					callback(new Error("test-error"));
				}
			}),
		};

		const taggedSocket: TaggedSocket = {
			rawSocket: mockSocket,
			connectionId: "test-id",
		};

try {
			await mcotsPortRouter({ taggedSocket});
} catch (error) {
	expect(error).toBeUndefined();	
	
}


	});
});
