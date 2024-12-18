import type { ISerializable } from "../types.ts";

export class NPSList implements ISerializable {
	serialize(): Buffer {
		throw new Error("Method not implemented.");
	}
	deserialize(_data: Buffer): void {
		throw new Error("Method not implemented.");
	}
	getByteSize(): number {
		throw new Error("Method not implemented.");
	}

	toBytes(): Buffer {
		throw new Error("Method not implemented.");
	}
	toString(): string {
		throw new Error("Method not implemented.");
	}
	toHex(): string {
		throw new Error("Method not implemented.");
	}
	setData(_data: Buffer): void {
		throw new Error("Method not implemented.");
	}
	getData(): Buffer {
		throw new Error("Method not implemented.");
	}

	getSize(): number {
		return 0;
	}
}
