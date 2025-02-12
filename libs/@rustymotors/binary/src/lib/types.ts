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

