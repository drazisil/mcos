import { ChatMessage } from "./ChatMessage.js";
import { assertLength } from "./assertLength.js";
import { ListInGameEmailsMessage } from "./ListInGameEmailsMessage.js";
import { ListInGameEmailsResponseMessage } from "./ListInGameEmailsResponseMessage.js";
import { InGameEmailMessage } from "./InGameEmailMessage.js";
import { getServerLogger } from "rusty-motors-shared";

const defaultLogger = getServerLogger("chat.inGameEmails");



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
	gameUserId = 0;
	mailId = 0;
	headerOnly = false;


	override deserialize(buffer: Buffer): ChatMessage {
		this.gameUserId = buffer.readUInt32BE(0);
		this.mailId = buffer.readUInt16BE(4);
		this.headerOnly = buffer.readUInt16BE(8) === 1;

		return this;
	}

	override toString(): string {
		return `ReceiveEmailMessage: gameUserId=${this.gameUserId}, mailId=${this.mailId}, headerOnly=${this.headerOnly}`;
	}
}

export function handleListInGameEmailsMessage(message: ChatMessage): Buffer[] {
	defaultLogger.debug(`Handling ListInGameEmailsMessage: ${message.toString()}`);

	const parsedMessage = new ListInGameEmailsMessage();
	parsedMessage.deserialize(message.toBuffer());

	defaultLogger.debug(`Parsed message: ${parsedMessage.toString()}`);

	const totalEmails = unseenMail.size;
	const mailId = totalEmails > 0 ? unseenMail.keys().next().value || 0 : 0;

	const response = new ListInGameEmailsResponseMessage(totalEmails, mailId);

	defaultLogger.debug(`Response: ${response.toString()}`);

	return [response.toBuffer()];
}

export function handleReceiveEmailMessage(message: ChatMessage): Buffer[] {
	defaultLogger.debug(`Handling ReceiveEmailMessage: ${message.toString()}`);

	const parsedMessage = new ReceiveEmailMessage();
	parsedMessage.deserialize(message.toBuffer());

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
