import { BytableBase } from "./BytableBase";
import { BytableObject } from "./types";

export class BytableContainer extends BytableBase implements BytableObject {
	private value_: string = "";
	private nullTerminated: boolean = false;
	private length: number = 0;
	private name_: string = "";
	static fromBuffer(
		buffer: Buffer,
		offset: number,
		nullTerminated: boolean = false,
		length: number = 0,
	) {
		const container = new this(buffer);
		container.setNullTerminated(nullTerminated);
		container.setLength(length);
		container.deserialize(buffer.subarray(offset));
		return container;
	}

	/**
	 * Set the value of the container.
	 * @param value - The value to set.
	 * @returns void
	 * @throws Error if the container is null terminated and the value is an empty string
	 */
	setValue(value: string) {
		if (this.nullTerminated && value.length === 0) {
			throw new Error("Cannot set empty string in null-terminated container");
		} else {
			this.value_ = value;
			this.length = this.value_.length;
		}
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

	get serializeSize() {
		if (this.nullTerminated) {
			return this.length + 1;
		} else {
			return this.length + 2;
		}
	}


	/**
	 * Serialize the container.
     * If the container is null terminated, the value is appended with a null terminator.
     * If the container is not null terminated, the length is prefixed to the value.
	 * @returns Buffer - The serialized container.
     * @throws Error if the container is null terminated and the value is an empty string
	 */
	override serialize() {
			if (this.nullTerminated) {
			if (this.value_.length === 0) {
				throw new Error("Cannot serialize empty string in null-terminated container");
			} else {
				return Buffer.from(this.value_ + "\0");
			}
			} else {
				const lengthPrefix = Buffer.alloc(2);
				lengthPrefix.writeUInt16BE(this.length, 0);
				return Buffer.concat([lengthPrefix, Buffer.from(this.value_)]);
			}
	}

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
}
