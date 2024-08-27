import {
    createCommandEncryptionPair,
    createDataEncryptionPair,
} from "../../gateway/src/encryption.js";
import {
    McosEncryption,
    McosSession,
    addEncryption,
    addSession,
    fetchStateFromDatabase,
    getEncryption,
} from "../../shared/State.js";
import { OldServerMessage } from "../../shared/OldServerMessage.js";
import { GenericReply } from "./GenericReplyMessage.js";
import { TClientConnectMessage } from "./TClientConnectMessage.js";
import { MessageHandlerArgs, MessageHandlerResult } from "./handlers.js";
import { fetchSessionKeyByCustomerId } from "../../database/index.js";

/**
 * @param {MessageHandlerArgs} args
 * @return {Promise<MessageHandlerResult>}
 */
export async function clientConnect({
    connectionId,
    packet,
    log,
}: MessageHandlerArgs): Promise<MessageHandlerResult> {
    /**
     * Let's turn it into a ClientConnectMsg
     */
    const newMessage = new TClientConnectMessage();

    newMessage.deserialize(packet.serialize());

    log.debug(`ClientConnectMsg: ${newMessage.toString()}`);

    const customerId = newMessage._customerId;
    if (typeof customerId !== "number") {
        throw new TypeError(
            `customerId is wrong type. Expected 'number', got ${typeof customerId}`,
        );
    }

    const state = fetchStateFromDatabase();

    const existingEncryption = getEncryption(state, connectionId);

    if (existingEncryption) {
        log.debug("Encryption already exists for this connection");
        return { connectionId, messages: [] };
    }

    let result;

    log.debug(`Looking up the session key for ${customerId}...`);

    result = await fetchSessionKeyByCustomerId(customerId);
    log.debug(`Session key found for ${customerId}`);

    const newCommandEncryptionPair = createCommandEncryptionPair(
        result.sessionKey,
    );

    const newDataEncryptionPair = createDataEncryptionPair(result.sessionKey);

    const newEncryption = new McosEncryption({
        connectionId,
        commandEncryptionPair: newCommandEncryptionPair,
        dataEncryptionPair: newDataEncryptionPair,
    });

    const updatedState = addEncryption(state, newEncryption);

    const session = new McosSession({
        connectionId,
        gameId: newMessage._personaId,
    });

    addSession(updatedState, session).save();

    const personaId = newMessage._personaId;

    const personaName = newMessage._personaName;

    log.debug(`cust: ${customerId} ID: ${personaId} Name: ${personaName}`);

    // Create new response packet
    const pReply = new GenericReply();
    pReply.msgNo = 101;
    pReply.msgReply = newMessage._msgNo;

    const responsePacket = new OldServerMessage();
    responsePacket.setBuffer(pReply.serialize());
    responsePacket._header.sequence = packet._header.sequence;

    log.debug(`Response: ${responsePacket.serialize().toString("hex")}`);

    return { connectionId, messages: [responsePacket] };
}
