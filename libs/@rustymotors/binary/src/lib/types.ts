export interface BytableObject {
    serialize(): Buffer;
    deserialize(buffer: Buffer): void;
    json: any;
    toString(): string;
    get serializeSize(): number;
    getUint16(offset: number, littleEndian: boolean): number;
    getUint32(offset: number, littleEndian: boolean): number;
    get name(): string;
    get value(): string | number | Buffer;
    setName(name: string): void;
    setValue(value: string | number | Buffer): void;
}