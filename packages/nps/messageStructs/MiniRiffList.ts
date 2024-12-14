import { putLenString } from "rusty-motors-nps";

import { BaseSerializable } from "./BaseSerializable.js";
import { logger } from "rusty-motors-utilities";
const defaultLogger = logger.child({ name: "MiniRiffList" });

const channelRecordSize = 40;

export class MiniRiffInfo extends BaseSerializable {
	riffName: string; // 32 bytes - max length
	riffId: number; // 4 bytes
	population: number; // 2 bytes

	constructor(riffName: string, riffId: number, population: number) {
		super();
		if (riffName.length > 32) {
			throw new Error(`Riff name too long: ${riffName}`);
		}

		this.riffName = riffName;
		this.riffId = riffId;
		this.population = population;
	}

	override serialize(): Buffer {
		const buffer = Buffer.alloc(this.getByteSize());
		let offset = 0;
		putLenString(buffer, offset, this.riffName, false);
		offset += 2 + this.riffName.length + 1;
		buffer.writeUInt32BE(this.riffId, offset);
		offset += 4;
		buffer.writeUInt16BE(this.population, offset);
		defaultLogger.debug(
			`MiniRiffInfo: ${this.toString()} - ${buffer.toString("hex")}`,
		);
		return buffer;
	}
	override getByteSize(): number {
		return 4 + this.riffName.length + 1 + 4 + 2;
	}
	override toString(): string {
		return `MiniRiffInfo(riffName=${this.riffName}, riffId=${this.riffId}, population=${this.population})`;
	}
}

export class MiniRiffList extends BaseSerializable {
	private riffs: MiniRiffInfo[] = [];

	override serialize(): Buffer {
		return this.toBytes();
	}
	override getByteSize(): number {
		return this.getSize();
	}

	getMaxRiffs(): number {
		return this.riffs.length;
	}

	addRiff(riff: MiniRiffInfo): void {
		this.riffs.push(riff);
	}

	toBytes(): Buffer {
		const buffer = Buffer.alloc(this.getSize());
		let offset = 0;
		buffer.writeUInt32BE(this.riffs.length, offset);
		offset += 4;
		for (const riff of this.riffs) {
			const riffBuffer = riff.serialize();
			riffBuffer.copy(buffer, offset);
			offset += riff.getByteSize();
		}

		defaultLogger.debug(
			`MiniRiffList: ${this.toString()} - ${buffer.toString("hex")}`,
		);
		return buffer;
	}
	override toString(): string {
		return `MiniRiffList(riffs=${this.riffs})`;
	}
	toHex(): string {
		return this.toBytes().toString("hex");
	}

	getSize(): number {
		let size = 4;
		for (const riff of this.riffs) {
			size += riff.getByteSize();
		}
		return size;
	}
}
