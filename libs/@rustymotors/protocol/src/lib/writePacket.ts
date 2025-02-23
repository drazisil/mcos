import { getServerLogger, ServerLogger } from "rusty-motors-shared";
import { getMCOProtocolInstance } from "./MCOProtocol.js";

export function writePacket({
	connectionId, data, log = getServerLogger("MCOProtocol/writePacket"),
}: {
	connectionId: string;
	data: Buffer;
	log?: ServerLogger;
}) {
	log.debug({ connectionId }, `Writing packet: ${data.toString("hex")}`);
	try {
		const connection = getMCOProtocolInstance().getConnection(connectionId);
		if (connection) {
			connection.socket.write(data);
			connection.socket.write(data);
		} else {
			log.error({ connectionId }, "Connection not found");
		}
	} catch (error) {
		log.error({ connectionId }, `Error writing packet: ${error}`);
	}
}
