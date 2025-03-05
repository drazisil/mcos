import { BytableBase } from "./BytableBase.js";
import { BytableFieldTypes  } from "./BytableMessage.js";
import { BytableObject } from "./types.js";

export class BytableData extends BytableBase implements BytableObject {
	protected name_ = "BytableData";
	protected fields_: Array<BytableObject> = [];
	protected serializeOrder_: Array<{
		name: string;
		field: keyof typeof BytableFieldTypes;
	}> = [];

	constructor() {
		super();
	}



	override deserialize(buffer: Buffer) {
		try {
			let offset = 0;
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

	override get serializeSize() {
		const fieldSizes = this.fields_.map((field) => field.serializeSize);
		return fieldSizes.reduce((a, b) => a + b, 0);
	}

	override serialize() {
		const buffer = Buffer.alloc(this.serializeSize);
		let offset = 0;

		for (const field of this.fields_) {
			buffer.set(field.serialize(), offset);
			offset += field.serializeSize;
		}
		return buffer;
	}

	get json() {
		return {
			name: this.name,
			serializeSize: this.serializeSize,
			fields: this.fields_.map((field) => field.json),
		};
	}

	setName(name: string) {
		this.name_ = name;
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

	get name() {
		return this.name_;
	}

	get value(): string | number {
		throw new Error("Not implemented");
	}

	setValue(_value: string | number | Buffer) {
		throw new Error("Not implemented");
	}
}
