import { Bytable } from "./Bytable.js";
import { BytableBase } from "./BytableBase.js";
import { BytableBuffer } from "./BytableBuffer.js";
import { BytableByte } from "./BytableByte.js";
import { BytableContainer, BytableShortContainer } from "./BytableContainer.js";
import { BytableCString } from "./BytableCString.js";
import { BytableData } from "./BytableData.js";
import { BytableDword } from "./BytableDword.js";
import { BytableHeader } from "./BytableHeader.js";
import { BytableWord } from "./BytableWord.js";
import { BytableObject } from "./types.js";
import { getServerLogger } from "rusty-motors-shared";

export class BytableStructure extends BytableBase implements BytableObject {
		protected fields_: Array<BytableObject> = [];
		protected serializeOrder_: Array<{
			name: string;
			field: keyof typeof BytableFieldTypes;
		}> = [];
		protected name_: string = "";

		override deserialize(buffer: Buffer) {
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
		}

		override get serializeSize() {
			const fieldSizes = this.fields_.map((field) => field.serializeSize);
			return fieldSizes.reduce((a, b) => a + b, 0);
		}

		override serialize() {
			const buffer = Buffer.alloc(this.serializeSize);
			let offset = 0;
			for (const field of this.fields_) {
				const fieldBuffer = field.serialize();
				buffer.set(fieldBuffer, offset);
				offset += field.serializeSize;
			}
			return buffer;
		}

		get json() {
			return {
				name: this.name_,
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

		getField(name: string) {
			return this.fields_.find((field) => field.name === name);
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

			let coercedValue;

			if (typeof value === "string") {
				coercedValue = Buffer.from(value);
			} else {
				coercedValue = typeof value === "number" ? Buffer.from([value]) : value;
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
				field.setValue(coercedValue);

				this.fields_.push(field);
				return;
			}

			field.setValue(value);
		}

		get name(): string {
			return this.name_;
		}

		get value(): string | number | Buffer {
			throw new Error("This object is a container");
		}

		setValue() {
			throw new Error("This object is a container");
		}
	}

export const BytableFieldTypes = {
	ZeroTerminatedString: BytableContainer,
	String: BytableContainer,
	Dword: BytableDword,
	Container: BytableContainer,
	PrefixedString2: BytableShortContainer,
	Raw: BytableData,
	Structure: BytableStructure,
	Boolean: BytableByte,
	Short: BytableWord,
	Buffer: BytableBuffer,
	CString: BytableCString,
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
			this.setSerializeOrder([
				{
					name: "data",
					field: "Buffer",
				},
			]);
		}

		protected override deserializeFields(buffer: Buffer) {
			let offset = 0;

			// It's posible that this message is only a header
			if (
				this.header_.messageVersion === 0 &&
				this.header_.messageLength === 4
			) {
				this.fields_.push(new BytableFieldTypes.Buffer());
			}

			for (const field of this.serializeOrder_) {
				if (!(field.field in BytableFieldTypes)) {
					throw new Error(`Unknown field type: ${field.field}`);
				}

				const fieldType = BytableFieldTypes[field.field];
				const fieldInstance = new fieldType();
				fieldInstance.setName(field.name);

				try {
					fieldInstance.deserialize(buffer.subarray(offset));
				} catch (error) {
					const err = new Error(
						`Error deserializing field ${field.name} ${error}`,
						{
							cause: error,
						},
					);
					getServerLogger("BytableMessage/deserializeFields").error(
						{ field, offset, fieldsSoFar: this.fields_ },
						String(err),
					);
					throw err;
				}
				this.fields_.push(fieldInstance);
				offset += fieldInstance.serializeSize;
			}
		}

		override deserialize(buffer: Buffer) {
			try {
				this.header_.deserialize(buffer);
				this.deserializeFields(buffer.subarray(this.header.serializeSize));
			} catch (error) {
				const err = new Error(`Error deserializing message ${error}`, {
					cause: error,
				});
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

			// It's posible that this message is only a header
			if (
				this.header_.messageVersion === 0 &&
				this.header_.messageLength === 4
			) {
				this.fields_.push(new BytableFieldTypes.Buffer());
			}

			for (const field of this.fields_) {
				try {
					buffer.set(field.serialize(), offset);
				} catch (error) {
					const err = new Error(`Error serializing field ${field.name}`, {
						cause: error,
					});
					throw err;
				}
				offset += field.serializeSize;
			}
			return buffer;
		}

		override serialize() {
			const buffer = Buffer.alloc(this.serializeSize);
			this.header_.setMessageLength(this.serializeSize);
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

		getField(name: string) {
			return this.fields_.find((field) => field.name === name);
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

		htonl(value: number) {
			const buffer = Buffer.alloc(4);
			buffer.writeUInt32BE(value, 0);
			return buffer;
		}

		coerceValue(value: string | number | Buffer) {
			if (typeof value === "string") {
				return Buffer.from(value);
			}
			if (typeof value === "number") {
				return Buffer.from(this.htonl(value));
			}
			return value;
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
				field.setValue(this.coerceValue(value));

				this.fields_.push(field);
				return;
			}

			if (!field) {
				throw new Error(`Field ${name} not found, and could not be created`);
			}

			field.setValue(value);
		}

		setVersion(version: 0 | 1) {
			this.header_.setMessageVersion(version);
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

export function createRawMessage(buffer?: Buffer) {
	const message = new BytableMessage(0);
	message.setSerializeOrder([
		{
			name: "data",
			field: "Buffer",
		},
	]);

	if (buffer) {
		message.deserialize(buffer);
	}

	return message;
}

export function createGameMessage(buffer?: Buffer) {
	const message = new BytableMessage(1);
	message.setSerializeOrder([
		{
			name: "data",
			field: "Buffer",
		},
	]);

	if (buffer) {
		message.deserialize(buffer);
	}

	return message;
}


