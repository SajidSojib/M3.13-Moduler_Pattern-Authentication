import { pool } from "../../config/db";

const createUser = async (name: string, email: string, age: number, address: string) => {
    const result = await pool.query(
      "INSERT INTO users (name, email, age, address) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, age, address]
    );
    return result;
};

const getUsers = async () => {
    const result = await pool.query("SELECT * FROM users");
    return result;
};

const getSingleUser = async (id: string) => {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return result;
};

const putUser = async (id: string, name: string, email: string, age: number, address: string) => {
    const result = await pool.query(
      "UPDATE users SET name = $1, email = $2, age = $3, address = $4 WHERE id = $5 RETURNING *",
      [name, email, age, address, id]
    );
    return result;
};

const deleteUser = async (id: string) => {
    const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
    return result;
};

export const userServices = {
    createUser,
    getUsers,
    getSingleUser,
    putUser,
    deleteUser
}