import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = (...roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization?.split(" ")[1];
            if (!token) {
              return res
                .status(401)
                .json({ success: false, message: "Unauthorized" });
            }
            const decoded = jwt.verify(token, config.jwt_secret_key as string);
            req.user = decoded as JwtPayload;
            next();
        } catch (error: any) {
            return res.status(401).json({ success: false, message: error?.message });
        }
    }
}

export default auth