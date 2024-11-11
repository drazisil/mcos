/**
 * @fileoverview State management for the gateway server.
 * @module shared/state
 * @exports GatewayServer/State
 *
 */

// eslint-disable-next-line no-unused-vars
import { Cipher, Decipher } from "crypto";
import { SerializedBufferOld } from "./SerializedBufferOld.js";
import { BufferSerializer } from "rusty-motors-shared-packets";
import pino, { Logger } from "pino";
const defaultLogger = pino({ name: "GatewayServer/State" });


/**
 * State management for the gateway server.
 *
 * This file contains the state management for the gateway server. It is
 * responsible for keeping track of the state of the server, including
 * connections, encryption, and sessions.
 *
 * @example
 * ```ts
 * import { createInitialState, addSocket, removeSocket } from "./state.js";
 *
 * const state = createInitialState();
 *
 * const wrappedSocket = wrapSocket(socket, connectionId);
 *
 *
 *
 */

/**
 * @external crypto
 * @see {@link https://nodejs.org/api/crypto.html}
 */

/**
 * A pair of encryption ciphers.
 */
export class McosEncryptionPair {
	_cipher: Cipher;
	_decipher: Decipher;
	/**
	 * Create a new encryption pair.
	 *
	 * This function creates a new encryption pair. It is used to encrypt and
	 * decrypt data sent to and from the client.
	 *
	 * @param {module:crypto.Cipher} cipher The cipher to use for encryption.
	 * @param {module:crypto.Decipher} decipher The decipher to use for decryption.
	 */
	constructor(cipher: Cipher, decipher: Decipher) {
		this._cipher = cipher;
		this._decipher = decipher;
	}

	/**
	 * @param {Buffer} data The data to encrypt.
	 * @returns {Buffer} The encrypted data.
	 */
	encrypt(data: Buffer): Buffer {
		return this._cipher.update(data);
	}

	/**
	 * @param {Buffer} data The data to decrypt.
	 * @returns {Buffer} The decrypted data.
	 */
	decrypt(data: Buffer): Buffer {
		return this._decipher.update(data);
	}
}

/**
 * The encryption settings for a session.
 */
export class McosEncryption {
	connectionId: string;
	_commandEncryptionPair: McosEncryptionPair;
	_dataEncryptionPair: McosEncryptionPair;
	/**
	 * Create a new encryption object.
	 *
	 * @param {object} args
	 * @param {string} args.connectionId The connection id of the session that
	 *                                   this encryption is for.
	 * @param {McosEncryptionPair} args.commandEncryptionPair The encryption
	 *                                                        pair for
	 *                                                       command packets.
	 * @param {McosEncryptionPair} args.dataEncryptionPair The encryption pair
	 *                                                    for data packets.
	 */
	constructor({
		connectionId,
		commandEncryptionPair,
		dataEncryptionPair,
	}: {
		connectionId: string;
		commandEncryptionPair: McosEncryptionPair;
		dataEncryptionPair: McosEncryptionPair;
	}) {
		this.connectionId = connectionId;
		this._commandEncryptionPair = commandEncryptionPair;
		this._dataEncryptionPair = dataEncryptionPair;
	}

	get commandEncryption() {
		return this._commandEncryptionPair;
	}

	get dataEncryption() {
		return this._dataEncryptionPair;
	}
}

/**
 * A client session.
 */
export class McosSession {
	connectionId: string;
	gameId: number;
	/**
	 * Create a new session.
	 *
	 * @param {object} args
	 * @param {string} args.connectionId A unique identifier for this session.
	 * @param {number} args.username The username of the user who owns this
	 *                              session.
	 */
	constructor({
		connectionId,
		gameId,
	}: {
		connectionId: string;
		gameId: number;
	}) {
		this.connectionId = connectionId;
		this.gameId = gameId;
	}
}

type OnDataHandlerArgs = {
	connectionId: string;
	message: BufferSerializer;
	log?: Logger;
};

export interface ServiceResponse {
	connectionId: string;
	messages: SerializedBufferOld[];
}

export type OnDataHandler = (
	args: OnDataHandlerArgs,
) => Promise<ServiceResponse>;
/**
 * @param {OnDataHandlerArgs} args The arguments for the handler.
 * @returns {ServiceResponse} The
 *                                                                     response
 *                                                                  to the
 *                                                            data.
 */

/**
 * @param {State} state The state to save.
 * @returns {void}
 */

/**
 * The state of the gateway server.
 *
 * This is the state of the gateway server. It is responsible for keeping track
 * of the state of the server, including connections, encryption, and sessions.
 * @global
 * @interface
 */
export interface State {
	filePaths: Record<string, string>;
	// sockets: Record<string, WrappedSocket>;
	encryptions: Record<string, McosEncryption>;
	sessions: Record<string, McosSession>;
	// queuedConnections: Record<string, WrappedSocket>;
	save: (state?: State) => void;
}

