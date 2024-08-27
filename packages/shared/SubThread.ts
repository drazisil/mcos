/**
 * @module SubThread
 */

import { EventEmitter } from "node:events";
import { Logger } from "pino";
import { getServerLogger } from "./src/log.js";

export class SubThread extends EventEmitter {
    name: any;
    log: any;
    loopInterval: number;
    timer: any;
    /**
     * @param {string} name
     * @param {module:shared/log.ServerLogger} log
     * @param {number} [loopInterval=100]
     */
    constructor(
        name: string,
        log: Logger = getServerLogger({ module: "SubThread" }),
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
