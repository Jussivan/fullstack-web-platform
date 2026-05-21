import { IncidentList } from "../components/IncidentList";

export function IncidentsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <h1 className="mb-6 text-3xl font-bold uppercase">Gerenciamento de Incidentes</h1>
        <IncidentList />
      </div>
    </div>
  );
}
