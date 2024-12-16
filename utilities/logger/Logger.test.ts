import { describe, it, expect } from "vitest";
import { logger } from "./Logger.js";

describe("Logger", () => {
	it("should log messages", () => {
		const log = logger.child({ name: "test" });

		expect(log.info).toBeInstanceOf(Function);
	});
});
