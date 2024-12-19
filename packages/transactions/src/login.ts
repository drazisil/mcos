import { OldServerMessage } from "rusty-motors-shared";

import type { MessageHandlerArgs, MessageHandlerResult } from "./handlers.js";
import {
	LoginCompletePayload,
	LoginPayload,
	ServerPacket,
} from "rusty-motors-shared-packets";
import { logger } from "rusty-motors-logger";
const defaultLogger = logger.child({ name: "transactions.login" });

/**
 * @param {MessageHandlerArgs} args
 * @return {Promise<MessageHandlerResult>}
 */
export async function login({
	connectionId,
	packet,
	log = defaultLogger,
}: MessageHandlerArgs): Promise<MessageHandlerResult> {
	// Normalize the packet
	const incomingPacket = new ServerPacket();
	incomingPacket.deserialize(packet.serialize());

	log.debug(
		`[${connectionId}] Received LoginMessage: ${incomingPacket.toString()}`,
	);

	// Read the inbound packet
	const loginMessage = new LoginPayload();
	loginMessage.deserialize(packet.data);
	log.debug(
		`[${connectionId}] Received LoginMessage: ${loginMessage.toString()}`,
	);

	// Create new response packet
	const response = new LoginCompletePayload();
	response.setMessageId(213);
	response.serverTime = Math.floor(Date.now() / 1000);
	response.firstTime = true;
	response.clubInvitesWaiting = false;
	response.paycheckWaiting = true;
	response.shardAverageCarsOwned = 3;
	response.shardAveragePlayerLevel = 5;
	response.shardGNP = 830;

	log.debug(
		`[${connectionId}] Sending LoginCompleteMessage: ${response.toString()}`,
	);

	// Send response packet

	// Normalize the packet

	const outgoingPacket = ServerPacket.copy(
		incomingPacket,
		response.serialize(),
	);
	outgoingPacket.setSequence(incomingPacket.getSequence());
	outgoingPacket.setPayloadEncryption(true);
	outgoingPacket.setSignature("TOMC");

	log.debug(`[${connectionId}] Sending response: ${outgoingPacket.toString()}`);

	log.debug(
		`[${connectionId}] Sending response(hex): ${outgoingPacket.serialize().toString("hex")}`,
	);

	const responsePacket = new OldServerMessage();
	responsePacket._header.sequence = incomingPacket.getSequence();
	responsePacket._doDeserialize(outgoingPacket.serialize());

	return { connectionId, messages: [responsePacket] };
}
