import { describe, expect, it } from "vitest";
import { SerializedBuffer } from "./SerializedBuffer.js";

describe("SerializedBuffer", () => {
	it("should serialize and deserialize correctly", () => {
		// Arrange
		const testMessage = new SerializedBuffer();
		testMessage.data = Buffer.from("hello world");
		// Act
		const buffer = testMessage.serialize();
		const result = new SerializedBuffer();
		result.deserialize(buffer);
		// Assert
		expect(result.data).toEqual(testMessage.data);
	});

	it("should have a length", () => {
		const data = Buffer.from("hello world");
		const serialized = new SerializedBuffer(data);
		expect(serialized.length).toEqual(11);
	});

	it("should have a string representation", () => {
		const data = Buffer.from("hello world");
		const serialized = new SerializedBuffer(data);
		expect(serialized.toString()).toEqual("68656c6c6f20776f726c64");
	});

	it("should have a hex representation", () => {
		const data = Buffer.from("hello world");
		const serialized = new SerializedBuffer(data);
		expect(serialized.asHex()).toEqual("68656c6c6f20776f726c64");
	});

	it("should have a data property", () => {
		const data = Buffer.from("hello world");
		const serialized = new SerializedBuffer(data);
		expect(serialized.data).toEqual(data);
		serialized.data = Buffer.from("goodbye world");
		expect(serialized.data).toEqual(Buffer.from("goodbye world"));
	});

	it("should thow when there is an error in deserialize", () => {
		const serialized = new SerializedBuffer();
		expect(() => serialized.deserialize(Buffer.from("hello world"))).toThrow(
			"Expected buffer of length 26727, got 11",
		);
	});

	it("should throw when there is an error in serialize", () => {
		const serialized = new SerializedBuffer();
		serialized.data = Buffer.alloc(0xffff + 1);
		expect(() => serialized.serialize()).toThrow(
			'The value of "value" is out of range. It must be >= 0 and <= 65535. Received 65536',
		);
	});
});
