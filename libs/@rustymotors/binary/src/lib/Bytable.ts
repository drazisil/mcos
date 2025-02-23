import { BytableBase } from "./BytableBase.js";
import { BytableObject } from "./types.js";

export class Bytable extends BytableBase implements BytableObject {
	protected name_: string = "";
	protected value_: string | number | Buffer = "";


	protected deserializeFields(buffer: Buffer) {
		this.buffer = new DataView(Uint8Array.from(buffer).buffer);
	}
	
	override deserialize(buffer: Buffer) {
		validateBuffer(buffer, 'deserialize');
		return this.deserializeFields(buffer);
	}

	protected serializeFields(): Buffer {
		return Buffer.from(this.buffer.buffer);
	}
	
	override serialize(): Buffer {
		validateBuffer(this.buffer, 'serialize');
		return this.serializeFields();
	}
	
	
	get json() {
		return {
			name: this.name_,
			serializeSize: this.serializeSize,
		};
	}

	override get serializeSize(): number {
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

	override toString() {
		return `BytableBase { name: ${this.name_}, value: ${this.value_} }`;
	}
}

export function validateBuffer(buf: DataView<ArrayBufferLike> | ArrayBufferLike, direction: string) {
	if (typeof buf === 'undefined') {
		throw new Error(`Cannot ${direction} undefined buffer`);
	}

	if (buf.byteLength === 0) {
		throw new Error(`Cannot ${direction} empty buffer`);
	}
}
