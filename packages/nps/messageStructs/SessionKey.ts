import { getAsHex, isOnlyOneSet } from "rusty-motors-nps";
import { BaseSerializable } from "./BaseSerializable.js";
import pino from "pino";
const defaultLogger = pino({ name: "SessionKey" });

export class SessionKey extends BaseSerializable {
	private key: Buffer = Buffer.alloc(0);
	private timestamp: number = 0;
	private _isSet: boolean = false;

	constructor({ key, timestamp }: { key?: Buffer; timestamp?: number }) {
		super();
		if (isOnlyOneSet(key, timestamp)) {
			throw new Error("Both key and timestamp must be set if one is set");
		}

		if (typeof key !== "undefined" && typeof timestamp !== "undefined") {
			defaultLogger.debug(`SessionKey: key=${getAsHex(key)}, timestamp=${timestamp}`);
			this.key = key;
			this.timestamp = timestamp;
			this._isSet = true;
		}
	}
	override serialize(): Buffer {
		return this.toBytes();
	}
	override deserialize(data: Buffer): void {
		SessionKey.fromBytes(data);
	}
	override getByteSize(): number {
		throw new Error("Method not implemented.");
	}

	static fromBytes(bytes: Buffer): SessionKey {
		defaultLogger.debug("SessionKey.fromBytes");
		const keyLength = bytes.readUInt16BE(0);

		// Set the data offset
		const dataOffset = 2 + keyLength;

		const key = bytes.subarray(2, dataOffset);

		defaultLogger.debug(`SessionKey.fromBytes: key=${getAsHex(key)}`);

		// Get the timestamp
		const timestamp = bytes.readUInt32BE(dataOffset);

		return new SessionKey({
			key,
			timestamp,
		});
	}

	static fromKeyString(key: string): SessionKey {
		const keyBuffer = Buffer.from(key, "hex");

		return new SessionKey({
			key: keyBuffer,
			timestamp: 0,
		});
	}

	getKey(): string {
		return this.key.toString("hex");
	}

	override toString(): string {
		return `SessionKey(key=${this.getKey()}, timestamp=${this.timestamp})`;
	}

	toHex(): string {
		return getAsHex(this.toBytes());
	}

	toBytes(): Buffer {
		if (!this.isSet()) {
			throw new Error("Session key is not set");
		}

		const keyLength = this.key.length;
		const timestamp = this.timestamp;

		const buffer = Buffer.alloc(2 + keyLength + 4);

		buffer.writeUInt16BE(keyLength, 0);
		this.key.copy(buffer, 2);
		buffer.writeUInt32BE(timestamp, 2 + keyLength);

		return buffer;
	}

	getSize(): number {
		return this.key.length + 6;
	}

	getData(): Buffer {
		throw new Error("Method not implemented.");
	}

	setData(): void {
		throw new Error("Method not implemented.");
	}

	isSet(): boolean {
		return this._isSet;
	}
}
