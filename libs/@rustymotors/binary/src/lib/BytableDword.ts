import { Bytable } from "./Bytable";

export class BytableDword extends Bytable {
		private static validateBufferLength(
			buffer: Buffer,
			minLength: number,
			offset: number = 0,
		) {
			if (buffer.length < offset + minLength) {
				throw new Error("Cannot deserialize buffer with insufficient length");
			}
		}

		static override fromBuffer(buffer: Buffer, offset: number) {
			BytableDword.validateBufferLength(buffer, 4, offset);
			const dword = new BytableDword(buffer.subarray(offset, offset + 4));

			return dword;
		}

		override deserialize(buffer: Buffer) {
			BytableDword.validateBufferLength(buffer, 4);
			super.deserialize(buffer.subarray(0, 4));
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
