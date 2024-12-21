export interface Serialized {
	serialize(): Buffer;
	deserialize(buf: Buffer): void;
	sizeOf(): number;
}

function serializeBool(bool: boolean) {
	const buf = Buffer.alloc(1);

	buf.writeUInt8(bool ? 1 : 0);

	return buf;
}

/**
 * Serializes a string to a buffer. The buffer will be prefixed with the length of the string.
 */
function serializeString(str: string) {
	const buf = Buffer.alloc(str.length + 2);

	buf.writeUInt16LE(str.length);
	buf.write(str, 2);

	return buf;
}

function deserializeBool(buff: Buffer) {
	return buff.readUInt8() === 1;
}

function deserializeWord(buff: Buffer) {
	return buff.readUInt16LE();
}

function deserializeDWord(buff: Buffer) {
	return buff.readUInt32LE();
}

/**
 * Deserializes a string from a buffer. The buffer is expected to be prefixed with the length of the string.
 */
function deserializeString(buf: Buffer) {
	const size = buf.readUInt16LE();
	if (size > buf.length - 2) {
		throw new Error("Size is bigger than the buffer length - 2");
	}
	const str = buf.toString("utf8", 2);

	return str;
}

function sizeOfBool() {
	return 1;
}

function sizeOfString(string: string) {
	return string.length + 2;
}

export class Header implements Serialized {
	messageCode = 0; // 2 bytes
	messageLength = 0; // 2 bytes
	messageVersion = 0; // 2 bytes
	readonly reserved = 0; // 2 bytes
	messageChecksum = 0; // 4 bytes

	sizeOf() {
		return 12;
	}

	clear() {
		this.messageChecksum = 0; // 2 bytes
		this.messageCode = 0; // 2 bytes
		this.messageLength = 0;
		this.messageVersion = 0; // 2 bytes
	}

	serialize() {
		const buf = Buffer.alloc(12);

		buf.writeUInt16LE(this.messageCode, 0);
		buf.writeUInt16LE(this.messageLength, 2);
		buf.writeUInt16LE(this.messageVersion, 4);
		buf.writeUInt16LE(this.reserved, 6);
		buf.writeUInt32LE(this.messageChecksum, 8);

		return buf;
	}

	deserialize(buf: Buffer) {
		this.messageCode = deserializeDWord(buf);
		this.messageCode = deserializeWord(buf.subarray(2, 4));
		this.messageVersion = deserializeWord(buf.subarray(4, 6));
		this.messageChecksum = deserializeDWord(buf.subarray(8, 12));
	}
}

export class SerializedBase implements Serialized {
	protected header: Header | null = null;

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	deserialize(_buff: Buffer): Buffer {
		throw new Error("This method must be implemented by child classes");
	}
	serialize(): Buffer {
		throw new Error("This method must be implemented by child classes");
	}

	sizeOf(): number {
		throw new Error("This method must be implemented by child classes");
	}
}

export class UserStatus extends SerializedBase implements Serialized {
	v2P320 = 0; // Customer ID 4 bytes
	v2P321 = 0; // Persona ID 4 bytes
	v2P1288 = 0; // bool, unknown
	v2P32 = 0; // bool, banned (NPS_Serialize)
	v2P656 = 0; // bool, gagged (NPS_Serialize)
	v2P1292 = 0; // Session Key (NPS_Serialize)
	v2P341 = 0; // unknown, 4 bytes
	v2P1368 = 0; // Metrics Id (not used) 64 bytes

	override sizeOf(): number {
		throw new Error("Not yet implemented");
	}

	override serialize(): Buffer {
		throw new Error("Not yet implemented");
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	override deserialize(_buff: Buffer): Buffer {
		throw new Error("Not yet implemented");
	}
}

export class GetPersonaMapListRequest
	extends SerializedBase
	implements Serialized {}

export class SerializedList extends SerializedBase implements Serialized {}

export class Persona extends SerializedBase implements Serialized {}

export class SessionKey extends SerializedBase implements Serialized {}

export class UserAction extends SerializedBase implements Serialized {}

export class LoginRequestReply extends SerializedBase implements Serialized {
	sessionKey = ""; // 128 chars string

	setContext(context: string) {
		this.sessionKey = context;
	}

	_doSerialize() {
		if (this.header === null) {
			throw new Error("Header is null");
		}
		let buf = this.header.serialize();
		buf = Buffer.concat([buf, serializeString(this.sessionKey)]);

		return buf;
	}

	_serializeSizeOf() {
		if (this.header === null) {
			throw new Error("Header is null");
		}
		let size = this.header.sizeOf();
		size += sizeOfString(this.sessionKey);

		return size;
	}
}

export class GameLogin extends SerializedBase implements Serialized {}

export class GameLoginReply extends SerializedBase implements Serialized {}

export class GetPersonaInfoRequest
	extends SerializedBase
	implements Serialized {}

export class UserStatusRequest extends SerializedBase implements Serialized {}

export class AddPersona extends SerializedBase implements Serialized {}

export class Login extends LoginRequestReply implements Serialized {
	v2P82 = false;
	encryptedSessionKey = ""; // encrypted session key
	readonly GAME_CODE = "2176"; // 40 chars string
	v2P187 = false;

	override serialize() {
		if (this.header === null) {
			throw new Error("Header is null");
		}
		let buf = this.header.serialize();
		buf = Buffer.concat([
			buf,
			serializeBool(this.v2P82),
			serializeString(this.encryptedSessionKey),
			serializeString(this.GAME_CODE),
			serializeBool(this.v2P187),
		]);

		return buf;
	}

	serializeSizeOf() {
		if (this.header === null) {
			throw new Error("Header is null");
		}

		let size = this.header.sizeOf();
		size += sizeOfBool();
		size += sizeOfString(this.encryptedSessionKey);
		size += sizeOfString(this.GAME_CODE);
		size += sizeOfBool();

		return size;
	}

	override deserialize(buf: Buffer) {
		if (this.header === null) {
			this.header = new Header();
		}
		this.header.deserialize(buf);
		this.v2P82 = deserializeBool(buf.subarray(12, 13));
		this.encryptedSessionKey = deserializeString(buf.subarray(13, 15));
		this.v2P187 = deserializeBool(buf.subarray(55, 56));

		return buf;
	}
}
