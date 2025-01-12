import { Buffer } from "node:buffer";

export const CastanetResponse = {
	body: Buffer.from([
		0xca, 0xfe, 0xbe, 0xef, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03,
	]),
	header: {
		type: "Content-Type",
		value: "application/octet-stream",
	},
};