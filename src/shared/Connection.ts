import { randomUUID } from "node:crypto";
import { IConnection, ISocket, TEncryptionSession } from "./interfaces.js";

export class Connection implements IConnection {
    /**
     * @memberof Connection
     */
    static INACTIVE = 0;

    /**
     * @memberof Connection
     */
    static ACTIVE = 1;

    /**
     * @memberof Connection
     */
    static CLOSE_PENDING = 2;

    /**
     * @memberof Connection
     */
    static SOFT_KILL = 3;
    id: string;
    appID: number;
    status: number;
    socket: ISocket | null = null;
    remoteAddress: string;
    seq: number;
    personaId: number;
    lastMessageTimestamp: number;
    port: number;
    useEncryption: boolean;
    encryptionSession?: TEncryptionSession;
    ip: string | null = null;
    inQueue: boolean;

    constructor() {
        this.id = randomUUID();
        this.appID = 0;
        this.status = Connection.INACTIVE;
        this.socket = null;
        this.port = 0;
        this.useEncryption = false;
        this.ip = null;
        this.inQueue = false;
        this.remoteAddress = "";
        this.seq = 0;
        this.personaId = 0;
        this.lastMessageTimestamp = 0;
    }
}
