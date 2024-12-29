import type { Logger } from "pino";
import { getServerLogger } from "../index.js";

/**
 * @module shared/Configuration
 * @exports Configuration
 */

export class Configuration {
	certificateFile!: string;
	privateKeyFile!: string;
	publicKeyFile!: string;
	host!: string;
	logLevel!: string;
	static instance: Configuration | undefined;

	/**
	 * Constructs a new Configuration instance.
	 *
	 * @param {Object} params - The configuration parameters.
	 * @param {string} params.host - The host address.
	 * @param {string} params.certificateFile - The path to the certificate file.
	 * @param {string} params.privateKeyFile - The path to the private key file.
	 * @param {string} params.publicKeyFile - The path to the public key file.
	 * @param {string} params.logLevel - The logging level.
	 * @param {Logger} params.logger - The logger instance.
	 */
	constructor({
		host,
		certificateFile,
		privateKeyFile,
		publicKeyFile,
		logLevel,
		logger,
	}: {
		host: string;
		certificateFile: string;
		privateKeyFile: string;
		publicKeyFile: string;
		logLevel: string;
		logger: Logger;
	}) {
		try {
			this.certificateFile = certificateFile;

			this.privateKeyFile = privateKeyFile;

			this.publicKeyFile = publicKeyFile;

			this.host = host;

			this.logLevel = logLevel.toLowerCase();
			Configuration.instance = this;
		} catch (error) {
			logger.fatal(`Error in core server: ${String(error)}`);
		}
	}

	/**
	 * Creates a new instance of the Configuration class.
	 *
	 * @param host - The host address.
	 * @param certificateFile - The path to the certificate file.
	 * @param privateKeyFile - The path to the private key file.
	 * @param publicKeyFile - The path to the public key file.
	 * @param logLevel - The logging level.
	 * @param logger - The logger instance.
	 * @returns A new Configuration instance.
	 */
	static newInstance({
		host,
		certificateFile,
		privateKeyFile,
		publicKeyFile,
		logLevel,
		logger,
	}: {
		host: string;
		certificateFile: string;
		privateKeyFile: string;
		publicKeyFile: string;
		logLevel: string;
		logger: Logger;
	}): Configuration {
		return new Configuration({
			host,
			certificateFile,
			privateKeyFile,
			publicKeyFile,
			logLevel,
			logger,
		});
	}

	/**
	 * Returns the singleton instance of the Configuration class.
	 *
	 * @throws {Error} If the Configuration instance has not been initialized using newInstance.
	 * @returns {Configuration} The singleton instance of the Configuration class.
	 */
	static getInstance(): Configuration {
		if (typeof Configuration.instance === "undefined") {
			throw new Error(
				"Configuration needs to be initialized using newInstance",
			);
		}

		return Configuration.instance;
	}
}

function getEnvVariable(
	name: string,
	required: boolean,
	defaultValue?: string,
): string {
	const value = process.env[name];
	if (required && !value) {
		const coreLogger = getServerLogger("core");
		coreLogger.fatal(`Missing required environment variable: ${name}`);
		process.exit(1);
	}
	return value || defaultValue || "";
}

export function getServerConfiguration(): Configuration {
	return {
		host: getEnvVariable("EXTERNAL_HOST", false, ""),
		certificateFile: getEnvVariable("CERTIFICATE_FILE", true),
		privateKeyFile: getEnvVariable("PRIVATE_KEY_FILE", true),
		publicKeyFile: getEnvVariable("PUBLIC_KEY_FILE", true),
		logLevel: getEnvVariable("MCO_LOG_LEVEL", false, "debug"),
	};
}
