import {  OldServerMessage } from "rusty-motors-shared";
import { EntryFeePurseMessage, PurseEntry } from "./EntryFeePurseMessage.js";
import { LobbyInfo, LobbyMessage } from "./LobbyMessage.js";
import type { MessageHandlerArgs, MessageHandlerResult } from "./handlers.js";
import { getServerLogger } from "rusty-motors-shared";
import { BytableServerMessage } from "@rustymotors/binary";

const defaultLogger = getServerLogger("handlers/getLobbies");

/**
 * @param {MessageHandlerArgs} args
 * @return {Promise<MessageHandlerResult>}
 */

async function _getLobbies({
	connectionId,
	packet,
}: MessageHandlerArgs): Promise<MessageHandlerResult> {
	defaultLogger.debug(`[${connectionId}] Received getLobbies packet ${packet.toString()}`);

	defaultLogger.debug(`[${connectionId}] Sending lobbies response...`);

	// Create new response packet
	const lobbiesResponsePacket = new BytableServerMessage();
	lobbiesResponsePacket.header.sequence = packet.sequenceNumber;
	lobbiesResponsePacket.setFlags(8);

	const lobbyResponse = new LobbyMessage();
	lobbyResponse._msgNo = 325;
	lobbyResponse._shouldExpectMoreMessages = false;

	const lobby = new LobbyInfo();
	lobby._lobbyId = 2;
	lobby._lobbyName = "LOBBY";
	lobby._topDog = "Drazi Crendraven";
	lobby._maxNumberPlayers = 8;

	defaultLogger.debug(`[${connectionId}] Sending lobby: ${lobby.toString()}`);

	lobbyResponse.addLobby(lobby);

	defaultLogger.debug(`[${connectionId}] Sending lobbyResponse: ${lobbyResponse.toString()}`
	);

	lobbiesResponsePacket.setBody(lobbyResponse.serialize());

	// Handle purse entries
	const purseEntry = new PurseEntry();
	purseEntry._entryFee = 100;
	purseEntry._purse = 1000;

	const perseEntryResponse = new EntryFeePurseMessage();
	perseEntryResponse._msgNo = 408;
	perseEntryResponse._shouldExpectMoreMessages = false;
	perseEntryResponse.addEntry(purseEntry);

	defaultLogger.debug(`[${connectionId}] Sending purseEntryResponse: ${perseEntryResponse.toString()}`);

	const perseEntriesResponsePacket = new OldServerMessage();
	perseEntriesResponsePacket._header.sequence = packet.sequenceNumber;
	perseEntriesResponsePacket._header.flags = 8;

	perseEntriesResponsePacket.setBuffer(perseEntryResponse.serialize());

	return {
		connectionId,
		messages: [
			lobbiesResponsePacket, 
			perseEntriesResponsePacket
		],
	};
}
/**
 * @param {MessageHandlerArgs} args
 * @return {Promise<MessageHandlerResult>}
 */
export async function getLobbies({
	connectionId,
	packet,
	log = defaultLogger,
}: MessageHandlerArgs): Promise<MessageHandlerResult> {
	const result = await _getLobbies({ connectionId, packet, log });
	log.debug(`[${connectionId}] Returning with ${result.messages.length} messages`);
	log.debug(`[${connectionId}] Leaving getLobbies`);
	result.messages.forEach((msg) => {
		log.debug(`[${connectionId}] Sending response[str]: ${msg.toString()}`);
	});
	return {
		connectionId,
		messages: result.messages,
	};
}
