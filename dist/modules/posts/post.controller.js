"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postController = void 0;
const post_service_1 = require("./post.service");
const createPost = async (req, res) => {
    try {
        const result = await post_service_1.postServices.createPost(req.body);
        res.status(201).json({ success: true, data: result.rows[0] });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error?.message });
    }
};
const getPosts = async (req, res) => {
    try {
        const result = await post_service_1.postServices.getPosts();
        res.status(200).json({ success: true, data: result.rows });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error?.message });
    }
};
const getPostsByUserId = async (req, res) => {
    try {
        const { user_id } = req.query;
        const result = await post_service_1.postServices.getPostsByUserId(Number(user_id));
        if (result.rowCount === 0) {
            res.status(404).json({ success: false, massage: "post not found" });
        }
        else {
            res.status(200).json({ success: true, data: result.rows });
        }
    }
    catch (error) {
        res.status(500).json({ success: false, message: error?.message });
    }
};
const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await post_service_1.postServices.getSinglePost(Number(id));
        if (result.rowCount === 0) {
            res.status(404).json({ success: false, massage: "post not found" });
        }
        else {
            res.status(200).json({ success: true, data: result.rows[0] });
        }
    }
    catch (error) {
        res.status(500).json({ success: false, message: error?.message });
    }
};
const updatePostById = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, user_id } = req.body;
        const result = await post_service_1.postServices.updatePost(Number(id), title, description);
        if (result.rowCount === 0) {
            res.status(404).json({ success: false, massage: "post not found" });
        }
        else {
            res.status(203).json({ success: true, data: result.rows[0] });
        }
    }
    catch (error) {
        res.status(500).json({ success: false, message: error?.message });
    }
};
const deletePostById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await post_service_1.postServices.deletePost(Number(id));
        if (result.rowCount === 0) {
            res.status(404).json({ success: false, massage: "post not found" });
        }
        else {
            res.status(200).json({ success: true, data: result.rows[0] });
        }
    }
    catch (error) {
        res.status(500).json({ success: false, message: error?.message });
    }
};
exports.postController = {
    createPost,
    getPosts,
    getPostsByUserId,
    getPostById,
    updatePostById,
    deletePostById,
};
