export class Memory {
	private memorySize: number;
	private memory: Uint8Array = new Uint8Array(0);
	private isMemoryLocked: boolean = false;

	constructor(size: number) {
		this.memorySize = size;
		this.memory = new Uint8Array(size);
	}
	read(address: number, length: number) {
		if (address + length > this.memorySize) {
			throw new Error(
				`Memory read out of bounds: ${address} + ${length} > ${this.memorySize}`,
			);
		}

		const readOnlyCopy = new Uint8Array(length);
		readOnlyCopy.set(this.memory.slice(address, address + length));
		return readOnlyCopy;
	}

	write(address: number, data: Uint8Array) {
		if (this.isMemoryLocked) {
			throw new Error("Memory is locked");
		}

		this.isMemoryLocked = true;

		if (address + data.length > this.memorySize) {
			throw new Error(
				`Memory write out of bounds: ${address} + ${data.length} > ${this.memorySize}`,
			);
		}

		this.memory.set(data, address);

		this.isMemoryLocked = false;
	}

	compare(address: number, data: Uint8Array) {
		if (address + data.length > this.memorySize) {
			throw new Error(
				`Memory compare out of bounds: ${address} + ${data.length} > ${this.memorySize}`,
			);
		}

		for (let i = 0; i < data.length; i++) {
			if (this.memory[address + i] !== data[i]) {
				return false;
			}
		}

		return true;
	}

	fetchInt16(address: number, signed = false, endianness: "little" | "big" = "little") {
		if (address + 4 > this.memorySize) {
			throw new Error(
				`Memory word out of bounds: ${address} + 2 > ${this.memorySize}`,
			);
		}

		const data = new DataView(this.memory.buffer);

        if (signed) {
            return data.getInt16(address, endianness === "little");
        } else {
		    return data.getUint16(address, endianness === "little");
        }
	}

	get32(address: number, signed = false, endianness: "little" | "big" = "little") {
		if (address + 8 > this.memorySize) {
			throw new Error(
				`Memory word out of bounds: ${address} + 4 > ${this.memorySize}`,
			);
		}

		const data = new DataView(this.memory.buffer);
		
        if (signed) {
            return data.getInt32(address, endianness === "little");
        } else {
            return data.getUint32(address, endianness === "little");
        }
	}

	lock() {
		this.isMemoryLocked = true;
	}

	unlock() {
		this.isMemoryLocked = false;
	}

    get locked() {
        return this.isMemoryLocked;
    }

    get size() {
        return this.memorySize;
    }
}
