"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const logger_1 = __importDefault(require("./middleware/logger"));
const user_routes_1 = require("./modules/users/user.routes");
const post_routes_1 = require("./modules/posts/post.routes");
const auth_routes_1 = require("./modules/auth/auth.routes");
const app = (0, express_1.default)();
// middlewires
app.use(express_1.default.json());
// postgres connected
(0, db_1.default)();
app.get("/", logger_1.default, async (req, res) => {
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
app.use("/users", user_routes_1.userRoutes);
app.use("/posts", post_routes_1.postRoutes);
app.use("/auth", auth_routes_1.authRoutes);
exports.default = app;
