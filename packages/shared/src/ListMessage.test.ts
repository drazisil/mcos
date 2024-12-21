import { describe, expect, it } from "vitest";
import { ListMessage } from "./ListMessage.js";
import { SerializedBuffer } from "./SerializedBuffer.js";

describe("ListMessage", () => {
	it("initializes with default values", () => {
		const listMessage = new ListMessage();
		expect(listMessage._msgNo).toBe(0);
		expect(listMessage._listCount).toBe(0);
		expect(listMessage._shouldExpectMoreMessages).toBe(false);
		expect(listMessage._list).toEqual([]);
	});

	it("adds items to the list", () => {
		const listMessage = new ListMessage();
		const item = new SerializedBuffer();
		listMessage.add(item);
		expect(listMessage._listCount).toBe(1);
		expect(listMessage._list).toContain(item);
	});

	it("serializes the message correctly", () => {
		const listMessage = new ListMessage();
		const item = new SerializedBuffer();
		listMessage.add(item);
		const buffer = listMessage.serialize();
		expect(buffer).toBeInstanceOf(Buffer);
		expect(buffer.length).toBe(listMessage.size());
	});

	it("calculates the correct size", () => {
		const listMessage = new ListMessage();
		expect(listMessage.size()).toBe(5);
		const item = new SerializedBuffer();
		listMessage.add(item);
		expect(listMessage.size()).toBe(5 + item.size());
	});

	it("returns a correct string representation", () => {
		const listMessage = new ListMessage();
		const item = new SerializedBuffer();
		listMessage.add(item);
		const str = listMessage.toString();
		expect(str).toBe(
			`ListMessage: msgNo=0 listCount=1 shouldExpectMoreMessages=false list=${listMessage._list}`,
		);
	});
});