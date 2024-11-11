import { SerializedBufferOld } from "rusty-motors-shared";
import { LegacyMessage } from "rusty-motors-shared";
import pino, { Logger } from "pino";
const defaultLogger = pino({ name: "PersonaServer.receivePersonaData" });


/**
 * Handle game logout
 * @param {object} args
 * @param {string} args.connectionId
 * @param {LegacyMessage} args.message
 * @param {import("pino").Logger} [args.log=getServerLogger({ name: "LoginServer" })]
 * @returns {Promise<{
 *  connectionId: string,
 * messages: SerializedBufferOld[],
 * }>}
 */

export async function _gameLogout({
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
	log.debug(`[${connectionId}] _gameLogout`);
	const requestPacket = message;
	log.debug(`[${connectionId}] _npsLogoutGameUser request: ${requestPacket.toHexString()}`);

	// Build the packet
	const responsePacket = new LegacyMessage();
	responsePacket._header.id = 519;
	log.debug(`[${connectionId}] _npsLogoutGameUser response: ${responsePacket.toHexString()}`);

	const outboundMessage = new SerializedBufferOld();
	outboundMessage._doDeserialize(responsePacket._doSerialize());

	return {
		connectionId,
		messages: [outboundMessage],
	};
}
