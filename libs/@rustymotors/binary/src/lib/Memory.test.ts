import { describe, it, expect, beforeEach } from "vitest";
import { Memory } from "./Memory.js";

describe("Memory", () => {
	let memory: Memory;

	beforeEach(() => {
		memory = new Memory(1024);
	});

	it("should initialize with the correct size", () => {
		expect(memory.size).toBe(1024);
	});

    it("should correctly get locked status", () => {
        expect(memory.locked).toBe(false);
        memory.lock();
        expect(memory.locked).toBe(true);
        memory.unlock();
        expect(memory.locked).toBe(false);
    });

	it("should read data correctly", () => {
		memory.write(0, new Uint8Array([1, 2]));
		const data = memory.read(0, 2);
		expect(data[0]).toBe(1);
		expect(data[1]).toBe(2);
	});

	it("should throw error on read out of bounds", () => {
		expect(() => memory.read(1023, 2)).toThrow(
			"Memory read out of bounds: 1023 + 2 > 1024",
		);
	});

	it("should write data correctly", () => {
		const data = new Uint8Array([1, 2]);
		memory.write(0, data);
		expect(memory.read(0, 2)[0]).toBe(1);
	});

	it("should throw error on write out of bounds", () => {
		const data = new Uint8Array([1, 2]);
		expect(() => memory.write(1023, data)).toThrow(
			"Memory write out of bounds: 1023 + 2 > 1024",
		);
	});

	it("should throw error when writing to locked memory", () => {
		memory.lock();
		const data = new Uint8Array([1, 2]);
		expect(() => memory.write(0, data)).toThrow("Memory is locked");
	});

	it("should compare data correctly", () => {
		const data = new Uint8Array([1, 2]);
		memory.write(0, data);
		expect(memory.compare(0, data)).toBe(true);
		expect(memory.compare(0, new Uint8Array([1, 3]))).toBe(false);
	});

	it("should throw error on compare out of bounds", () => {
		const data = new Uint8Array([1, 2]);
		expect(() => memory.compare(1023, data)).toThrow(
			"Memory compare out of bounds: 1023 + 2 > 1024",
		);
	});

	it("should get unsigned 16-bit value correctly", () => {
		memory.write(0, new Uint8Array([1, 2]));
		expect(memory.fetchInt16(0)).toBe(513); // little endian
        expect(memory.fetchInt16(0, false, "big")).toBe(258); // big endian
	});

    it("should get signed 16-bit value correctly", () => {
        memory.write(0, new Uint8Array([255, 255]));
        expect(memory.fetchInt16(0, true)).toBe(-1); // little endian
        expect(memory.fetchInt16(0, true, "big")).toBe(-1); // big endian
    });

	it("should throw error on get16 out of bounds", () => {
		expect(() => memory.fetchInt16(1023)).toThrow(
			"Memory word out of bounds: 1023 + 2 > 1024",
		);
	});

	it("should get unsigned 32-bit value correctly", () => {
		memory.write(0, new Uint8Array([1, 2, 3, 4]));
		expect(memory.get32(0)).toBe(67305985); // little endian
        expect(memory.get32(0, false, "big")).toBe(16909060); // big endian
	});

    it("should get signed 32-bit value correctly", () => {
        memory.write(0, new Uint8Array([255, 255, 255, 255]));
        expect(memory.get32(0, true)).toBe(-1); // little endian
        expect(memory.get32(0, true, "big")).toBe(-1); // big endian
    });

	it("should throw error on get32 out of bounds", () => {
		expect(() => memory.get32(1021)).toThrow(
			"Memory word out of bounds: 1021 + 4 > 1024",
		);
	});

	it("should lock and unlock memory correctly", () => {
		memory.lock();
		expect(() => memory.write(0, new Uint8Array([1]))).toThrow(
			"Memory is locked",
		);
		memory.unlock();
		expect(() => memory.write(0, new Uint8Array([1]))).not.toThrow();
	});

	it("should throw error on get16 with invalid address", () => {
		expect(() => memory.fetchInt16(1023)).toThrow(
			"Memory word out of bounds: 1023 + 2 > 1024",
		);
	});

	it("should throw error on get16 with undefined bytes", () => {
		memory = new Memory(2);
		expect(() => memory.fetchInt16(0)).toThrow(
			"Memory word out of bounds: 0 + 2 > 2",
		);
	});
});
