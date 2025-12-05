import { Request, Response } from "express";
import { postServices } from "./post.service";

const createPost = async (req: Request, res: Response) => {
  try {
    const result = await postServices.createPost(req.body);
    return res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error?.message });
  }
};

const getPosts = async (req: Request, res: Response) => {
  try {
    const result = await postServices.getPosts();
    return res.status(200).json({ success: true, data: result.rows });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error?.message });
  }
};

const getPostsByUserId = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.query;
    const result = await postServices.getPostsByUserId(Number(user_id));
    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, massage: "post not found" });
    } else {
      res.status(200).json({ success: true, data: result.rows });
    }
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error?.message });
  }
};

const getPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await postServices.getSinglePost(Number(id));
    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, massage: "post not found" });
    } else {
      return res.status(200).json({ success: true, data: result.rows[0] });
    }
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error?.message });
  }
};

const updatePostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, user_id } = req.body;
    const result = await postServices.updatePost(
      Number(id),
      title,
      description,
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, massage: "post not found" });
    } else {
      return res.status(203).json({ success: true, data: result.rows[0] });
    }
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error?.message });
  }
};

const deletePostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await postServices.deletePost(Number(id));
    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, massage: "post not found" });
    } else {
      return res.status(200).json({ success: true, data: result.rows[0] });
    }
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error?.message });
  }
};

export const postController = {
  createPost,
  getPosts,
  getPostsByUserId,
  getPostById,
  updatePostById,
  deletePostById,
};
