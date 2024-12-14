import {
	BufferSerializer,
	ServerMessagePayload,
} from "rusty-motors-shared-packets";


export class StockCar extends BufferSerializer {
	private brandedPartId: number = 0; // 4 bytes
	private retailPrice: number = 0; // 4 bytes
	private isDealOfTheDay: number = 0; // 2 bytes

	override getByteSize(): number {
		return 10;
	}

	override serialize(): Buffer {
		try {
			const buffer = Buffer.alloc(this.getByteSize());
			buffer.writeUInt32LE(this.brandedPartId, 0);
			buffer.writeUInt32LE(this.retailPrice, 4);
			buffer.writeUInt16LE(this.isDealOfTheDay, 8);

			return buffer;
		} catch (error) {
			throw new Error(`Error serializing StockCar: ${error as string}`, {
				cause: error,
			});
		}
	}

	setBrandedPartId(brandedPartId: number) {
		this.brandedPartId = brandedPartId;
	}

	setRetailPrice(retailPrice: number) {
		this.retailPrice = retailPrice;
	}

	setIsDealOfTheDay(isDealOfTheDay: boolean) {
		this.isDealOfTheDay = isDealOfTheDay ? 1 : 0;
	}

	override toString(): string {
		return `StockCar: ${this.brandedPartId}, ${this.retailPrice}, ${this.isDealOfTheDay}`;
	}
}

export class StockCarInfo extends ServerMessagePayload {
	static MAX_CARS_PER_MESSAGE = 100;
	private _cars: StockCar[] = [];
	// msgNo: 2 bytes
	private _starterCash: number = 0; // 4 bytes
	private _dealerId: number = 0; // 4 bytes
	private _brandId: number = 0; // 4 bytes
	private _numberOfCars: number = 0; // 2 bytes
	private _moreCars: number = 0; // 2 bytes

	override getByteSize(): number {
		return (
			2 +
			4 +
			4 +
			4 +
			2 +
			1 +
			this._cars.length * StockCar.prototype.getByteSize()
		);
	}

	setStarterCash(starterCash: number) {
		this._starterCash = starterCash;
	}

	setDealerId(dealerId: number) {
		this._dealerId = dealerId;
	}

	setBrandId(brandId: number) {
		this._brandId = brandId;
	}

	override serialize(): Buffer {
		try {
			const buffer = Buffer.alloc(this.getByteSize());
			buffer.writeUInt16LE(this.getMessageId(), 0);
			buffer.writeUInt32LE(this._starterCash, 2);
			buffer.writeUInt32LE(this._dealerId, 6);
			buffer.writeUInt32LE(this._brandId, 10);
			buffer.writeUInt16LE(this.getNumberOfCars(), 14);
			buffer.writeInt8(this._moreCars, 16);

			let offset = 17;
			for (const car of this._cars) {
				car.serialize().copy(buffer, offset);
				offset += car.getByteSize();
			}

			return buffer;
		} catch (error) {
			throw new Error(`Error serializing StockCarInfo: ${error as string}`, {
				cause: error,
			});
		}
	}

	addCar(car: StockCar) {
		this._cars.push(car);
		this._numberOfCars = this._cars.length;
	}

	getNumberOfCars(): number {
		return this._numberOfCars;
	}

	setMoreCars(moreCars: boolean) {
		this._moreCars = moreCars ? 1 : 0;
	}

	override toString(): string {
		return `StockCarInfo: ${this._cars.length} cars, ${this._starterCash} starter cash, ${this._dealerId} dealerId, ${this._brandId} brandId`;
	}
}
