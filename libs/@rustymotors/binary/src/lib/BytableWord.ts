import { Bytable } from "./Bytable";

export class BytableWord extends Bytable {
	private static validateBufferLength(
		buffer: Buffer,
		minLength: number,
		offset: number = 0,
	) {
		if (buffer.length < offset + minLength) {
			throw new Error("Cannot deserialize buffer with insufficient length");
		}
	}



	override deserialize(buffer: Buffer) {
		BytableWord.validateBufferLength(buffer, 2);
		super.deserialize(buffer.subarray(0, 2));
	}

	override get json() {
		return {
			name: this.name,
			value: this.buffer.getUint16(0, true),
			valueString: Buffer.from(this.buffer.buffer).toString("utf-8"),
			serializeSize: this.serializeSize,
		};
	}

	override toString() {
		return this.buffer.toString();
	}

	override get serializeSize(): number {
		return 2;
	}
}
