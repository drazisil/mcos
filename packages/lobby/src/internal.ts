// mcos is a game server, written from scratch, for an old game
// Copyright (C) <2017>  <Drazi Crendraven>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import { _npsRequestGameConnectServer } from "./handlers/requestConnectGameServer.js";
import { handleEncryptedNPSCommand } from "./handlers/encryptedCommand.js";
import { getServerLogger } from "../../shared/log.js";
import { ServerError } from "../../shared/errors/ServerError.js";
import { getServerConfiguration } from "../../shared/Configuration.js";
import {
    LegacyMessage,
    NPSMessage,
    // eslint-disable-next-line no-unused-vars
    SerializedBuffer,
} from "../../shared/messageFactory.js";

/**
 * Array of supported message handlers
 *
 * @type {{
 *  opCode: number,
 * name: string,
 * handler: (args: {
 * connectionId: string,
 * message: SerializedBuffer,
 * log: import("pino").Logger,
 * }) => Promise<{
 * connectionId: string,
 * messages: SerializedBuffer[],
 * }>}[]}
 */
export const messageHandlers: {
    opCode: number;
    name: string;
    handler: (args: {
        connectionId: string;
        message: SerializedBuffer;
        log: import("pino").Logger;
    }) => Promise<{
        connectionId: string;
        messages: SerializedBuffer[];
    }>;
}[] = [
    {
        opCode: 256, // 0x100
        name: "User login",
        handler: _npsRequestGameConnectServer,
    },
    {
        opCode: 4353, // 0x1101
        name: "Encrypted command",
        handler: handleEncryptedNPSCommand,
    },
];

/**
 * @param {object} args
 * @param {string} args.connectionId
 * @param {SerializedBuffer} args.message
 * @param {import("pino").Logger} [args.log=getServerLogger({ module: "PersonaServer" })]
 * @returns {Promise<{
 *  connectionId: string,
 * messages: SerializedBuffer[],
 * }>}
 * @throws {Error} Unknown code was received
 */
export async function receiveLobbyData({
    connectionId,
    message,
    log = getServerLogger({
        module: "Lobby",
    }),
}: {
    connectionId: string;
    message: SerializedBuffer;
    log?: import("pino").Logger;
}): Promise<{
    connectionId: string;
    messages: SerializedBuffer[];
}> {
    log.level = getServerConfiguration({}).logLevel ?? "info";

    /** @type {LegacyMessage | NPSMessage} */
    let inboundMessage: LegacyMessage | NPSMessage;

    // Check data length
    const dataLength = message.data.length;

    if (dataLength < 4) {
        throw new ServerError(
            `Data length ${dataLength} is too short to deserialize`,
        );
    }

    if (dataLength > 12) {
        inboundMessage = new NPSMessage();
    } else {
        inboundMessage = new LegacyMessage();
    }

    inboundMessage._doDeserialize(message.data);

    const { data } = message;
    log.debug(
        `Received Lobby packet',
    ${JSON.stringify({
        data: data.toString("hex"),
    })}`,
    );

    const supportedHandler = messageHandlers.find((h) => {
        return h.opCode === inboundMessage._header.id;
    });

    if (typeof supportedHandler === "undefined") {
        // We do not yet support this message code
        throw new ServerError(
            `UNSUPPORTED_MESSAGECODE: ${inboundMessage._header.id}`,
        );
    }

    try {
        const result = await supportedHandler.handler({
            connectionId,
            message,
            log,
        });
        log.debug(`Returning with ${result.messages.length} messages`);
        log.debug("Leaving receiveLobbyData");
        return result;
    } catch (error) {
        throw new ServerError(`Error handling lobby data: ${String(error)}`);
    }
}
