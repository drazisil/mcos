import type { Serializable } from "./BaseSerialized.js";
import { SerializedBuffer } from "./SerializedBuffer.js";

class HeaderShim {
	private _realObject: ServerMessage;

	constructor(realObject: ServerMessage) {
		this._realObject = realObject;
	}

	get flags(): number {
		return this._realObject.flags;
	}

	set flags(value: number) {
		this._realObject.flags = value;
	}
}

/**
 * A serialized buffer, with the following fields:
 * - 2-byte total length
 * - 4-byte signature (TOMC)
 * - 4-byte sequence number
 * - 1-byte flags
 * - data
 */
export class ServerMessage extends SerializedBuffer {
	private _signature = "TOMC";
	private _sequence: number = 0;
	private _flags: number = 0;
	_header: HeaderShim;

	constructor(sequence: number = 0, flags: number = 0, data?: Buffer) {
		super();
		this._sequence = sequence;
		this._flags = flags;
		this._data = data || Buffer.alloc(0);
		this._header = new HeaderShim(this);
	}
	override serialize() {
		const buffer = Buffer.alloc(11 + this._data.length);
		buffer.writeInt16LE(this._data.length + 9, 0);
		buffer.write(this._signature, 2);
		buffer.writeInt32LE(this._sequence, 6);
		buffer.writeInt8(this._flags, 10);
		this._data.copy(buffer, 11);
		return buffer;
	}
	override deserialize<T extends Serializable>(buffer: Buffer): T {
		if (buffer.length < 11) {
			throw Error(`Unable to get header from buffer, got ${buffer.length}`);
		}
		const length = buffer.readUInt16LE(0);
		if (buffer.length < length) {
			throw Error(`Expected buffer of length ${length}, got ${buffer.length}`);
		}
		this._signature = buffer.toString("ascii", 2, 6);
		this._sequence = buffer.readInt32LE(6);
		this._flags = buffer.readInt8(10);
		this._data = buffer.subarray(11, 11 + length);
		return this as unknown as T;
	}

	override get data(): Buffer {
		return this._data;
	}

	override set data(data: Buffer) {
		this._data = Buffer.from(data);
	}

	setBuffer(buffer: Buffer) {
		this._data = buffer;
	}

	override get length(): number {
		return 11 + this._data.length;
	}

	override asHex(): string {
		return this.serialize().toString("hex");
	}

	public get flags(): number {
		return this._flags;
	}
	public set flags(value: number) {
		this._flags = value;
	}

	toHexString(): string {
		return this.serialize().toString("hex");
	}

	get sequenceNumber(): number {
		return this._sequence;
	}
}
