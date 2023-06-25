import { describe, it } from "mocha";
import { expect } from "chai";
import { handleGetCert, handleGetKey, handleGetRegistry } from "./index.js";
import { ShardServer } from "./ShardServer.js";
import { TServerConfiguration, TServerLogger } from "mcos/shared/interfaces";

describe("Shard service", () => {
    it("should return an instance when getInstance() is called", () => {
        // arrange
        /** @type {TServerConfiguration} */
        const config: TServerConfiguration = {
            certificateFileContents: "",
            EXTERNAL_HOST: "",
            privateKeyContents: "",
            publicKeyContents: "",
            LOG_LEVEL: "info",
        };
        /** @type {TServerLogger} */
        const log: TServerLogger = () => {
            return;
        };

        const expectedClass = ShardServer;

        // act
        const server = ShardServer.getInstance(config, log);

        // assert
        expect(server).to.be.instanceOf(expectedClass);
    });

    describe("handleGetCert", () => {
        it("should return file contents", () => {
            // arrange
            /** @type {TServerConfiguration} */
            const config: TServerConfiguration = {
                certificateFileContents: "Hello! I'm an SSL cert. Honest.",
                EXTERNAL_HOST: "",
                privateKeyContents: "",
                publicKeyContents: "",
                LOG_LEVEL: "info",
            };

            const expectedText = "Hello! I'm an SSL cert. Honest.";

            // act
            const result = handleGetCert(config);

            // assert
            expect(result).to.equal(expectedText);
        });
    });

    describe("handleGetRegistry", () => {
        it("should return file contents", () => {
            // arrange
            /** @type {TServerConfiguration} */
            const config: TServerConfiguration = {
                certificateFileContents: "",
                EXTERNAL_HOST: "0.10.0.1",
                privateKeyContents: "",
                publicKeyContents: "",
                LOG_LEVEL: "info",
            };

            const expectedText = '"AuthLoginServer"="0.10.0.1"';

            // act
            const result = handleGetRegistry(config);

            // assert
            expect(result).to.contain(expectedText);
        });
    });

    describe("handleGetKey", () => {
        it("should return file contents", () => {
            // arrange
            /** @type {TServerConfiguration} */
            const config: TServerConfiguration = {
                certificateFileContents: "",
                EXTERNAL_HOST: "",
                privateKeyContents: "",
                publicKeyContents: "I'm a public key! Wheeeeeeeee",
                LOG_LEVEL: "info",
            };

            const expectedText = "I'm a public key! Wheeeeeeeee";

            // act
            const result = handleGetKey(config);

            // assert
            expect(result).to.equal(expectedText);
        });
    });
});
