import { Socket, createServer as createSocketServer } from "node:net";
import { Configuration, getServerConfiguration, getServerLogger, ServerLogger } from "rusty-motors-shared";
import { createInitialState } from "rusty-motors-shared";
import { onSocketConnection } from "./index.js";
import { initializeRouteHandlers, processHttpRequest } from "./web.js";
import type { GatewayOptions } from "./types.js";
import { addPortRouter } from "./portRouters.js";
import { npsPortRouter } from "./npsPortRouter.js";
import { mcotsPortRouter } from "./mcotsPortRouter.js";
import http from "node:http";
import { HotkeyManager } from "./HotkeyManager.js";


/**
 * Gateway server
 * @see {@link getGatewayServer()} to get a singleton instance
 */
export class Gateway {
	config: Configuration;
	log: ServerLogger;
	timer: NodeJS.Timeout | null;
	loopInterval: number;
	status: string;
	consoleEvents: string[];
	backlogAllowedCount: number;
	listeningPortList: number[];
	activeServers: import("node:net").Server[];
	socketconnection: ({
		incomingSocket,
		log,
	}: {
		incomingSocket: Socket;
		log?: ServerLogger;
	}) => void;
	webServer: http.Server;
	/**
	 * Creates an instance of GatewayServer.
	 * @param {GatewayOptions} options
	 */
	constructor({
		config = getServerConfiguration(),
		log = getServerLogger("Gateway"),
		backlogAllowedCount = 0,
		listeningPortList = [],
		socketConnectionHandler = onSocketConnection,
	}: GatewayOptions) {
		log.debug("Creating GatewayServer instance");

		this.config = config;
		this.log = log;
		/** @type {NodeJS.Timeout | null} */
		this.timer = null;
		this.loopInterval = 0;
		/** @type {"stopped" | "running" | "stopping" | "restarting"} */
		this.status = "stopped";
		this.consoleEvents = ["userExit", "userRestart", "userHelp"];
		this.backlogAllowedCount = backlogAllowedCount;
		this.listeningPortList = listeningPortList;
		/** @type {import("node:net").Server[]} */
		this.activeServers = [];
		this.socketconnection = socketConnectionHandler;

		initializeRouteHandlers();

		this.webServer = http.createServer(processHttpRequest);
	}

	/**
	 * Starts the GatewayServer.
	 * 
	 * This method initializes the server, starts new servers on the specified ports,
	 * and sets up the web server connection. If the web server is not defined, it throws an error.
	 * Finally, it updates the server status to "running".
	 * 
	 * @throws {Error} If the web server is undefined.
	 */
	start(): void {
		// Initialize the GatewayServer
		this.init();

		this.listeningPortList.forEach(async (port) => {
			this.startNewServer(port, this.socketconnection);
		});

		if (this.webServer === undefined) {
			throw Error("webServer is undefined");
		}
		this.startNewServer(3000, ({ incomingSocket }) => {
			this.webServer.emit("connection", incomingSocket);
		});

		this.status = "running";

		new HotkeyManager();

	}

	/**
	 * Starts a new server on the specified port and sets up a socket connection handler.
	 *
	 * @param port - The port number on which the server will listen.
	 * @param socketConnectionHandler - A callback function that handles incoming socket connections.
	 * @param socketConnectionHandler.incomingSocket - The incoming socket connection.
	 */
	private startNewServer(
		port: number,
		socketConnectionHandler: ({
			incomingSocket,
		}: { incomingSocket: Socket }) => void,
	) {
		const server = createSocketServer((s) => {
			socketConnectionHandler({ incomingSocket: s });
		});

		// Listen on the specified port
		server.listen(port, "0.0.0.0", this.backlogAllowedCount, () => {
			this.log.debug(`Listening on port ${port}`);
		});

		// Add the server to the list of servers
		this.activeServers.push(server);
	}

	/**
	 * Gracefully stops the GatewayServer and exits the process.
	 * 
	 * This method first stops the GatewayServer by calling the `stop` method,
	 * and then exits the Node.js process with a status code of 0.
	 * 
	 * @returns {Promise<void>} A promise that resolves when the server has stopped and the process has exited.
	 */
	async exit(): Promise<void> {
		// Stop the GatewayServer
		await this.stop();

		// Exit the process
		process.exit(0);
	}

	/**
	 * Stops the GatewayServer.
	 * 
	 * This method performs the following actions:
	 * 1. Marks the GatewayServer as stopping.
	 * 2. Stops the servers by calling `shutdownServers`.
	 * 3. Stops the timer if it is running.
	 * 4. Marks the GatewayServer as stopped.
	 * 5. Resets the global state by creating and saving the initial state.
	 * 
	 * @returns {Promise<void>} A promise that resolves when the server has been stopped.
	 */
	async stop(): Promise<void> {
		// Mark the GatewayServer as stopping
		this.log.debug("Marking GatewayServer as stopping");
		this.status = "stopping";

		// Stop the servers
		await this.shutdownServers();

		// Stop the timer
		if (this.timer !== null) {
			clearInterval(this.timer);
		}

		// Mark the GatewayServer as stopped
		this.log.debug("Marking GatewayServer as stopped");
		this.status = "stopped";

		// Reset the global state
		this.log.debug("Resetting the global state");
		createInitialState({}).save();
	}

	/**
	 * Shuts down all active servers and emits a close event on the web server.
	 * 
	 * @throws {Error} If the webServer is undefined.
	 * @private
	 * @async
	 */
	private async shutdownServers() {
		this.log.info("Shutting down servers");
		this.activeServers.forEach((server) => {
			server.close();
		});

		if (this.webServer === undefined) {
			throw Error("webServer is undefined");
		}
		this.webServer.emit("close");
	}

	/**
	 * Initializes the GatewayServer by setting up the web server and registering routes.
	 *
	 * - Creates a Fastify web server instance.
	 * - Registers the FastifySensible plugin for additional utilities.
	 * - Adds port routers for various ports to handle incoming requests.
	 * - Sets up a signal handler to gracefully exit on SIGINT.
	 */
	private init() {
		addPortRouter(8226, npsPortRouter);
		addPortRouter(8227, npsPortRouter);
		addPortRouter(8228, npsPortRouter);
		addPortRouter(7003, npsPortRouter);
		addPortRouter(43300, mcotsPortRouter);

		process.on("SIGINT", this.exit.bind(this));
	}
}
