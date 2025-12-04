"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRoutes = void 0;
const express_1 = __importDefault(require("express"));
const post_controller_1 = require("./post.controller");
const router = express_1.default.Router();
router.post("/", post_controller_1.postController.createPost);
router.get("/", post_controller_1.postController.getPosts);
router.get("/user-posts/", post_controller_1.postController.getPostsByUserId);
router.get("/:id", post_controller_1.postController.getPostById);
router.put("/:id", post_controller_1.postController.updatePostById);
router.delete("/:id", post_controller_1.postController.deletePostById);
exports.postRoutes = router;
