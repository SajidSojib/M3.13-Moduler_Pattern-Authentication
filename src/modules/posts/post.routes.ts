import express from "express";
import { postController } from "./post.controller";

const router = express.Router();

router.post("/", postController.createPost);
router.get("/", postController.getPosts);
router.get("/user-posts/", postController.getPostsByUserId);
router.get("/:id", postController.getPostById);
router.put("/:id", postController.updatePostById);
router.delete("/:id", postController.deletePostById);

export const postRoutes = router;
