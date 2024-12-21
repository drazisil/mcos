import type { ISerializable } from "rusty-motors-nps";
import { GameProfile } from "./GameProfile.js";
import { NPSList } from "./NPSList.js";

export class ProfileList extends NPSList implements ISerializable {
	override serialize(): Buffer {
		return this.toBytes();
	}
	override getByteSize(): number {
		return this.getSize();
	}
	maxProfiles = 0; // 1 byte
	private profiles: GameProfile[] = [];

	getMaxProfiles(): number {
		return this.maxProfiles;
	}

	addProfile(profile: GameProfile): void {
		this.profiles.push(profile);
		this.maxProfiles = this.profiles.length;
	}

	override toBytes(): Buffer {
		const buffer = Buffer.alloc(this.getSize());
		let offset = 0;
		buffer.writeUInt16BE(this.maxProfiles, offset);
		offset += 2;
		for (const profile of this.profiles) {
			const profileBuffer = profile.toBytes();
			profileBuffer.copy(buffer, offset);
			offset += profile.getSize();
		}
		return buffer;
	}
	override toString(): string {
		return `ProfileList(maxProfiles=${this.maxProfiles}, profiles=${this.profiles})`;
	}

	override getSize(): number {
		let size = 4;
		for (const profile of this.profiles) {
			size += profile.getSize();
		}
		return size;
	}
}
