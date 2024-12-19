import {
	cloth_white,
	cloth_yellow,
	hair_red,
	OldServerMessage,
	skin_pale,
} from "rusty-motors-shared";
import { GenericRequestMessage } from "./GenericRequestMessage.js";
import { PlayerPhysicalMessage } from "./PlayerPhysicalMessage.js";
import type { MessageHandlerArgs, MessageHandlerResult } from "./handlers.js";
import { logger } from "rusty-motors-logger";
const defaultLogger = logger.child({
	name: "transactionServer._getPlayerPhysical",
});

export async function _getPlayerPhysical({
	connectionId,
	packet,
	log = defaultLogger,
}: MessageHandlerArgs): Promise<MessageHandlerResult> {
	const getPlayerPhysicalMessage = new GenericRequestMessage();
	getPlayerPhysicalMessage.deserialize(packet.data);

	log.debug(
		`[${connectionId}] Received GenericRequestMessage: ${getPlayerPhysicalMessage.toString()}`,
	);

	const playerId = getPlayerPhysicalMessage.data.readUInt32LE(0);

	const playerPhysicalMessage = new PlayerPhysicalMessage();
	playerPhysicalMessage._msgNo = 265;
	playerPhysicalMessage._playerId = playerId;
	playerPhysicalMessage._bodytype = 5;
	playerPhysicalMessage._hairColor = hair_red;
	playerPhysicalMessage._skinColor = skin_pale;
	playerPhysicalMessage._shirtColor = cloth_white;
	playerPhysicalMessage._pantsColor = cloth_yellow;

	log.debug(
		`[${connectionId}] Sending PlayerPhysicalMessage: ${playerPhysicalMessage.toString()}`,
	);

	const responsePacket = new OldServerMessage();
	responsePacket._header.sequence = packet._header.sequence;
	responsePacket._header.flags = 8;

	responsePacket.setBuffer(playerPhysicalMessage.serialize());

	log.debug(`[${connectionId}] Sending response: ${responsePacket.toString()}`);

	return { connectionId, messages: [responsePacket] };
}
