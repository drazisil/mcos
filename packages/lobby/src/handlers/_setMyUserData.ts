import { LegacyMessage } from "rusty-motors-shared";
import { UserInfo } from "../UserInfoMessage.js";
import { DatabaseManager } from "rusty-motors-database";
import { ServerLogger, getServerLogger } from "rusty-motors-shared";


export async function _setMyUserData({
	connectionId,
	message,
	log = getServerLogger("handlers/_setMyUserData"),
}: {
	connectionId: string;
	message: LegacyMessage;
	log?: ServerLogger;
}) {
	try {
		log.debug("Handling NPS_SET_MY_USER_DATA");
		log.debug(`Received command: ${message.serialize().toString("hex")}`);

		const incomingMessage = new UserInfo();
		incomingMessage.deserialize(message.serialize());

		log.debug(`User ID: ${incomingMessage._userId}`);

		// Update the user's data
		DatabaseManager.updateUser({
			userId: incomingMessage._userId,
			userData: incomingMessage._userData,
		});

		// Build the packet
		const packetResult = new LegacyMessage();
		packetResult._header.id = 516;
		packetResult.deserialize(incomingMessage.serialize());

		log.debug(`Sending response: ${packetResult.serialize().toString("hex")}`);

		return {
			connectionId,
			message: null,
		};
	} catch (error) {
		const err = Error(`Error handling NPS_SET_MY_USER_DATA: ${String(error)}`);
		err.cause = error;
		throw err;
	}
}
