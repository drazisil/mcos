import { OldServerMessage } from "rusty-motors-shared";
import type { MessageHandlerArgs, MessageHandlerResult } from "./handlers.js";
import { ServerPacket } from "rusty-motors-shared-packets";
import { GenericReplyMessage } from "./GenericReplyMessage.js";
import { addVehicle } from "./_getOwnedVehicles.js";

import { getServerLogger } from "rusty-motors-shared";

const defaultLogger = getServerLogger("handlers/_buyCarFromDealer");

class PurchaseStockCarMessage extends ServerPacket {
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

/**
 * @param {MessageHandlerArgs} args
 * @return {Promise<MessageHandlerResult>}
 */
export async function _buyCarFromDealer({
	connectionId,
	packet,
	log = defaultLogger,
}: MessageHandlerArgs): Promise<MessageHandlerResult> {
	const purchaseStockCarMessage = new PurchaseStockCarMessage();
	purchaseStockCarMessage.deserialize(packet.serialize());

	log.debug(`[${connectionId}] Received PurchaseStockCarMessage: ${purchaseStockCarMessage.toString()}`);

    // TODO: Implement car purchase logic here
    // For now, just add a new car to the player's inventory
    addVehicle(1, 1000, 113); // personId, vehicleId, brandedPartId
    

    const replyPacket = new GenericReplyMessage();
    replyPacket.msgNo = 103; // GenericReplyMessage
    replyPacket.msgReply = 142; // PurchaseStockCarMessage
    replyPacket.result.writeUInt32LE(101, 0); // MC_SUCCESS
    replyPacket.data.writeUInt32LE(1000, 0); // New car ID

	log.debug(`[${connectionId}] Sending GenericReplyMessage: ${replyPacket.toString()}`);

	const responsePacket = new OldServerMessage();
	responsePacket._header.sequence = packet.sequenceNumber;
	responsePacket._header.flags = 8;

	responsePacket.setBuffer(replyPacket.serialize());

    log.debug(`[${connectionId}] Sending response packet: ${responsePacket.toHexString()}`);

	return { connectionId, messages: [responsePacket] };
}
