import { describe, it, expect, vi, beforeEach } from "vitest";
import { npsPortRouter } from "../src/npsPortRouter.js";
import type { TaggedSocket } from "../src/socketUtility.js";
import { GamePacket } from "rusty-motors-shared-packets";
import { ServerLogger } from "rusty-motors-shared";
import { Socket } from "node:net";

describe("npsPortRouter", () => {
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
			rawSocket: mockSocket as unknown as Socket,
			connectionId: "test-id",
			connectedAt: Date.now(),
		};

		try {
			await npsPortRouter({ taggedSocket });
		} catch (error) {
			expect(error).toBeUndefined();
		}

		expect(mockSocket.end).toHaveBeenCalled();
	});

	it("should log the start of the router and send ok to login packet for port 7003", async () => {
		const mockSocket = {
			localPort: 7003,
			write: vi.fn(),
			on: vi.fn(),
		};
		const taggedSocket: TaggedSocket = {
			rawSocket: mockSocket as unknown as Socket,
			connectionId: "test-id-nps",
			connectedAt: Date.now(),
		};

		await npsPortRouter({ taggedSocket }).catch((error) => {
			expect(error).toBeUndefined();
		});


		expect(mockSocket.write).toHaveBeenCalledWith(
			Buffer.from([0x02, 0x30, 0x00, 0x00]),
		);
	});

	it("should handle data event and route initial message", async () => {
		const mockSocket = {
			localPort: 8228,
			write: vi.fn(),
			on: vi.fn((event, callback) => {
				if (event === "data") {
					try {
						callback(Buffer.from([0x01, 0x02, 0x03]));
					} catch (error) {
						expect(error).toBeUndefined();
					}
				}
			}),
		};

		const taggedSocket: TaggedSocket = {
			rawSocket: mockSocket as unknown as Socket,
			connectionId: "test-id-nps",
			connectedAt: Date.now(),
		};

		const mockGamePacket = {
			deserialize: vi.fn(),
			toHexString: vi.fn().mockReturnValue("010203"),
		};
		vi.spyOn(GamePacket.prototype, "deserialize").mockImplementation(
			mockGamePacket.deserialize,
		);
		vi.spyOn(GamePacket.prototype, "toHexString").mockImplementation(
			mockGamePacket.toHexString,
		);

		try {
			await npsPortRouter({ taggedSocket  });
		} catch (error) {
			expect(error).toBeUndefined();
		}

	});

	it("should log socket end event", async () => {
		const mockSocket = {
			localPort: 7003,
			on: vi.fn((event, callback) => {
				if (event === "end") {
					callback();
				}
			}),
			write: vi.fn(),
		};
		const mockLogger = {
			error: vi.fn(),
			debug: vi.fn(),
		};
		const taggedSocket: TaggedSocket = {
			rawSocket: mockSocket as unknown as Socket,
			connectionId: "test-id",
			connectedAt: Date.now(),
		};

		await npsPortRouter({ taggedSocket, log: mockLogger as unknown as ServerLogger }).catch((error) => {
			expect(error).toBeUndefined();
		});

		expect(mockLogger.debug).toHaveBeenCalledWith("[test-id] Socket closed by client for port 7003");
	});

	it("should log socket error event", async () => {
		const mockSocket = {
			localPort: 7003,
			on: vi.fn((event, callback) => {
				if (event === "error") {
					callback(new Error("Test error"));
				}
			}),
			write: vi.fn(),
		} as unknown as Socket;
		const mockLogger: ServerLogger = {
			error: vi.fn(),
			debug: vi.fn(),
			info: vi.fn(),
			warn: vi.fn(),
			fatal: vi.fn(),
			trace: vi.fn(),
			child: vi.fn(),
		};
		const taggedSocket: TaggedSocket = {
			rawSocket: mockSocket,
			connectionId: "test-id",
			connectedAt: Date.now(),
		};
		await npsPortRouter({ taggedSocket, log: mockLogger }).catch((error) => {
			expect(error).toBeUndefined();
		});

		expect(mockLogger.error).toHaveBeenCalledWith(
			"[test-id] Socket error: Error: Test error",
		);
	});
});
