import { suite, it, expect, beforeEach } from "vitest";
import { SessionService } from "./SessionService.js";

suite("Sessions service", () => {
    let sessionService: SessionService;

    beforeEach(() => {
        sessionService = new SessionService();
    });

    it("should be able to create a session", () => {
        expect(() => sessionService.new()).not.toThrow();
    });
});
