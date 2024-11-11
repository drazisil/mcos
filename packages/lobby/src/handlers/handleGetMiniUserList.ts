import { getServerConfiguration,  } from "rusty-motors-shared";
import { GameMessage } from "rusty-motors-shared";
import { LegacyMessage } from "rusty-motors-shared";
import { serializeString } from "rusty-motors-shared";
import { UserInfo } from "../UserInfoMessage.js";
import { channelRecordSize, channels } from "./channels.js";
import pino, { Logger } from "pino";
const defaultLogger = pino({ name: "Lobby.handleSendMiniUserList" });


const user1 = new UserInfo();
user1._userId = 1;
user1._userName = "User 1";
/**
 * @param {object} args
 * @param {string} args.connectionId
 * @param {LegacyMessage} args.message
 * @param {import("pino").Logger} [args.log=getServerLogger({ name: "Lobby" })]
 */

export async function handleGetMiniUserList({
	connectionId,
	message,
	log = defaultLogger,
}: {
	connectionId: string;
	message: LegacyMessage;
	log?: Logger;
}) {
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

		log.debug(`Sending response: ${packetResult.serialize().toString("hex")}`);

		return {
			connectionId,
			message: packetResult,
		};
	} catch (error) {
		const err = Error(`Error handling NPS_MINI_USER_LIST: ${String(error)}`);
		err.cause = error;
		throw err;
	}
}
