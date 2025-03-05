import {
	BytableMessage,
	createEmptyField,
	createGameMessage,
	createRawMessage,
	serialize,
} from "@rustymotors/binary";
import { privateDecrypt } from "crypto";
import { readFileSync } from "fs";
import {
	getServerLogger,
	ServerLogger,
	getServerConfiguration,
} from "rusty-motors-shared";
import { parseNPSSessionKey } from "./parseNPSSessionKey.js";

export async function serverLoginMessageHandler({
	connectionId,
	message,
	log = getServerLogger("MCOProtocol/serverLoginMessageHandler"),
}: {
	connectionId: string;
	message: BytableMessage;
	log?: ServerLogger;
}): Promise<{
	connectionId: string;
	message: BytableMessage | null;
}> {
	try {
		const inboundMessage = createGameMessage();
		inboundMessage.setSerializeOrder([
			{ name: "ticket", field: "PrefixedString2" },
			{ name: "val2", field: "Short" },
			{ name: "encryptedSessionKey", field: "PrefixedString2" },
			{ name: "gameServiceId", field: "PrefixedString2" },
			{ name: "exeChecksum", field: "Dword" },
		]);
		inboundMessage.deserialize(message.serialize());
		const messageId = inboundMessage.header.messageId;
		log.debug(
			{ connectionId, messageId: messageId.toString(16) },
			"Processing server login message",
		);

		// TODO: verify ticket
		const encryptedSessionKey = inboundMessage.getFieldValueByName(
			"encryptedSessionKey",
		);
		if (!encryptedSessionKey) {
			throw Error("No encrypted session key found");
		}

		const sessionkeyString = Buffer.from(encryptedSessionKey as String, "hex");

		const config = getServerConfiguration();

		if (config.privateKeyFile === "") {
			throw Error("No private key file specified");
		}

		let sessionKey: string | null = null;

		const privatekeyContents = readFileSync(config.privateKeyFile);

		try {
			const decrypted = privateDecrypt(
				{
					key: privatekeyContents,
				},
				sessionkeyString,
			); // length of decrypted should be 128 bytes

			const parsedSessionKey = parseNPSSessionKey(decrypted);

			if (parsedSessionKey.sessionKeyLength !== 32) {
				throw Error(
					`Session key length is not 32 bytes: ${parsedSessionKey.sessionKeyLength}`,
				);
			}

			sessionKey = parsedSessionKey.sessionKey; // length of session key should be 12 bytes
		} catch (error: unknown) {
			log.trace(
				{
					connectionId,
					key: sessionkeyString.toString("utf8"),
				},
				"Session key",
			); // 128 bytes
			log.trace(
				{
					connectionId,
					decrypted: sessionKey,
				},
				"Decrypted",
			); // 12 bytes
			log.fatal(
				{
					connectionId,
				},
				`Error decrypting session key: ${(error as Error).message}`,
			);
			const err = new Error(
				`Error decrypting session key: ${(error as Error).message}`,
			);
			err.cause = error;
			throw err;
		}

		if (!sessionKey) {
			throw Error("No session key found");
		}

		log.debug(
			{
				connectionId,
			},
			"Session key decrypted",
		);

		log.debug(
			{
				connectionId,
			},
			"Creating outbound message",
		);

		const responseCode = 0x601;

		const loginResponseMessage = createRawMessage();
		loginResponseMessage.header.setMessageId(responseCode);
		loginResponseMessage.setSerializeOrder([
			{ name: "ban", field: "Dword" },
			{ name: "gag", field: "Dword" },
			{ name: "customerId", field: "Dword" },
			{ name: "isCacheHit", field: "Dword" },
			{ name: "profileId", field: "Dword" },
			{ name: "sessionKey", field: "PrefixedString2" },
		]);
		loginResponseMessage.setFieldValueByName("profileId", 2);
		loginResponseMessage.setFieldValueByName("isCacheHit", 3);
		loginResponseMessage.setFieldValueByName("customerId", 1);
		loginResponseMessage.setFieldValueByName("ban", 0);
		loginResponseMessage.setFieldValueByName("gag", 0);
		loginResponseMessage.setFieldValueByName("sessionKey", sessionKey);

		const fields = [
			loginResponseMessage.getField("profileId") ?? createEmptyField(),
			loginResponseMessage.getField("isCacheHit") ?? createEmptyField(),
			loginResponseMessage.getField("customerId") ?? createEmptyField(),
			loginResponseMessage.getField("ban") ?? createEmptyField(),
			loginResponseMessage.getField("gag") ?? createEmptyField(),
			loginResponseMessage.getField("sessionKey") ?? createEmptyField(),
		]

		const body = serialize(fields);

		const responseMessage = createRawMessage();
		responseMessage.header.setMessageId(responseCode);
		responseMessage.setBody(body);

		log.debug(
			{
				connectionId,
			},
			"Outbound message created",
		);

		return { connectionId, message: responseMessage };
	} catch (error) {
		log.error({ connectionId }, `Error creating game message: ${error}`);
	}
	return { connectionId, message: null };
}
