import { deserializeString } from "rusty-motors-shared";
import { LegacyMessage } from "rusty-motors-shared";
import { serializeString } from "rusty-motors-shared";

export class LoginInfoMessage extends LegacyMessage {
	_userId: number;
	_userName: string;
	_userData: Buffer;
	_customerId: number;
	_flags: number;
	_dllVersion: string;
	_hostname: string;
	_idAddress: string;
	_hashKey: Buffer;
	constructor() {
		super();
		this._userId = 0; // 4 bytes
		this._userName = "";
		this._userData = Buffer.alloc(64);
		this._customerId = 0; // 4 bytes
		this._flags = 0; // 4 bytes
		this._dllVersion = "";
		this._hostname = "";
		this._idAddress = "";
		this._hashKey = Buffer.alloc(16);
	}

	/**
	 * @param {Buffer} buffer
	 * @returns {LoginInfoMessage}
	 */
	override deserialize(buffer: Buffer): this {
		try {
			this._header._doDeserialize(buffer);
			let offset = this._header._size;
			this._userId = buffer.readInt32BE(offset);
			offset += 4;
			this._userName = deserializeString(buffer.subarray(offset));
			offset += 4 + this._userName.length + 1;
			buffer.copy(this._userData, 0, offset, offset + 64);
			offset += 64;
			this._customerId = buffer.readInt32BE(offset);
			offset += 4;
			this._flags = buffer.readInt32BE(offset);
			offset += 4;
			this._dllVersion = deserializeString(buffer.subarray(offset));
			offset += 4 + this._dllVersion.length + 1;
			this._hostname = deserializeString(buffer.subarray(offset));
			offset += 4 + this._hostname.length + 1;
			this._idAddress = deserializeString(buffer.subarray(offset));
			offset += 4 + this._idAddress.length + 1;
			buffer.copy(this._hashKey, 0, offset, offset + 16);

			return this;
		} catch (error) {
			const err = Error(
				`Error deserializing LoginInfoMessage: ${String(error)}`,
			);
			err.cause = error;
			throw err;
		}
	}

	/**
	 * @returns {Buffer}
	 */
	override serialize(): Buffer {
		try {
			const buffer = Buffer.alloc(this._header.length);
			this._header._doSerialize().copy(buffer);
			let offset = this._header._size;
			buffer.writeInt32BE(this._userId, offset);
			offset += 4;
			offset = serializeString(this._userName, buffer, offset);

			this._userData.copy(buffer, offset);
			offset += 64;
			buffer.writeInt32BE(this._customerId, offset);
			offset += 4;
			buffer.writeInt32BE(this._flags, offset);
			offset += 4;
			offset = serializeString(this._dllVersion, buffer, offset);

			offset = serializeString(this._hostname, buffer, offset);

			offset = serializeString(this._idAddress, buffer, offset);
			offset += 4 + this._idAddress.length + 1;
			this._hashKey.copy(buffer, offset);

			return buffer;
		} catch (error) {
			const err = Error(`Error serializing LoginInfoMessage: ${String(error)}`);
			err.cause = error;
			throw err;
		}
	}

	override toString() {
		return `LoginInfoMessage: ${this._userName}`;
	}
}
