import {
	fetchStateFromDatabase,
	getEncryption,
	ServerLogger,
	updateEncryption,
} from "rusty-motors-shared";
import { SerializedBufferOld } from "rusty-motors-shared";
import { _setMyUserData } from "./_setMyUserData.js";
import { handleGetMiniUserList } from "./handleGetMiniUserList.js";
import { handleSendMiniRiffList } from "./handleSendMiniRiffList.js";
import { getServerLogger } from "rusty-motors-shared";
import { BytableMessage, createRawMessage } from "@rustymotors/binary";
import { handleGetServerInfo } from "./handleGetServerInfo.js";

/**
 * Array of supported command handlers
 *
 * @type {{
 *  opCode: number,
 * name: string,
 * handler: (args: {
 * connectionId: string,
 * message: SerializedBufferOld,
 * log: ServerLogger,
 * }) => Promise<{
 * connectionId: string,
 * messages: SerializedBufferOld[],
 * }>}[]}
 */
export const messageHandlers: {
	opCode: number;
	name: string;
	handler: (args: {
		connectionId: string;
		message: BytableMessage;
		log: ServerLogger;
	}) => Promise<{
		connectionId: string;
		messages: SerializedBufferOld[];
	}>;
}[] = [];

/**
 * Takes an plaintext command packet and return the encrypted bytes
 *
 * @param {object} args
 * @param {string} args.connectionId
 * @param {LegacyMessage | MessageBuffer} args.message
 * @param {ServerLogger} [args.log] Logger
 * @returns {Promise<{
 * connectionId: string,
 * message: LegacyMessage | MessageBuffer,
 * }>}
 */
async function encryptCmd({
	connectionId,
	message,
	log = getServerLogger( "lobby.encryptCmd"),
}: {
	connectionId: string;
	message: BytableMessage;
	log?: ServerLogger;
}): Promise<{
	connectionId: string;
	message: BytableMessage;
}> {
	log.debug(`[ciphering Cmd: ${message.serialize().toString("hex")}`);
	const state = fetchStateFromDatabase();

	const encryption = getEncryption(state, connectionId);

	if (typeof encryption === "undefined") {
		throw Error(
			`Unable to locate encryption session for connection id ${connectionId}`,
		);
	}

	let precriptedMessage = message.serialize();

	log.debug(`[precripted Cmd: ${precriptedMessage.toString("hex")}`);
	if (precriptedMessage.length % 8 !== 0) {
		log.warn(
			`[connectionId] Message length is not a multiple of 8, padding with 0s`,
		);
		const padding = Buffer.alloc(8 - (precriptedMessage.length % 8));
		precriptedMessage = Buffer.concat([precriptedMessage, padding]);
		log.debug(`[padded Cmd: ${precriptedMessage.toString("hex")}`);
	}

	const result = encryption.commandEncryption.encrypt(precriptedMessage);
	updateEncryption(state, encryption).save();

	log.debug(`[ciphered Cmd: ${result.toString("hex")}`);

	const encryptedMessage = createRawMessage();
	encryptedMessage.header.setMessageId(0x1101);
	encryptedMessage.setBody(result);

	log.debug(`[ciphered message: ${encryptedMessage.serialize().toString("hex")}`);

	return {
		connectionId,
		message: encryptedMessage,
	};
}

/**
 * Takes an encrypted command packet and returns the decrypted bytes
 *
 * @param {object} args
 * @param {string} args.connectionId
 * @param {LegacyMessage} args.message
 * @param {ServerLogger} [args.log=getServerLogger({ name: "Lobby" })]
 * @returns {Promise<{
 *  connectionId: string,
 * message: LegacyMessage,
 * }>}
 */
