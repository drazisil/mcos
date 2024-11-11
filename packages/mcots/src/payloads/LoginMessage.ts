import { getServerLogger } from "rusty-motors-shared";
import { ServerMessagePayload } from "rusty-motors-shared-packets";

const log = getServerLogger({
	name: "LoginMessage",
});

export class LoginMessage extends ServerMessagePayload {
	private _customerId: number = 0; // 4 bytes
	private _personaId: number = 0; // 4 bytes
	private _lotOwnerId: number = 0; // 4 bytes
	private _brandedPartId: number = 0; // 4 bytes
	private _skinId: number = 0; // 4 bytes
	private _personaName: string = ""; // 13 bytes
	private _mcVersion: string = ""; // 4 bytes

	constructor(size: number) {
		super();

		this._data = Buffer.alloc(size);
	}

	override getByteSize(): number {
		return 2 + 4 + 4 + 4 + 4 + 4 + 13 + 4;
	}

	override deserialize(data: Buffer): LoginMessage {
		try {
			this._assertEnoughData(data, this.getByteSize());

			this.messageId = data.readUInt16LE(0);

			this._customerId = data.readUInt32LE(2);

			this._personaId = data.readUInt32LE(6);

			this._lotOwnerId = data.readUInt32LE(10);

			this._brandedPartId = data.readUInt32LE(14);

			this._skinId = data.readUInt32LE(18);

			this._personaName = data.toString("utf8", 22, 35);

			this._mcVersion = data.toString("utf8", 35, 39);

			return this;
		} catch (error) {
			throw new Error(`Error deserializing LoginMessage: ${error as string}`, {
				cause: error,
			});
		}
	}

	getCustomerId() {
		return this._customerId;
	}

	getPersonaId() {
		return this._personaId;
	}

	getLotOwnerId() {
		return this._lotOwnerId;
	}

	getBrandedPartId() {
		return this._brandedPartId;
	}

	getSkinId() {
		return this._skinId;
	}

	getPersonaName() {
		return this._personaName;
	}

	getClientVersion() {
		return this._mcVersion;
	}

	override toString(): string {
		return `LoginMessage: ${this.getPersonaName()}, customerId: ${this.getCustomerId()}, personaId: ${this.getPersonaId()}, lotOwnerId: ${this.getLotOwnerId()}, brandedPartId: ${this.getBrandedPartId()}, skinId: ${this.getSkinId()}, mcVersion: ${this.getClientVersion()}`;
	}
}
