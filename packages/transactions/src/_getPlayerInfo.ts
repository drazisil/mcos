import { ServerError } from "../../shared/src/ServerError.js";
import { OldServerMessage } from "../../shared/OldServerMessage.js";
import { GenericRequestMessage } from "./GenericRequestMessage.js";
import { PlayerInfoMessage } from "./PlayerInfoMessage.js";
import { MessageHandlerArgs, MessageHandlerResult } from "./handlers.js";

export async function _getPlayerInfo(
    args: MessageHandlerArgs,
): Promise<MessageHandlerResult> {
    const getPlayerInfoMessage = new GenericRequestMessage();
    getPlayerInfoMessage.deserialize(args.packet.data);

    args.log.debug(`Received Message: ${getPlayerInfoMessage.toString()}`);

    const playerId = getPlayerInfoMessage.data.readUInt32LE(0);
    try {
        const playerInfoMessage = new PlayerInfoMessage();
        playerInfoMessage._msgNo = 108;
        playerInfoMessage._playerId = playerId;
        playerInfoMessage._playerName = "Drazi Crendraven";
        playerInfoMessage._currentLevel = 1;

        const responsePacket = new OldServerMessage();
        responsePacket._header.sequence = args.packet._header.sequence;
        responsePacket._header.flags = 8;

        responsePacket.setBuffer(playerInfoMessage.serialize());

        return { connectionId: args.connectionId, messages: [responsePacket] };
    } catch (error) {
        throw ServerError.fromUnknown(error, "Error in _getPlayerInfo");
    }
}
