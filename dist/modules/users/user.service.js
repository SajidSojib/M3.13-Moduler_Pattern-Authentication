"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const db_1 = require("../../config/db");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createUser = async (payload) => {
    const { name, email, password, role, age, address } = payload;
    const hashedPassword = await bcryptjs_1.default.hash(password, 12);
    const result = await db_1.pool.query("INSERT INTO users (name, email, password, role, age, address) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [name, email, hashedPassword, role, age, address]);
    return result;
};
const getUsers = async () => {
    const result = await db_1.pool.query("SELECT * FROM users");
    return result;
};
const getSingleUser = async (id) => {
    const result = await db_1.pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return result;
};
const putUser = async (id, name, email, age, address) => {
    const result = await db_1.pool.query("UPDATE users SET name = $1, email = $2, age = $3, address = $4 WHERE id = $5 RETURNING *", [name, email, age, address, id]);
    return result;
};
const deleteUser = async (id) => {
    const result = await db_1.pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
    return result;
};
exports.userServices = {
    createUser,
    getUsers,
    getSingleUser,
    putUser,
    deleteUser
};
