import { logger } from "rusty-motors-utilities";
import { NPSMessage, SerializedBuffer } from "rusty-motors-shared";

export async function _npsHeartbeat({
	connectionId,
	// biome-ignore lint/correctness/noUnusedVariables: <explanation>
	message, 
	log = logger.child({
		name: "_npsHeartbeat",
	}),
}) {
	const packetContent = Buffer.alloc(8);
	const packetResult = new NPSMessage();
	packetResult._header.id = 0x127;
	packetResult.setBuffer(packetContent);

	log.debug("Dumping packet...");
	log.debug(packetResult.toString());

	const outboundMessage = new SerializedBuffer();
	outboundMessage.deserialize(packetResult.serialize());

	return {
		connectionId,
		messages: [outboundMessage],
	};
}
