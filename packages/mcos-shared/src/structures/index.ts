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

export { BinaryStructure } from './BinaryStructure.js'
export { TSMessageBase } from './TMessageBase.js'
export { GSMessageBase } from './GMessageBase.js'
export { MessagePacket } from './MessagePacket.js'

/**
 * @export
 * @typedef {object} TIMESTAMP_STRUCT
 * @property {number} year - 2 bytes
 * @property {number} month - 2 bytes
 * @property {number} day - 2 bytes
 * @property {number} hour - 2 bytes
 * @property {number} minute - 2 bytes
 * @property {number} second - 2 bytes
 * @property {number} fraction - 2 bytes
 */
