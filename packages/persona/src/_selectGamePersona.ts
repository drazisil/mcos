import { SerializedBufferOld } from "rusty-motors-shared";
import { LegacyMessage } from "rusty-motors-shared";
import { logger, type Logger } from "rusty-motors-utilities";
const defaultLogger = logger.child({
	name: "PersonaServer.receivePersonaData",
});

/**
 * Selects a game persona and marks it as in use
 * @param {object} args
 * @param {string} args.connectionId
 * @param {LegacyMessage} args.message
 * @param {import("pino").Logger} [args.log=getServerLogger({ name: "LoginServer" })]
 * @returns {Promise<{
 *  connectionId: string,
 * messages: SerializedBufferOld[],
 * }>}
 */

export async function _selectGamePersona({
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
	log.debug("_npsSelectGamePersona...");
	const requestPacket = message;
	log.debug(
		`LegacyMsg request object from _npsSelectGamePersona ${requestPacket
			._doSerialize()
			.toString("hex")}`,
	);

	// Create the packet content
	const packetContent = Buffer.alloc(251);

	// Build the packet
	// Response Code
	// 207 = success
	const responsePacket = new LegacyMessage();
	responsePacket._header.id = 519;
	responsePacket.setBuffer(packetContent);
	log.debug(
		`LegacyMsg response object from _npsSelectGamePersona ${responsePacket
			._doSerialize()
			.toString("hex")} `,
	);

	const outboundMessage = new SerializedBufferOld();
	outboundMessage.setBuffer(responsePacket._doSerialize());

	return {
		connectionId,
		messages: [outboundMessage],
	};
}
