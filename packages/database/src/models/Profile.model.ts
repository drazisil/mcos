import { DataTypes } from "sequelize";
import {db as sequelize} from "../services/database.js";

export const ProfileSchema = sequelize.define("Profile", {
    create_stamp: {
        type: DataTypes.INTEGER,
        defaultValue: sequelize.literal("EXTRACT(epoch FROM now())::integer"),
    },
    current_key: {
        type: DataTypes.STRING,
    },
    customer_id: {
        type: DataTypes.INTEGER,
    },
    dnd: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    game_blob: {
        type: DataTypes.STRING,
    },
    game_purchase_stamp: {
        type: DataTypes.INTEGER,
        defaultValue: sequelize.literal("EXTRACT(epoch FROM now())::integer"),
    },
    game_serial_number: {
        type: DataTypes.STRING,
    },
    game_start_stamp: {
        type: DataTypes.INTEGER,
        defaultValue: sequelize.literal("EXTRACT(epoch FROM now())::integer"),
    },
    is_online: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    last_login_stamp: {
        type: DataTypes.INTEGER,
        defaultValue: sequelize.literal("EXTRACT(epoch FROM now())::integer"),
    },
    number_games: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    personal_blob: {
        type: DataTypes.STRING,
    },
    picture_blob: {
        type: DataTypes.STRING,
    },
    profile_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
    },
    profile_level: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    profile_name: {
        type: DataTypes.STRING,
    },
    server_id: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    shard_id: {
        type: DataTypes.INTEGER,
    },
    time_in_game: {
        type: DataTypes.INTEGER,
    },
    time_online: {
        type: DataTypes.INTEGER,
    },
});