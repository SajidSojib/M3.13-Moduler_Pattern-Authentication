import dotenv from "dotenv";
import express, { Request, Response } from "express";
import path from "path";
import { Pool } from "pg";

dotenv.config({path: path.join(process.cwd(),'.env')})
const app = express();
const port = 5000;


// middlewires
app.use(express.json())


// postgress connection
const pool = new Pool({
  connectionString: process.env.CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
});
const initDB = async() => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(25) NOT NULL,
            email VARCHAR(50) NOT NULL,
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
    console.log('postgress connection done');
}
initDB();



app.get("/", async(req:Request, res:Response) => {
  res.send("Hello World!");
});

app.get("/users", async(req:Request, res:Response)=>{
    try {
        const result = await pool.query("SELECT * FROM users");
        res.status(200).json({ success: true, data: result.rows });
    } catch (error:any) {
        res.status(500).json({ success: false, message: error?.message });
    }
})

app.post("/users", async(req:Request, res:Response) => {
    try {
        const { name, email, age, address } = req.body;
        const result = await pool.query(
          "INSERT INTO users (name, email, age, address) VALUES ($1, $2, $3, $4) RETURNING *",
          [name, email, age, address]
        );
        res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error?.message });
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
