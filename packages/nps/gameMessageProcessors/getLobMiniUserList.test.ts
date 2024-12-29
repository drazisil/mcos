import { describe, it, expect, vi, Mock } from "vitest";
import { getLobMiniUserList } from "./getLobMiniUserList";
import {
	GameMessage,
	MiniUserInfo,
	MiniUserList,
} from "rusty-motors-nps";

vi.mock("rusty-motors-nps", () => ({
	GameMessage: vi.fn(),
	MiniUserInfo: vi.fn(),
	MiniUserList: vi.fn(),
	getAsHex: vi.fn(),
}));

describe("getLobMiniUserList", () => {
	it("should process the command and return a serialized response", async () => {
		const commandId = 0x128;
		const data = Buffer.from([0x01, 0x02, 0x03, 0x04]);
		const mockMiniUserList = {
			addChannelUser: vi.fn(),
		};
		const mockResponseMessage = {
			header: {
				setId: vi.fn(),
			},
			setData: vi.fn(),
			serialize: vi.fn().mockReturnValue(Buffer.from([0x05, 0x06, 0x07, 0x08])),
		};

		(MiniUserList as unknown as Mock).mockImplementation(
			() => mockMiniUserList,
		);
		(GameMessage as unknown as Mock).mockImplementation(
			() => mockResponseMessage,
		);

		const result = await getLobMiniUserList(commandId, data);

		expect(mockMiniUserList.addChannelUser).toHaveBeenCalledWith(
			new MiniUserInfo(1000, "Molly"),
		);
		expect(mockResponseMessage.header.setId).toHaveBeenCalledWith(0x229);
		expect(mockResponseMessage.setData).toHaveBeenCalledWith(mockMiniUserList);
		expect(result).toEqual(Buffer.from([0x05, 0x06, 0x07, 0x08]));
	});
});