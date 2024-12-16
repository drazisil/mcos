import { describe, it, expect, beforeEach, vi } from "vitest";
import { logger } from "./Logger.js";

const enum LogLevel {
	debug = "debug",
	info = "info",
	warn = "warn",
	error = "error",
	fatal = "fatal",
	trace = "trace",
}

describe("Logger", () => {
	describe("logging methods", () => {
		let logOutput: any;
		beforeEach(() => {
			logOutput = [];
			// Mock the underlying logger to capture output
			vi.spyOn(logger, "info").mockImplementation((msg) => {
				logOutput.push(msg);
			});
		});

		["debug", "info", "warn", "error", "fatal", "trace"].forEach((level) => {
			it(`should have ${level} method`, () => {
				expect(logger[level as LogLevel]).toBeInstanceOf(Function);
			});

			it(`should log ${level} messages`, () => {
				const log = logger.child({ name: "test" });
				expect(() => log[level as LogLevel]("test message")).not.toThrow();
			});

			it(`should handle empty messages for ${level}`, () => {
				expect(() => logger[level as LogLevel]("")).not.toThrow();
			});

			it(`should handle object logging for ${level}`, () => {
				expect(() =>
					logger[level as LogLevel]({ test: "value" }),
				).not.toThrow();
			});

			it(`should handle multiple arguments for ${level}`, () => {
				expect(() =>
					logger[level as LogLevel]("msg", { data: 1 }),
				).not.toThrow();
			});
		});
	});

	describe("child loggers", () => {
		it("should create child logger with custom name", () => {
			const childLogger = logger.child({ name: "custom" });
			expect(childLogger).toHaveProperty("info");
			expect(childLogger).toHaveProperty("debug");
			expect(childLogger).toHaveProperty("warn");
			expect(childLogger).toHaveProperty("error");
		});

		it("should create child logger with custom level", () => {
			const childLogger = logger.child({ name: "custom", level: "error" });
			expect(childLogger).toHaveProperty("error");
		});

		it("should inherit parent logger methods", () => {
			const childLogger = logger.child({ name: "custom" });
			expect(() => childLogger.info("test")).not.toThrow();
			expect(() => childLogger.error("test")).not.toThrow();
		});
	});

	describe("error handling", () => {
		it("should handle Error objects", () => {
			const error = new Error("test error");
			expect(() => logger.error(error.message)).not.toThrow();
		});
	});
});
