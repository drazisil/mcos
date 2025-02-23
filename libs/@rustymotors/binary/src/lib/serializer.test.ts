import { describe, it, expect } from "vitest";
import { deserialize, serialize, serializeSize } from "./Serializer.js";
import { Field } from "./types.js";

describe("Serializer", () => {
	describe("deserialize", () => {
        it("should correctly deserialize a buffer into fields", () => {
            const buffer = Buffer.from([0x01, 0x02, 0x03, 0x04]);
            const fields: Field[] = [
                {
                    name: "field1",
                    serializeSize: 2,
                    deserialize: (buf: Buffer) => {
                        expect(buf).toEqual(Buffer.from([0x01, 0x02]));
                    },
                    serialize: () => Buffer.from([]),
                },
                {
                    name: "field2",
                    serializeSize: 2,
                    deserialize: (buf: Buffer) => {
                        expect(buf).toEqual(Buffer.from([0x03, 0x04]));
                    },
                    serialize: () => Buffer.from([]),
                },
            ];

            deserialize(buffer, fields);
        });

		it("should throw an error if deserialization fails", () => {
			const buffer = Buffer.from([0x01, 0x02]);
			const fields: Field[] = [
				{
					name: "field1",
					serializeSize: 4,
					deserialize: () => {
						throw new Error("Test error");
					},
					serialize: () => Buffer.from([]),
				},
			];

			expect(() => deserialize(buffer, fields)).toThrow(
				"Error deserializing message: Test error",
			);
		});
	});

	describe("serialize", () => {
		it("should correctly serialize fields into a buffer", () => {
			const fields: Field[] = [
				{
					name: "field1",
					serializeSize: 2,
					deserialize: () => {
						// Do nothing
					},
					serialize: () => Buffer.from([0x01, 0x02]),
				},
				{
					name: "field2",
					serializeSize: 2,
					deserialize: () => {
						// Do nothing
					},
					serialize: () => Buffer.from([0x03, 0x04]),
				},
			];

			const buffer = serialize(fields);
			expect(buffer).toEqual(Buffer.from([0x01, 0x02, 0x03, 0x04]));
		});

		it("should throw an error if serialization fails", () => {
			const fields: Field[] = [
				{
					name: "field1",
					serializeSize: 2,
					deserialize: () => {
						// Do nothing
					},
					serialize: () => {
						throw new Error("Test error");
					},
				},
			];

			expect(() => serialize(fields)).toThrow(
				"Error serializing message Error: Test error",
			);
		});
	});

	describe("serializeSize", () => {
		it("should correctly calculate the size of serialized fields", () => {
			const fields: Field[] = [
				{
					name: "field1",
					serializeSize: 2,
					deserialize: () => {
                        // Do nothing
                    },
					serialize: () => Buffer.from([]),
				},
				{
					name: "field2",
					serializeSize: 3,
					deserialize: () => {
                        // Do nothing
                    },
					serialize: () => Buffer.from([]),
				},
			];

			const size = serializeSize(fields);
			expect(size).toBe(5);
		});
	});
});
