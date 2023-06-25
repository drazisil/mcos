import { NPSMessage, Sentry } from "mcos/shared";
import { createEncrypters, selectEncryptors } from "mcos/gateway";
import { NPSUserInfo } from "../NPSUserInfo.js";
import { MessagePacket } from "../MessagePacket.js";
import { getPersonasByPersonaId } from "mcos/persona";
import { DatabaseManager } from "mcos/database";
import {
    TBufferWithConnection,
    TServerLogger,
    TMessageArrayWithConnection,
} from "mcos/shared/interfaces";

/**
 * Convert to zero padded hex
 *
 * @export
 * @param {Buffer} data
 * @return {string}
 */
export function toHex(data: Buffer): string {
    /** @type {string[]} */
    const bytes: string[] = [];
    data.forEach((b) => {
        bytes.push(b.toString(16).toUpperCase().padStart(2, "0"));
    });
    return bytes.join("");
}

/**
 * @param {string} key
 * @return {Buffer}
 */
export function _generateSessionKeyBuffer(key: string): Buffer {
    const nameBuffer = Buffer.alloc(64);
    Buffer.from(key, "utf8").copy(nameBuffer);
    return nameBuffer;
}

/**
 * Handle a request to connect to a game server packet
 *
 * @private
 * @param {TBufferWithConnection} dataConnection
 * @param {TServerLogger} log
 * @return {Promise<iTMessageArrayWithConnection>}
 */
export async function _npsRequestGameConnectServer(
    dataConnection: TBufferWithConnection,
    log: TServerLogger
): Promise<TMessageArrayWithConnection> {
    log(
        "debug",
        `[inner] Raw bytes in _npsRequestGameConnectServer: ${toHex(
            dataConnection.data
        )}`
    );

    log(
        "debug",
        `_npsRequestGameConnectServer: ${JSON.stringify({
            remoteAddress: dataConnection.connection.remoteAddress,
            localPort: dataConnection.connection.localPort,
            data: dataConnection.data.toString("hex"),
        })}`
    );

    // since the data is a buffer at this point, let's place it in a message structure
    const inboundMessage = MessagePacket.fromBuffer(dataConnection.data);

    log(
        "debug",
        `message buffer (${inboundMessage.getBuffer().toString("hex")})`
    );

    // Return a _NPS_UserInfo structure
    const userInfo = new NPSUserInfo("received");
    userInfo.deserialize(dataConnection.data);
    userInfo.dumpInfo();

    const personas = await getPersonasByPersonaId(userInfo.userId);
    if (typeof personas[0] === "undefined") {
        const err = new Error("No personas found.");
        Sentry.addBreadcrumb({ level: "error", message: err.message });
        throw err;
    }

    const { customerId } = personas[0];

    // Set the encryption keys on the lobby connection
    const databaseManager = DatabaseManager.getInstance(log);
    const keys = await databaseManager
        .fetchSessionKeyByCustomerId(customerId)
        .catch((/** @type {unknown} */ error: unknown) => {
            Sentry.captureException(error);
            if (error instanceof Error) {
                log(
                    "debug",
                    `Unable to fetch session key for customerId ${customerId.toString()}: ${
                        error.message
                    })}`
                );
            }
            const err = new Error(
                `Unable to fetch session key for customerId ${customerId.toString()}: unknown error}`
            );
            Sentry.addBreadcrumb({ level: "error", message: err.message });
            throw err;
        });
    if (keys === undefined) {
        const err = new Error("Error fetching session keys!");
        Sentry.addBreadcrumb({ level: "error", message: err.message });
        throw err;
    }

    try {
        dataConnection.connection.encryptionSession = selectEncryptors(
            dataConnection,
            log
        );
    } catch (error) {
        dataConnection.connection.encryptionSession = createEncrypters(
            dataConnection.connection,
            keys,
            log
        );
    }

    const packetContent = Buffer.alloc(72);

    // This response is a NPS_UserStatus

    // Ban and Gag

    // NPS_USERID - User ID - persona id - long
    Buffer.from([0x00, 0x84, 0x5f, 0xed]).copy(packetContent);

    // SessionKeyStr (32)
    _generateSessionKeyBuffer(keys.sessionKey).copy(packetContent, 4);

    // SessionKeyLen - int
    packetContent.writeInt16BE(32, 66);

    // Build the packet
    const packetResult = new NPSMessage("sent");
    packetResult.msgNo = 0x1_20;
    packetResult.setContent(packetContent);
    packetResult.dumpPacket();

    const loginResponsePacket = MessagePacket.fromBuffer(
        packetResult.serialize()
    );

    log(
        "debug",
        `!!! outbound lobby login response packet: ${loginResponsePacket
            .getBuffer()
            .toString("hex")}`
    );
    return {
        connection: dataConnection.connection,
        messages: [packetResult],
        log,
    };
}
