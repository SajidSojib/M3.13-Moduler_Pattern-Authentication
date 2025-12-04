import { Pool } from "pg";
import config from ".";

// postgress connection
export const pool = new Pool({
  connectionString: config.connection_str,
  ssl: { rejectUnauthorized: false },
});
const initDB = async () => {
  await pool.query(`
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
  await pool.query(`
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

export default initDB;