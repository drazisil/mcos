/**
 *
 *
 * @class
 * @property {number} msgNo
 * @property {Buffer} data
 * @property {Buffer} data2
 * @property {string} serviceName
 */
/// <reference types="node" />
import { MessageNode } from "mcos/shared";
export declare class GenericRequestMessage extends MessageNode {
    msgNo: number;
    data: Buffer;
    data2: Buffer;
    serviceName: string;
    /**
     *
     */
    constructor();
    /**
     *
     * @param {Buffer} buffer
     */
    deserialize(buffer: Buffer): void;
    /**
     *
     * @return {Buffer}
     */
    serialize(): Buffer;
    /**
     * DumpPacket
     * @return {string}
     */
    dumpPacket(): string;
}
