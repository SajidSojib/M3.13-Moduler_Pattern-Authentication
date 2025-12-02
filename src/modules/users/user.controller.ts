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

const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getUsers();
    res.status(200).json({ success: true, data: result.rows });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error?.message });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await userServices.getSingleUser(id!);
    if (result.rowCount === 0) {
      res.status(404).json({ success: false, massage: "user not found" });
    } else {
      res.status(200).json({ success: true, data: result.rows[0] });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error?.message });
  }
};

const putUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, age, address } = req.body;
    const result = await userServices.putUser(id!, name, email, age, address);
    if (result.rowCount === 0) {
      res.status(404).json({ success: false, massage: "user not found" });
    } else {
      res.status(202).json({
        success: true,
        massage: "user updated successfully",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error?.message });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await userServices.deleteUser(id!);
    if (result.rowCount === 0) {
      res.status(404).json({ success: false, massage: "user not found" });
    } else {
      res
        .status(202)
        .json({ success: true, massage: "user deleted", data: result.rows[0] });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error?.message });
  }
};

export const userControllers = {
  createUser,
  getUsers,
  getSingleUser,
  putUser,
  deleteUser
};