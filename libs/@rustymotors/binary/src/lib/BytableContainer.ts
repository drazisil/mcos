import { BytableBase } from "./BytableBase.js";
import { BytableObject } from "./types.js";

export class BytableShortContainer extends BytableBase implements BytableObject {
	private value_: string | number | Buffer = "";
	private nullTerminated: boolean = false;
	private length: number = 0;
	private name_: string = "";

	/**
	 * Set the value of the container.
	 * @param value - The value to set.
	 * @returns void
	 * @throws Error if the container is null terminated and the value is an empty string
	 */
	setValue(value: string | number | Buffer) {
		this.validateValue(value);
		if (this.nullTerminated && typeof value === "string") {
			this.validateString(value);
		}
		this.value_ = value;
		this.length = this.getByteLength(value);
	}

	getValue() {
		return this.value_;
	}

	setNullTerminated(_nullTerminated: boolean) {
		throw new Error("Method not implemented.");
	}

	getNullTerminated() {
		return this.nullTerminated;
	}

	/**
	 * Set the length of the container.
	 * @param length - The length of the container.
	 * @returns void
	 * @throws Error if the container is set to null terminated
	 */
	setLength(length: number) {
		if (this.nullTerminated) {
			throw new Error("Cannot set length for null terminated container");
		} else {
			this.length = length;
		}
	}

	getLength() {
		return this.length;
	}

	override get serializeSize() {
		if (this.nullTerminated) {
			return this.length + 1;
		} else {
			return this.length + 2;
		}
	}



	/**
	 * Serialize the container.
	 * @returns Buffer - The serialized container.
	 */
    override serialize() {
        const value = this.toBuffer(this.value_);
			if (this.nullTerminated) {
                return value.length === 0 ? Buffer.from("\0") : Buffer.concat([value, Buffer.from("\0")]);
			} else {
				const lengthPrefix = Buffer.alloc(2);
				lengthPrefix.writeUInt16BE(this.length, 0);
				return Buffer.concat([lengthPrefix, value]);
			}
	}

	/**
	 * Deserialize the container.
	 * @param buffer - The buffer to deserialize.
	 * @returns void
	 */
	override deserialize(buffer: Buffer) {
		const offset = 0;
		if (this.nullTerminated) {
			let length = 0;
			let cursor = 0;
			do {
				this.setValue(
					buffer.subarray(offset, offset + length).toString("utf-8"),
				);
				cursor++;
			} while (buffer[offset + cursor] !== 0);
			this.setValue(buffer.subarray(offset, offset + length).toString("utf-8"));
			this.length = length + 1;
		} else {
			const length = buffer.readUInt16BE(offset);
			this.setValue(
				buffer.subarray(offset + 2, offset + length + 2).toString("utf-8"),
			);
			this.length = length;
		}
	}

	get json() {
		return {
			name: this.name_,
			value: this.value_,
			length: this.length,
			nullTerminated: this.nullTerminated,
			serializeSize: this.serializeSize,
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

	override toString(): string {
		throw new Error("Method not implemented.");
	}
}


export class BytableContainer extends BytableBase implements BytableObject {
	private value_: string | number | Buffer = "";
	private nullTerminated: boolean = false;
	private length: number = 0;
	private name_: string = "";

	/**
	 * Set the value of the container.
	 * @param value - The value to set.
	 * @returns void
	 * @throws Error if the container is null terminated and the value is an empty string
	 */
	setValue(value: string | number | Buffer) {
		this.validateValue(value);
		if (this.nullTerminated && typeof value === "string") {
			this.validateString(value);
		}
		this.value_ = value;
		this.length = this.getByteLength(value);
	}

	getValue() {
		return this.value_;
	}

	setNullTerminated(nullTerminated: boolean) {
		this.nullTerminated = nullTerminated;
	}

	getNullTerminated() {
		return this.nullTerminated;
	}

	/**
	 * Set the length of the container.
	 * @param length - The length of the container.
	 * @returns void
	 * @throws Error if the container is set to null terminated
	 */
	setLength(length: number) {
		if (this.nullTerminated) {
			throw new Error("Cannot set length for null terminated container");
		} else {
			this.length = length;
		}
	}

	getLength() {
		return this.length;
	}

	override get serializeSize() {
		if (this.nullTerminated) {
			return this.length + 1;
		} else {
			return this.length + 4;
		}
	}



	/**
	 * Serialize the container.
	 * @returns Buffer - The serialized container.
	 */
    override serialize() {
        const value = this.toBuffer(this.value_);
			if (this.nullTerminated) {
                return value.length === 0 ? Buffer.from("\0") : Buffer.concat([value, Buffer.from("\0")]);
			} else {
				const lengthPrefix = Buffer.alloc(4);
				lengthPrefix.writeUInt32BE(this.length, 0);
				return Buffer.concat([lengthPrefix, value]);
			}
	}

	/**
	 * Deserialize the container.
	 * @param buffer - The buffer to deserialize.
	 * @returns void
	 */
	override deserialize(buffer: Buffer) {
		const offset = 0;
		if (this.nullTerminated) {
			let length = 0;
			let cursor = 0;
			do {
				this.setValue(
					buffer.subarray(offset, offset + length).toString("utf-8"),
				);
				cursor++;
			} while (buffer[offset + cursor] !== 0);
			this.setValue(buffer.subarray(offset, offset + length).toString("utf-8"));
			this.length = length + 1;
		} else {
			const length = buffer.readUInt32BE(offset);
			this.setValue(
				buffer.subarray(offset + 4, offset + length + 4).toString("utf-8"),
			);
			this.length = length;
		}
	}

	get json() {
		return {
			value: this.value_,
			length: this.length,
			nullTerminated: this.nullTerminated,
			serializeSize: this.serializeSize,
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

	override toString(): string {
		throw new Error("Method not implemented.");
	}
}
