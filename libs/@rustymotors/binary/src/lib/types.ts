/**
 * A field that can be serialized and deserialized
 */
export interface Field {
    /**
     * The name of the field
     */
    name: string;
    /**
     * The size of the field when serialized
     */
    get serializeSize(): number;
    /**
     * Serialize the field into a buffer
     */
    serialize(): Buffer;
    /**
     * Deserialize the field from a buffer
     * @param buffer The buffer to deserialize from
     */
    deserialize(buffer: Buffer): void;
}

export interface BytableObject {
    serialize(): Buffer;
    deserialize(buffer: Buffer): void;
    json: Record<string, unknown>;
    toString(): string;
    get serializeSize(): number;
    get name(): string;
    get value(): string | number | Buffer;
    setName(name: string): void;
    setValue(value: string | number | Buffer): void;
}

