import { describe, it, expect, vi, beforeEach } from "vitest";
import { npsPortRouter } from "../src/npsPortRouter.js";
import type { TaggedSocket } from "../src/socketUtility.js";
import { GamePacket } from "rusty-motors-shared-packets";
import { Socket } from "node:net";
import { logger } from "rusty-motors-logger";

describe("npsPortRouter", () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	it("should log an error and close the socket if local port is undefined", async () => {
		vi.mock("node:net", async (importOriginal) => {
			const mockSocket = await importOriginal();
			return mockSocket;
		});
		const mockSocket = new Socket();
		const taggedSocket: TaggedSocket = { socket: mockSocket, id: "test-id",
			connectionStamp: 0,
		};

		try {
			await npsPortRouter({ taggedSocket });
		} catch (error) {
			expect(error).toBeUndefined();
		}

		expect(mockSocket.end).toHaveBeenCalled();
	});

	it("should log the start of the router and send ok to login packet for port 7003", async () => {
		vi.mock("net", async () => {
			const mockSocket = await vi.importActual("net");
			return mockSocket;
		});
		const mockSocket = new Socket();
		const taggedSocket: TaggedSocket = { socket: mockSocket, id: "test-id",
			connectionStamp: 0,
		};

		await npsPortRouter({ taggedSocket }).catch((error) => {
			expect(error).toBeUndefined();
		});


		expect(mockSocket.write).toHaveBeenCalledWith(
			Buffer.from([0x02, 0x30, 0x00, 0x00]),
		);
	});

	it("should handle data event and route initial message", async () => {

			vi.mock("net", async () => {
				const origionalNet = await vi.importActual("net");
				const origionalSocket = origionalNet.Socket as Socket;
				return {
					...origionalNet,
					Socket: vi.fn().mockImplementation(() => {
						return {
							...origionalSocket,
							on: vi.fn((event, callback) => {
								if (event === "data") {
									callback(Buffer.from([0x01, 0x02, 0x03]));
								}
								return origionalSocket.on(event, callback);
							}),
						};
					}),
				};
			});
		const mockSocket = new Socket();

		const taggedSocket: TaggedSocket = { socket: mockSocket, id: "test-id-nps",
			connectionStamp: 0,
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
		vi.mock("net", async () => {
			const origionalNet = await vi.importActual("net");
			const origionalSocket = origionalNet.Socket as Socket;
			return {
				...origionalNet,
				Socket: vi.fn().mockImplementation(() => {
					return {
						...origionalSocket,
						localPort: 7003,
						on: vi.fn((event, callback) => {
							if (event === "end") {
								callback();
							}
							return origionalSocket.on(event, callback);
						}),
					};
				}),
			};
		});
		const spy = vi.spyOn(logger, "debug");
		const mockSocket = new Socket();
		const taggedSocket: TaggedSocket = { socket: mockSocket, id: "test-id",
			connectionStamp: 0,
		};

		await npsPortRouter({ taggedSocket, log: logger }).catch((error) => {
			expect(error).toBeUndefined();
		});

		expect(spy).toHaveBeenCalledWith("[test-id] Socket closed");
	});

	it("should log socket error event", async () => {
		vi.mock("net", async () => {
			const origionalNet = await vi.importActual("net");
			const origionalSocket = origionalNet.Socket as Socket;
			return {
				...origionalNet,
				Socket: vi.fn().mockImplementation(() => {
					return {
						...origionalSocket,
						localPort: 7003,
						on: vi.fn((event, callback) => {
							if (event === "error") {
								callback(new Error("Test error"));
							}
							return origionalSocket.on(event, callback);
						}),
						write: vi.fn(),
					};
				}),
			};
		});
		const mockSocket = new Socket();
		const taggedSocket: TaggedSocket = { socket: mockSocket, id: "test-id",
			connectionStamp: 0,
		};
		const spy = vi.spyOn(logger, "error");
		try {
		
			await npsPortRouter({ taggedSocket, log: logger });
		} catch (error) {
			expect(error).toBeUndefined();
		}

		expect(spy).toHaveBeenCalledWith(
			"[test-id] Socket error: Error: Test error",
		);
	});
});
