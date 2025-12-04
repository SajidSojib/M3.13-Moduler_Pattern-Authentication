"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}\n`);
    next();
};
exports.default = logger;
