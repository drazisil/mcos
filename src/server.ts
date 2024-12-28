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

import * as Sentry from "@sentry/node";
import { Gateway } from "rusty-motors-gateway";
import { getServerLogger, verifyLegacyCipherSupport, validateEnvVariables } from "rusty-motors-shared";

const coreLogger = getServerLogger( "core");

try {
	verifyLegacyCipherSupport();
} catch (err) {
	coreLogger.fatal(`Error in core server: ${String(err)}`);
	process.exit(1);
}

try {
	const config = validateEnvVariables();
	coreLogger.debug(`Pre-flight checks passed. Starting server with config: ${JSON.stringify(config)}`);

	const appLog = coreLogger.child({
		name: "app",
		level: config.logLevel,
	});
	
	const listeningPortList = [
		6660, 7003, 8228, 8226, 8227, 9000, 9001, 9002, 9003, 9004, 9005, 9006,
		9007, 9008, 9009, 9010, 9011, 9012, 9013, 9014, 43200, 43300, 43400, 53303,
	];

	const gatewayServer = new Gateway({
		config,
		log: appLog,
		listeningPortList,
	});

	gatewayServer.start();
} catch (err) {
	Sentry.captureException(err);
	coreLogger.fatal(`Error in core server: ${String(err)}`);
	process.exit(1);
}






