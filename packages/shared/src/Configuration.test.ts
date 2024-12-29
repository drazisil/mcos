import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getServerConfiguration } from "./Configuration";
import { getServerLogger } from "../index.js";

vi.mock("../index.js", () => ({
	getServerLogger: vi.fn().mockReturnValue({
		fatal: vi.fn(),
	}),
}));

describe("getServerConfiguration", () => {
	const OLD_ENV = process.env;

	beforeEach(() => {
		vi.resetModules();
		process.env = { ...OLD_ENV };
	});

	afterEach(() => {
		process.env = OLD_ENV;
	});

	it("should return the correct configuration when all environment variables are set", () => {
		process.env["EXTERNAL_HOST"] = "localhost";
		process.env["CERTIFICATE_FILE"] = "/path/to/cert";
		process.env["PRIVATE_KEY_FILE"] = "/path/to/privateKey";
		process.env["PUBLIC_KEY_FILE"] = "/path/to/publicKey";
		process.env["MCO_LOG_LEVEL"] = "info";

		const config = getServerConfiguration();

		expect(config.host).toBe("localhost");
		expect(config.certificateFile).toBe("/path/to/cert");
		expect(config.privateKeyFile).toBe("/path/to/privateKey");
		expect(config.publicKeyFile).toBe("/path/to/publicKey");
		expect(config.logLevel).toBe("info");
	});

	it("should use default values for optional environment variables", () => {
		process.env["CERTIFICATE_FILE"] = "/path/to/cert";
		process.env["PRIVATE_KEY_FILE"] = "/path/to/privateKey";
		process.env["PUBLIC_KEY_FILE"] = "/path/to/publicKey";

		const config = getServerConfiguration();

		expect(config.host).toBe("");
		expect(config.logLevel).toBe("debug");
	});

	it("should exit the process if required environment variables are missing", () => {
		const mockExit = vi.spyOn(process, "exit").mockImplementation(() => {
			throw new Error("process.exit called");
		});
		const mockLogger = getServerLogger("core");

		expect(() => getServerConfiguration()).toThrow("process.exit called");
		expect(mockLogger.fatal).toHaveBeenCalledWith(
			"Missing required environment variable: CERTIFICATE_FILE",
		);
		expect(mockExit).toHaveBeenCalledWith(1);

		mockExit.mockRestore();
	});
});