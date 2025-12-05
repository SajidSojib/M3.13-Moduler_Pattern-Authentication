import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../config/db";

const auth = (...roles: ('admin' | 'user')[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization?.split(" ")[1];
            if (!token) {
              return res
                .status(401)
                .json({ success: false, message: "Unauthorized" });
            }
            const decoded = jwt.verify(token, config.jwt_secret_key as string) as JwtPayload;

            // check valid token
            const user = await pool.query("SELECT * FROM users WHERE email = $1", [decoded.email]);
            if(user.rows.length === 0) {
                return res.status(401).json({ success: false, message: "Unauthorized" });
            }

            req.user = decoded;

            // check role
            if(!roles.includes(decoded.role) && roles.length) {
                return res.status(401).json({ success: false, message: "Unauthorized!!!" });
            }

            next();
        } catch (error: any) {
            return res.status(401).json({ success: false, message: error?.message });
        }
    }
}

export default auth