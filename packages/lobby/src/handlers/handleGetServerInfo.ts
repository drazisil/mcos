import { BytableMessage } from "@rustymotors/binary";
import {
	getServerLogger,
	ServerLogger,
} from "rusty-motors-shared";

export async function handleGetServerInfo({
	connectionId,
	message,
	log = getServerLogger("lobby.handleGetServerInfo"),
}: {
	connectionId: string;
	message: BytableMessage;
	log?: ServerLogger;
}): Promise<{
	connectionId: string;
	message: BytableMessage;
}> {
	try {
		log.debug(`[${connectionId}] Handling NPS_GET_SERVER_INFO`);
		log.debug(
			`[${connectionId}] Received command: ${message.serialize().toString("hex")}`,
		);

		// l
		const incommingRequest = new BytableMessage();
		incommingRequest.setSerializeOrder([{ name: "riffId", field: "Dword" }]);
		incommingRequest.deserialize(message.serialize());

		log.debug(
			`[${connectionId}] Received riffId: ${incommingRequest.getFieldValueByName("riffId")}`,
		);

		// TODO: Actually have servers

		// plplll
		const outgoingGameMessage = new BytableMessage();
		outgoingGameMessage.setSerializeOrder([
			{ name: "riffName", field: "String" },
			{ name: "commId", field: "Dword" },
			{ name: "ipAddress", field: "String" },
			{ name: "port", field: "Dword" },
			{ name: "userId", field: "Dword" },
			{ name: "playerCount", field: "Dword" },
		]);

		outgoingGameMessage.header.setMessageId(525);
        outgoingGameMessage.setVersion(0);
		outgoingGameMessage.setFieldValueByName("riffName", "MARK");
		outgoingGameMessage.setFieldValueByName("commId", 17);
		outgoingGameMessage.setFieldValueByName(
			"ipAddress",
			"71.186.155.248",
		);
		outgoingGameMessage.setFieldValueByName(
			"port",
			9006
		);
		outgoingGameMessage.setFieldValueByName("userId", 21);
		outgoingGameMessage.setFieldValueByName("playerCount", 1);

		log.debug(
			`[${connectionId}] Sending response[string]: ${outgoingGameMessage.toString()}`,
		);
		log.debug(
			`[${connectionId}] Sending response[serialize]: ${outgoingGameMessage.serialize().toString("hex")}`,
		);

		// Build the packet
		const packetResult = new BytableMessage();
		packetResult.setSerializeOrder([
			{ name: "data", field: "Buffer" },
		]);
		packetResult.deserialize(outgoingGameMessage.serialize());

		return {
			connectionId,
			message: packetResult,
		};
	} catch (error) {
		const err = Error(
			`[${connectionId}] Error handling NPS_GET_SERVER_INFO: ${String(error)}`,
		);
		err.cause = error;
		throw err;
	}
}
