import { z } from "zod";

export const incidentSchema = z.object({
  title: z.string().min(1, "Título é obrigatório").max(255),
  description: z.string().min(1, "Descrição é obrigatória"),
  status: z.enum(["open", "in-progress", "closed"]),
});

export type IncidentFormData = z.infer<typeof incidentSchema>;
