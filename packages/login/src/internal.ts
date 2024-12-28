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

import { type UserRecordMini } from "rusty-motors-shared";
import { SerializedBufferOld } from "rusty-motors-shared";
import { login } from "./login.js";


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
 * Array of supported message handlers
 *
 * @type {{
 *  opCode: number,
 * name: string,
 * handler: (args: {
 * connectionId: string,
 * message: SerializedBufferOld,
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
		message: SerializedBufferOld;
		log: Logger;
	}) => Promise<{
		connectionId: string;
		messages: SerializedBufferOld[];
	}>;
}[] = [
	{
		opCode: 1281, // 0x0501
		name: "UserLogin",
		handler: login,
	},
];
