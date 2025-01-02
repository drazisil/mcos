import { describe, expect, it, vi } from "vitest";
import {
	addPortRouter,
	clearPortRouters,
	getPortRouter,
} from "../src/portRouters.js";
import { beforeEach } from "vitest";

describe("addPortRouter", () => {
	it("should add a router for a specific port", () => {
		// arrange
		const port = 8080;
		const mockRouter = vi.fn().mockResolvedValue(undefined);

		// act
		addPortRouter(port, mockRouter);
		const retrievedRouter = getPortRouter(port);

		// assert
		expect(retrievedRouter).toBe(mockRouter);
	});

	it("should overwrite an existing router for the same port", () => {
		// arrange
		const port = 8080;
		const mockRouter1 = vi.fn().mockResolvedValue(undefined);
		const mockRouter2 = vi.fn().mockResolvedValue(undefined);

		// act
		addPortRouter(port, mockRouter1);
		addPortRouter(port, mockRouter2);
		const retrievedRouter = getPortRouter(port);

		// assert
		expect(retrievedRouter).toBe(mockRouter2);
	});

	it("should handle multiple ports correctly", () => {
		// arrange
		const port1 = 8080;
		const port2 = 9090;
		const mockRouter1 = vi.fn().mockResolvedValue(undefined);
		const mockRouter2 = vi.fn().mockResolvedValue(undefined);

		// act
		addPortRouter(port1, mockRouter1);
		addPortRouter(port2, mockRouter2);
		const retrievedRouter1 = getPortRouter(port1);
		const retrievedRouter2 = getPortRouter(port2);

		// assert
		expect(retrievedRouter1).toBe(mockRouter1);
		expect(retrievedRouter2).toBe(mockRouter2);
	});

	describe("getPortRouter", () => {
		beforeEach(() => {
			clearPortRouters();
			vi.resetAllMocks();
		});

		it("should return the correct router for a specific port", () => {
			// arrange
			const port = 8080;
			const mockRouter = vi.fn().mockResolvedValue(undefined);
			addPortRouter(port, mockRouter);

			// act
			const retrievedRouter = getPortRouter(port);

			// assert
			expect(retrievedRouter).toBe(mockRouter);
		});

		it("should return notFoundRouter if no router is found for the port", () => {
			// arrange
			const port = 8080;
			// act
			const retrievedRouter = getPortRouter(port);

			// assert
			expect(retrievedRouter).toBeInstanceOf(Function);
			expect(retrievedRouter.name).toBe("notFoundRouter");
		});

		it("should return the correct router after overwriting an existing router for the same port", () => {
			// arrange
			const port = 8080;
			const mockRouter1 = vi.fn().mockResolvedValue(undefined);
			const mockRouter2 = vi.fn().mockResolvedValue(undefined);
			addPortRouter(port, mockRouter1);
			addPortRouter(port, mockRouter2);

			// act
			const retrievedRouter = getPortRouter(port);

			// assert
			expect(retrievedRouter).toBe(mockRouter2);
		});

		it("should handle multiple ports correctly", () => {
			// arrange
			const port1 = 8080;
			const port2 = 9090;
			const mockRouter1 = vi.fn().mockResolvedValue(undefined);
			const mockRouter2 = vi.fn().mockResolvedValue(undefined);
			addPortRouter(port1, mockRouter1);
			addPortRouter(port2, mockRouter2);

			// act
			const retrievedRouter1 = getPortRouter(port1);
			const retrievedRouter2 = getPortRouter(port2);

			// assert
			expect(retrievedRouter1).toBe(mockRouter1);
			expect(retrievedRouter2).toBe(mockRouter2);
		});
	});
describe("clearPortRouters", () => {
	beforeEach(() => {
		clearPortRouters();
		vi.resetAllMocks();
	});

	it("should clear all routers", () => {
		// arrange
		const port1 = 8080;
		const port2 = 9090;
		const mockRouter1 = vi.fn().mockResolvedValue(undefined);
		const mockRouter2 = vi.fn().mockResolvedValue(undefined);
		addPortRouter(port1, mockRouter1);
		addPortRouter(port2, mockRouter2);

		// act
		clearPortRouters();
		const retrievedRouter1 = getPortRouter(port1);
		const retrievedRouter2 = getPortRouter(port2);

		// assert
		expect(retrievedRouter1).toBeInstanceOf(Function);
		expect(retrievedRouter1.name).toBe("notFoundRouter");
		expect(retrievedRouter2).toBeInstanceOf(Function);
		expect(retrievedRouter2.name).toBe("notFoundRouter");
	});

	describe("addPortRouter", () => {
		it("should throw an error if the port number is not an integer", () => {
			// arrange
			const port = 8080.5;
			const mockRouter = vi.fn().mockResolvedValue(undefined);

			// act & assert
			expect(() => addPortRouter(port, mockRouter)).toThrow(
				`Invalid port number: ${port}`
			);
		});

		it("should throw an error if the port number is negative", () => {
			// arrange
			const port = -1;
			const mockRouter = vi.fn().mockResolvedValue(undefined);

			// act & assert
			expect(() => addPortRouter(port, mockRouter)).toThrow(
				`Invalid port number: ${port}`
			);
		});

		it("should throw an error if the port number is greater than 65535", () => {
			// arrange
			const port = 65536;
			const mockRouter = vi.fn().mockResolvedValue(undefined);

			// act & assert
			expect(() => addPortRouter(port, mockRouter)).toThrow(
				`Invalid port number: ${port}`
			);
		});

		describe("getPortRouter", () => {
			beforeEach(() => {
				clearPortRouters();
				vi.resetAllMocks();
			});

			it("should return the correct router for a specific port", () => {
				// arrange
				const port = 8080;
				const mockRouter = vi.fn().mockResolvedValue(undefined);
				addPortRouter(port, mockRouter);

				// act
				const retrievedRouter = getPortRouter(port);

				// assert
				expect(retrievedRouter).toBe(mockRouter);
			});

			it("should return notFoundRouter if no router is found for the port", () => {
				// arrange
				const port = 8080;

				// act
				const retrievedRouter = getPortRouter(port);

				// assert
				expect(retrievedRouter).toBeInstanceOf(Function);
				expect(retrievedRouter.name).toBe("notFoundRouter");
			});

			it("should throw an error if the port number is not an integer", () => {
				// arrange
				const port = 8080.5;

				// act & assert
				expect(() => getPortRouter(port)).toThrow(`Invalid port number: ${port}`);
			});

			it("should throw an error if the port number is negative", () => {
				// arrange
				const port = -1;

				// act & assert
				expect(() => getPortRouter(port)).toThrow(`Invalid port number: ${port}`);
			});

			it("should throw an error if the port number is greater than 65535", () => {
				// arrange
				const port = 65536;

				// act & assert
				expect(() => getPortRouter(port)).toThrow(`Invalid port number: ${port}`);
			});

			it("should return the correct router after overwriting an existing router for the same port", () => {
				// arrange
				const port = 8080;
				const mockRouter1 = vi.fn().mockResolvedValue(undefined);
				const mockRouter2 = vi.fn().mockResolvedValue(undefined);
				addPortRouter(port, mockRouter1);
				addPortRouter(port, mockRouter2);

				// act
				const retrievedRouter = getPortRouter(port);

				// assert
				expect(retrievedRouter).toBe(mockRouter2);
			});

			it("should handle multiple ports correctly", () => {
				// arrange
				const port1 = 8080;
				const port2 = 9090;
				const mockRouter1 = vi.fn().mockResolvedValue(undefined);
				const mockRouter2 = vi.fn().mockResolvedValue(undefined);
				addPortRouter(port1, mockRouter1);
				addPortRouter(port2, mockRouter2);

				// act
				const retrievedRouter1 = getPortRouter(port1);
				const retrievedRouter2 = getPortRouter(port2);

				// assert
				expect(retrievedRouter1).toBe(mockRouter1);
				expect(retrievedRouter2).toBe(mockRouter2);
			});
		});
	});
});
});
