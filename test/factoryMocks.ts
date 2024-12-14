import { expect, it, vi } from "vitest";
import { ensureLegacyCipherCompatibility } from "../packages/shared/src/verifyLegacyCipherSupport.js";

export function mocklogger.child() {
	vi.mock("pino", () => {
		return {
			default: vi.fn().mockImplementation(() => {
				return {
					debug: vi.fn(),
					info: vi.fn(),
					warn: vi.fn(),
					error: vi.fn(),
				};
			}),
			pino: vi.fn().mockImplementation(() => {
				return {
					debug: vi.fn(),
					info: vi.fn(),
					warn: vi.fn(),
					error: vi.fn(),
				};
			}),
		};
	});
}

export function unmocklogger.child() {
	vi.unmock("pino");
}

it("should have crypto", () => {
	expect(() => ensureLegacyCipherCompatibility()).not.toThrow();
});
