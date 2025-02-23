import { BytableMessage } from "@rustymotors/binary";
import { getServerLogger, ServerLogger } from "rusty-motors-shared";


export async function defaultMessageHandler({
	connectionId, message, log = getServerLogger("MCOProtocol/defaultMessageHandler"),
}: {
	connectionId: string;
	message: BytableMessage;
	log?: ServerLogger;
}): Promise<{
	connectionId: string;
	message: BytableMessage | null;
}> {
	const messageId = message.header.messageId;
	log.debug(
		{ connectionId, messageId: messageId.toString(16) },
		"Not yet implemented"
	);
	return { connectionId, message: null };
}
