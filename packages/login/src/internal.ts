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

import { ServerLogger, type UserRecordMini } from "rusty-motors-shared";
import { login } from "./login.js";
import { GamePacket } from "rusty-motors-shared-packets";


export const userRecords: UserRecordMini[] = [
	{
		contextId: "5213dee3a6bcdb133373b2d4f3b9962758",
		customerId: 0x0012808b,
		userId: 0x00000002,
	},
	{
		contextId: "d316cd2dd6bf870893dfbaaf17f965884e",
		customerId: 0x0054b46c,
		userId: 0x00000001,
	},
];


/**
 * An array of message handlers for processing different types of messages.
 * Each handler is associated with an operation code (opCode) and a name.
 * 
 * @type {Array<{opCode: number, name: string, handler: function}>}
 * 
 * @property {number} opCode - The operation code that identifies the type of message.
 * @property {string} name - The name of the message handler.
 * @property {function} handler - The function that processes the message. It takes an object with the following properties:
 * @property {string} handler.args.connectionId - The ID of the connection.
 * @property {GamePacket} handler.args.message - The message to be processed.
 * @property {ServerLogger} handler.args.log - The logger for server logging.
 * @returns {Promise<{connectionId: string, messages: GamePacket[]}>} - A promise that resolves to an object containing the connection ID and an array of messages.
 */
export const messageHandlers: {
	opCode: number;
	name: string;
	handler: (args: {
		connectionId: string;
		message: GamePacket;
		log: ServerLogger;
	}) => Promise<{
		connectionId: string;
		messages: GamePacket[];
	}>;
}[] = [
	{
		opCode: 1281, // 0x0501
		name: "UserLogin",
		handler: login,
	},
];
