import { describe, expect, it, vi } from "vitest";
import { getPersonasByPersonaId } from "../src/getPersonasByPersonaId.js";

describe("getPersonasByPersonaId", () => {
	it("returns a persona", async () => {
		// arrange
		const id = 22;

		// act
		const result = await getPersonasByPersonaId({
			personaId: id,
		});

		// assert
		expect(result).toBeInstanceOf(Array);
		expect(result[0].personaId).toBe(id);
	});

	describe("getPersonasByPersonaId", () => {
		it("returns a persona when a matching ID is found", async () => {
			// arrange
			const id = 21;

			vi.mock("rocky-motors-database", () => {
				return {
					DatabaseManager: {
						getPersonasByPersonaId: async (personaId: number) => {
							return [
								{
									personaId,
									personaName: "test",
									personaDescription: "test",
									personaImage: "test",
								},
							];
						},
					},
				};
			});


			// act
			const result = await getPersonasByPersonaId({ personaId: id });

			// assert
			expect(result).toBeInstanceOf(Array);
			expect(result.length).toBe(1);
			expect(result[0].personaId).toBe(id);
		});

		it("throws an error when no matching ID is found", async () => {
			// arrange
			const id = 3;

			// act & assert
			await expect(
				getPersonasByPersonaId({
					personaId: id,
				}),
			).rejects.toThrow(`Unable to locate a persona for id: ${id}`);
		});
	});
});
