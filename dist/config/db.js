"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
const _1 = __importDefault(require("."));
// postgress connection
exports.pool = new pg_1.Pool({
    connectionString: _1.default.connection_str,
    ssl: { rejectUnauthorized: false },
});
const initDB = async () => {
    await exports.pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(25) NOT NULL,
            email VARCHAR(50) NOT NULL UNIQUE,
            password TEXT NOT NULL,
            role VARCHAR(10) NOT NULL,
            age INTEGER,
            address TEXT,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`);
    await exports.pool.query(`
        CREATE TABLE IF NOT EXISTS posts (
            id SERIAL PRIMARY KEY,
            user_id INT REFERENCES users(id) ON DELETE CASCADE,
            title VARCHAR(100) NOT NULL,
            description TEXT,
            published BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`);
    console.log("postgress connection done");
};
exports.default = initDB;
