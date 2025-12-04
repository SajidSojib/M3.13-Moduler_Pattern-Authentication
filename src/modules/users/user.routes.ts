import express, { Request, Response } from 'express';
import { pool } from '../../config/db';
import { userControllers } from './user.controller';
import auth from '../../middleware/auth';

const router = express.Router();

router.post("/", userControllers.createUser);
router.get("/", auth("admin"), userControllers.getUsers);
router.get("/:id", userControllers.getSingleUser);
router.put("/:id", userControllers.putUser);
router.delete("/:id", userControllers.deleteUser);

export const userRoutes = router;