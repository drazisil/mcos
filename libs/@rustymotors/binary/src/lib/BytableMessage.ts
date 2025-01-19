import { Bytable } from "./Bytable";
import { BytableContainer } from "./BytableContainer";
import { BytableDword } from "./BytableDword";
import { BytableHeader } from "./BytableHeader";
import { BytableObject } from "./types";

export const BytableFieldTypes = {
	ZeroTerminatedString: BytableContainer,
	Dword: BytableDword,
	Container: BytableContainer,
	Raw: Bytable,
};
export class BytableMessage extends Bytable {
	protected header_: BytableHeader = new BytableHeader();
	protected fields_: Array<BytableObject> = [];
	protected serializeOrder_: Array<{
		name: string;
		field: keyof typeof BytableFieldTypes;
	}> = [];

	constructor(version: 0 | 1 = 1) {
		super();
		this.header_.setMessageVersion(version);
	}

	static override fromBuffer(buffer: Buffer, offset: number) {
		const message = new this(1);
		message.deserialize(buffer.subarray(offset));
		return message;
	}

	override deserialize(buffer: Buffer) {
		try {
			const header = BytableHeader.fromBuffer(buffer, this.header_.messageVersion);
			this.header_.deserialize(buffer.subarray(0, header.serializeSize));
			let offset = header.serializeSize;

			for (const field of this.serializeOrder_) {
				if (!(field.field in BytableFieldTypes)) {
					throw new Error(`Unknown field type: ${field.field}`);
				}

				const fieldType = BytableFieldTypes[field.field];
				const fieldInstance = fieldType.fromBuffer(buffer, offset);
				fieldInstance.setName(field.name);
				this.fields_.push(fieldInstance);
				offset += fieldInstance.serializeSize;
			}
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
	}

	override serialize() {
		const buffer = Buffer.alloc(this.serializeSize);
		buffer.set(this.header_.serialize(), 0);
		let offset = this.header_.serializeSize;
		for (const field of this.fields_) {
			buffer.set(field.serialize(), offset);
			offset += field.serializeSize;
		}
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
		const field = this.fields_.find((field) => field.name === name);
		if (!field) {
			throw new Error(`Field ${name} not found`);
		}
		field.setValue(value);
	}

	setVersion(version: 0 | 1) {
		this.header_.setMessageVersion(version);
	}
}
