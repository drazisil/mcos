import { ChatMessage } from "./ChatMessage.js";
import { assertLength } from "./assertLength.js";
import { ListInGameEmailsMessage } from "./ListInGameEmailsMessage.js";
import { ListInGameEmailsResponseMessage } from "./ListInGameEmailsResponseMessage.js";
import { InGameEmailMessage } from "./InGameEmailMessage.js";
import pino from "pino";
const defaultLogger = pino({ name: "chat.inGameEmails" });



const unseenMail = new Map<number, InGameEmailMessage>();
unseenMail.set(
	1,
	new InGameEmailMessage({
		mailId: 1,
		senderId: 1,
		senderName: "System",
		title: "Test Email",
		sendTime: Date.now() * 0.001,
		expireTime: Date.now() * 0.001 + 1000 * 60 * 60 * 24,
		isUnread: true,
		body: "This is a test email",
	}),
);

export class ReceiveEmailMessage extends ChatMessage {
	gameUserId: number;
	mailId: number;
	headerOnly: boolean;

	static override fromBuffer(buffer: Buffer): ReceiveEmailMessage {
		const messageId = buffer.readUInt16BE(0);
		const messageLength = buffer.readUInt16BE(2);

		assertLength(buffer.byteLength, messageLength);

		const payload = buffer.subarray(4, 4 + messageLength);

		return new ReceiveEmailMessage(messageId, messageLength, payload);
	}

	constructor(messageId: number, messageLength: number, payload: Buffer) {
		super(messageId, messageLength, payload);

		this.gameUserId = payload.readUInt32BE(0);
		this.mailId = payload.readUInt16BE(4);
		this.headerOnly = payload.readUInt16BE(8) === 1;
	}

	override toString(): string {
		return `ReceiveEmailMessage: gameUserId=${this.gameUserId}, mailId=${this.mailId}, headerOnly=${this.headerOnly}`;
	}
}

export function handleListInGameEmailsMessage(message: ChatMessage): Buffer[] {
	defaultLogger.debug(`Handling ListInGameEmailsMessage: ${message.toString()}`);

	const parsedMessage = ListInGameEmailsMessage.fromBuffer(message.toBuffer());

	defaultLogger.debug(`Parsed message: ${parsedMessage.toString()}`);

	const totalEmails = unseenMail.size;
	const mailId = totalEmails > 0 ? unseenMail.keys().next().value || 0 : 0;

	const response = new ListInGameEmailsResponseMessage(totalEmails, mailId);

	defaultLogger.debug(`Response: ${response.toString()}`);

	return [response.toBuffer()];
}

export function handleReceiveEmailMessage(message: ChatMessage): Buffer[] {
	defaultLogger.debug(`Handling ReceiveEmailMessage: ${message.toString()}`);

	const parsedMessage = ReceiveEmailMessage.fromBuffer(message.toBuffer());

	defaultLogger.debug(`Parsed message: ${parsedMessage.toString()}`);

	const requestedEmail = unseenMail.get(parsedMessage.mailId);

	if (!requestedEmail) {
		defaultLogger.warn(`Email with ID ${parsedMessage.mailId} not found`);
		return [];
	}

	const email = requestedEmail;

	if (!parsedMessage.headerOnly) {
		defaultLogger.debug(`Email body requested`);
	}

	const buffers: Buffer[] = [];

	if (parsedMessage.headerOnly) {
		buffers.push(email.toBuffer());
	} else {
		buffers.push(email.toBuffer());
	}

	return buffers;
}

export function reverseBytes(value: number): number {
	// Given an int, reverse the byte order
	return (
		((value & 0xff) << 24) |
		((value & 0xff00) << 8) |
		((value & 0xff0000) >> 8) |
		((value & 0xff000000) >> 24)
	);
}
