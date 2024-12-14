/**
 * @module SubThread
 */

import { EventEmitter } from "node:events";
import {logger, type Logger } from "rusty-motors-utilities";
const defaultLogger = logger;


export class SubThread extends EventEmitter {
	name: any;
	log: Logger;
	loopInterval: number;
	timer: any;
	/**
	 * @param {string} name
	 * @param {erverLogger} log
	 * @param {number} [loopInterval=100]
	 */
	constructor(
		name: string,
		log: Logger = defaultLogger,
		loopInterval: number = 100,
	) {
		super();
		this.name = name;
		this.log = log;
		this.loopInterval = loopInterval;
		this.init();
	}

	init() {
		this.emit("initialized");
		// @ts-ignore
		this.timer = setInterval(this.run.bind(this), this.loopInterval);
	}

	run() {
		// Intentionally left blank
	}

	shutdown() {
		if (this.timer) {
			clearInterval(this.timer);
		}
		this.emit("shutdownComplete");
	}
}
