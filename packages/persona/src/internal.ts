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
import { LegacyMessage } from "rusty-motors-shared";
import {
	PersonaList,
	PersonaMapsMessage,
	PersonaRecord,
} from "./PersonaMapsMessage.js";
import { _gameLogout } from "./_gameLogout.js";
import { _getFirstBuddy } from "./_getFirstBuddy.js";
import { _selectGamePersona } from "./_selectGamePersona.js";
import { validatePersonaName } from "./handlers/validatePersonaName.js";
import type { BufferSerializer } from "rusty-motors-shared-packets";
import { getPersonaInfo } from "./handlers/getPersonaInfo.js";
import { getServerLogger } from "rusty-motors-shared";


const defaultLogger = getServerLogger("PersonaServer");


/**
 * Array of supported message handlers
 *
 * @type {{
 *  opCode: number,
 * name: string,
 * handler: (args: {
 * connectionId: string,
 * message: LegacyMessage,
 * log: import("pino").Logger,
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
		message: LegacyMessage;
		log: ServerLogger;
	}) => Promise<{
		connectionId: string;
		messages: SerializedBufferOld[];
	}>;
}[] = [
	{
		opCode: 1283, // 0x503
		name: "Game login",
		handler: _selectGamePersona,
	},
	{
		opCode: 1295, // 0x50F
		name: "Game logout",
		handler: _gameLogout,
	},
	{
		opCode: 1305, // 0x519
		name: "Get persona info",
		handler: getPersonaInfo,
	},
	{
		opCode: 1330, // 0x532
		name: "Get persona maps",
		handler: getPersonaMaps,
	},
	{
		opCode: 1331, // 0x533
		name: "Validate persona name",
		handler: validatePersonaName,
	},
	{
		opCode: 1291, // 0x50B
		name: "Get first buddy",
		handler: _getFirstBuddy,
	},
];

/**
 * Return string as buffer
 */
export function generateNameBuffer(name: string, size: number): Buffer {
	const nameBuffer = Buffer.alloc(size);
	Buffer.from(name, "utf8").copy(nameBuffer);
	return nameBuffer;
}

/**
 * All personas
 * NOTE: Currently we only support one persona per customer
 * @type {PersonaRecord[]}
 */
export const personaRecords: Pick<
	PersonaRecord,
	"customerId" | "personaId" | "personaName" | "shardId"
>[] = [
	{
		customerId: 2868969472,
		personaId: 20,
		personaName: "Molly",
		shardId: 44,
	},
	{
		customerId: 5551212, // 0x54 0xB4 0x6C
		personaId: 21,
		personaName: "Dr Brown",
		shardId: 44,
	},
	{
		customerId: 0,
		personaId: 22,
		personaName: "Admin",
		shardId: 44,
	},
];

/**
 *
 * @param {number} customerId
//  * @return {Promise<PersonaRecord[]>}
 */
async function getPersonasByCustomerId(
	customerId: number,
): Promise<
	Pick<PersonaRecord, "customerId" | "personaId" | "personaName" | "shardId">[]
> {
	const results = personaRecords.filter(
		(persona) => persona.customerId === customerId,
	);
	return results;
}

/**
 * Lookup all personas owned by the customer id
 *
 * TODO: Store in a database, instead of being hard-coded
 *
 * @param {number} customerId
 * @return {Promise<import("../../interfaces/index.js").PersonaRecord[]>}
 */
async function getPersonaMapsByCustomerId(
	customerId: number,
): Promise<
	Pick<PersonaRecord, "customerId" | "personaId" | "personaName" | "shardId">[]
> {
	switch (customerId) {
		case 5551212:
			return getPersonasByCustomerId(customerId);
		default:
			return [];
	}
}

/**
 * Handle a get persona maps packet
 * @param {object} args
 * @param {string} args.connectionId
 * @param {LegacyMessage} args.message
 * @param {import("pino").Logger} [args.log=getServerLogger({ name: "LoginServer" })]
 * @returns {Promise<{
 *  connectionId: string,
 * messages: SerializedBufferOld[],
 * }>}
 */
