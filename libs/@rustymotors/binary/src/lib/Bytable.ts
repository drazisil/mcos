import { BytableBase } from "./BytableBase";
import { BytableObject } from "./types";

export class Bytable extends BytableBase implements BytableObject {
	protected name_: string = "";
	protected value_: string | number | Buffer = "";

	constructor(buffer: Buffer) {
		super(buffer);
	}

	static fromBuffer(buffer: Buffer, offset: number) {
		const bytable = new this(buffer.subarray(offset));
		return bytable;
	}

	override serialize() {
		return Buffer.from(this.buffer.buffer);
	}

	override deserialize(buffer: Buffer) {
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
		this.value_ = value;
	}
}
