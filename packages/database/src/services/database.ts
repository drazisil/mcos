import { Sequelize } from "sequelize";

const { DATABASE_URL } = process.env;

if (!DATABASE_URL) {
	throw new Error("DATABASE_URL is not defined");
}

export const db = new Sequelize(DATABASE_URL, {
	logging: false,
});
