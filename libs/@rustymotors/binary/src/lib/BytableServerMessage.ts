import { Bytable } from "./Bytable";
import { BytableFieldTypes } from "./BytableMessage";
import { BytableServerHeader } from "./BytableServerHeader";
import { BytableObject } from "./types";

export class BytableServerMessage extends Bytable {
	protected header_: BytableServerHeader = new BytableServerHeader();
	protected fields_: Array<BytableObject> = [];
	protected serializeOrder_: Array<{
		name: string;
		field: keyof typeof BytableFieldTypes;
	}> = [];

	constructor() {
		super();
	}



	protected override deserializeFields(buffer: Buffer) {
		let offset = 0;

		if (this.fields_.length === 0) {
			this.setSerializeOrder([
				{
					name: "data",
					field: "Buffer",
				},
			]);
		}

		for (const field of this.serializeOrder_) {
			if (!(field.field in BytableFieldTypes)) {
				throw new Error(`Unknown field type: ${field.field}`);
			}

			const fieldType = BytableFieldTypes[field.field];
			const fieldInstance = new fieldType();
			fieldInstance.setName(field.name);
			fieldInstance.deserialize(buffer.subarray(offset));
			this.fields_.push(fieldInstance);
			offset += fieldInstance.serializeSize;
		}
	}

	override deserialize(buffer: Buffer) {
		try {
			const header = new BytableServerHeader();
            header.deserialize(buffer.subarray(0, header.serializeSize));
			this.deserializeFields(buffer.subarray(header.serializeSize));
		} catch (error) {
			const err = new Error(
				`Error deserializing message: ${(error as Error).message}`,
				{
					cause: error,
				},
			);
			throw err;
		}
	}

	get header() {
		return this.header_;
	}

	override get serializeSize() {
		const fieldSizes = this.fields_.map((field) => field.serializeSize);
		return this.header_.serializeSize + fieldSizes.reduce((a, b) => a + b, 0);
		// return this.align8(this.header_.serializeSize + fieldSizes.reduce((a, b) => a + b, 0));
	}

	protected override serializeFields() {
		const buffer = Buffer.alloc(
			this.serializeSize - this.header_.serializeSize,
		);
		let offset = 0;

		for (const field of this.fields_) {
			buffer.set(field.serialize(), offset);
			offset += field.serializeSize;
		}
		return buffer;
	}

	override serialize() {
		const buffer = Buffer.alloc(this.serializeSize);
		this.header_.setMessageLength(this.serializeSize - 2);
		buffer.set(this.header_.serialize(), 0);

		buffer.set(this.serializeFields(), this.header_.serializeSize);

		return buffer;
	}

	override get json() {
		return {
			name: this.name,
			serializeSize: this.serializeSize,
			header: this.header_.json,
			fields: this.fields_.map((field) => field.json),
		};
	}

	override setName(name: string) {
		this.header_.setName(name);
	}

	override toString() {
		return JSON.stringify(this.json);
	}

	setSerializeOrder(
		serializeOrder: Array<{
			name: string;
			field: keyof typeof BytableFieldTypes;
		}>,
	) {
		this.serializeOrder_ = serializeOrder;
	}

	get sequenceNumber() {
		return this.header_.sequence;
	}

	setSequenceNumber(sequence: number) {
		this.header_.sequence = sequence;
	}

	get flags() {
		return this.header_.flags;
	}

	setFlags(flags: number) {
		this.header_.flags = flags;
	}

	getFieldValueByName(name: string) {
		if (name === "") {
			return undefined;
		}
		const field = this.fields_.find((field) => field.name === name);
		if (!field) {
			throw new Error(`Field ${name} not found`);
		}
		return field.value;
	}

	setFieldValueByName(name: string, value: string | number | Buffer) {
		if (name === "") {
			return;
		}

		const serializedFormat = this.serializeOrder_.find(
			(field) => field.name === name,
		);

		if (!serializedFormat) {
			throw new Error(`Field ${name} not found in serialized format`);
		}

		const field = this.fields_.find((field) => field.name === name);
		if (!field) {
			const field = new BytableFieldTypes[serializedFormat.field]();
			field.setName(name);
			field.setValue(Buffer.from(this.toBuffer(value)));

			this.fields_.push(field);
			return;
		}

		if (!field) {
			throw new Error(`Field ${name} not found, and could not be created`);
		}

		field.setValue(value);
	}

	getBody() {
		return this.serializeFields();
	}

	setBody(buffer: Buffer) {
		this.deserializeFields(buffer);
	}

	get data() {
		return this.getBody();
	}

	set data(buffer: Buffer) {
		this.setBody(buffer);
	}

	toHexString() {
		return this.serialize().toString("hex");
	}
}
