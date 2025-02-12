/**
 * @module shared/messageFactory
 * @description Holds the base classes for the various message types.
 * The message types are:
 * - LegacyMessage
 * - NPSMessage
 * - ServerMessage
 * - RawMessage
 */

/**
 * @abstract
 * @property {Buffer} data
 * @property {number} Size
 */
export class AbstractSerializable {
	internalBuffer: Buffer;
	constructor() {
		if (this.constructor === AbstractSerializable) {
			throw new TypeError(
				"Abstract class 'AbstractSerializable' cannot be instantiated directly.",
			);
		}
		/** @private */
		this.internalBuffer = Buffer.alloc(0);
	}

	_doSerialize() {
		throw Error("Method '_doSerialize()' must be implemented.");
	}

	/**
	 * @param {Buffer} _buffer
	 * @returns {AbstractSerializable}
	 */
	// eslint-disable-next-line no-unused-vars
	_doDeserialize(_buffer: Buffer): AbstractSerializable {
		throw Error("Method '_doDeserialize()' must be implemented.");
	}

	get data() {
		return this.internalBuffer;
	}

	set data(buffer: Buffer) {
		this.internalBuffer = buffer;
	}

	/**
	 * @param {Buffer} buffer
	 */
	setBuffer(buffer: Buffer) {
		this.internalBuffer = Buffer.alloc(buffer.length);
		this.internalBuffer = buffer;
	}

	/**
	 * @returns {number}
	 */
	static get Size(): number {
		throw new Error("Method 'Size' must be implemented.");
	}
}

/**
 * @mixin
 * @param {typeof AbstractSerializable} Base
 * @returns {typeof AbstractSerializable}
 */
export const SerializableMixin = (
	Base: typeof AbstractSerializable,
): typeof AbstractSerializable =>
	class extends Base {
		constructor() {
			super();
		}

	};
