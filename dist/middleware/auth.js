"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const auth = (...roles) => {
    return async (req, res, next) => {
        try {
            const token = req.headers.authorization?.split(" ")[1];
            if (!token) {
                return res
                    .status(401)
                    .json({ success: false, message: "Unauthorized" });
            }
            const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_secret_key);
            req.user = decoded;
            // check role
            if (!roles.includes(decoded.role) && roles.length) {
                return res.status(401).json({ success: false, message: "Unauthorized!!!" });
            }
            next();
        }
        catch (error) {
            return res.status(401).json({ success: false, message: error?.message });
        }
    };
};
exports.default = auth;
