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

import { NPSMessage } from "rusty-motors-shared";

/**
 * Selects a game persona and marks it as in use
 * @param {NPSMessage} requestPacket
 * @param {import("pino").Logger} log
 * @returns {Promise<NPSMessage>}
 */
export async function handleSelectGamePersona(requestPacket, log) {
	log.debug("_npsSelectGamePersona...");

	log.debug(
		`[npsSelectGamePersona] requestPacket's data prior to sending: ${requestPacket.toString()}`,
	);

	// Create the packet content
	const packetContent = Buffer.alloc(251);

	// Build the packet
	// Response Code
	// 207 = success
	const responsePacket = new NPSMessage();
	responsePacket._header.id = 0x207;
	responsePacket.setBuffer(packetContent);

	log.debug(
		`[npsSelectGamePersona] responsePacket's data prior to sending: ${responsePacket.toString()}`,
	);
	return responsePacket;
}
