import { LegacyMessage } from "rusty-motors-shared";
import { UserInfo } from "../UserInfoMessage.js";
import { databaseManager } from "rusty-motors-database";
import { ServerLogger, getServerLogger } from "rusty-motors-shared";
import { UserData } from "../UserInfoMessage.js";
import { BytableMessage } from "@rustymotors/binary";


export async function _setMyUserData({
	connectionId,
	message,
	log = getServerLogger("lobby._setMyUserData"),
}: {
	connectionId: string;
	message: BytableMessage;
	log?: ServerLogger;
}) {
	try {
		log.debug(`[$connectionId] Handling NPS_SET_MY_USER_DATA`);
		log.debug(`[$connectionId] Received command: ${message.serialize().toString("hex")}`);

		const incomingMessage = new UserInfo();
		incomingMessage.deserialize(message.serialize());

		log.debug(`User ID: ${incomingMessage._userId}`);

		// Update the user's data
		databaseManager.updateUser({
			userId: incomingMessage._userId,
			userData: incomingMessage._userData,
		});

		const userData = new UserData();
		userData.deserialize(incomingMessage._userData);

		log.debug(`User data: ${userData.toString()}`);

		const currentChannel = userData.getFieldValueByName("lobbyId") as number;

		// Build the packet
		const packetResult = new LegacyMessage();
		// packetResult._header.id = 516;
		packetResult._header.id = 0x214;

		const channelBuffer = Buffer.alloc(4);
		channelBuffer.writeInt32BE(currentChannel);

		const response = Buffer.concat([channelBuffer, Buffer.from([0, 0, 0, 0])]);

		packetResult.setBuffer(response);

		// packetResult.deserialize(incomingMessage.serialize());

		message.header.setMessageId(516)

		return {
			connectionId,
			message,
		};
	} catch (error) {
		const err = Error(`[$connectionId] Error handling NPS_SET_MY_USER_DATA: ${String(error)}`);
		err.cause = error;
		throw err;
	}
}
