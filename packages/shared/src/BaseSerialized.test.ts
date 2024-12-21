import { describe, expect, it } from "vitest";
import { BaseSerialized } from "./BaseSerialized.js";

describe("BaseSerialized", () => {
	it("should have a length", () => {
		const data = Buffer.from("hello world");
		const serialized = new BaseSerialized(data);
		expect(serialized.length).toEqual(11);
	});

	it("should have a string representation", () => {
		const data = Buffer.from("hello world");
		const serialized = new BaseSerialized(data);
		expect(serialized.toString()).toEqual("68656c6c6f20776f726c64");
	});

	it("should have a hex representation", () => {
		const data = Buffer.from("hello world");
		const serialized = new BaseSerialized(data);
		expect(serialized.asHex()).toEqual("68656c6c6f20776f726c64");
	});

	it("should have a data property", () => {
		const data = Buffer.from("hello world");
		const serialized = new BaseSerialized(data);
		expect(serialized.data).toEqual(data);
		serialized.data = Buffer.from("goodbye world");
		expect(serialized.data).toEqual(Buffer.from("goodbye world"));
	});

	it("should throw when serialize is not implemented", () => {
		const serialized = new BaseSerialized();
		expect(() => serialized.serialize()).toThrow("Not implemented");
	});

	it("should throw when deserialize is not implemented", () => {
		const serialized = new BaseSerialized();
		expect(() => serialized.deserialize(Buffer.from("hello world"))).toThrow(
			"Not implemented",
		);
	});
});
