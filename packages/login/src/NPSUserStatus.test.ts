import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { NPSUserStatus } from "./NPSUserStatus";
import { Configuration, ServerLogger } from "rusty-motors-shared";
import { privateDecrypt } from "node:crypto";
import { readFileSync } from "node:fs";

vi.mock("node:crypto");
vi.mock("node:fs");

describe("NPSUserStatus", () => {
	let config: Configuration;
	let log: ServerLogger;
	let packet: Buffer;

	beforeEach(() => {
		config = { privateKeyFile: "path/to/private/key" } as Configuration;
		log = {
			debug: vi.fn(),
			trace: vi.fn(),
			fatal: vi.fn(),
		} as unknown as ServerLogger;
		packet = Buffer.alloc(100);
	});

	it("should extract and decrypt session key from packet", () => {
		const rawPacket = Buffer.alloc(100);
		rawPacket.writeInt16BE(128, 52); // Mock key length
		rawPacket.write("a".repeat(256), 52 + 4, "utf8"); // Mock session key as ASCII

		const privateKey = Buffer.from("privateKey");
		const decryptedKey = Buffer.from("0020546573744B6579546573744B6579546573744B6579546573744B65795465737400000000", "hex");
		const expectedSessionKey = "546573744B6579546573744B6579546573744B6579546573744B657954657374".toLowerCase();

		(readFileSync as Mock).mockReturnValue(privateKey);
		(privateDecrypt as Mock).mockReturnValue(decryptedKey);
	

		const npsUserStatus = new NPSUserStatus(packet, config, log);
		npsUserStatus.extractSessionKeyFromPacket(rawPacket);

		expect(readFileSync).toHaveBeenCalledWith("path/to/private/key");
		// expect(privateDecrypt).toHaveBeenCalledWith({ key: privateKey }, Buffer.from("a".repeat(256), "utf8"));
		expect(npsUserStatus.sessionKey.length).toBe(expectedSessionKey.length);
		expect(npsUserStatus.sessionKey).toMatch(expectedSessionKey);
	});

	it("should throw an error if decryption fails", () => {
		const rawPacket = Buffer.alloc(100);
		rawPacket.writeInt16LE(128, 52); // Mock key length
		rawPacket.write("a".repeat(256), 52 + 2, "utf8"); // Mock session key as ASCII

		const privateKey = Buffer.from("privateKey");

		(readFileSync as Mock).mockReturnValue(privateKey);
		(privateDecrypt as Mock).mockImplementation(() => {
			throw new Error("Decryption error");
		});

		const npsUserStatus = new NPSUserStatus(packet, config, log);

		expect(() => npsUserStatus.extractSessionKeyFromPacket(rawPacket)).toThrow(
			"Error decrypting session key",
		);
	});
});