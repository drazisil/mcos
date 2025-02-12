// mcos is a game server, written from scratch, for an old game
// Copyright (C) <2017>  <Drazi Crendraven>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import { SerializedBufferOld, ServerLogger } from "rusty-motors-shared";
import { handleEncryptedNPSCommand } from "./handlers/encryptedCommand.js";
import { handleTrackingPing } from "./handlers/handleTrackingPing.js";
import { _npsRequestGameConnectServer } from "./handlers/requestConnectGameServer.js";
import { getServerLogger } from "rusty-motors-shared";
import { BytableMessage } from "@rustymotors/binary";

/**
 * Array of supported message handlers
 *
 * @type {{
 *  opCode: number,
 * name: string,
 * handler: (args: {
 * connectionId: string,
 * message: BytableMessage,
 * log: ServerLogger,
 * }) => Promise<{
 * connectionId: string,
 * messages: SerializedBufferOld[],
 * }>}[]}
 */
export const messageHandlers: {
	opCode: number;
	name: string;
	handler: (args: {
		connectionId: string;
		message: BytableMessage;
		log?: ServerLogger;
	}) => Promise<{
		connectionId: string;
		messages: SerializedBufferOld[];
	}>;
}[] = [
	{
		opCode: 256, // 0x100
		name: "User login",
		handler: _npsRequestGameConnectServer,
	},
	{
		opCode: 4353, // 0x1101
		name: "Encrypted command",
		handler: handleEncryptedNPSCommand,
	},
	{
		opCode: 535, // 0x0217
		name: "Tracking ping",
		handler: handleTrackingPing,
	},
];

/**
 * @param {object} args
 * @param {string} args.connectionId
 * @param {SerializedBufferOld} args.message
 * @param {ServerLogger} [args.log=getServerLogger({ name: "PersonaServer" })]
 * @returns {Promise<{
 *  connectionId: string,
 * messages: SerializedBufferOld[],
 * }>}
 * @throws {Error} Unknown code was received
 */
export async function receiveLobbyData({
	connectionId,
	message,
	log = getServerLogger( "lobby.receiveLobbyData" ),
}: {
	connectionId: string;
	message: BytableMessage;
	log?: ServerLogger;
}): Promise<{
	connectionId: string;
	messages: SerializedBufferOld[];
}> {
	const data = message.serialize();
	log.debug(
		`Received Lobby packet',
    ${JSON.stringify({
			data: data.toString("hex"),
		})}`,
	);

	const supportedHandler = messageHandlers.find((h) => {
		return h.opCode === message.header.messageId;
	});

	if (typeof supportedHandler === "undefined") {
		// We do not yet support this message code
		throw Error(`UNSUPPORTED_MESSAGECODE: ${message.header.messageId}`);
	}

	try {
		const result = await supportedHandler.handler({
			connectionId,
			message
		});
		log.debug(`Returning with ${result.messages.length} messages`);
		log.debug("Leaving receiveLobbyData");
		return result;
	} catch (error) {
		const err = Error(`Error handling lobby data: ${String(error)}`);
		err.cause = error;
		throw err;
	}
}
