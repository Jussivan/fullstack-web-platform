import { Request, Response, NextFunction } from "express";
import { authService } from "../services/auth.service";
import { logger } from "../logger/logger";

export interface AuthenticatedRequest extends Request {
  userId?: string;
  user?: any;
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ error: "No token provided" });
      return;
    }

    const decoded = authService.verifyToken(token);
    req.userId = decoded.id;
    req.user = decoded;
    next();
  } catch (error) {
    logger.error("Authentication error:", error);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};
