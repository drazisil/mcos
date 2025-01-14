import { describe, it, expect, beforeEach } from "vitest";
import { BytableMessage } from "./BytableMessage";
import { BytableHeader } from "./BytableHeader";
import { BytableContainer } from "./BytableContainer";
import { BytableDword } from "./BytableDword";

describe("Binary Message Parsing", () => {
	const testHex =
		"0501013e010100000000013e0022643331366364326464366266383730383933646662616166313766393635383834650000010032323841413331423743423530463233343933323539323730413842334430353233333534463146323936413132343430444541343942353031453843363346443841394141453143463534304242333535354245363437324641423230443632303634304239394645453837414139373332363938304231303430323341314132354233453635314534413434453445394242313341453644303033383233303544434336393035434135393032363435443332463138413644414434443334363937304531443931313944424534363746373333364443334333444439413043443942463741313945453331323631443945444146413139344445443846000432313736fea31c19";
	const testBuffer = Buffer.from(testHex, "hex");

	describe("BytableHeader", () => {
		it("should correctly parse message header", () => {
			const header = BytableHeader.fromBuffer(testBuffer, 0);

			expect(header.messageId).toBe(0x0501);
			expect(header.messageLength).toBe(0x013e);
			expect(header.messageVersion).toBe(1);
			expect(header.serializeSize).toBe(12); // Version 1 header size
		});
	});

	describe("BytableMessage", () => {
		let message: BytableMessage;

		beforeEach(() => {
			message = BytableMessage.fromBuffer(testBuffer, 0);
			message.setSerializeOrder([
				{ name: "ContextId", field: "Container" },
				{ name: "", field: "Container" },
				{ name: "SessionKey", field: "Container" },
				{ name: "GameId", field: "Container" },
				{ name: "", field: "Dword" },
			]);
			message.deserialize(testBuffer);
		});

		it("should correctly parse the full message", () => {
			expect(message.header.messageId).toBe(0x0501);
			expect(message.header.messageVersion).toBe(1);
		});

		it("should retrieve field values by name", () => {
			const sessionKey = message.getFieldValueByName("SessionKey");
			expect(sessionKey).toBe(
				"228AA31B7CB50F23493259270A8B3D0523354F1F296A12440DEA49B501E8C63FD8A9AAE1CF540BB3555BE6472FAB20D620640B99FEE87AA97326980B104023A1A25B3E651E4A44E4E9BB13AE6D00382305DCC6905CA5902645D32F18A6DAD4D346970E1D9119DBE467F7336DC3C3DD9A0CD9BF7A19EE31261D9EDAFA194DED8F",
			);
		});

		it("should serialize back to the original hex string", () => {
			const serialized = message.serialize();
			expect(serialized.toString("hex")).toBe(testHex);
		});

		it("should throw error when accessing non-existent field", () => {
			expect(() => {
				message.getFieldValueByName("NonExistentField");
			}).toThrowError("Field NonExistentField not found");
		});
	});

	describe("BytableContainer", () => {
		describe("Non-null-terminated mode", () => {
			let container: BytableContainer;

			beforeEach(() => {
				container = new BytableContainer(Buffer.alloc(0));
				container.setNullTerminated(false);
			});

			it("should dynamically adjust length to match content", () => {
				container.setValue("hello");
				expect(container.getLength()).toBe(5);
				expect(container.getValue()).toBe("hello");

				container.setValue("longer string");
				expect(container.getLength()).toBe(13);
				expect(container.getValue()).toBe("longer string");
			});

			it("should serialize with length prefix", () => {
				container.setValue("test");
				const serialized = container.serialize();
				// First 2 bytes should be length (4), followed by "test"
				expect(serialized.length).toBe(6); // 2 bytes length + 4 bytes content
				expect(serialized.readUInt16BE(0)).toBe(4); // Length prefix
				expect(serialized.subarray(2).toString()).toBe("test");
			});

			it("should calculate correct serializeSize", () => {
				container.setValue("hello");
				expect(container.serializeSize).toBe(7); // 5 (content) + 2 (length prefix)
			});
		});

		describe("Null-terminated mode", () => {
			let container: BytableContainer;

			beforeEach(() => {
				container = new BytableContainer(Buffer.alloc(0));
				container.setNullTerminated(true);
			});

			it("should return a single null terminator when serializing empty string", () => {
				container.setNullTerminated(true);
				const serialized = container.serialize();
				expect(serialized.toString("hex")).toBe("00");
			});

			it("should serialize without length prefix", () => {
				container.setNullTerminated(true);
				container.setValue("test");
				const serialized = container.serialize();
				expect(serialized.toString("hex")).toBe("7465737400");
			});

			it("should calculate correct serializeSize", () => {
				container.setNullTerminated(true);
				container.setValue("hello");
				expect(container.serializeSize).toBe(6); // Just the content length (including null terminator)
			});

			it("should throw when setting length for null-terminated container", () => {
				container.setNullTerminated(true);

				// Can't change length after setting value
				expect(() => container.setLength(5)).toThrowError(
					"Cannot set length for null terminated container",
				);
			});
		});

		describe("Edge cases", () => {
			let container: BytableContainer;

			beforeEach(() => {
				container = new BytableContainer(Buffer.alloc(0));
			});

			it("should handle empty strings", () => {
				container.setValue("");
				expect(container.getLength()).toBe(0);
				expect(container.getValue()).toBe("");
			});

			it("should throw error when setting empty buffer in null-terminated mode", () => {
				container.setNullTerminated(true);
				expect(() => container.setValue(Buffer.alloc(0))).toThrowError(
					"Cannot set empty buffer",
				);
			});
		});
	});

	describe("BytableDword", () => {
		it("should correctly parse 32-bit values", () => {
			const dword = BytableDword.fromBuffer(testBuffer, testBuffer.length - 4);
			expect(dword.serializeSize).toBe(4);
			// Add specific value checks based on your expected data
		});
	});
}); 