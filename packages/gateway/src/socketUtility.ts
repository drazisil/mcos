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
	return { id, socket, connectionStamp };
}
