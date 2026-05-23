import express from "express";
import cors from "cors";
import { incidentRoutes } from "./routes/incident.routes";
import { authRoutes } from "./routes/auth.routes";
import { userRoutes } from "./routes/user.routes";
import { logger } from "./logger/logger";

export const createApp = () => {
  const app = express();

  // Middlewares
  app.use(cors());
  app.use(express.json());

  // Routes
  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/incidents", incidentRoutes);

  // Health check
  app.get("/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Error handling
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    logger.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  });

  return app;
};

const app = createApp();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
