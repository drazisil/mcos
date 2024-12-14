import {
	LegacyMessage,
	NPSMessage,
	SerializedBufferOld,
} from "rusty-motors-shared";
import { createGameProfile } from "rusty-motors-nps";
import { getPersonasByPersonaId } from "../getPersonasByPersonaId.js";
import { personaToString } from "../internal.js";

import { logger, type Logger } from "rusty-motors-utilities";
const defaultLogger = logger.child({
	name: "PersonaServer.receivePersonaData",
});

export async function getPersonaInfo({
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
	log.debug("getPersonaInfo...");
	const requestPacket = new NPSMessage();
	requestPacket._doDeserialize(message.serialize());

	log.debug(
		`LegacyMsg request object from getPersonaInfo ${requestPacket.toString()}`,
	);

	const personaId = requestPacket.data.readUInt32BE(0);

	log.debug(`personaId: ${personaId}`);

	const persona = await getPersonasByPersonaId({
		personaId,
	});

	if (!persona[0]) {
		throw new Error(`Persona not found for personaId: ${personaId}`);
	}

	log.debug(`Persona found: ${personaToString(persona[0])}`);

	const profile = createGameProfile();

	profile.customerId = persona[0]!.customerId;
	profile.profileId = persona[0]!.personaId;
	profile.profileName = persona[0]!.personaName;

	// Build the packet
	// Response Code
	// 0x607 = Game Persona Info
	const responsePacket = new LegacyMessage();
	responsePacket._header.id = 0x607;
	responsePacket.setBuffer(profile.serialize());
	log.debug(
		`LegacyMsg response object from getPersonaInfo ${responsePacket
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
