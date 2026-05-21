export interface CreateIncidentInput {
  title: string;
  description: string;
  status: string;
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
  createdAt: Date;
}
