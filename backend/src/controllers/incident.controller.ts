import { Request, Response } from "express";
import { incidentService } from "../services/incident.service";
import { logger } from "../logger/logger";
import type { AuthenticatedRequest } from "../middlewares/auth";

const getAllIncidents = async (req: Request, res: Response) => {
  try {
    const incidents = await incidentService.getAllIncidents();
    res.json(incidents);
  } catch (error) {
    logger.error("Error fetching incidents:", error);
    res.status(500).json({ error: "Failed to fetch incidents" });
  }
};

const getIncidentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const incident = await incidentService.getIncidentById(id);
    if (!incident) {
      res.status(404).json({ error: "Incident not found" });
      return;
    }
    res.json(incident);
  } catch (error) {
    logger.error("Error fetching incident:", error);
    res.status(500).json({ error: "Failed to fetch incident" });
  }
};

const createIncident = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const { title, description, status } = req.body;
    const incident = await incidentService.createIncident({
      title,
      description,
      status,
      userId: req.userId,
    });
    res.status(201).json(incident);
  } catch (error) {
    logger.error("Error creating incident:", error);
    res.status(500).json({ error: "Failed to create incident" });
  }
};

const updateIncident = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const { id } = req.params as { id: string };
    const { title, description, status } = req.body;
    const incident = await incidentService.updateIncident(id, {
      title,
      description,
      status,
    });
    res.json(incident);
  } catch (error) {
    logger.error("Error updating incident:", error);
    res.status(500).json({ error: "Failed to update incident" });
  }
};

const deleteIncident = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const { id } = req.params as { id: string };
    await incidentService.deleteIncident(id);
    res.status(204).send();
  } catch (error) {
    logger.error("Error deleting incident:", error);
    res.status(500).json({ error: "Failed to delete incident" });
  }
};

export const incidentController = {
  getAllIncidents,
  getIncidentById,
  createIncident,
  updateIncident,
  deleteIncident,
};