import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { logger } from "../logger/logger";
import type { AuthenticatedRequest } from "../middlewares/auth";

const getProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json(user);
  } catch (error) {
    logger.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
};

const getMyIncidents = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const incidents = await prisma.incident.findMany({
      where: { userId: req.userId },
    });

    res.json(incidents);
  } catch (error) {
    logger.error("Error fetching user incidents:", error);
    res.status(500).json({ error: "Failed to fetch user incidents" });
  }
};

export const userController = {
  getProfile,
  getMyIncidents,
};
