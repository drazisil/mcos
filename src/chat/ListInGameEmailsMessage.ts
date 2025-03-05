import { ChatMessage } from "./ChatMessage.js";

export class ListInGameEmailsMessage extends ChatMessage {
	userId = 0;
	lastEmailId = 0;


	override deserialize(buffer: Buffer): ChatMessage {
		this.userId = buffer.readUInt16BE(0);
		this.lastEmailId = buffer.readUInt16BE(4);
		this.payload = buffer.subarray(8);

		return this;
	}

	override toString(): string {
		return `ListInGameEmailsMessage: userId=${this.userId}, lastEmailId=${this.lastEmailId}`;
	}
}
