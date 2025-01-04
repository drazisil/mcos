import { DatabaseSync } from "node:sqlite";
import { getServerLogger } from "rusty-motors-shared";

const DATABASE_PATH = process.env["DATABASE_PATH"] ?? "data/lotus.db";

export type DatabaseService = {
    get isDatabaseConnected(): boolean;
    registerUser(username: string, password: string, customerId: string): void;
    updateData(key: number, value: string): void;
}

let databaseInstance: DatabaseSync | null = null;

function initializeDatabase(database: DatabaseSync) {
	database.exec(`
        CREATE TABLE IF NOT EXISTS user(
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        customerId TEXT NOT NULL
    ) STRICT
    `);
}

function registerNewUser(
	database: DatabaseSync,
	username: string,
	password: string,
	customerId: string,
) {
	const insert = database.prepare(
		`INSERT INTO user (username, password, customerId) VALUES (?, ?, ?  )`,
	);
	try {
		insert.run(username, password, customerId);
	} catch (error: unknown) {
		if (error instanceof Error === false) {
			const err = new Error("Unknown error");
			err.cause = error;
			throw err;
		}
		if (error.message.includes("UNIQUE constraint failed")) {
			const logger = getServerLogger("database");
			logger.warn(`User ${username} already exists`);
			return;
		}
		throw error;
	}
}

function updateData(database: DatabaseSync, key: number, value: string) {
	const update = database.prepare(`UPDATE data SET value = ? WHERE key = ?`);
	update.run(value, key);
}


function ensureDatabaseIsReady(
	instance: DatabaseSync | null,
): asserts instance is DatabaseSync {
	if (instance === null) {
		throw new Error("Database instance is not initialized");
	}
}

function initializeDatabaseService(): DatabaseService {
	if (databaseInstance === null) {
		databaseInstance = new DatabaseSync(DATABASE_PATH);
		initializeDatabase(databaseInstance);
		registerNewUser(databaseInstance, "admin", "admin", "654321");
		const logger = getServerLogger("database");
		logger.info("Database initialized");
	}

	return {
		get isDatabaseConnected(): boolean {
			return databaseInstance !== null;
		},
		registerUser: (username, password, customerId) => {
			ensureDatabaseIsReady(databaseInstance);
			return registerNewUser(databaseInstance, username, password, customerId);
		},
		updateData: (key, value) => {
			ensureDatabaseIsReady(databaseInstance);
			updateData(databaseInstance, key, value);
		},
	};
}

export const databaseService: DatabaseService = initializeDatabaseService();
