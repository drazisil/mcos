import { randomUUID } from "node:crypto";
import { Socket } from "node:net";
import { beforeAll, beforeEach, describe, expect, it, test, vi } from "vitest";
import {
	McosEncryption,
	State,
	addEncryption,
	createInitialState,
	getEncryption,
} from "rusty-motors-shared";
import {
	createCommandEncryptionPair,
	createDataEncryptionPair,
} from "./encryption.js";

let testSave: (state: State) => void;
let testState: State;
let testSocket1: Socket;
let testSocket2: Socket;

describe("Encryption", () => {
	beforeAll(() => {
		testSave = (state?: State) => {
			if (typeof state === "undefined") {
				throw Error("State not defined");
			}
			testState = state;
		};
		testState = createInitialState({
			saveFunction: testSave,
		});
		testSocket1 = new Socket();
		testSocket1.write = vi.fn().mockImplementation(() => {
			// Do nothing
		});
		testSocket2 = new Socket();
		testSocket2.write = vi.fn().mockImplementation(() => {
			// Do nothing
		});
	});

	beforeEach(() => {
		testState = createInitialState({
			saveFunction: testSave,
		});
	});

	it("should be able to encrypt and decrypt a command message", () => {
		// Arrange

		const connectionId1 = randomUUID();
		const connectionId2 = randomUUID();

		const key =
			"254a7a0703a3a2c4df687a3969d3577bb8350efc3950c1c22f76415227ac5f21";

		const commandEncryptionPair = createCommandEncryptionPair(key);

		const dataEncryptionPair = createDataEncryptionPair(key);

		const encryption1 = new McosEncryption({
			connectionId: connectionId1,
			commandEncryptionPair,
			dataEncryptionPair,
		});

		const encryption2 = new McosEncryption({
			connectionId: connectionId2,
			commandEncryptionPair,
			dataEncryptionPair,
		});

		// Act + Assert

		const message = Buffer.from("test message1234");

		let state = testState;

		state = addEncryption(state, encryption1);
		state = addEncryption(state, encryption2);

		const connectionEncryption1 = getEncryption(state, connectionId1);

		expect(connectionEncryption1).toBeDefined();

		const encryptedMessage =
			connectionEncryption1?.commandEncryption.encrypt(message);

		expect(encryptedMessage).toBeDefined();

		const connectionEncryption2 = getEncryption(state, connectionId2);

		expect(connectionEncryption2).toBeDefined();

		const decryptedMessage = connectionEncryption2?.commandEncryption.decrypt(
			encryptedMessage as Buffer,
		);

		expect(decryptedMessage).toBeDefined();

		expect(decryptedMessage).toEqual(message);
	});

	it("should be able to encrypt and decrypt a command message", () => {
		// Arrange

		const connectionId1 = randomUUID();
		const connectionId2 = randomUUID();

		const key =
			"254a7a0703a3a2c4df687a3969d3577bb8350efc3950c1c22f76415227ac5f21";

		const commandEncryptionPair = createCommandEncryptionPair(key);

		const dataEncryptionPair = createDataEncryptionPair(key);

		const encryption1 = new McosEncryption({
			connectionId: connectionId1,
			commandEncryptionPair,
			dataEncryptionPair,
		});

		const encryption2 = new McosEncryption({
			connectionId: connectionId2,
			commandEncryptionPair,
			dataEncryptionPair,
		});

		// Act + Assert

		const message = Buffer.from("test message1234");

		let state = testState;

		state = addEncryption(state, encryption1);
		state = addEncryption(state, encryption2);

		const connectionEncryption1 = getEncryption(state, connectionId1);

		expect(connectionEncryption1).toBeDefined();

		const encryptedMessage =
			connectionEncryption1?.dataEncryption.encrypt(message);

		expect(encryptedMessage).toBeDefined();

		const connectionEncryption2 = getEncryption(state, connectionId2);

		expect(connectionEncryption2).toBeDefined();

		const decryptedMessage = connectionEncryption2?.dataEncryption.decrypt(
			encryptedMessage as Buffer,
		);

		expect(decryptedMessage).toBeDefined();

		expect(decryptedMessage).toEqual(message);
	});

	test("data should throw when the key is too short", () => {
		// Arrange

		const key = "22c4df";

		// Act + Assert

		expect(() => {
			createDataEncryptionPair(key);
		}).toThrow("Key too short");
	});

	test("command should throw when the key is too short", () => {
		// Arrange

		const key = "25";

		// Act + Assert

		expect(() => {
			createCommandEncryptionPair(key);
		}).toThrow("Key too short");
	});
});
