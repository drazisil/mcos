import { describe, expect, it } from "vitest";
import { RawMessage } from "./RawMessage.js";

describe("RawMessage", () => {
	it("should serialize and deserialize correctly", () => {
		// Arrange
		const testMessage = new RawMessage(1);
		testMessage.data = Buffer.from("hello world");
		// Act
		const buffer = testMessage.serialize();
		const result = new RawMessage(313);
		result.deserialize(buffer);
		// Assert
		expect(result.data).toEqual(testMessage.data);
		expect(result.messageId).toEqual(testMessage.messageId);
	});

	it("should have a length", () => {
		const data = Buffer.from("hello world");
		const serialized = new RawMessage(612, data);
		expect(serialized.length).toEqual(15);
	});

	it("should have a string representation", () => {
		const data = Buffer.from("hello world");
		const serialized = new RawMessage(916, data);
		expect(serialized.toString()).toEqual("0394000f68656c6c6f20776f726c64");
	});

	it("should have a hex representation", () => {
		const data = Buffer.from("hello world");
		const serialized = new RawMessage(841, data);
		expect(serialized.asHex()).toEqual("0349000f68656c6c6f20776f726c64");
	});

	it("should have a data property", () => {
		const data = Buffer.from("hello world");
		const serialized = new RawMessage(502, data);
		expect(serialized.data).toEqual(data);
		serialized.data = Buffer.from("goodbye world");
		expect(serialized.data).toEqual(Buffer.from("goodbye world"));
	});

	it("should have a messageId property", () => {
		const data = Buffer.from("hello world");
		const serialized = new RawMessage(0xab1, data);
		expect(serialized.messageId).toEqual(2737);
	});

	it("should throw when deserialize is given a buffer smaller than 4 bytes", () => {
		const serialized = new RawMessage(0xab1);
		expect(() => serialized.deserialize(Buffer.alloc(2))).toThrow(
			"Unable to get header from buffer, got 2",
		);
	});

	it("should throw when deserialize is given a buffer smaller than the length in the header", () => {
		const serialized = new RawMessage(0xab1);
		expect(() =>
			serialized.deserialize(Buffer.from("ab01000f68656c6c6f20776f726c64")),
		).toThrow("Expected buffer of length 12337, got 30");
	});
});
