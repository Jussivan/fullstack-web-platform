import express from "express";
import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth";

export const userRoutes = express.Router();

userRoutes.use(authMiddleware);
userRoutes.get("/profile", userController.getProfile);
userRoutes.get("/incidents", userController.getMyIncidents);
