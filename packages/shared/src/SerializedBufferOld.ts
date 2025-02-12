import type { SerializableInterface } from "rusty-motors-shared-packets";
import { SerializableMixin, AbstractSerializable } from "./messageFactory.js";

/**
 * A raw message is a message that is not parsed into a specific type.
 * It has no header, and is just a serialized buffer.
 *
 * @mixin {SerializableMixin}
 */

export class SerializedBufferOld extends SerializableMixin(
	AbstractSerializable, 
) implements SerializableInterface {
	constructor() {
		super();
	}

	deserialize(data: Buffer): this {
		this.setBuffer(data);		
		return this;
	}

	serialize() {
		return this.data;
	}

	override toString() {
		return `SerializedBuffer: ${this.serialize().toString("hex")}`;
	}

	size() {
		return this.data.length;
	}

	getByteSize() {
		return this.size();
	}

	toHexString() {
		return this.data.toString("hex");
	}
}
