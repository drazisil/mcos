import type { ISerializable } from "rusty-motors-nps";
import { getAsHex } from "rusty-motors-nps";
import pino from "pino";
const defaultLogger = pino({ name: "UserAction" });


export class UserAction implements ISerializable {
	private name: string;
	private _endTimeMaybe = 0; // 4 bytes
	private _b1 = 0; // 1 byte
	private _b2 = 0; // 1 byte
	private _initiator = ""; // 64 bytes
	private _startComment = ""; // 256 bytes
	private _endComment = ""; // 256 bytes

	constructor(name: string) {
		this.name = name;
	}

	serialize(): Buffer {
		try {
			const buffer = Buffer.alloc(this.getSize());
			let offset = 0;
			buffer.writeUInt32BE(this._endTimeMaybe, offset);
			offset += 4;
			buffer.writeUInt8(this._b1, offset);
			offset += 1;
			buffer.writeUInt8(this._b2, offset);
			offset += 1;
			buffer.write(this._initiator, offset, 0x40, "utf8");
			offset += 0x40;
			buffer.write(this._startComment, offset, 0x100, "utf8");
			offset += 0x100;
			buffer.write(this._endComment, offset, 0x100, "utf8");

			return buffer;
		} catch (error: unknown) {
			defaultLogger.error(`Error serializing UserAction: ${error as string}`);
			throw error;
		}
	}
	deserialize(data: Buffer): void {
		try {
			this._endTimeMaybe = data.readUInt32BE(0);
			this._b1 = data.readUInt8(4);
			this._b2 = data.readUInt8(5);
			this._initiator = data.toString("utf8", 6, 0x46);
			this._startComment = data.toString("utf8", 0x46, 0x146);
			this._endComment = data.toString("utf8", 0x146, 0x246);
		} catch (error) {
			defaultLogger.error(`Error deserializing UserAction: ${error as string}`);
			throw error;
		}
	}
	getByteSize(): number {
		throw new Error("Method not implemented.");
	}
	setData(): void {
		throw new Error("Method not implemented.");
	}
	getData(): Buffer {
		throw new Error("Method not implemented.");
	}

	static fromBytes(name: string, bytes: Buffer): UserAction {
		const userAction = new UserAction(name);
		userAction.deserialize(bytes);

		return userAction;
	}

	toBytes(): Buffer {
		return this.serialize();
	}
	toString(): string {
		return `UserAction: ${this.name} - ${this._initiator} - ${this._startComment} - ${this._endComment}`;
	}
	toHex(): string {
		return getAsHex(this.serialize());
	}

	getSize(): number {
		return 4 + 1 + 1 + 0x40 + 0x100 + 0x100;
	}

	public set({
		endTimeMaybe,
		b1,
		b2,
		initiator,
		startComment,
		endComment,
	}: {
		endTimeMaybe?: number;
		b1?: number;
		b2?: number;
		initiator: string;
		startComment: string;
		endComment?: string;
	}): void {
		this._endTimeMaybe = endTimeMaybe || 0;
		this._b1 = b1 || 0;
		this._b2 = b2 || 0;
		this._initiator = initiator;
		this._startComment = startComment;
		this._endComment = endComment || "";
	}

	public clear(): void {
		this._endTimeMaybe = 0;
		this._b1 = 0;
		this._b2 = 0;
		this._initiator = "";
		this._startComment = "";
		this._endComment = "";
	}

	updateEmptyValuesFrom(other: UserAction) {
		if (this._endTimeMaybe === 0) {
			this._endTimeMaybe = other._endTimeMaybe;
		}
		if (this._b1 === 0) {
			this._b1 = other._b1;
		}
		if (this._b2 === 0) {
			this._b2 = other._b2;
		}
		if (this._initiator === "") {
			this._initiator = other._initiator;
		}
		if (this._startComment === "") {
			this._startComment = other._startComment;
		}
		if (this._endComment === "") {
			this._endComment = other._endComment;
		}
	}
}
