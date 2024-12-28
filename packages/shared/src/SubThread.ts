/**
 * @module SubThread
 */

import { EventEmitter } from "node:events";
import { getServerLogger, ServerLogger } from "rusty-motors-shared";


export class SubThread extends EventEmitter {
	name: any;
	log: ServerLogger;
	loopInterval: number;
	timer: any;
	/**
	 * @param {string} name
	 * @param {erverLogger} log
	 * @param {number} [loopInterval=100]
	 */
	constructor(
		name: string,
		log: ServerLogger = getServerLogger( "SubThread"),
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
