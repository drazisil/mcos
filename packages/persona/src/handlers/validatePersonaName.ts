import { SerializedBufferOld, ServerLogger } from "rusty-motors-shared";
import { LegacyMessage } from "rusty-motors-shared";
import { RawMessage } from "rusty-motors-shared";
import { getServerLogger } from "rusty-motors-shared";

const defaultLogger = getServerLogger("PersonaServer");

/**
 * Check if a new persona name is valid
 */

export async function validatePersonaName({
	connectionId,
	message,
	log = defaultLogger,
}: {
	connectionId: string;
	message: LegacyMessage;
	log?: ServerLogger;
}): Promise<{
	connectionId: string;
	messages: SerializedBufferOld[];
}> {
	log.debug("validatePersonaName called");
	const requestPacket = message;
	log.debug(
		`NPSMsg request object from validatePersonaName ${requestPacket.toString()}`,
	);

	enum responseCodes {
		NPS_DUP_USER = 0x20a,
		NPS_USER_VALID = 0x601,
	}

	// Build the packet
	const responsePacket = new RawMessage(responseCodes.NPS_DUP_USER);
	log.debug(
		`NPSMsg response object from validatePersonaName
      ${JSON.stringify({
				NPSMsg: responsePacket.toString(),
			})}`,
	);

	const outboundMessage = new SerializedBufferOld();
	outboundMessage.deserialize(responsePacket.serialize());

	return {
		connectionId,
		messages: [outboundMessage],
	};
}
