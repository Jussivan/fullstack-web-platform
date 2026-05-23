import { prisma } from "../lib/prisma";
import type { CreateIncidentInput, UpdateIncidentInput } from "../types/incident.types";

const getAllIncidents = async () => {
  return await prisma.incident.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

const getIncidentById = async (id: string) => {
  return await prisma.incident.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

const createIncident = async (data: CreateIncidentInput) => {
  return await prisma.incident.create({
    data,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

const updateIncident = async (id: string, data: UpdateIncidentInput) => {
  return await prisma.incident.update({
    where: { id },
    data,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
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
