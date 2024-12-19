import { Logger, logger } from "rusty-motors-logger";

/**
 * Handles socket errors by logging specific error codes or throwing an error.
 *
 * @param {Object} params - The parameters for the socket error handler.
 * @param {string} params.connectionId - The ID of the connection where the error occurred.
 * @param {NodeJS.ErrnoException} params.error - The error object containing details of the socket error.
 * @param {ServerLogger} [params.log] - Optional logger instance for logging error details. Defaults to a server logger named "socketErrorHandler".
 *
 * @throws {Error} Throws an error if the socket error code is not handled.
 */
export function socketErrorHandler({
	connectionId,
	error,
	log = logger.child({
		name: "socketErrorHandler",
	}),
}: {
	connectionId: string;
	error: NodeJS.ErrnoException;
	log?: Logger;
}) {
	// Handle socket errors
	if (error.code == "ECONNRESET") {
		log.debug(`Connection ${connectionId} reset`);
		return;
	}
	throw Error(`Socket error: ${error.message} on connection ${connectionId}`);
}
