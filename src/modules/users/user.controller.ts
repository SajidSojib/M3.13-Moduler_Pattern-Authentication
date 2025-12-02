import { Request, Response } from "express";
import { pool } from "../../config/db";
import { userServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, age, address } = req.body;
    const result = await userServices.createUser(name, email, age, address);
    res
      .status(201)
      .json({ success: true, massage: "user added", data: result.rows[0] });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error?.message });
  }
};

export const userControllers = {
  createUser,
};