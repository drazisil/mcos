// mcos is a game server, written from scratch, for an old game
// Copyright (C) <2017>  <Drazi Crendraven>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import http from "node:http";
import { CastanetResponse } from "rusty-motors-patch";
import { generateShardList } from "rusty-motors-shard";
import {
	handleGetCert,
	handleGetKey,
	handleGetRegistry,
} from "rusty-motors-shard";
import { getServerConfiguration } from "rusty-motors-shared";
import { WebHandler, WebHandlerResponse } from "./types";

class AuthLoginResponse {
	valid: boolean = false;
	ticket: string = "";
	reasonCode: string = "";
	reasonText: string = "";
	reasonUrl: string = "";

	static createValid(ticket: string) {
		const response = new AuthLoginResponse();
		response.valid = true;
		response.ticket = ticket;
		return response;
	}

	static createInvalid(
		reasonCode: string,
		reasonText: string,
		reasonUrl: string,
	) {
		const response = new AuthLoginResponse();
		response.valid = false;
		response.reasonCode = reasonCode;
		response.reasonText = reasonText;
		response.reasonUrl = reasonUrl;
		return response;
	}

	formatResponse() {
		if (this.valid) {
			return `Valid=TRUE\nTicket=${this.ticket}`;
		} else {
			return `reasoncode=${this.reasonCode}\nreasontext=${this.reasonText}\nreasonurl=${this.reasonUrl}`;
		}
	}
}


const routeHandlers: Map<string, WebHandler> = new Map();

export function initializeRouteHandlers() {
	routeHandlers.set("/", handleRoot);
	routeHandlers.set("/games/EA_Seattle/MotorCity/UpdateInfo", handleCastanet);
	routeHandlers.set("/games/EA_Seattle/MotorCity/NPS", handleCastanet);
	routeHandlers.set("/games/EA_Seattle/MotorCity/MCO", handleCastanet);
	routeHandlers.set("/AuthLogin", handleAuthLogin);
	routeHandlers.set("/ShardList/", handleShardList);
	routeHandlers.set("/cert", () => {
		return {
			headers: { "Content-Type": "octet-stream", "Content-Disposition": "attachment; filename=server.crt" },
			body: handleGetCert(getServerConfiguration()),
		};
	});
	routeHandlers.set("/key", () => {
		return {
			headers: { "Content-Type": "octet-stream", "Content-Disposition": "attachment; filename=pub.key" },
			body: handleGetKey(getServerConfiguration()),
		};
	});
	routeHandlers.set("/registry", () => {
		return {
			headers: { "Content-Type": "octet-stream", "Content-Disposition": "attachment; filename=server.reg" },
			body: handleGetRegistry(getServerConfiguration()),
		};
	});
}

/**
 * Handles the root path request.
 *
 * @returns The response headers and body for the root path request.
 */
function handleRoot(): WebHandlerResponse {
	return {
		headers: {"Content-Type": "text/plain"},
		body: "Hello, world!",
	};
}

/**
 * Handles Castanet routes.
 *
 * @returns The response headers and body for Castanet routes.
 */
function handleCastanet(): WebHandlerResponse {
	return {
		headers: {
			[CastanetResponse.header.type]: CastanetResponse.header.value,
		},
		body: CastanetResponse.body,
	};
}



/**
 * Handles the authentication login process.
 *
 * This function processes an incoming HTTP request to handle user login authentication.
 * It retrieves the username from the request URL, checks if the user exists, and responds
 * with an appropriate authentication response.
 *
 * @param request - The incoming HTTP request object.
 * @param response - The HTTP response object to send the authentication response.
 */
