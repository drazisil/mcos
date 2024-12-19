// Rusty Motors is a game server, written from scratch, for an old game
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

import * as Sentry from "@sentry/node";
import { Gateway } from "rusty-motors-gateway";
import { Configuration, verifyLegacyCipherSupport } from "rusty-motors-shared";
import { logger } from "rusty-motors-logger";

// Handle process signals for graceful shutdown
process.on("SIGTERM", async () => {
	logger.info("Received SIGTERM signal, initiating shutdown...");
	await Gateway.exitServer();
	process.exitCode = 0;
});

process.on("SIGINT", async () => {
	logger.info("Received SIGINT signal, initiating shutdown...");
	await Gateway.exitServer();
	process.exitCode = 0;
});

// Error handling
process.on("uncaughtException", (error) => {
	logger.error(`Uncaught Exception: ${error.message}`);
	Sentry.captureException(error);
	process.exitCode = 1;
});

process.on("unhandledRejection", (reason, promise) => {
	logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
	Sentry.captureException(reason);
	process.exitCode = 1;
});

const listeningPortList = [
	6660, 7003, 8228, 8226, 8227, 9000, 9001, 9002, 9003, 9004, 9005, 9006, 9007,
	9008, 9009, 9010, 9011, 9012, 9013, 9014, 43200, 43300, 43400, 53303,
];

async function main() {
	try {
		verifyLegacyCipherSupport();

		const logLevel = process.env["MCO_LOG_LEVEL"] || "info";

		if (!ensureEnvVariablesSet()) {
			process.exitCode = 1;
			return;
		}

		const host = process.env["EXTERNAL_HOST"]!;
		const certificateFile = process.env["CERTIFICATE_FILE"]!;
		const privateKeyFile = process.env["PRIVATE_KEY_FILE"]!;
		const publicKeyFile = process.env["PUBLIC_KEY_FILE"]!;

		const appLog = logger.child({
			name: "app",
			level: logLevel,
		});

		const config = Configuration.newInstance({
			host,
			certificateFile,
			privateKeyFile,
			publicKeyFile,
			logLevel,
			logger: appLog,
		});

		const gatewayServer = new Gateway({
			config,
			log: appLog,
			listeningPortList,
		});

		gatewayServer.start();
		logger.info("Service started successfully");
	} catch (err) {
		Sentry.captureException(err);
		logger.fatal(`Error during startup: ${err}`);
		process.exitCode = 1;
	}
	function ensureEnvVariablesSet(): boolean {
		let envVariablesSet = true;
		if (typeof process.env["EXTERNAL_HOST"] === "undefined") {
			logger.error("Please set EXTERNAL_HOST");
			envVariablesSet = false;
		}
		if (typeof process.env["CERTIFICATE_FILE"] === "undefined") {
			logger.error("Please set CERTIFICATE_FILE");
			envVariablesSet = false;
		}
		if (typeof process.env["PRIVATE_KEY_FILE"] === "undefined") {
			logger.error("Please set PRIVATE_KEY_FILE");
			envVariablesSet = false;
		}
		if (typeof process.env["PUBLIC_KEY_FILE"] === "undefined") {
			logger.error("Please set PUBLIC_KEY_FILE");
			envVariablesSet = false;
		}

		return envVariablesSet;
	}
}

main().catch((error) => {
	logger.error(`Error during startup: ${error}`);
	Sentry.captureException(error);
	process.exitCode = 1;
});
