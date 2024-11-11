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
import {
	SerializedBufferOld,
	type ServiceResponse,
} from "rusty-motors-shared";
import { handleLoginData } from "./handleLoginData.js";
import type { BufferSerializer } from "rusty-motors-shared-packets";
import pino, { Logger } from "pino";
const defaultLogger = pino({ name: "LoginServer" });

/**
 * Receives login data and handles the login process.
 *
 * @param {Object} options - The options for receiving login data.
 * @param {string} options.connectionId - The connection ID.
 * @param {NPSMessage} options.message - The login message.
 * @param {import("pino").Logger} [options.log] - The logger instance.
 *
 * @returns {Promise<import("../../shared/State.js").ServiceResponse>} The response from the login process.
 *
 * @throws {Error} If there was an error in the login service.
 */
export async function receiveLoginData({
	connectionId,
	message,
	log = defaultLogger,
}: {
	connectionId: string;
	message: BufferSerializer;
	log?: Logger;
}): Promise<ServiceResponse> {
	try {
		log.debug(`[${connectionId}] Entering login module`);
		const incomingPacket = new SerializedBufferOld();
		incomingPacket._doDeserialize(message.serialize());
		const response = await handleLoginData({
			connectionId,
			message: incomingPacket,
			log,
		});
		log.debug(
			`[${connectionId}] Exiting login module ${response.messages.length} messages`,
		);
		return response;
	} catch (error) {
		const err = new Error(
			`[${connectionId}] Error in login service: ${(error as Error).message}`,
			{ cause: error },
		);
		throw err;
	}
}
