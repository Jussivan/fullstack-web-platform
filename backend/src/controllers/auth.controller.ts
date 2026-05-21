import { Request, Response } from "express";
import { authService } from "../services/auth.service";
import { logger } from "../logger/logger";

const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      res.status(400).json({ error: "Email, password, and name are required" });
      return;
    }

    const result = await authService.register({
      email,
      password,
      name,
    });

    res.status(201).json(result);
  } catch (error) {
    logger.error("Error registering user:", error);
    const message = error instanceof Error ? error.message : "Failed to register user";
    res.status(400).json({ error: message });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    const result = await authService.login({
      email,
      password,
    });

    res.json(result);
  } catch (error) {
    logger.error("Error logging in:", error);
    const message = error instanceof Error ? error.message : "Failed to login";
    res.status(401).json({ error: message });
  }
};

const verifyToken = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ error: "No token provided" });
      return;
    }

    const decoded = authService.verifyToken(token);
    res.json({ valid: true, user: decoded });
  } catch (error) {
    logger.error("Error verifying token:", error);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

export const authController = {
  register,
  login,
  verifyToken,
};
