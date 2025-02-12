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

		override get serializeSize(): number {
			return 4;
		}

		override deserialize(buffer: Buffer) {
			BytableDword.validateBufferLength(buffer, 4);
			this.setValue(buffer.readUInt32BE(0));
		}

		override serialize() {
			const buffer = Buffer.alloc(4);
			buffer.writeUInt32BE(Number(this.value), 0);
			return buffer;
		}

		override get json() {
			return {
				name: this.name_,
				value: this.value,
				serializeSize: this.serializeSize,
			};
		}

		override toString() {
			return this.value.toString();
		}
	}
