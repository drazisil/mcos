import { describe, it, expect, vi } from "vitest";
import http from "node:http";
import { processHttpRequest, initializeRouteHandlers } from "./web";
import { before } from "node:test";

describe("processHttpRequest", () => {
	before(() => {
		initializeRouteHandlers();
	});

	it("should respond with 'Hello, world!' for the root path", () => {
		const request = {
			url: "/",
		} as http.IncomingMessage;

		const response = {
			setHeader: vi.fn(),
			end: vi.fn(),
		} as unknown as http.ServerResponse;

		processHttpRequest(request, response);

		expect(response.setHeader).toHaveBeenCalledWith(
			"Content-Type",
			"text/plain",
		);
		expect(response.end).toHaveBeenCalledWith("Hello, world!");
	});

	it("should respond with 404 for unknown paths", () => {
		const request = {
			url: "/unknown",
		} as http.IncomingMessage;

		const response = {
			setHeader: vi.fn(),
			end: vi.fn(),
			statusCode: 0,
		} as unknown as http.ServerResponse;

		processHttpRequest(request, response);

		expect(response.statusCode).toBe(404);
		expect(response.end).toHaveBeenCalledWith("Not found");
	});

	it("should handle /AuthLogin path", () => {
		const request = {
			url: "/AuthLogin?username=new&password=new",
		} as http.IncomingMessage;

		const response = {
			setHeader: vi.fn(),
			end: vi.fn(),
		} as unknown as http.ServerResponse;

		processHttpRequest(request, response);

		expect(response.setHeader).toHaveBeenCalledWith(
			"Content-Type",
			"text/plain",
		);
		expect(response.end).toHaveBeenCalledWith(
			expect.stringContaining("Valid=TRUE"),
		);
	});

	it("should handle /ShardList/ path", () => {
		const request = {
			url: "/ShardList/",
		} as http.IncomingMessage;

		const response = {
			setHeader: vi.fn(),
			end: vi.fn(),
		} as unknown as http.ServerResponse;

        const originalEnv = process.env;
        const testEnv = {
            EXTERNAL_HOST: "localhost",
            CERTIFICATE_FILE: "cert.pem",
            PRIVATE_KEY_FILE: "key.pem",
            PUBLIC_KEY_FILE: "public.pem",
            LOG_LEVEL: "info",
        };

        process.env = {
            ...originalEnv,
            ...testEnv,
        }

		processHttpRequest(request, response);

		expect(response.setHeader).toHaveBeenCalledWith(
			"Content-Type",
			"text/plain",
		);
		expect(response.end).toHaveBeenCalledWith(expect.any(String));
	});
});