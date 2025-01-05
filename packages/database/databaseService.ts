import { compareSync, hashSync } from "bcrypt";
import { DatabaseSync } from "node:sqlite";
import { getServerLogger } from "rusty-motors-shared";

const DATABASE_PATH = process.env["DATABASE_PATH"] ?? "data/lotus.db";

export type User = {
	username: string;
	password: string;
	customerId: string;
};

export type Session = {
	contextId: string;
	customerId: string;
	userId: number;
};

export type DatabaseService = {
	get isDatabaseConnected(): boolean;
	registerUser(username: string, password: string, customerId: string): void;
	findUser(username: string, password: string): User;
	getUser(username: string): User | null;
	getAllUsers(): User[];
	updateSession(customerId: string, contextId: string, userId: number): void;
};

let databaseInstance: DatabaseSync | null = null;

function generatePasswordHash(password: string, saltRounds = 10): string {
	const hash = hashSync(password, saltRounds);
	return hash;
}

function initializeDatabase(database: DatabaseSync) {
	database.exec(`
        CREATE TABLE IF NOT EXISTS user(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        customerId TEXT NOT NULL
    ) STRICT
    `);
	database.exec(
		`CREATE INDEX IF NOT EXISTS idx_user_username ON user(username)`,
	);
	database.exec(
		`CREATE INDEX IF NOT EXISTS idx_user_customerId ON user(customerId)`,
	);
	database.exec(`
        CREATE TABLE IF NOT EXISTS session(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        contextId TEXT UNIQUE NOT NULL,
        customerId TEXT NOT NULL,
        userId INTEGER NOT NULL,
        FOREIGN KEY(userId) REFERENCES user(id)
    ) STRICT
    `);
	database.exec(
		`CREATE INDEX IF NOT EXISTS idx_session_customerId ON session(customerId)`,
	);
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

function findUser(
	database: DatabaseSync,
	username: string,
	password: string,
): User {
	const query = database.prepare(
		`SELECT id, username, password, customerId FROM user WHERE username = ?`,
	);
	const user = query.get(username) as User | null;
	if (user == null) {
		throw new Error("User not found");
	}

	if (compareSync(password, user.password) === false) {
		getServerLogger("database").warn(`Password mismatch for user ${username}`);
		throw new Error("Password mismatch");
	}

	return {
		username: user.username,
		password: "",
		customerId: user.customerId,
	};
}

function getUser(database: DatabaseSync, username: string): User | null {
	const query = database.prepare(
		`SELECT id, username, password, customerId FROM user WHERE username = ?`,
	);
	const user = query.get(username) as User | null;
	if (user == null) {
		return null;
	}

	return {
		username: user.username,
		password: "",
		customerId: user.customerId,
	};
}

function getAllUsers(database: DatabaseSync): User[] {
	const query = database.prepare(`SELECT * FROM user`);
	const users = query.all() as User[];
	return users;
}

function updateSession(
	database: DatabaseSync,
	customerId: string,
	contextId: string,
	userId: number,
) {
	const insert = database.prepare(
		`INSERT OR REPLACE INTO session (contextId, customerId, userId) VALUES (?, ?, ?)`,
	);
	try {
		insert.run(contextId, customerId, userId);
	} catch (error: unknown) {
		if (error instanceof Error === false) {
			const err = new Error("Unknown error");
			err.cause = error;
			throw err;
		}
		throw error;
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
		getUser: (username) => {
			ensureDatabaseIsReady(databaseInstance);
			return getUser(databaseInstance, username);
		},
		getAllUsers: () => {
			ensureDatabaseIsReady(databaseInstance);
			return getAllUsers(databaseInstance);
		},
		updateSession: (customerId, contextId, userId) => {
			ensureDatabaseIsReady(databaseInstance);
			return updateSession(databaseInstance, customerId, contextId, userId);
		},
	};
}

export const databaseService: DatabaseService = initializeDatabaseService();
