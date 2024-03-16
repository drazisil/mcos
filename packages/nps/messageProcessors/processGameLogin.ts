import { GameMessage } from "../messageStructs/GameMessage.js";
import { SocketCallback } from "./index.js";
import { getDWord, getLenString, getNBytes } from "../utils/pureGet.js";
import {
    findActiveUserSessionByCustomerId,
    setUserSession,
} from "../services/session.js";

import { getServerLogger } from "@rustymotors/shared";

const log = getServerLogger();

export async function processGameLogin(
    connectionId: string,
    message: GameMessage,
    socketCallback: SocketCallback,
): Promise<void> {
    const customerId = getDWord(message.getDataAsBuffer(), 0, false);

    const personaId = getDWord(message.getDataAsBuffer(), 4, false);

    const shardId = getDWord(message.getDataAsBuffer(), 8, false);

    // Log the values
    log.info(`Customer ID: ${customerId}`);
    log.info(`Persona ID: ${personaId}`);
    log.info(`Shard ID: ${shardId}`);

    // This message is only called by debug, so let's sey the clinet version to debug
    const session = await findActiveUserSessionByCustomerId(customerId);

    if (typeof session === "undefined") {
        log.error(`Session not found for customer ID ${customerId}`);
        throw new Error(`Session not found for customer ID ${customerId}`);
    }

    log.info(`Setting client version to debug for ${session.customerId}`);

    session.clientVersion = "debug";

    log.info(`Setting persona ID to ${personaId} for ${session.customerId}`);

    session.activeProfileId = personaId;

    setUserSession(session);

    log.info(`GameLogin: ${message.toString()}`);

    const response = new GameMessage(0);
    response.header.setId(0x207);

    const responseBytes = response.serialize();

    socketCallback([responseBytes]);
}
