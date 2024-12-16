import { describe, it, expect } from "vitest";
import { logger } from "./Logger.js";

describe("Logger", () => {
  describe("logging methods", () => {
    ["debug", "info", "warn", "error", "fatal", "trace"].forEach((level) => {
      it(`should have ${level} method`, () => {
        expect(logger[level]).toBeInstanceOf(Function);
      });
      
      it(`should log ${level} messages`, () => {
        const log = logger.child({ name: "test" });
        expect(() => log[level]("test message")).not.toThrow();
      });
    });
  });

  describe("child loggers", () => {
    it("should create child logger with custom name", () => {
      const childLogger = logger.child({ name: "custom" });
      expect(childLogger).toHaveProperty("info");
    });

    it("should create child logger with custom level", () => {
      const childLogger = logger.child({ name: "custom", level: "error" });
      expect(childLogger).toHaveProperty("error");
    });
  });

  describe("error handling", () => {
    it("should handle Error objects", () => {
      const error = new Error("test error");
      expect(() => logger.error(error)).not.toThrow();
    });
  });
});
