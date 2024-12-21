import type { Socket } from "net";

export type TaggedSocket = {
	id: string;
	socket: Socket;
	connectionStamp: number;
};

/**
 * Tags a socket with an ID and a connection timestamp.
 *
 * @param socket - The socket to be tagged.
 * @param connectionStamp - The timestamp of the connection.
 * @param id - The unique identifier to tag the socket with.
 * @returns An object containing the id, socket, and connectionStamp.
 */

export function tagSocketWithId({
	socket,
	connectionStamp,
	id,
}: {
	socket: Socket;
	connectionStamp: number;
	id: string;
}): TaggedSocket {
	return { id, socket, connectionStamp};
}

/**
 * Attempts to write data to a socket and returns a promise that resolves when the write is successful,
 * or rejects if an error occurs during the write operation.
 *
 * @param socket - The tagged socket to which the data will be written.
 * @param data - The string data to be written to the socket.
 * @returns A promise that resolves when the data is successfully written, or rejects with an error if the write fails.
 */
export async function trySocketWrite(
	socket: TaggedSocket,
	data: string,
): Promise<void> {
	return new Promise((resolve, reject) => {
		socket.socket.write(data, (error) => {
			if (error) {
				reject(error);
			} else {
				resolve();
			}
		});
	});
}
