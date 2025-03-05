import { BytableBuffer } from "./BytableBuffer.js";
import { Field } from "./types.js";

/**
 * Given a buffer, and a sequence of fields, deserialize the buffer into the fields
 * @param buffer The buffer to deserialize
 * @param fields The fields to deserialize into
 */
export function deserialize(buffer: Buffer, fields: Field[]): void {
try {
        let offset = 0;
        for (const field of fields) {
            field.deserialize(buffer.subarray(offset, offset + field.serializeSize));
            offset += field.serializeSize;
        }
    
} catch (error) {
    throw new Error(`Error deserializing message: ${(error as Error).message}`);
    
}}

/**
 * Serialize a set of fields into a buffer
 * @param fields The fields to serialize
 * @returns The serialized buffer
 */
export function serialize(fields: Field[]): Buffer {
try {
        const buffer = Buffer.alloc(serializeSize(fields));
        let offset = 0;
        for (const field of fields) {
            buffer.set(field.serialize(), offset);
            offset += field.serializeSize;
        }
        return buffer;
} catch (error) {
    throw new Error(`Error serializing message ${error}`);
    
}
}

/**
 * Get the size of a set of fields when serialized
 * @param fields The fields to get the size of
 * @returns The size of the fields when serialized
 */
export function serializeSize(fields: Field[]): number {
    return fields.reduce((a, b) => a + b.serializeSize, 0);
}

export function createEmptyField() {
    return new BytableBuffer() as Field;
}
