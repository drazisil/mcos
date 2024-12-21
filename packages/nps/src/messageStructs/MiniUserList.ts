import { putLenString } from "rusty-motors-nps";
import { BaseSerializable } from "./BaseSerializable.js";

export class MiniUserInfo extends BaseSerializable {
	userId: number; // 4 bytes
	userName: string; // 32 bytes - max length

	constructor(userId: number, userName: string) {
		super();
		if (userName.length > 32) {
			throw new Error(`User name too long: ${userName}`);
		}

		this.userId = userId;
		this.userName = userName;
	}

	override serialize(): Buffer {
		const buffer = Buffer.alloc(this.getByteSize());
		let offset = 0;
		buffer.writeUInt32BE(this.userId, offset);
		offset += 4;
		putLenString(buffer, offset, this.userName, false);
		return buffer;
	}
	override getByteSize(): number {
		return 4 + 4 + this.userName.length + 1;
	}
	override toString(): string {
		return `MiniUserInfo(userId=${this.userId}, userName=${this.userName})`;
	}
}

export class MiniUserList extends BaseSerializable {
	private channelId: number; // 4 bytes
	private channelUsers: MiniUserInfo[] = [];

	constructor(channelId: number) {
		super();
		this.channelId = channelId;
	}

	addChannelUser(user: MiniUserInfo): void {
		this.channelUsers.push(user);
	}

	override serialize(): Buffer {
		const buffer = Buffer.alloc(this.getByteSize());
		let offset = 0;
		buffer.writeUInt32BE(this.channelId, offset);
		offset += 4;
		buffer.writeUInt32BE(this.channelUsers.length, offset);
		offset += 4;
		this.channelUsers.forEach((user) => {
			const userBuffer = user.serialize();
			userBuffer.copy(buffer, offset);
			offset += userBuffer.length;
		});
		return buffer;
	}
	override getByteSize(): number {
		return (
			16 + this.channelUsers.reduce((acc, user) => acc + user.getByteSize(), 0)
		);
	}
	override toString(): string {
		return `MiniUserList(channelId=${this.channelId}, channelUsers=${this.channelUsers})`;
	}
}
