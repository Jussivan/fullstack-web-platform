import express from "express";
import { incidentController } from "../controllers/incident.controller";
import { authMiddleware } from "../middlewares/auth";

const router = express.Router();

router.get("/", incidentController.getAllIncidents);
router.get("/:id", incidentController.getIncidentById);
router.post("/", authMiddleware, incidentController.createIncident);
router.put("/:id", authMiddleware, incidentController.updateIncident);
router.delete("/:id", authMiddleware, incidentController.deleteIncident);

export { router as incidentRoutes };
