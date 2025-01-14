import { Bytable } from "./Bytable";

export class BytableBase {
	protected buffer: DataView;

	constructor(buffer: Buffer) {
		this.buffer = new DataView(Uint8Array.from(buffer).buffer);
	}

	getUint16(this: BytableBase, offset: number, littleEndian: boolean = false) {
		return this.buffer.getUint16(offset, littleEndian);
	}

	getUint32(this: Bytable, offset: number, littleEndian: boolean = false) {
		return this.buffer.getUint32(offset, littleEndian);
	}

	toString(this: BytableBase) {
		return this.buffer.toString();
	}

	deserialize(this: BytableBase, buffer: Buffer) {
		this.buffer = new DataView(Uint8Array.from(buffer).buffer);
	}

	serialize(this: BytableBase) {
		return Buffer.from(this.buffer.buffer);
	}
}
