export interface Serializable {
	data: Buffer;
	serialize(): Buffer;
	deserialize<T extends Serializable>(buffer: Buffer): T;
	length: number;
	toString(): string;
	asHex(): string;
	size(): number;
}

/**
 * Base class for all serialized objects
 * Just a wrapper around a buffer
 */
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
		throw Error("Not implemented");
	}

	deserialize<T extends Serializable>(_buffer: Buffer): T {
		throw Error("Not implemented");
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

	size(): number {
		return this._data.length;
	}
}
