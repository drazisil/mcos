import { describe, it, expect } from "vitest";
import {
	DatabaseManager
} from "rusty-motors-database";

describe("Database", () => {
	describe("fetchSessionKeyByCustomerId", () => {
		it("throws when session key is not found", async () => {
			// arrange

			const customerId = 1234;
			// act
			try {
				await DatabaseManager.fetchSessionKeyByCustomerId(customerId);
			} catch (error) {
				// assert
				expect(error).toEqual(
					new Error(`Session key not found for customer ${customerId}`),
				);
			}
		});
	});

	describe("fetchSessionKeyByConnectionId", () => {
		it("throws when session key is not found", async () => {
			// arrange

			const connectionId = "1234";
			// act
			try {
				await DatabaseManager.fetchSessionKeyByConnectionId(connectionId);
			} catch (error) {
				// assert
				expect(error).toEqual(
					new Error(`Session key not found for connection ${connectionId}`),
				);
			}
		});
	});

	describe("updateUser", () => {
		it("returns successfully when passed a valid user record", () => {
			// arrange

			const userRecord = {
				contextId: "1234",
				customerId: 1234,
				userId: 1234,
				userData: Buffer.from("1234"),
			};
			// act + assert
			expect(async () => {
				await DatabaseManager.updateUser(userRecord);
			}).not.toThrow();
		});
	});
});
