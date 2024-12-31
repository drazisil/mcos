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
	ServerLogger,
	type ServiceResponse,
} from "rusty-motors-shared";
import { handleLoginData } from "./handleLoginData.js";
import { BufferSerializer, GamePacket } from "rusty-motors-shared-packets";
import { getServerLogger } from "rusty-motors-shared";


/**
 * Handles the reception of login data, deserializes the incoming message, and processes it.
 *
 * @param {Object} params - The parameters for the function.
 * @param {string} params.connectionId - The ID of the connection.
 * @param {BufferSerializer} params.message - The serialized message buffer.
 * @param {ServerLogger} [params.log=getServerLogger("receiveLoginData")] - Optional logger instance.
 * @returns {Promise<ServiceResponse>} - The response from the login data handler.
 * @throws {Error} - Throws an error if there is an issue processing the login data.
 */
export async function receiveLoginData({
	connectionId,
	message,
	log = getServerLogger("receiveLoginData"),
}: {
	connectionId: string;
	message: BufferSerializer;
	log?: ServerLogger;
}): Promise<ServiceResponse> {
	try {
		log.debug(`[${connectionId}] Entering login module`);
		const incomingPacket = new SerializedBufferOld();
		incomingPacket._doDeserialize(message.serialize());
		const response = await handleLoginData({
			connectionId,
			message: DeserializeBufferToGamePacket(incomingPacket),
			log,
		});
		log.debug(
			`[${connectionId}] Exiting login module ${response.messages.length} messages`,
		);

		// @ts-ignore-next-line - This is a temporary workaround for the old serialization format
		response.messages = GamePacketArrayToBufferSerializerArray(response.messages);

		// @ts-ignore-next-line - This is a temporary workaround for the old serialization format
		return response;
	} catch (error) {
		const err = new Error(
			`[${connectionId}] Error in login service: ${(error as Error).message}`,
			{ cause: error },
		);
		throw err;
	}
}

function GamePacketArrayToBufferSerializerArray(
	packets: GamePacket[],
): BufferSerializer[] {
	let bufferSerializers: BufferSerializer[] = [];
	for (const packet of packets) {
		const bufferSerializer = new BufferSerializer();
		bufferSerializer.deserialize(packet.serialize());
		bufferSerializers.push(bufferSerializer);
	}
	return bufferSerializers;
}

function DeserializeBufferToGamePacket(
	serializedBuffer: SerializedBufferOld,
): GamePacket {
	const packet = new GamePacket();
	packet.deserialize(serializedBuffer.serialize());
	return packet;
}