async function decryptCmd({
	connectionId,
	message,
	log = getServerLogger( "lobby.decryptCmd"),
}: {
	connectionId: string;
	message: BytableMessage;
	log?: ServerLogger;
}): Promise<{
	connectionId: string;
	message: BytableMessage;
}> {
	const state = fetchStateFromDatabase();

	const encryption = getEncryption(state, connectionId);

	if (typeof encryption === "undefined") {
		throw Error(
			`Unable to locate encryption session for connection id ${connectionId}`,
		);
	}

	const result = encryption.commandEncryption.decrypt(message.getBody());

	updateEncryption(state, encryption).save();

	log.debug(`[Deciphered Cmd: ${result.toString("hex")}`);	
	
	const decipheredMessage = createRawMessage(result)

	return {
		connectionId,
		message: decipheredMessage,
	};
}

export type NpsCommandHandler = {
	opCode: number;
	name: string;
	handler: (args: {
		connectionId: string;
		message: BytableMessage;
		log?: ServerLogger;
	}) => Promise<{
		connectionId: string;
		message: BytableMessage;
	}>;
};

const npsCommandHandlers: NpsCommandHandler[] = [
	{
		opCode: 0x10c,
		name: "NPS_GET_SERVER_INFO",
		handler: handleGetServerInfo,
	},
	{
		opCode: 0x128,
		name: "NPS_GET_MINI_USER_LIST",
		handler: handleGetMiniUserList,
	},
	{
		opCode: 0x30c,
		name: "NPS_SEND_MINI_RIFF_LIST",
		handler: handleSendMiniRiffList,
	},
	{
		opCode: 0x103,
		name: "NPS_SET_MY_USER_DATA",
		handler: _setMyUserData,
	},
];


async function handleCommand({
	connectionId,
	message,
	log = getServerLogger( "lobby.handleCommand"),
}: {
	connectionId: string;
	message: BytableMessage;
	log?: ServerLogger;
}): Promise<{
	connectionId: string;
	message: BytableMessage;
}> {
	log.debug(
		`[${connectionId}] Received command: ${message.serialize().toString("hex")}`,
	);

	const command = message.header.messageId;

	// What is the command?
	log.debug(`[${connectionId}] Command: ${command}`);

	const handler = npsCommandHandlers.find((h) => h.opCode === command);

	if (typeof handler === "undefined") {
		throw Error(`Unknown command: ${command}`);
	}

	const {message: response} = await handler.handler({

		connectionId,
		message,
	});

	log.debug(`[${connectionId}] Sending response: ${response.serialize().toString("hex")}`);

	return {
		connectionId,
		message: response,
	};
}

/**
 *
 *
 * @param {object} args
 * @param {string} args.connectionId
 * @param {SerializedBufferOld} args.message
 * @param {ServerLogger} [args.log=getServerLogger({ name: "Lobby" })]
  * @returns {Promise<{
*  connectionId: string,
* messages: SerializedBufferOld[],
* }>}

 */
export async function handleEncryptedNPSCommand({
	connectionId,
	message,
	log = getServerLogger( "lobby.handleEncryptedNPSCommand"),
}: {
	connectionId: string;
	message: BytableMessage;
	log?: ServerLogger;
}): Promise<{
	connectionId: string;
	messages: SerializedBufferOld[];
}> {
	log.debug(`[${connectionId}] Handling encrypted NPS command`);
	log.debug(`[${connectionId}] Received command: ${message.serialize().toString("hex")}`);

	// Decipher
	const decipheredMessage = await decryptCmd({
		connectionId,
		message,
	});

	log.debug(`[${connectionId}] Deciphered message: ${decipheredMessage.message.serialize().toString("hex")}`);

	const response = await handleCommand({
		connectionId,
		message: decipheredMessage.message,
	});

	if (response.message === null) {
		log.debug(`[${connectionId}] No response to send`);
		return {
			connectionId,
			messages: [],
		};
	}

	log.debug(`[${connectionId}] Sending response: ${response.message.serialize().toString("hex")}`);

	// Encipher
	const result = await encryptCmd({
		connectionId,
		message: response.message,
	});

	const encryptedResponse = result.message;

	log.debug(`[${connectionId}] Enciphered response: ${encryptedResponse.serialize().toString("hex")}`);

	return {
		connectionId,
		messages: [encryptedResponse],
	};
}
