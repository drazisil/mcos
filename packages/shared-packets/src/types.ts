/**
 * Interface representing a serializable object.
 */
export interface SerializableInterface {
	serialize(): Buffer;
	deserialize(data: Buffer): void;
	getByteSize(): number;
	toString(): string;
	toHexString(): string;
}

export interface SerializableMessage extends SerializableInterface {
	connectionId: string;

	messageId: number;
	sequence: number;
	messageSource: string;

	getDataBuffer(): Buffer;
	setDataBuffer(data: Buffer): void;
}

export enum MessageSources {
	CLIENT = "CLIENT",
	LOGIN_SERVER = "LOGIN_SERVER",
	PERSONA_SERVER = "PERSONA_SERVER",
	CHAT_SERVER = "CHAT_SERVER",
	GAME_SERVER = "GAME_SERVER",
	TRANSACTION_SERVER = "TRANSACTION_SERVER",
}

export interface IServerMessage {
	/**
	 * The message content, excluding the header.
	 */
	get data(): Buffer;
	/**
	 * The message sequence number.
	 */
	get sequenceNumber(): number;
	/**
	 * Serialize the message to a buffer.
	 */
	serialize(): Buffer;
	/**
	 * Serialize the message to a hex string.
	 */
	toHexString(): string;
}
