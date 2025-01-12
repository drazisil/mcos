import type { Socket } from "net";
import { describe, expect, it, vi } from "vitest";
import { tagSocket, trySocketWrite } from "../src/socketUtility.js";

describe("tagSocketWithId", () => {
	it("returns an object with the correct properties", () => {
		// arrange
		const mockSocket = { localPort: 3000 } as Socket;
		const connectionStamp = Date.now();
		const id = "12345";

		// act
		const result = tagSocket(mockSocket, connectionStamp, id);

		// assert
		expect(result).toHaveProperty("connectionId");
		expect(result).toHaveProperty("rawSocket");
		expect(result).toHaveProperty("connectedAt");
	});

	it("returns an object with the correct values", () => {
		// arrange
		const mockSocket = { localPort: 3000 } as Socket;
		const connectionStamp = Date.now();
		const id = "12345";

		// act
		const result = tagSocket(mockSocket, connectionStamp, id);

		// assert
		expect(result.connectionId).toBe(id);
		expect(result.rawSocket).toBe(mockSocket);
		expect(result.connectedAt).toBe(connectionStamp);
	});

	describe("tagSocketWithId", () => {
		it("returns an object with the correct properties", () => {
			// arrange
			const mockSocket = { localPort: 3000 } as Socket;
			const connectionStamp = Date.now();
			const id = "12345";

			// act
			const result = tagSocket(mockSocket, connectionStamp, id);

			// assert
			expect(result).toHaveProperty("connectionId");
			expect(result).toHaveProperty("rawSocket");
			expect(result).toHaveProperty("connectedAt");
		});
	});

	describe("trySocketWrite", () => {
		it("resolves when data is successfully written", async () => {
			// arrange
			const mockTaggedSocket = {
				connectionId: "12345",
				connectedAt: Date.now(),
				rawSocket: {
					localPort: 3000,
					write: vi.fn((_data, callback) => callback()),
				},
			};
			const data = "test data";

			// act & assert
			await expect(
				trySocketWrite(
					{
						connectionId: mockTaggedSocket.connectionId,
						connectedAt: mockTaggedSocket.connectedAt,
						rawSocket: mockTaggedSocket.rawSocket as unknown as Socket,
					},
					data,
				),
			).resolves.toBeUndefined();
			expect(mockTaggedSocket.rawSocket.write).toHaveBeenCalledWith(
				data,
				expect.any(Function),
			);
		});

		it("rejects when an error occurs during write", async () => {
			// arrange
			const mockTaggedSocket = {
				connectionId: "12345",
				connectedAt: Date.now(),
				rawSocket: {
					localPort: 3000,
					write: vi.fn((_data, callback) => callback(new Error("Write error"))),
				} as unknown as Socket,
			};
			const data = "test data";
			// act & assert
			await expect(
				trySocketWrite(
					{
						connectionId: mockTaggedSocket.connectionId,
						connectedAt: mockTaggedSocket.connectedAt,
						rawSocket: mockTaggedSocket.rawSocket as unknown as Socket,
					},
					data,
				),
			).rejects.toThrow("Write error");
			expect(mockTaggedSocket.rawSocket.write).toHaveBeenCalledWith(
				data,
				expect.any(Function),
			);
		});
	});
});
