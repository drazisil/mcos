import { getServerLogger } from "../../../shared/log.js";
import { getPersonasByPersonaId } from "../../../persona/src/getPersonasByPersonaId.js";
import { getDatabaseServer } from "../../../database/src/DatabaseManager.js";
import { LoginInfoMessage } from "../LoginInfoMessage.js";

import { ServerError } from "../../../shared/errors/ServerError.js";
import { UserInfoMessage } from "../UserInfoMessage.js";
import {
    createCommandEncryptionPair,
    createDataEncryptionPair,
} from "../../../gateway/src/encryption.js";
import {
    McosEncryption,
    addEncryption,
    fetchStateFromDatabase,
    getEncryption,
} from "../../../shared/State.js";
import { SerializedBuffer } from "../../../shared/messageFactory.js";

/**
 * Convert to zero padded hex
 *
 * @export
 * @param {Buffer} data
 * @return {string}
 */
export function toHex(data: Buffer): string {
    /** @type {string[]} */
    const bytes: string[] = [];
    data.forEach((b: number) => {
        bytes.push(b.toString(16).toUpperCase().padStart(2, "0"));
    });
    return bytes.join("");
}

/**
 * Handle a request to connect to a game server packet
 *
 * @private
 * @param {import("../../../interfaces/index.js").ServiceArgs} args
 * @returns {Promise<{
 *  connectionId: string,
 * messages: SerializedBuffer[],
 * }>}
 */
export async function _npsRequestGameConnectServer({
    connectionId,
    message,
    log = getServerLogger({
        module: "LoginServer",
    }),
}: import("../../../interfaces/index.js").ServiceArgs): Promise<{
    connectionId: string;
    messages: SerializedBuffer[];
}> {
    // This is a NPS_LoginInfo packet
    // As a legacy packet, it used the old NPSMessage format
    // of a 4 byte header, followed by a 4 byte length, followed
    // by the data payload.

    const inboundMessage = new LoginInfoMessage();
    inboundMessage.deserialize(message.data);

    log.debug(`LoginInfoMessage: ${inboundMessage.toString()}`);

    const personas = await getPersonasByPersonaId({
        id: inboundMessage._userId,
    });
    if (typeof personas[0] === "undefined") {
        const err = new Error("No personas found.");
        throw err;
    }

    const { customerId } = personas[0];

    const state = fetchStateFromDatabase();

    const existingEncryption = getEncryption(state, connectionId);

    if (!existingEncryption) {
        // Set the encryption keys on the lobby connection
        const databaseManager = getDatabaseServer({ log });
        const keys = await databaseManager
            .fetchSessionKeyByCustomerId(customerId)
            .catch((/** @type {unknown} */ error: unknown) => {
                throw new Error(
                    `Unable to fetch session key for customerId ${customerId.toString()}: ${String(
                        error,
                    )}`,
                );
            });
        if (keys === undefined) {
            throw new ServerError("Error fetching session keys!");
        }

        // We have the session keys, set them on the connection
        try {
            const newCommandEncryptionPair = createCommandEncryptionPair(
                keys.sessionKey,
            );

            const newDataEncryptionPair = createDataEncryptionPair(
                keys.sessionKey,
            );

            const newEncryption = new McosEncryption({
                connectionId,
                commandEncryptionPair: newCommandEncryptionPair,
                dataEncryptionPair: newDataEncryptionPair,
            });

            addEncryption(state, newEncryption).save();
        } catch (error) {
            throw new ServerError(`Error creating encryption: ${error}`);
        }
    }

    // We have a session, we are good to go!
    // Send the response packet

    const responsePacket = new UserInfoMessage();
    responsePacket.fromLoginInfoMessage(inboundMessage);

    responsePacket._header.id = 0x120;

    // log the packet
    log.debug(
        `!!! outbound lobby login response packet: ${responsePacket.toString()}`,
    );

    const outboundMessage = new SerializedBuffer();
    outboundMessage._doDeserialize(responsePacket.serialize());

    return {
        connectionId,
        messages: [outboundMessage],
    };
}
