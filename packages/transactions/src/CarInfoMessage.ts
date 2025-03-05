import { SerializedBufferOld } from "rusty-motors-shared";
import { Vehicle } from "./Vehicle.js";
import { Part } from "./Part.js";


export class CarInfoMessage extends SerializedBufferOld {
    _msgNo: number;
    _ownerId: number;
    _vehicle: Vehicle;
    _numberOfParts: number;
    _partList: Part[];
    constructor(ownerId: number) {
        super();
        this._msgNo = 0; // 2 bytes
        this._ownerId = ownerId; // 4 bytes
        this._vehicle = new Vehicle();
        this._numberOfParts = 0; // 2 bytes

        /** @type {Part[]} */
        this._partList = []; // 34 bytes each
    }

    override size() {
        return 8 + this._vehicle.getByteSize() + this._partList.length * 34;
    }

    override serialize() {
        this._numberOfParts = this._partList.length;
        const buffer = Buffer.alloc(this.size());
        let offset = 0; // offset is 0
        buffer.writeUInt16LE(this._msgNo, offset);
        offset += 2; // offset is 2
        buffer.writeUInt32LE(this._ownerId, offset);
        offset += 4; // offset is 6
        const vehicleBuffer = this._vehicle.serialize();
        vehicleBuffer.copy(buffer, offset);
        offset += vehicleBuffer.length;
        buffer.writeUint16LE(this._numberOfParts, offset);
        offset += 2; // offset is 8
        for (const part of this._partList) {
            const partBuffer = part.serialize();
            partBuffer.copy(buffer, offset);
            offset += partBuffer.length;
        }

        return buffer;
    }

    override toString() {
        return `CarInfoMessage: msgNo=${this._msgNo} ownerId=${this._ownerId} vehicle=${this._vehicle.toString()} numberOfParts=${this._numberOfParts}`;
    }
}
