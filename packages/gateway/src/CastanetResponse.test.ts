import { describe, expect, it } from "vitest";
import { CastanetResponse } from "./CastanetResponse.js";

describe("CastanetResponse", () => {
	it("should have a header", () => {
		// Assert
		expect(CastanetResponse.header.value).toBe("application/octet-stream");
		expect(CastanetResponse.header.type).toBe("Content-Type");
	});

	it("should have a body", () => {
		// Assert
		expect(CastanetResponse.body).toBeInstanceOf(Buffer);
		expect(CastanetResponse.body).toHaveLength(11);
		expect(CastanetResponse.body).toEqual(
			Buffer.from([
				0xca, 0xfe, 0xbe, 0xef, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03,
			]),
		);
	});
});
