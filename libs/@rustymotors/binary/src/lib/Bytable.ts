import { get } from "http";
import { BytableBase } from "./BytableBase";
import { BytableObject } from "./types";
import { getServerLogger } from "rusty-motors-shared";

export class Bytable extends BytableBase implements BytableObject {
	protected name_: string = "";
	protected value_: string | number | Buffer = "";

	static fromBuffer(buffer: Buffer, offset: number) {
		const bytable = new this();

		if  (buffer.length === 4 && offset === 4) {
			// Some messages only consist of a id and a length
			getServerLogger().warn(`Buffer length is 4, skipping deserialization`);
			return bytable;
		}
		
		if (!buffer || offset < 0 || offset >= buffer.length) {
			getServerLogger().error(`Cannot deserialize buffer with invalid offset: ${offset}`);
			return bytable;
		}
		bytable.deserialize(buffer.subarray(offset));
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

