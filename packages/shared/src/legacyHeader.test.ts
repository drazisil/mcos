import { legacyHeader } from "./legacyHeader.js";
import { describe, expect, it } from "vitest";

describe("legacyHeader", () => {
	it("should have a length of 4", () => {
		const header = new legacyHeader();
		expect(header.length).toBe(4);
	});
});
