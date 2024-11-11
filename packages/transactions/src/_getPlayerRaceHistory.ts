import { ServerMessage } from "rusty-motors-shared";
import { GenericRequestMessage } from "./GenericRequestMessage.js";
import {
	PlayerRacingHistoryMessage,
} from "./PlayerRacingHistoryMessage.js";
import type { MessageHandlerArgs, MessageHandlerResult } from "./handlers.js";
import { getRacingHistoryRecords } from "./database/racingHistoryRecords.js";
import { GenericReplyPayload } from "rusty-motors-shared-packets";
import pino from "pino";
const defaultLogger = pino({ name: "transactionServer._getPlayerRaceHistory" });


export async function _getPlayerRaceHistory({
	connectionId,
	packet,
	log = defaultLogger,
}: MessageHandlerArgs): Promise<MessageHandlerResult> {
	log.debug(`[${connectionId}] Handling _getPlayerRaceHistory...`);

	const getPlayerRaceHistoryMessage = new GenericRequestMessage();
	getPlayerRaceHistoryMessage.deserialize(packet.data);

	log.debug(`Received Message: ${getPlayerRaceHistoryMessage.toString()}`);

	const playerId = getPlayerRaceHistoryMessage.data.readInt32LE(0);

	log.debug(`Player ID: ${playerId}`);

	const racingHistoryRecords = getRacingHistoryRecords(playerId);

	const reply = new GenericReplyPayload();
	reply.setMessageId(0x101); // MC_SUCCESS
	reply.msgReply = 362; // 0x16A

	const playerRacingHistoryMessage = new PlayerRacingHistoryMessage();
	playerRacingHistoryMessage._msgId = 362;
	playerRacingHistoryMessage._userId = playerId;
	playerRacingHistoryMessage._numRaces = racingHistoryRecords.length;

	// for (const record of racingHistoryRecords) {
	// 	const recordEntry = new RacingHistoryRecordEntry();
	// 	recordEntry.raceType = record.raceType;
	// 	recordEntry.numberOfRacesEntered = record.numberOfRacesEntered;
	// 	recordEntry.numberOfRacesFinished = record.numberOfRacesFinished;
	// 	recordEntry.numberOfRacesWon = record.numberOfRacesWon;
	// 	recordEntry.numberOfCarsWon = record.numberOfCarsWon;
	// 	recordEntry.numberOfCarsLost = record.numberOfCarsLost;
	// 	recordEntry.numberOfChampionshipsWon = record.numberOfChampionshipsWon;
	// 	recordEntry.cashWon = record.cashWon;

	// 	playerRacingHistoryMessage.addRecord(recordEntry);
	// }

	playerRacingHistoryMessage._expectMore = false;

	const responsePacket = new ServerMessage(
		packet._header.sequence,
		8,
		playerRacingHistoryMessage.serialize(),
	);

	log.debug(`Sending Message: ${playerRacingHistoryMessage.toString()}`);

	return { connectionId, messages: [responsePacket] };
}
