import { hashSync } from "bcrypt";
import { DatabaseSync } from "node:sqlite";
import { getServerLogger } from "rusty-motors-shared";
import type { UserRecordMini } from "rusty-motors-shared";
import { SQL, DATABASE_PATH } from "./databaseConstrants.js";

// Database Service Interface
export interface DatabaseService {
		isDatabaseConnected: () => boolean;
		registerUser: (
			username: string,
			password: string,
			customerId: number,
		) => void;
		findUser: (username: string, password: string) => UserRecordMini;
		getAllUsers: () => UserRecordMini[];
		updateSession: (
			customerId: number,
			contextId: string,
			userId: number,
		) => void;
		findSessionByContext: (contextId: string) => UserRecordMini | undefined;
	}

// Database Implementation
export const DatabaseImpl = {
	/**
	 * Generates a hashed password using bcrypt
	 * @param password - The plain text password to hash
	 * @param saltRounds - Number of salt rounds for bcrypt (default: 10)
	 * @returns The hashed password string
	 */
	generatePasswordHash(password: string, saltRounds = 10): string {
		const hash = hashSync(password, saltRounds);
		return hash;
	},

	/**
	 * Initializes the database schema by creating necessary tables and indexes
	 * @param database - The SQLite database instance
	 */
	initializeDatabase(database: DatabaseSync) {
		database.exec(SQL.CREATE_USER_TABLE);
		database.exec(
			"CREATE INDEX IF NOT EXISTS idx_user_username ON user(username)",
		);
		database.exec(
			"CREATE INDEX IF NOT EXISTS idx_user_customerId ON user(customerId)",
		);
		database.exec(SQL.CREATE_SESSION_TABLE);
		database.exec(
			"CREATE INDEX IF NOT EXISTS idx_session_customerId ON session(customerId)",
		);
	},

	/**
	 * Registers a new user in the database
	 * @param database - The SQLite database instance
	 * @param username - Unique username for the new user
	 * @param password - User's password (will be hashed)
	 * @param customerId - Associated customer ID
	 * @throws Error if registration fails for reasons other than duplicate username
	 */
	registerNewUser(
		database: DatabaseSync,
		username: string,
		password: string,
		customerId: number,
	) {
		const logger = getServerLogger("database");
		const hashedPassword = this.generatePasswordHash(password);
		try {
			database
				.prepare(SQL.INSERT_USER)
				.run(username, hashedPassword, customerId);
		} catch (error) {
			if (
				error instanceof Error &&
				error.message.includes("UNIQUE constraint failed")
			) {
				logger.warn(`User ${username} already exists`);
				return;
			}
			throw error;
		}
	},

	/**
	 * Finds a user by username and password
	 * @param database - The SQLite database instance
	 * @param username - Username to search for
	 * @param password - Password to verify
	 * @returns UserRecordMini object containing user details
	 * @throws Error if user is not found
	 */
	findUser(
		database: DatabaseSync,
		username: string,
		password: string,
	): UserRecordMini {
		const query = database.prepare(SQL.FIND_USER);
		const hashedPassword = this.generatePasswordHash(password);
		const user = query.get(username, hashedPassword) as UserRecordMini | null;
		if (user == null) {
			throw new Error("User not found");
		}
		return {
			customerId: user.customerId,
			profileId: user.profileId,
			contextId: user.contextId,
		};
	},

	/**
	 * Retrieves all users from the database
	 * @param database - The SQLite database instance
	 * @returns Array of UserRecordMini objects
	 */
	getAllUsers(database: DatabaseSync): UserRecordMini[] {
		const query = database.prepare(SQL.GET_ALL_USERS);
		const users = query.all() as UserRecordMini[];
		return users;
	},

	/**
	 * Updates or creates a new session for a user
	 * @param database - The SQLite database instance
	 * @param customerId - Customer ID associated with the session
	 * @param contextId - Unique context ID for the session
	 * @param userId - ID of the user owning the session
	 */
	updateSession(
		database: DatabaseSync,
		customerId: number,
		contextId: string,
		profileId: number,
	) {
		const insert = database.prepare(SQL.UPDATE_SESSION);
		insert.run(contextId, customerId, profileId);
	},

	findSessionByContext(
		database: DatabaseSync,
		contextId: string,
	): UserRecordMini | undefined {
		const query = database.prepare(SQL.FIND_SESSION_BY_CONTEXT);
		const user = query.get(contextId) as UserRecordMini | undefined;
		return user;
	},

	/**
	 * Creates a DatabaseService interface implementation
	 * @param db - The SQLite database instance
	 * @returns DatabaseService interface with implemented database operations
	 */
	createDatabaseService(db: DatabaseSync): DatabaseService {
		return {
			isDatabaseConnected: () => db !== null,
			registerUser: (...args) => this.registerNewUser(db, ...args),
			findUser: (...args) => this.findUser(db, ...args),
			getAllUsers: () => this.getAllUsers(db),
			updateSession: (...args) => this.updateSession(db, ...args),
			findSessionByContext: (...args) => this.findSessionByContext(db, ...args),
		};
	},
} as const;

// Database Instance Management
let databaseInstance: DatabaseSync | null = null;

/**
 * Initializes and returns a database service instance
 * @returns DatabaseService interface with database operations
 */
function initializeDatabaseService(): DatabaseService {
	if (databaseInstance === null) {
		databaseInstance = new DatabaseSync(DATABASE_PATH);
		DatabaseImpl.initializeDatabase(databaseInstance);
		DatabaseImpl.registerNewUser(databaseInstance, "admin", "admin", 5551212);
		DatabaseImpl.updateSession(
			databaseInstance,
			1212555,
			"5213dee3a6bcdb133373b2d4f3b9962758",
			1,
		);
		DatabaseImpl.updateSession(
			databaseInstance,
			5551212,
			"d316cd2dd6bf870893dfbaaf17f965884e",
			2,
		);
		getServerLogger("database").info("Database initialized");
	}

	return DatabaseImpl.createDatabaseService(databaseInstance);
}


export function findCustomerByContext(
	contextId: string,
): UserRecordMini | undefined {
	const database = initializeDatabaseService();
	const user = database.findSessionByContext(contextId);
	return user;
}

// Exported Database Service Instance
export const databaseService: DatabaseService = initializeDatabaseService();
