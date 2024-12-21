import { describe, it, expect, vi, beforeEach } from "vitest";
import { npsPortRouter } from "../src/npsPortRouter.js";
import { GamePacket } from "rusty-motors-shared-packets";
import { parseInitialMessage } from "../src/npsPortRouter.js";

describe("parseInitialMessage", () => {
    it("should correctly parse a valid buffer into a GamePacket", () => {
        const id = "test-connection";
        const buffer = Buffer.from([0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08]);
        const gamePacket = parseInitialMessage(id, buffer);

        expect(gamePacket).toBeInstanceOf(GamePacket);
        expect(gamePacket.connectionId).toBe(id);
        expect(gamePacket.serialize()).toEqual(buffer);
    });

    it("should throw an error for an invalid buffer", () => {
        const id = "test-connection";
        const buffer = Buffer.from([]);

        expect(() => parseInitialMessage(id, buffer)).toThrow();
    });
});
