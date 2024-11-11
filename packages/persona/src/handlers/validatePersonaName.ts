import { SerializedBufferOld } from "rusty-motors-shared";
import { LegacyMessage } from "rusty-motors-shared";
import { RawMessage } from "rusty-motors-shared";
import pino, { Logger } from "pino";
const defaultLogger = pino({ name: "PersonaServer.receivePersonaData" });


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
	log?: Logger;
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
	outboundMessage._doDeserialize(responsePacket.serialize());

	return {
		connectionId,
		messages: [outboundMessage],
	};
}
