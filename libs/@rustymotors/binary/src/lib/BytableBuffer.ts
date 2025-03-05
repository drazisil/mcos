import { BytableObject } from "./types.js";

export class BytableBuffer implements BytableObject {
	protected name_: string = "";
	protected value_: Buffer = Buffer.alloc(0);

	deserialize(buffer: Buffer) {
		this.value_ = buffer;
	}

	get serializeSize() {
		return this.value_.length;
	}

	serialize() {
		return this.value_;
	}

	get json() {
		return {
			name: this.name_,
			serializeSize: this.serializeSize,
			value: this.value_.toString("hex"),
		};
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

	setValue(value: Buffer) {
		this.value_ = value;
	}

	getUint16(offset: number, _littleEndian: boolean): number {
		return this.value_.readUInt16BE(offset);
	}

	getUint32(offset: number, _littleEndian: boolean): number {
		return this.value_.readUInt32BE(offset);
	}
}
