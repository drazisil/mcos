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

import { LegacyMessage, SerializedBufferOld, ServerLogger, getServerLogger } from "rusty-motors-shared";

/**
 * Handles unknown persona messages
 * This is a placeholder handler to prevent 'UNSUPPORTED_MESSAGECODE' errors
 * 
 * @param {object} args
 * @param {string} args.connectionId
 * @param {LegacyMessage} args.message
 * @param {ServerLogger} [args.log=getServerLogger({ name: "PersonaServer/handleUnknownPersonaMessage" })]
 * @returns {Promise<{
 *  connectionId: string,
 *  messages: SerializedBufferOld[],
 * }>}
 */
export async function handleUnknownPersonaMessage({
  connectionId,
  message,
  log = getServerLogger("PersonaServer/handleUnknownPersonaMessage"),
}: {
  connectionId: string;
  message: LegacyMessage;
  log?: ServerLogger;
}): Promise<{
  connectionId: string;
  messages: SerializedBufferOld[];
}> {
  log.debug(`Received unknown persona message: opCode=${message._header.id}`);
  log.debug(`Message data: ${message._doSerialize().toString("hex")}`);
  
  // Return empty response to allow the server to continue processing
  return {
    connectionId,
    messages: [],
  };
}