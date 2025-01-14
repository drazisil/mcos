import { Bytable } from "./Bytable";

export class BytableBase {
		protected buffer: DataView;

		constructor(buffer: Buffer) {
			this.buffer = new DataView(Uint8Array.from(buffer).buffer);
		}

		getUint16(
			this: BytableBase,
			offset: number,
			littleEndian: boolean = false,
		) {
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

		/**
		 * Validate the value of the container.
		 * @param value - The value to validate.
		 * @returns void
		 * @throws Error if the value is NaN or an empty buffer
		 */
		protected validateValue(value: string | number | Buffer) {
			if (typeof value === "number" && Number.isNaN(value)) {
				throw new Error("Cannot set NaN value");
			}
			if (value instanceof Buffer && value.length === 0) {
				throw new Error("Cannot set empty buffer");
			}
		}

		/**
		 * Get the byte length of the value.
		 * @param value - The value to get the byte length of.
		 * @returns The byte length of the value.
		 */
		protected getByteLength(value: string | number | Buffer) {
			if (value instanceof Buffer) {
				return value.byteLength;
			}
			// Convert strings and numbers to Buffer to get correct byte length
			return Buffer.from(String(value)).byteLength;
		}

		protected validateString(value: string) {
			if (value.length === 0) {
				throw new Error("Cannot set empty string");
			}
		}

        protected toBuffer(value: string | number | Buffer) {
            if (value instanceof Buffer) {
                return value;
            }
            return Buffer.from(String(value));
        }
	}
