import express, { Request, Response } from "express";
import initDB, { pool } from "./config/db";
import config from "./config";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/users/user.routes";
import { postRoutes } from "./modules/posts/post.routes";
import { authRoutes } from "./modules/auth/auth.routes";

const app = express();

// middlewires
app.use(express.json());

// postgres connected
initDB();

app.get("/", logger, async (req: Request, res: Response) => {
  res.send("Hello World!");
});

// app.get("/users", async (req: Request, res: Response) => {
//   try {
//     const result = await pool.query("SELECT * FROM users");
//     res.status(200).json({ success: true, data: result.rows });
//   } catch (error: any) {
//     res.status(500).json({ success: false, message: error?.message });
//   }
// });

// app.get("/users/:id", async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

//     if (result.rowCount === 0) {
//       res.status(404).json({ success: false, massage: "user not found" });
//     } else {
//       res.status(202).json({ success: true, data: result.rows[0] });
//     }
//   } catch (error: any) {
//     res.status(500).json({ success: false, message: error?.message });
//   }
// });

// app.post("/users", async (req: Request, res: Response) => {
//   try {
//     const { name, email, age, address } = req.body;
//     const result = await pool.query(
//       "INSERT INTO users (name, email, age, address) VALUES ($1, $2, $3, $4) RETURNING *",
//       [name, email, age, address]
//     );
//     res
//       .status(201)
//       .json({ success: true, massage: "user added", data: result.rows[0] });
//   } catch (error: any) {
//     res.status(500).json({ success: false, message: error?.message });
//   }
// });

// app.put("/users/:id", async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const { name, email, age, address } = req.body;
//     const result = await pool.query(
//       "UPDATE users SET name = $1, email = $2, age = $3, address = $4 WHERE id = $5 RETURNING *",
//       [name, email, age, address, id]
//     );

//     if (result.rowCount === 0) {
//       res.status(404).json({ success: false, massage: "user not found" });
//     } else {
//       res.status(202).json({
//         success: true,
//         massage: "user updated successfully",
//         data: result.rows[0],
//       });
//     }
//   } catch (error: any) {
//     res.status(500).json({ success: false, message: error?.message });
//   }
// });

// app.delete("/users/:id", async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const result = await pool.query(
//       "DELETE FROM users WHERE id = $1 RETURNING *",
//       [id]
//     );

//     if (result.rowCount === 0) {
//       res.status(404).json({ success: false, massage: "user not found" });
//     } else {
//       res
//         .status(202)
//         .json({ success: true, massage: "user deleted", data: result.rows[0] });
//     }
//   } catch (error: any) {
//     res.status(500).json({ success: false, message: error?.message });
//   }
// });

//  todos
// app.get("/user-posts", async (req: Request, res: Response) => {
//   try {
//     const { user_id } = req.query;
//     const result = await pool.query("SELECT * FROM posts WHERE user_id = $1", [
//       user_id,
//     ]);
//     if (result.rowCount === 0) {
//       res.status(404).json({ success: false, massage: "post not found" });
//     } else {
//       res.status(200).json({ success: true, data: result.rows });
//     }
//   } catch (error: any) {
//     res.status(500).json({ success: false, message: error?.message });
//   }
// });

// app.get("/posts", async (req: Request, res: Response) => {
//   try {
//     const result = await pool.query("SELECT * FROM posts");
//     res.status(200).json({ success: true, data: result.rows });
//   } catch (error: any) {
//     res.status(500).json({ success: false, message: error?.message });
//   }
// });

// app.get("/posts/:id", async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const result = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
//     if (result.rowCount === 0) {
//       res.status(404).json({ success: false, massage: "post not found" });
//     } else {
//       res.status(200).json({ success: true, data: result.rows[0] });
//     }
//   } catch (error: any) {
//     res.status(500).json({ success: false, message: error?.message });
//   }
// });

// app.post("/posts", async (req: Request, res: Response) => {
//   try {
//     const { title, description, user_id } = req.body;
//     const result = await pool.query(
//       "INSERT INTO posts (user_id, title, description) VALUES ($1,$2,$3) returning *",
//       [user_id, title, description]
//     );

//     res.status(201).json({ success: true, data: result.rows[0] });
//   } catch (error: any) {
//     res.status(500).json({ success: false, message: error?.message });
//   }
// });

// app.put("/posts/:id", async (req: Request, res: Response) => {
//   try {
//     const {id}= req.params;
//     const { title, description, user_id } = req.body;
//     const result = await pool.query(
//       "UPDATE posts SET title = $1, description = $2 WHERE id = $3 returning *",
//       [title, description, id]
//     );
//     if (result.rowCount === 0) {
//       res.status(404).json({ success: false, massage: "post not found" });
//     } else {
//       res.status(203).json({ success: true, data: result.rows[0] });
//     }
//   } catch (error: any) {
//     res.status(500).json({ success: false, message: error?.message });
//   }
// });

// app.delete("/posts/:id", async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const result = await pool.query(
//       "DELETE FROM posts WHERE id = $1 returning *",
//       [id]
//     );
//     if (result.rowCount === 0) {
//       res.status(404).json({ success: false, massage: "post not found" });
//     } else {
//       res.status(200).json({ success: true, data: result.rows[0] });
//     }
//   } catch (error: any) {
//     res.status(500).json({ success: false, message: error?.message });
//   }
// });

// moduler
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/auth", authRoutes);


export default app;