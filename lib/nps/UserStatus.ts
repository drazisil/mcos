import { Message } from "./BareMessage.js";
import { SessionKey } from "./SessionKey.js";
import { getAsHex } from "./pureGet.js";

export class UserAction implements Message {
    private name: string;
    private data: Buffer = Buffer.alloc(0);

    constructor(name: string, bytes?: Buffer) {
        this.name = name;
        if (bytes) {
            this.data = bytes;
        }
    }
    setData(data: Buffer): void {
        throw new Error("Method not implemented.");
    }
    getData(): Buffer {
        throw new Error("Method not implemented.");
    }

    static fromBytes(name: string, bytes: Buffer): UserAction {
        const dara = bytes.toString("utf8");

        return new UserAction(name, bytes);
    }

    toBytes(): Buffer {
        return Buffer.from(this.name, "utf8");
    }
    toString(): string {
        return this.name;
    }
    toHex(): string {
        return getAsHex(this.toBytes());
    }

    getSize(): number {
        return this.name.length;
    }
}

export class UserStatus implements Message {
    private customerId: number;
    private personaId: number;
    private isCacheHit: boolean;
    private ban: UserAction;
    private gag: UserAction;
    private sessionKey: SessionKey;

    constructor(
        customerId: number,
        personaId: number,
        isCacheHit: boolean,
        ban: UserAction,
        gag: UserAction,
        sessionKey: SessionKey,
    ) {
        this.customerId = customerId;
        this.personaId = personaId;
        this.isCacheHit = isCacheHit;
        this.ban = ban;
        this.gag = gag;
        this.sessionKey = sessionKey;
    }

    static new(): UserStatus {
        return new UserStatus(
            0,
            0,
            false,
            new UserAction("ban"),
            new UserAction("gag"),
            new SessionKey(Buffer.alloc(12), 0),
        );
    }

    static fromBytes(bytes: Buffer): UserStatus {
        let offset = 0;
        const customerId = bytes.readUInt32BE(offset);
        offset += 4;
        const personaId = bytes.readUInt32BE(offset);
        offset += 4;
        const isCacheHit = bytes.readUInt8(offset) === 1;
        offset += 1;
        const ban = UserAction.fromBytes("ban", bytes.subarray(offset));
        offset += ban.getSize();
        const gag = UserAction.fromBytes("gag", bytes.subarray(offset));
        offset += gag.getSize();
        const sessionKey = SessionKey.fromBytes(bytes.subarray(offset));

        return new UserStatus(
            customerId,
            personaId,
            isCacheHit,
            ban,
            gag,
            sessionKey,
        );
    }

    toBytes(): Buffer {
        const buffer = Buffer.alloc(this.getSize());

        let offset = 0;
        buffer.writeUInt32BE(this.customerId, offset);
        offset += 4;
        buffer.writeUInt32BE(this.personaId, offset);
        offset += 4;
        buffer.writeUInt8(this.isCacheHit ? 1 : 0, offset);
        offset += 1;
        this.ban.toBytes().copy(buffer, offset);
        offset += this.ban.getSize();
        this.gag.toBytes().copy(buffer, offset);
        offset += this.gag.getSize();
        this.sessionKey.toBytes().copy(buffer, offset);
        offset += this.sessionKey.getSize();

        return buffer;
    }

    getSize(): number {
        return (
            14 +
            this.ban.getSize() +
            this.gag.getSize() +
            this.sessionKey.getSize()
        );
    }

    getCustomerId(): number {
        return this.customerId;
    }

    setCustomerId(customerId: number) {
        this.customerId = customerId;
    }

    getPersonaId(): number {
        return this.personaId;
    }

    setPersonaId(personaId: number) {
        this.personaId = personaId;
    }

    getSessionKey(): SessionKey {
        return this.sessionKey;
    }

    setSessionKey(sessionKey: SessionKey) {
        this.sessionKey = sessionKey;
    }

    setBan(ban: UserAction) {
        this.ban = ban;
    }

    getGag(): UserAction {
        return this.gag;
    }

    setGag(gag: UserAction) {
        this.gag = gag;
    }

    toString(): string {
        return `Customer ID: ${this.customerId}, Persona ID: ${
            this.personaId
        }, Is Cache Hit: ${
            this.isCacheHit
        }, Ban: ${this.ban.toString()}, Gag: ${this.gag.toString()}, Session Key: ${this.sessionKey.toString()}`;
    }

    toHex(): string {
        return this.toBytes().toString("hex");
    }

    getData(): Buffer {
        return this.toBytes();
    }

    setData(data: Buffer) {
        throw new Error("Method not implemented.");
    }
}