function handleAuthLogin(
	request: http.IncomingMessage,
	response: http.ServerResponse,
): WebHandlerResponse {
	const url = new URL(
		`http://${process.env["HOST"] ?? "localhost"}${request.url}`,
	);
	const username = url.searchParams.get("username") ?? "";
	const password = url.searchParams.get("password") ?? "";

	response.setHeader("Content-Type", "text/plain");
	let authResponse: AuthLoginResponse;
	authResponse = AuthLoginResponse.createInvalid(
		"INV-100",
		"Opps!",
		"https://winehq.com",
	);

	const user = retrieveUserAccount(username, password);

	if (user !== null) {
		const ticket = generateTicket(user.customerId);
		if (ticket !== "") {
			authResponse = AuthLoginResponse.createValid(ticket);
		}
	}

	return {
		headers: {"Content-Type": "text/plain"},
		body: authResponse.formatResponse(),
	}
}

/**
 * Handles the shard list request.
 *
 * @returns The response headers and body for the shard list request.
 */
function handleShardList(): WebHandlerResponse {
	const shardList = generateShardList(getServerConfiguration().host);
	return {
		headers: {"Content-Type": "text/plain"},
		body: shardList,
	};
}




/**
 * Handles incoming HTTP requests and sends appropriate responses based on the request URL.
 *
 * @param request - The incoming HTTP request object.
 * @param response - The HTTP response object to send data back to the client.
 *
 * The function processes the following routes:
 * - `/`: Responds with "Hello, world!".
 * - `/games/EA_Seattle/MotorCity/UpdateInfo`, `/games/EA_Seattle/MotorCity/NPS`, `/games/EA_Seattle/MotorCity/MCO`: Responds with predefined Castanet response headers and body.
 * - `/AuthLogin`: Calls `handleAuthLogin` to process authentication login.
 * - `/ShardList/`: Responds with a generated shard list based on server configuration.
 * - `/cert`: Responds with a certificate based on server configuration.
 * - `/key`: Responds with a key based on server configuration.
 * - `/registry`: Responds with registry information based on server configuration.
 * - Any other route: Responds with a 404 status code and "Not found" message.
 */
export function processHttpRequest(
	request: http.IncomingMessage,
	response: http.ServerResponse,
) {

	const url = new URL(
		`http://${process.env["HOST"] ?? "localhost"}${request.url}`,
	);

	if (routeHandlers.has(url.pathname)) {
		const handler = routeHandlers.get(url.pathname);
		if (handler) {
			const { headers, body } = handler(request, response);
			Object.entries(headers).forEach(([key, value]) => {
				response.setHeader(key, value);
			});
			response.end(body);
			return;
		}
	}

	response.statusCode = 404;
	response.end("Not found");
}



const UserAccounts = [
	{
		username: "new",
		ticket: "5213dee3a6bcdb133373b2d4f3b9962758",
		password: "new",
		customerId: "123456",
	},
	{
		username: "admin",
		ticket: "d316cd2dd6bf870893dfbaaf17f965884e",
		password: "admin",
		customerId: "654321",
	},
];

const AuthTickets = [
	{
		ticket: "5213dee3a6bcdb133373b2d4f3b9962758",
		customerId: "123456",
	},
	{
		ticket: "d316cd2dd6bf870893dfbaaf17f965884e",
		customerId: "654321",
	},
];

/**
 * Generates a ticket for the given customer ID.
 *
 * @param customerId - The ID of the customer for whom the ticket is being generated.
 * @returns The ticket associated with the given customer ID, or an empty string if no ticket is found.
 */
function generateTicket(customerId: string): string {
	const ticket = AuthTickets.find((t) => t.customerId === customerId);
	if (ticket) {
		return ticket.ticket;
	}
	return "";
}

/**
 * Retrieves a user account based on the provided username and password.
 *
 * @param username - The username of the account to retrieve.
 * @param password - The password of the account to retrieve.
 * @returns An object containing the username, ticket, and customerId if the account is found, or null if not.
 */
function retrieveUserAccount(
	username: string,
	password: string,
): { username: string; ticket: string; customerId: string } | null {
	const customer = UserAccounts.find(
		(account) => account.username === username && account.password === password,
	);

	return customer ?? null;
}
