import { ServerMessagePayload } from "rusty-motors-shared-packets";
import { readStringFromBuffer } from "./utils.js";
import { logger, type Logger } from "rusty-motors-utilities";
const defaultLogger = logger.child({ name: "mcots.ClientConnectionMessage" });

export class ClientConnectionMessage extends ServerMessagePayload {
	private _customerId: number = 0; // 4 bytes
	private _personaId: number = 0; // 4 bytes
	private _customerName: string = ""; // 13 bytes
	private _personaName: string = ""; // 13 bytes
	private _clientVersion: number = 0; // 4 bytes

	constructor(size: number) {
		super();

		this._data = Buffer.alloc(size);
	}

	override getByteSize(): number {
		return 2 + 4 + 4 + 13 + 13 + 4; // 40 bytes
	}

	override deserialize(data: Buffer): ClientConnectionMessage {
		try {
			this._assertEnoughData(data, this.getByteSize());

			this.messageId = data.readUInt16LE(0);

			this._customerId = data.readUInt32LE(2);

			this._personaId = data.readUInt32LE(6);

			this._customerName = readStringFromBuffer(data, 10, 23);

			this._personaName = readStringFromBuffer(data, 23, 36);

			this._clientVersion = data.readUInt32LE(36);

			return this;
		} catch (error) {
			defaultLogger.error(
				`Error deserializing ClientTrackingMessage: ${error as string}`,
			);
			throw error;
		}
	}

	getCustomerId() {
		return this._customerId;
	}

	getPersonaId() {
		return this._personaId;
	}

	getCustomerName() {
		return this._customerName;
	}

	getPersonaName() {
		return this._personaName;
	}

	getClientVersion() {
		return this._clientVersion;
	}

	override toString(): string {
		return `ClientConnectionMessage {customerId: ${this._customerId}, personaId: ${this._personaId}, customerName: ${this._customerName}, personaName: ${this._personaName}, clientVersion: ${this._clientVersion}}`;
	}
}
