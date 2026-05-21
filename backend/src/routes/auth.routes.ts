import express from "express";
import { authController } from "../controllers/auth.controller";

export const authRoutes = express.Router();

authRoutes.post("/register", authController.register);
authRoutes.post("/login", authController.login);
authRoutes.get("/verify", authController.verifyToken);
