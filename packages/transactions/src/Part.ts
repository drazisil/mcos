import { SerializedBufferOld } from "rusty-motors-shared";


export class Part extends SerializedBufferOld {
    _partId: number; // 4 bytes
    _parentPartId: number; // 4 bytes
    _brandedPartId: number; // 4 bytes
    _repairPrice: number; // 4 bytes
    _junkPrice: number; // 4 bytes
    _wear: number; // 4 bytes
    _attachmentPoint: number; // 1 byte
    _damage: number; // 1 byte

    constructor() {
        super();
        this._partId = 0; // 4 bytes
        this._parentPartId = 0; // 4 bytes
        this._brandedPartId = 0; // 4 bytes
        this._repairPrice = 0; // 4 bytes
        this._junkPrice = 0; // 4 bytes
        this._wear = 0; // 4 bytes
        this._attachmentPoint = 0; // 1 byte
        this._damage = 0; // 1 byte
    }

    override size() {
        return 26;
    }

    override serialize() {
        const buffer = Buffer.alloc(this.size());
        let offset = 0;
        buffer.writeUInt32LE(this._partId, offset);
        offset += 4; // offset is 4
        buffer.writeUInt32LE(this._parentPartId, offset);
        offset += 4; // offset is 8
        buffer.writeUInt32LE(this._brandedPartId, offset);
        offset += 4; // offset is 12
        buffer.writeUInt32LE(this._repairPrice, offset);
        offset += 4; // offset is 16
        buffer.writeUInt32LE(this._junkPrice, offset);
        offset += 4; // offset is 20
        buffer.writeUInt32LE(this._wear, offset);
        offset += 4; // offset is 24
        buffer.writeUInt8(this._attachmentPoint, offset);
        offset += 1; // offset is 25
        buffer.writeUInt8(this._damage, offset);
        offset += 1; // offset is 26

        return buffer;
    }

    override toString() {
        return `Part: partId=${this._partId} parentPartId=${this._parentPartId} brandedPartId=${this._brandedPartId} repairPrice=${this._repairPrice} junkPrice=${this._junkPrice} wear=${this._wear} attachmentPoint=${this._attachmentPoint} damage=${this._damage}`;
    }
}
