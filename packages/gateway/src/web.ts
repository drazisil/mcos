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

export class WebRouter {
	/**
	 * Handle a request
	 *
	 * @param {http.IncomingMessage} request The incoming request
	 * @param {http.ServerResponse} response The response object
	 */
	static handleRequest(
		request: http.IncomingMessage,
		response: http.ServerResponse,
	) {
		const CastanetRoutes = [
			"/games/EA_Seattle/MotorCity/UpdateInfo",
			"/games/EA_Seattle/MotorCity/NPS",
			"/games/EA_Seattle/MotorCity/MCO",
		];

		const url = new URL(
			`http://${process.env["HOST"] ?? "localhost"}${request.url}`,
		);

		if (url.pathname === "/") {
			response.end("Hello, world!");
		} else if (CastanetRoutes.includes(url.pathname)) {
			response.setHeader(
				CastanetResponse.header.type,
				CastanetResponse.header.value,
			);
			response.end(CastanetResponse.body);
		} else if (url.pathname === "/AuthLogin") {
			handleAuthLogin(request, response);
		} else if (url.pathname === "/ShardList/") {
			const config = getServerConfiguration();
			response.end(generateShardList(config.host));
		} else if (url.pathname === "/cert") {
			const config = getServerConfiguration();
			response.end(handleGetCert(config));
		} else if (url.pathname === "/key") {
			const config = getServerConfiguration();
			response.end(handleGetKey(config));
		} else if (url.pathname === "/registry") {
			const config = getServerConfiguration();
			response.end(handleGetRegistry(config));
		} else {
			response.statusCode = 404;
			response.end("Not found");
		}
	}
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
): void {
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

	response.end(authResponse.formatResponse());
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
