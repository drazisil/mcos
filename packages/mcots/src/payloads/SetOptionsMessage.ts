import { getServerLogger } from "rusty-motors-shared";
import { ServerMessagePayload } from "rusty-motors-shared-packets";

const log = getServerLogger({
	name: "SetOptionsMessage",
});

export class SetOptionsMessage extends ServerMessagePayload {
	private _lpCode: number = 0; // 2 bytes
	private _lpText: string = ""; // 8 bytes
	private _carInfoSettings: number = 0; // 4 bytes
	private _carNumbers = {
		carNumber1: "", // 3 bytes
		carNumber2: "", // 3 bytes
		carNumber3: "", // 3 bytes
		carNumber4: "", // 3 bytes
		carNumber5: "", // 3 bytes
		carNumber6: "", // 3 bytes
	};

	constructor() {
		super();

		this._data = Buffer.alloc(this.getByteSize());
	}

	override getByteSize(): number {
		return 2 + 8 + 4 + 3 * 6;
	}

	override deserialize(data: Buffer): SetOptionsMessage {
		try {
			this._assertEnoughData(data, this.getByteSize());

			this.messageId = data.readUInt16LE(0);

			this._lpCode = data.readUInt16LE(2);

			this._lpText = data.toString("utf8", 4, 12);

			this._carInfoSettings = data.readUInt32LE(12);

			this._carNumbers.carNumber1 = data.toString("utf8", 16, 19);
			this._carNumbers.carNumber2 = data.toString("utf8", 19, 22);
			this._carNumbers.carNumber3 = data.toString("utf8", 22, 25);
			this._carNumbers.carNumber4 = data.toString("utf8", 25, 28);
			this._carNumbers.carNumber5 = data.toString("utf8", 28, 31);
			this._carNumbers.carNumber6 = data.toString("utf8", 31, 34);

			return this;
		} catch (error) {
			throw new Error(`Error deserializing SetOptionsMessage: ${error as string}`,
				{
					cause: error,
				});
		}
	}

	getLpCode() {
		return this._lpCode;
	}

	getLpText() {
		return this._lpText;
	}

	getCarInfoSettings() {
		return this._carInfoSettings;
	}

	getCarNumbers() {
		return this._carNumbers;
	}

	override toString() {
		return `SetOptionsMessage: lpCode=${this._lpCode}, lpText=${this._lpText}, carInfoSettings=${this._carInfoSettings}, carNumbers=${JSON.stringify(this._carNumbers)}`;
	}
}
