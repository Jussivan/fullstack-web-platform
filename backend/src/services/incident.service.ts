import { prisma } from "../lib/prisma.js";
import type { CreateIncidentInput, UpdateIncidentInput } from "../types/incident.types";

const getAllIncidents = async () => {
  return await prisma.incident.findMany();
};

const getIncidentById = async (id: string) => {
  return await prisma.incident.findUnique({
    where: { id },
  });
};

const createIncident = async (data: CreateIncidentInput) => {
  return await prisma.incident.create({
    data,
  });
};

const updateIncident = async (id: string, data: UpdateIncidentInput) => {
  return await prisma.incident.update({
    where: { id },
    data,
  });
};

const deleteIncident = async (id: string) => {
  return await prisma.incident.delete({
    where: { id },
  });
};

export const incidentService = {
  getAllIncidents,
  getIncidentById,
  createIncident,
  updateIncident,
  deleteIncident,
};
