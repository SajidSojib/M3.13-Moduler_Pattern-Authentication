"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControllers = void 0;
const user_service_1 = require("./user.service");
const createUser = async (req, res) => {
    try {
        const result = await user_service_1.userServices.createUser(req.body);
        res
            .status(201)
            .json({ success: true, massage: "user added", data: result.rows[0] });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error?.message });
    }
};
const getUsers = async (req, res) => {
    try {
        const result = await user_service_1.userServices.getUsers();
        res.status(200).json({ success: true, data: result.rows });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error?.message });
    }
};
const getSingleUser = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await user_service_1.userServices.getSingleUser(id);
        if (result.rowCount === 0) {
            res.status(404).json({ success: false, massage: "user not found" });
        }
        else {
            res.status(200).json({ success: true, data: result.rows[0] });
        }
    }
    catch (error) {
        res.status(500).json({ success: false, message: error?.message });
    }
};
const putUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, age, address } = req.body;
        const result = await user_service_1.userServices.putUser(id, name, email, age, address);
        if (result.rowCount === 0) {
            res.status(404).json({ success: false, massage: "user not found" });
        }
        else {
            res.status(202).json({
                success: true,
                massage: "user updated successfully",
                data: result.rows[0],
            });
        }
    }
    catch (error) {
        res.status(500).json({ success: false, message: error?.message });
    }
};
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await user_service_1.userServices.deleteUser(id);
        if (result.rowCount === 0) {
            res.status(404).json({ success: false, massage: "user not found" });
        }
        else {
            res
                .status(202)
                .json({ success: true, massage: "user deleted", data: result.rows[0] });
        }
    }
    catch (error) {
        res.status(500).json({ success: false, message: error?.message });
    }
};
exports.userControllers = {
    createUser,
    getUsers,
    getSingleUser,
    putUser,
    deleteUser
};
