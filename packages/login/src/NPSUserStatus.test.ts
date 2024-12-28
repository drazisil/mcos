import { describe, it, expect, beforeEach, vi, Mock } from "vitest";
import { readFileSync } from "node:fs";
import { privateDecrypt } from "node:crypto";
import { NPSUserStatus } from "./NPSUserStatus";
import { Configuration, ServerLogger } from "rusty-motors-shared";

vi.mock("node:fs");
vi.mock("node:crypto");

describe("NPSUserStatus", () => {
	let packet: Buffer;
	let config: Configuration;
	let log: ServerLogger;

	beforeEach(() => {
		packet = Buffer.alloc(100);
		config = { privateKeyFile: "path/to/private/key" } as Configuration;
		log = {
			debug: vi.fn(),
			trace: vi.fn(),
			fatal: vi.fn(),
		} as unknown as ServerLogger;
	});

	it("should construct NPSUserStatus correctly", () => {
		const npsUserStatus = new NPSUserStatus(packet, config, log);
		expect(npsUserStatus._config).toBe(config);
		expect(npsUserStatus.log).toBe(log);
		expect(log.debug).toHaveBeenCalledWith("Constructing NPSUserStatus");
	});

	it("should extract session key from packet", () => {
		const rawPacket = Buffer.alloc(308);
		rawPacket.write("a".repeat(256), 52, "utf8");
		const decryptedKey = Buffer.from("b".repeat(12), "utf8");

		(readFileSync as Mock).mockReturnValue("privateKeyContents");
		(privateDecrypt as Mock).mockReturnValue(decryptedKey);

		const npsUserStatus = new NPSUserStatus(packet, config, log);
		npsUserStatus.extractSessionKeyFromPacket(rawPacket);

		expect(log.debug).toHaveBeenCalledWith("Extracting key");
		expect(log.trace).toHaveBeenCalledWith(`Session key: ${"a".repeat(256)}`);
		expect(npsUserStatus.sessionKey).toBe("b".repeat(12));
	});

	it("should throw error if private key file is not specified", () => {
		config.privateKeyFile = "";
		const rawPacket = Buffer.alloc(308);

		const npsUserStatus = new NPSUserStatus(packet, config, log);

		expect(() => npsUserStatus.extractSessionKeyFromPacket(rawPacket)).toThrow(
			"No private key file specified",
		);
	});

	it("should return JSON representation", () => {
		const npsUserStatus = new NPSUserStatus(packet, config, log);
		const json = npsUserStatus.toJSON();

		expect(log.debug).toHaveBeenCalledWith("Returning as JSON");
		expect(json).toHaveProperty("msgNo");
		expect(json).toHaveProperty("msgLength");
		expect(json).toHaveProperty("content");
		expect(json).toHaveProperty("contextId");
		expect(json).toHaveProperty("sessionKey");
		expect(json).toHaveProperty("rawBuffer");
	});

	it("should return string representation of packet", () => {
		const npsUserStatus = new NPSUserStatus(packet, config, log);
		const packetString = npsUserStatus.dumpPacket();

		expect(log.debug).toHaveBeenCalledWith("Returning as string");
		expect(packetString).toContain("NPSUserStatus");
		expect(packetString).toContain("contextId");
		expect(packetString).toContain("sessionkey");
	});
});