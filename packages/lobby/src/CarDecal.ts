import { Bytable } from "@rustymotors/binary";

export class CarDecal extends Bytable {
	// ff000000
	private backgroundImage_ = Buffer.alloc(1);
	private forgroundImage_ = Buffer.alloc(1);
	private color0_ = Buffer.alloc(1);
	private color1_ = Buffer.alloc(1);

	override get serializeSize(): number {
		return 4;
	}

	get backgroundImage(): number {
		return this.backgroundImage_.readUInt8(0);
	}

	setBackgroundImage(value: number) {
		this.backgroundImage_.writeUInt8(value, 0);
	}

	get forgroundImage(): number {
		return this.forgroundImage_.readUInt8(0);
	}

	setForgroundImage(value: number) {
		this.forgroundImage_.writeUInt8(value, 0);
	}

	get color0(): number {
		return this.color0_.readUInt8(0);
	}

	setColor0(value: number) {
		this.color0_.writeUInt8(value, 0);
	}

	get color1(): number {
		return this.color1_.readUInt8(0);
	}

	setColor1(value: number) {
		this.color1_.writeUInt8(value, 0);
	}

	override serialize(): Buffer {
		return Buffer.concat([
			this.backgroundImage_,
			this.forgroundImage_,
			this.color0_,
			this.color1_,
		]);
	}

	override deserialize(buffer: Buffer): void {
		this.backgroundImage_ = buffer.subarray(0, 1);
		this.forgroundImage_ = buffer.subarray(1, 2);
		this.color0_ = buffer.subarray(2, 3);
		this.color1_ = buffer.subarray(3, 4);
	}

	override toString(): string {
		return `CarDecal { backgroundImage: ${this.backgroundImage}, forgroundImage: ${this.forgroundImage}, color0: ${this.color0}, color1: ${this.color1} }`;
	}
	
	toJSON() {
		return {
			backgroundImage: this.backgroundImage,
			forgroundImage: this.forgroundImage,
			color0: this.color0,
			color1: this.color1,
		};
	}
}
