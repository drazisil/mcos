import { Bytable } from "./Bytable";

export class BytableDword extends Bytable {
	static override fromBuffer(buffer: Buffer, offset: number) {
		const dword = new this(buffer.subarray(offset, offset + 4));
		return dword;
	}

	override get json() {
		return {
			name: this.name,
			value: this.buffer.getUint32(0, true),
			valueString: Buffer.from(this.buffer.buffer).toString("utf-8"),
			serializeSize: this.serializeSize,
		};
	}

	override toString() {
		return this.buffer.toString();
	}
}
