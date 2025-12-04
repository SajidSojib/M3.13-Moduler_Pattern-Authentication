"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const auth_service_1 = require("./auth.service");
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await auth_service_1.authServices.loginUser(email, password);
        if (result) {
            res.status(200).json({ success: true, data: result, message: "Login successful" });
        }
        else {
            res.status(401).json({ success: false, message: "Invalid email or password" });
        }
    }
    catch (error) {
        res.status(500).json({ success: false, message: error?.message });
    }
};
exports.authController = {
    loginUser,
};
