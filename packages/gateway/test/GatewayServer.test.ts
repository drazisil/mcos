import { describe, it, expect } from "vitest";
import { Gateway } from "../src/GatewayServer.js";

describe("GatewayServer", () => {
    it("should throw an error if no listeningPortList is provided", () => {
        expect(() => new Gateway({})).toThrow();
    });
});
