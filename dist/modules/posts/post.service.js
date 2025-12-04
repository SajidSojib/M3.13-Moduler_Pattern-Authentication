"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postServices = void 0;
const db_1 = require("../../config/db");
const createPost = async (payload) => {
    const { title, description, user_id } = payload;
    const result = await db_1.pool.query("INSERT INTO posts (user_id, title, description) VALUES ($1,$2,$3) returning *", [user_id, title, description]);
    return result;
};
const getPosts = async () => {
    const result = await db_1.pool.query("SELECT * FROM posts");
    return result;
};
const getSinglePost = async (id) => {
    const result = await db_1.pool.query("SELECT * FROM posts WHERE id = $1", [id]);
    return result;
};
const getPostsByUserId = async (user_id) => {
    const result = await db_1.pool.query("SELECT * FROM posts WHERE user_id = $1", [user_id]);
    return result;
};
const updatePost = async (id, title, description) => {
    const result = await db_1.pool.query("UPDATE posts SET title = $1, description = $2 WHERE id = $3 RETURNING *", [title, description, id]);
    return result;
};
const deletePost = async (id) => {
    const result = await db_1.pool.query("DELETE FROM posts WHERE id = $1 RETURNING *", [id]);
    return result;
};
exports.postServices = { createPost, getPostsByUserId, getPosts, getSinglePost, updatePost, deletePost };
