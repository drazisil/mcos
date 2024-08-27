import { getServerConfiguration } from "../../../shared/Configuration.js";
import { ServerError } from "rusty-motors-shared";
import { getServerLogger } from "rusty-motors-shared";
import { GameMessage } from "../../../shared/GameMessage.js";
import { LegacyMessage } from "../../../shared/LegacyMessage.js";
import { serializeString } from "../../../shared/serializeString.js";
import { UserInfo } from "../UserInfoMessage.js";
import { channelRecordSize, channels } from "./encryptedCommand.js";

const user1 = new UserInfo();
user1._userId = 1;
user1._userName = "User 1";
/**
 * @param {object} args
 * @param {string} args.connectionId
 * @param {LegacyMessage} args.message
 * @param {import("pino").Logger} [args.log=getServerLogger({ module: "Lobby" })]
 */

export async function handleGetMiniUserList({
    connectionId,
    message,
    log = getServerLogger({
        module: "Lobby",
    }),
}: {
    connectionId: string;
    message: LegacyMessage;
    log?: import("pino").Logger;
}) {
    log.level = getServerConfiguration({}).logLevel ?? "info";

    log.debug("Handling NPS_GET_MINI_USER_LIST");
    log.debug(`Received command: ${message._doSerialize().toString("hex")}`);

    const outgoingGameMessage = new GameMessage(553);

    const resultSize = channelRecordSize * channels.length - 12;

    const packetContent = Buffer.alloc(resultSize);

    let offset = 0;
    try {
        // Add the response code
        packetContent.writeUInt32BE(17, offset);
        offset += 4; // offset is 8

        packetContent.writeUInt32BE(1, offset);
        offset += 4; // offset is 12

        // Write the count of users
        packetContent.writeUInt32BE(1, offset);
        offset += 4; // offset is 16

        // write the persona id
        packetContent.writeUInt32BE(user1._userId, offset);
        offset += 4; // offset is 20

        // write the persona name
        serializeString(user1._userName, packetContent, offset);

        outgoingGameMessage.setRecordData(packetContent);

        // Build the packet
        const packetResult = new LegacyMessage();
        packetResult._doDeserialize(outgoingGameMessage.serialize());

        log.debug(
            `Sending response: ${packetResult.serialize().toString("hex")}`,
        );

        return {
            connectionId,
            message: packetResult,
        };
    } catch (error) {
        throw ServerError.fromUnknown(
            error,
            "Error handling NPS_MINI_USER_LIST",
        );
    }
}
