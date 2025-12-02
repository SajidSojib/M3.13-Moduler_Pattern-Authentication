import { pool } from "../../config/db";

const createUser = async (name: string, email: string, age: number, address: string) => {
    const result = await pool.query(
      "INSERT INTO users (name, email, age, address) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, age, address]
    );
    return result;
};

export const userServices = {
    createUser
}