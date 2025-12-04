import { pool } from "../../config/db";

const createPost = async (payload: Record<string, unknown>) => {
    const { title, description, user_id } = payload;
    const result = await pool.query(
      "INSERT INTO posts (user_id, title, description) VALUES ($1,$2,$3) returning *",
      [user_id, title, description]
    );
    return result;
};

const getPosts = async () => {
    const result = await pool.query("SELECT * FROM posts");
    return result;
};

const getSinglePost = async (id: number) => {
    const result = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
    return result;
};

const getPostsByUserId = async (user_id: number) => {
    const result = await pool.query("SELECT * FROM posts WHERE user_id = $1", [user_id]);
    return result;
};

const updatePost = async (id: number, title: string, description: string) => {
    const result = await pool.query(
      "UPDATE posts SET title = $1, description = $2 WHERE id = $3 RETURNING *",
      [title, description, id]
    );
    return result;
};

const deletePost = async (id: number) => {
    const result = await pool.query("DELETE FROM posts WHERE id = $1 RETURNING *", [id]);
    return result;
};

export const postServices = { createPost, getPostsByUserId, getPosts, getSinglePost, updatePost, deletePost };