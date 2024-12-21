import { SerializedBuffer } from "./SerializedBuffer.js";

/**
 * A list message is a message that contains a list of items of a specific type.
 *
 * @mixin {SerializableMixin}
 */

export class ListMessage extends SerializedBuffer {
	_msgNo: number;
	_listCount: number;
	_shouldExpectMoreMessages: boolean;
	_list: SerializedBuffer[];
	constructor() {
		super();
		this._msgNo = 0; // 2 bytes
		this._listCount = 0; // 2 bytes
		this._shouldExpectMoreMessages = false; // 1 byte

		/** @type {SerializedBuffer[]} */
		this._list = []; // this.itemsType bytes each
	}

	/**
	 * @param {SerializedBuffer} item
	 */
	add(item: SerializedBuffer) {
		this._list.push(item);
		this._listCount++;
	}

	override serialize() {
		const neededSize = this.size();
		const buffer = Buffer.alloc(neededSize);
		let offset = 0; // offset is 0
		buffer.writeUInt16BE(this._msgNo, offset);
		offset += 2; // offset is 2
		buffer.writeInt8(this._listCount, offset);
		offset += 1; // offset is 3
		buffer.writeUInt8(this._shouldExpectMoreMessages ? 1 : 0, offset);
		offset += 1; // offset is 4
		for (const item of this._list) {
			item.serialize().copy(buffer, offset);
			offset += item.size();
		}
		// offset is now 4 + this._list.length * this._list[0].size()
		return buffer;
	}

	override size() {
		let neededSize;
		if (this._list.length === 0) {
			neededSize = 5;
		} else {
			let itemSize = 0;
			if (typeof this._list[0] !== "undefined") {
				itemSize = this._list[0].size();
			}
			neededSize = 5 + this._list.length * itemSize;
		}
		return neededSize;
	}

	override toString() {
		return `ListMessage: msgNo=${this._msgNo} listCount=${this._listCount} shouldExpectMoreMessages=${this._shouldExpectMoreMessages} list=${this._list}`;
	}
}
