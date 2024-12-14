import { describe, it, expect } from "vitest";
import { logger } from "../src/Logger.js";

describe("Logger", () => {
	it("should log messages", () => {
		const log = logger.child({ name: "test" });

		expect(log.info).toBeInstanceOf(Function);
	});
});
