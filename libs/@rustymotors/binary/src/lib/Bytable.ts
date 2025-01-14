import { BytableBase } from "./BytableBase";
import { BytableObject } from "./types";

export class Bytable extends BytableBase implements BytableObject {
	protected name_: string = "";
	protected value_: string | number | Buffer = "";

	constructor(buffer: Buffer) {
		super(buffer);
	}

	static fromBuffer(buffer: Buffer, offset: number) {
		if (!buffer || offset < 0 || offset >= buffer.length) {
			throw new Error("Invalid buffer or offset");
		}
		const bytable = new this(buffer.subarray(offset));
		return bytable;
	}

	override serialize() {
		if (!this.buffer || this.buffer.byteLength === 0) {
			throw new Error('Cannot serialize empty buffer');
		}
		return Buffer.from(this.buffer.buffer);
	}

	override deserialize(buffer: Buffer) {
		if (!buffer || buffer.length === 0) {
			throw new Error('Cannot deserialize empty buffer');
		}
		this.buffer = new DataView(Uint8Array.from(buffer).buffer);
	}

	get json() {
		return {
			name: this.name_,
			serializeSize: this.serializeSize,
		};
	}

	get serializeSize() {
		return this.buffer.byteLength;
	}

	setName(name: string) {
		this.name_ = name;
	}

	get name() {
		return this.name_;
	}

	get value() {
		return this.value_;
	}



	setValue(value: string | number | Buffer) {
		this.validateValue(value);
		this.value_ = value;
	}
}

