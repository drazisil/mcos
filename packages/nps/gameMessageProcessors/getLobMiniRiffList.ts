import {
	GameMessage,
	MiniRiffInfo,
	MiniRiffList,
	getAsHex,
} from "rusty-motors-nps";
import { logger } from "rusty-motors-utilities";
const defaultLogger = logger.child({ name: "nps.getLobMiniRiffList" });

// Command id: 0x30c
export async function getLobMiniRiffList(
	_commandId: number,
	data: Buffer,
): Promise<Buffer> {
	defaultLogger.debug("getLobMiniRiffList called");
	defaultLogger.info(
		`Processing getLobMiniRiffList command: ${getAsHex(data)}`,
	);

	const riffList = new MiniRiffList();

	riffList.addRiff(new MiniRiffInfo("CTRL", 0, 1));
	riffList.addRiff(new MiniRiffInfo("MC141", 141, 0));
	riffList.addRiff(new MiniRiffInfo("MCCHAT", 191, 0));

	defaultLogger.info(`getLobMiniRiffList: ${riffList.toString()}`);

	const responseMessage = new GameMessage(0);
	responseMessage.header.setId(0x404);
	responseMessage.setData(riffList);

	defaultLogger.info("Dumping responseMessage: ");

	defaultLogger.info(
		`responseMessage: ${
			responseMessage.serialize().length
		} bytes - ${getAsHex(responseMessage.serialize())}`,
	);

	return responseMessage.serialize();
}
