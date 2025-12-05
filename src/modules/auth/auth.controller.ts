import { Request, Response } from "express";
import { authServices } from "./auth.service";

const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password} = req.body;
        const result = await authServices.loginUser(email, password);
        if (result) {
            return res.status(200).json({ success: true, data: result, message: "Login successful" });
        } else {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error?.message });
    }
};

export const authController = {
    loginUser,
};