async function getPersonaMaps({
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
	log.debug("_npsGetPersonaMaps...");

	const requestPacket = message;
	log.debug(
		`NPSMsg request object from _npsGetPersonaMaps ${requestPacket
			._doSerialize()
			.toString("hex")} `,
	);

	const customerId = requestPacket.data.readUInt32BE(8);

	const personas = await getPersonaMapsByCustomerId(customerId);
	log.debug(`${personas.length} personas found for ${customerId}`);

	const personaMapsMessage = new PersonaMapsMessage();

	// this is a GLDP_PersonaList::GLDP_PersonaList

	try {
		/** @type {PersonaList} */
		let personaList: PersonaList = new PersonaList();

		if (personas.length > 1) {
			log.warn(`More than one persona found for customer Id: ${customerId}`);
		}

		personas.forEach((persona) => {
			const personaRecord = new PersonaRecord();

			personaRecord.customerId = persona.customerId;
			personaRecord.personaId = persona.personaId;
			personaRecord.personaName = persona.personaName;
			personaRecord.shardId = persona.shardId;
			personaRecord.numberOfGames = personas.length;

			personaList.addPersonaRecord(personaRecord);

			log.debug(
				`Persona record: ${JSON.stringify({
					personaRecord: personaRecord.toJSON(),
				})}`,
			);
		});

		personaMapsMessage._header.id = 0x607;
		personaMapsMessage._personaRecords = personaList;
		personaMapsMessage.setBuffer(personaList.serialize());
		log.debug(
			`PersonaMapsMessage object from _npsGetPersonaMaps',
            ${JSON.stringify({
							personaMapsMessage: personaMapsMessage
								.serialize()
								.toString("hex"),
						})}`,
		);

		const outboundMessage = new SerializedBufferOld();
		outboundMessage._doDeserialize(personaMapsMessage.serialize());

		return {
			connectionId,
			messages: [outboundMessage],
		};
	} catch (error) {
		const err = Error(`Error serializing personaMapsMsg`);
		err.cause = error;
		throw err;
	}
}

/**
 *
 *
 * @param {object} args
 * @param {string} args.connectionId
 * @param {SerializedBufferOld} args.message
 * @param {import("pino").Logger} [args.log=getServerLogger({ name: "PersonaServer" })]
 * @returns {Promise<{
 *  connectionId: string,
 * messages: SerializedBufferOld[],
 * }>}
 * @throws {Error} Unknown code was received
 */
export async function receivePersonaData({
	connectionId,
	message,
	log = defaultLogger,
}: {
	connectionId: string;
	message: BufferSerializer;
	log?: ServerLogger;
}): Promise<{
	connectionId: string;
	messages: SerializedBufferOld[];
}> {
	const data = message.serialize();
	log.debug(`[${connectionId}] Entering receivePersonaData`);
	log.debug(`[${connectionId}] Received persona data: ${data.toString("hex")}`);

	// The packet needs to be an NPSMessage
	const inboundMessage = new LegacyMessage();
	inboundMessage._doDeserialize(message.serialize());

	const supportedHandler = messageHandlers.find((h) => {
		return h.opCode === inboundMessage._header.id;
	});

	if (typeof supportedHandler === "undefined") {
		// We do not yet support this message code
		throw Error(
			`[connectionId}] UNSUPPORTED_MESSAGECODE: ${inboundMessage._header.id}`,
		);
	}

	try {
		const result = await supportedHandler.handler({
			connectionId,
			message: inboundMessage,
			log,
		});
		log.debug(
			`[${connectionId}] Returning with ${result.messages.length} messages`,
		);
		return result;
	} catch (error) {
		const err = Error(`[${connectionId}] Error handling persona data`, {
			cause: error,
		});
		throw err;
	}
}

export function personaToString(persona: Partial<PersonaRecord>): string {
	return "".concat(
		`PersonaRecord: customerId=${persona.customerId}, `,
		`personaId=${persona.personaId}, `,
		`name=${persona.personaName}, `,
		`shardId=${persona.shardId}`,
	);
}
