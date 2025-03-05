import { ServerPacket } from "rusty-motors-shared-packets";

export class PurchaseStockCarMessage extends ServerPacket {
    dealerId = 0;
    brandedPardId = 0;
    skinId = 0;
    tradeInCarId = 0;

    constructor() {
        super();
        this.messageId = 142;
    }

    override getByteSize(): number {
        return this.header.getByteSize()
            + 2
            + 4 * 4;
    }

    override serialize(): Buffer {
        throw new Error("Method not implemented.");
    }

    override deserialize(data: Buffer): ThisType<PurchaseStockCarMessage> {
        this.header.deserialize(data.subarray(0, this.header.getByteSize()));
        this._data = data.subarray(this.header.getByteSize());
        this._assertEnoughData(this._data, 16);
        this.messageId = this._data.readUInt16LE(0);
        this.dealerId = this._data.readUInt32LE(2);
        this.brandedPardId = this._data.readUInt32LE(6);
        this.skinId = this._data.readUInt32LE(10);
        this.tradeInCarId = this._data.readUInt32LE(14);

        return this;
    }

    override toString() {
        return `PurchaseStockCarMessage: ${this.dealerId}, ${this.brandedPardId}, ${this.skinId}, ${this.tradeInCarId}`;
    }
}
