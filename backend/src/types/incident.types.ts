export interface CreateIncidentInput {
  title: string;
  description: string;
  status: string;
  userId: string;
}

export interface UpdateIncidentInput {
  title?: string;
  description?: string;
  status?: string;
}

export interface Incident {
  id: string;
  title: string;
  description: string;
  status: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
