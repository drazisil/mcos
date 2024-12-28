import { emitKeypressEvents } from "node:readline";
// eslint-disable-next-line no-unused-vars
import { Gateway } from "rusty-motors-gateway";
import { ServerLogger, SubThread, getServerLogger  } from "rusty-motors-shared";


/**
 * @module ConsoleThread
 */

/**
 * Console thread
 */
export class ConsoleThread extends SubThread {
	static _instance: ConsoleThread;
	parentThread: Gateway;
	/**
	 * @param {object} options
	 * @param {Gateway} options.parentThread The parent thread
	 * @param {ServerLogger} options.log The logger
	 */
	constructor({
		parentThread,
		log,
	}: {
		parentThread: Gateway;
		log: ServerLogger;
	}) {
		super("ReadInput", log, 100);
		if (ConsoleThread._instance !== undefined) {
			throw Error("ConsoleThread already exists");
		}

		if (parentThread === undefined) {
			throw Error("parentThread is undefined when creating ReadInput");
		}
		this.parentThread = parentThread;
		ConsoleThread._instance = this;
	}

	/** @param {import("../interfaces/index.js").KeypressEvent} key */
	handleKeypressEvent(
		key: import("../shared/src/interfaces.js").KeypressEvent,
	) {
		const keyString = key.sequence;

		if (keyString === "x") {
			this.emit("userExit");
		}

		if (keyString === "r") {
			this.emit("userRestart");
		}

		if (keyString === "?") {
			this.emit("userHelp");
		}
	}

	override init() {
		super.init();
		emitKeypressEvents(process.stdin);
		if (process.stdin.isTTY) {
			process.stdin.setRawMode(true);
		}

		this.log.info("GatewayServer started");
		this.log.info("Press x to quit");

		process.stdin.resume();
		process.stdin.on("keypress", (_str, key) => {
			if (key !== undefined) {
				this.handleKeypressEvent(key);
			}
		});
	}

	override run() {
		// Intentionally left blank
	}

	stop() {
		// Remove all listeners from stdin, preventing further input
		process.stdin.removeAllListeners("keypress");
		process.stdin.pause();
		super.shutdown();
	}
}
