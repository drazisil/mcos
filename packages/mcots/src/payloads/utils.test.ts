import { describe, expect, it } from "vitest";
import { readStringFromBuffer } from "./utils.js";

describe("readStringFromBuffer", () => {
	it("should read a string from the buffer", () => {
		// arrange
		const data = Buffer.from("Hello, World!\0Extra Data");
		const start = 0;
		const end = 13;

		// act
		const result = readStringFromBuffer(data, start, end);

		// assert
		expect(result).toBe("Hello, World!");
	});

	it("should handle empty strings", () => {
		// arrange
		const data = Buffer.from("\0");
		const start = 0;
		const end = 1;

		// act
		const result = readStringFromBuffer(data, start, end);

		// assert
		expect(result).toBe("");
	});

	it("should handle strings with null characters", () => {
		// arrange
		const data = Buffer.from("Test\0String\0");
		const start = 0;
		const end = 12;

		// act
		const result = readStringFromBuffer(data, start, end);

		// assert
		expect(result).toBe("TestString");
	});

	it("should handle start and end indices outside the buffer range", () => {
		// arrange
		const data = Buffer.from("Hello, World!");
		const start = -1;
		const end = 20;

		// act
		const result = readStringFromBuffer(data, start, end);

		// assert
		expect(result).toBe("Hello, World!");
	});
});
