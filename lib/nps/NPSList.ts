import { Message } from "./BareMessage.js";

export class NPSList implements Message {
    private list: Message[] = [];

    toBytes(): Buffer {
        throw new Error("Method not implemented.");
    }
    toString(): string {
        throw new Error("Method not implemented.");
    }
    toHex(): string {
        throw new Error("Method not implemented.");
    }
    setData(data: Buffer): void {
        throw new Error("Method not implemented.");
    }
    getData(): Buffer {
        throw new Error("Method not implemented.");
    }

    getSize(): number {
        return 0;
    }
}

export class ProfileList extends NPSList implements Message {
    maxProfiles = 0;

    getMaxProfiles(): number {
        return this.maxProfiles;
    }

    override toBytes(): Buffer {
        throw new Error("Method not implemented.");
    }
    override toString(): string {
        throw new Error("Method not implemented.");
    }
    override toHex(): string {
        throw new Error("Method not implemented.");
    }
    override setData(data: Buffer): void {
        throw new Error("Method not implemented.");
    }
    override getData(): Buffer {
        throw new Error("Method not implemented.");
    }

    override getSize(): number {
        return 0;
    }
}
