import { ServerError } from "../errors/ServerError.js";

export interface Serializable {
    data: Buffer;
    serialize(): Buffer;
    deserialize(buffer: Buffer): Serializable;
    length: number;
    toString(): string;
    asHex(): string;
}

export class BaseSerialized implements Serializable {
    protected _data: Buffer;

    constructor(data?: Buffer) {
        this._data = data || Buffer.alloc(0);
    }

    get data(): Buffer {
        return this._data;
    }

    set data(data: Buffer) {
        this._data = Buffer.from(data);
    }

    serialize(): Buffer {
        throw new ServerError("Not implemented");
    }

    deserialize(buffer: Buffer): Serializable {
        throw new ServerError("Not implemented");
    }

    get length(): number {
        return this._data.length;
    }

    toString(): string {
        return this.asHex();
    }

    asHex(): string {
        return this._data.toString("hex");
    }
}
