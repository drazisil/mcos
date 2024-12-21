import { beforeEach, describe, expect, it } from "vitest";
import { BaseSerializable } from "../src/messageStructs/BaseSerializable.js";

describe("BaseSerializable", () => {
	let baseSerializable: BaseSerializable;

	beforeEach(() => {
		baseSerializable = new BaseSerializable();
	});

	it("should throw an error when calling serialize", () => {
		expect(() => {
			baseSerializable.serialize();
		}).toThrow("Method not implemented.");
	});

	it("should throw an error when calling deserialize", () => {
		expect(() => {
			baseSerializable.deserialize(Buffer.from([]));
		}).toThrow("Method not implemented.");
	});

	it("should throw an error when calling getByteSize", () => {
		expect(() => {
			baseSerializable.getByteSize();
		}).toThrow("Method not implemented.");
	});

	it("should throw an error when calling toString", () => {
		expect(() => {
			baseSerializable.toString();
		}).toThrow("Method not implemented.");
	});
});
