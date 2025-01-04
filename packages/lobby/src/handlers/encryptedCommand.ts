import {
	fetchStateFromDatabase,
	getEncryption,
	ServerLogger,
	updateEncryption,
} from "rusty-motors-shared";
import { MessageBufferOld } from "rusty-motors-shared";
import { SerializedBufferOld } from "rusty-motors-shared";
import { LegacyMessage } from "rusty-motors-shared";
import { _setMyUserData } from "./_setMyUserData.js";
import { handleGetMiniUserList } from "./handleGetMiniUserList.js";
import { handleSendMiniRiffList } from "./handleSendMiniRiffList.js";
import { getServerLogger } from "rusty-motors-shared";

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
		message: SerializedBufferOld;
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
	message: LegacyMessage | MessageBufferOld;
	log?: ServerLogger;
}): Promise<{
	connectionId: string;
	message: LegacyMessage | MessageBufferOld;
}> {
	const state = fetchStateFromDatabase();

	const encryption = getEncryption(state, connectionId);

	if (typeof encryption === "undefined") {
		throw Error(
			`Unable to locate encryption session for connection id ${connectionId}`,
		);
	}

	const result = encryption.commandEncryption.encrypt(message.data);

	updateEncryption(state, encryption).save();

	log.debug(`[ciphered Cmd: ${result.toString("hex")}`);

	message.setBuffer(result);

	return {
		connectionId,
		message,
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
	message: LegacyMessage;
	log?: ServerLogger;
}): Promise<{
	connectionId: string;
	message: LegacyMessage;
}> {
	const state = fetchStateFromDatabase();

	const encryption = getEncryption(state, connectionId);

	if (typeof encryption === "undefined") {
		throw Error(
			`Unable to locate encryption session for connection id ${connectionId}`,
		);
	}

	const result = encryption.commandEncryption.decrypt(message.data);

	updateEncryption(state, encryption).save();

	log.debug(`[Deciphered Cmd: ${result.toString("hex")}`);

	message.setBuffer(result);

	return {
		connectionId,
		message,
	};
}

export type NpsCommandHandler = {
	opCode: number;
	name: string;
	handler: (args: {
		connectionId: string;
		message: LegacyMessage;
		log: ServerLogger;
	}) => Promise<{
		connectionId: string;
		message: LegacyMessage | null;
	}>;
};

const npsCommandHandlers: NpsCommandHandler[] = [
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

/**
 *
 *
 * @param {object} args
 * @param {string} args.connectionId
 * @param {LegacyMessage} args.message
 * @param {ServerLogger} [args.log=getServerLogger({ name: "Lobby" })]
 * @return {Promise<{
 * connectionId: string,
 * message: MessageBuffer | LegacyMessage,
 * }>}}
 */
async function handleCommand({
	connectionId,
	message,
	log = getServerLogger( "lobby.handleCommand"),
}: {
	connectionId: string;
	message: LegacyMessage;
	log?: ServerLogger;
}): Promise<{
	connectionId: string;
	message: MessageBufferOld | LegacyMessage | null;
}> {
	const incommingRequest = message;

	log.debug(
		`Received command: ${incommingRequest._doSerialize().toString("hex")}`,
	);

	// What is the command?
	const command = incommingRequest.data.readUInt16BE(0);

	log.debug(`Command: ${command}`);

	const handler = npsCommandHandlers.find((h) => h.opCode === command);

	if (typeof handler === "undefined") {
		throw Error(`Unknown command: ${command}`);
	}

	return handler.handler({
		connectionId,
		message,
		log,
	});
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
	message: SerializedBufferOld;
	log?: ServerLogger;
}): Promise<{
	connectionId: string;
	messages: SerializedBufferOld[];
}> {
	const inboundMessage = new LegacyMessage();
	inboundMessage._doDeserialize(message.data);

	// Decipher
	const decipheredMessage = await decryptCmd({
		connectionId,
		message: inboundMessage,
		log,
	});

	const response = await handleCommand({
		connectionId,
		message: decipheredMessage.message,
		log,
	});

	if (response.message === null) {
		log.debug("No response to send");
		return {
			connectionId,
			messages: [],
		};
	}

	// Encipher
	const encryptedResponse = encryptCmd({
		connectionId,
		message: response.message,
		log,
	});

	const outboundMessage = new SerializedBufferOld();
	outboundMessage.setBuffer((await encryptedResponse).message.serialize());

	return {
		connectionId,
		messages: [outboundMessage],
	};
}
