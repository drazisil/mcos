import {createHash} from "node:crypto"
import { DatabaseSync } from "node:sqlite";
import { getServerLogger } from "rusty-motors-shared";
import type { UserRecordMini } from "rusty-motors-shared";

const DATABASE_PATH = process.env["DATABASE_PATH"] ?? "data/lotus.db";

export type DatabaseService = {
    get isDatabaseConnected(): boolean;
    registerUser(username: string, password: string, customerId: string): void;
    findUser(username: string, password: string): UserRecordMini;
}

let databaseInstance: DatabaseSync | null = null;

function generatePasswordHash(password: string, saltRounds = 10): string {
    const hash = hashSync(password, saltRounds);
    return hash;    
}

function initializeDatabase(database: DatabaseSync) {
	database.exec(`
        CREATE TABLE IF NOT EXISTS user(
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        customerId TEXT NOT NULL
    ) STRICT
    `);
    database.exec(`
        CREATE TABLE IF NOT EXISTS session(
        id TEXT UNIQUE NOT NULL,
        customerId TEXT NOT NULL
        userId INTEGER NOT NULL
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
        const hashedPassword = generatePasswordHash(password);
		insert.run(username, hashedPassword, customerId);
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

function findUser(database: DatabaseSync, username: string, password: string): UserRecordMini {
    const query = database.prepare(
        `SELECT * FROM user WHERE username = ? AND password = ?`,
    );
    const user = query.get(username, password) as UserRecordMini | null;
    if (user == null) {
        throw new Error("User not found");
    }
    return {
        customerId: user.customerId,
        userId: user.userId,
        contextId: user.contextId,
    }
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
		findUser: (username, password) => {
            ensureDatabaseIsReady(databaseInstance);
            return findUser(databaseInstance, username, password);
        },
	};
}

export const databaseService: DatabaseService = initializeDatabaseService();