/**
 * Create the initial state.
 *
 * This function creates the initial state for the gateway server.
 * You should call save on the returned state to save it to the database.
 *
 * @param {object} args
 * @param {StateSaveFunction} [args.saveFunction=saveStateToDatabase] The
 *                                                                       save
 *                                                                    function
 *                                                                 to use.
 *                                                                Defaults
 *                                                            to
 *                                                        saveStateToDatabase.
 * @returns The initial state.
 */
export function createInitialState({
	saveFunction = saveStateToDatabase,
}: {
	saveFunction?: (state: State) => void;
}): State {
	return {
		filePaths: {},
		// sockets: {},
		encryptions: {},
		sessions: {},
		// queuedConnections: {},
		save: function (state?: State) {
			if (typeof state === "undefined") {
				state = this as State;
			}
			if (typeof saveFunction === "undefined") {
				saveStateToDatabase(state);
				return;
			}
			saveFunction(state);
		},
	};
}

/**
 * Add an encryption to the state.
 *
 * This function adds an encryption to the state.
 * The returned state is a new state object, and the original state is not
 * modified. You should then call the save function on the new state to update
 * the database.
 *
 * @param {State} state The state to add the encryption to.
 * @param {McosEncryption} encryption The encryption to add to the state.
 * @returns {State} - The state with the encryption added.
 */
export function addEncryption(state: State, encryption: McosEncryption): State {
	const encryptions = state.encryptions;
	encryptions[encryption.connectionId] = encryption;
	return {
		...state,
		encryptions,
	};
}

/**
 * Get an encryption from the state.
 *
 * This function gets an encryption from the state.
 *
 * @param {State} state The state to get the encryption from.
 * @param {string} connectionId The connection id of the encryption to get.
 * @returns {McosEncryption | undefined} The encryption with the given connection id, or undefined if no encryption
 */
export function getEncryption(
	state: State,
	connectionId: string,
): McosEncryption | undefined {
	return state.encryptions[connectionId];
}

/**
 * Update an encryption in the state.
 *
 * This function updates an encryption in the state.
 * The returned state is a new state object, and the original state is not
 * modified. You should then call the save function on the new state to update
 * the database.
 *
 * @param {State} state The state to update the encryption in.
 * @param {McosEncryption} encryption The encryption to update in the state.
 * @returns {State} The state with the encryption updated.
 */
export function updateEncryption(
	state: State,
	encryption: McosEncryption,
): State {
	const encryptions = state.encryptions;
	encryptions[encryption.connectionId] = encryption;
	return {
		...state,
		encryptions,
	};
}

/**
 * Remove an encryption from the state.
 *
 * This function removes an encryption from the state.
 * The returned state is a new state object, and the original state is not
 * modified. You should then call the save function on the new state to update
 * the database.
 *
 * @param state {State} The state to remove the encryption from.
 * @param {string} connectionId The connection id of the encryption to remove.
 * @returns {State} The state with the encryption removed.
 */
export function removeEncryption(state: State, connectionId: string): State {
	const encryptions = state.encryptions;
	delete encryptions[connectionId];
	return {
		...state,
		encryptions,
	};
}

/**
 * Add a session to the state.
 *
 * This function adds a session to the state.
 * The returned state is a new state object, and the original state is not
 * modified. You should then call the save function on the new state to update
 * the database.
 *
 * @param {State} state The state to add the session to.
 * @param {McosSession} session The session to add to the state.
 * @returns {State} The state with the session added.
 */
export function addSession(state: State, session: McosSession): State {
	const sessions = state.sessions;
	sessions[session.connectionId] = session;
	return {
		...state,
		sessions,
	};
}

/**
 * Remove a session from the state.
 *
 * This function removes a session from the state. It also removes the socket
 * and encryption for the session.
 * The returned state is a new state object, and the original state is not
 * modified. You should then call the save function on the new state to update
 * the database.
 *
 * @param {State} state The state to remove the session from.
 * @param {string} connectionId The connection id of the session to remove.
 * @returns {State} The state with the session removed.
 */
export function removeSession(state: State, connectionId: string): State {
	const sessions = state.sessions;
	delete sessions[connectionId];
	return {
		...state,
		sessions,
	};
}

export function findSessionByConnectionId(
	state: State,
	connectionId: string,
): McosSession | undefined {
	return state.sessions[connectionId];
}

/**
 * Fetch the state from the database.
 *
 * This function fetches the state from the database.
 *
 * @returns {State} The state from the database.
 */
export function fetchStateFromDatabase(): State {
	return globalStateDatabase;
}

/**
 * Save the state to the database.
 *
 * This function saves the state to the database.
 *
 * @param {State} state The state to save to the database.
 */
function saveStateToDatabase(state: State) {
	globalStateDatabase = state;
}

let globalStateDatabase = createInitialState({});
