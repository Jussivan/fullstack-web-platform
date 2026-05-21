import { useState } from "react";
import { useIncidents } from "../hooks/useIncidents";
import { useIncidentForm } from "../hooks/useIncidentForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CreateIncidentDialog } from "./CreateIncidentDialog";
import { UpdateIncidentDialog } from "./UpdateIncidentDialog";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import { AlertCircle } from "lucide-react";

const statusColors: Record<string, string> = {
  open: "bg-red-100 text-red-800",
  "in-progress": "bg-yellow-100 text-yellow-800",
  closed: "bg-green-100 text-green-800",
};

export function IncidentList() {
  const { incidents, loading, error, refetch } = useIncidents();
  const { deleteIncident } = useIncidentForm();
  const [isCreating, setIsCreating] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      setDeleteError(null);
      await deleteIncident(id);
      refetch();
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : "Falha ao deletar");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-lg text-muted-foreground">Carregando incidentes...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {deleteError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{deleteError}</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold uppercase">Incidentes</h2>
          <p className="text-xs text-muted-foreground mt-1">
            Total: {incidents.length} incidente{incidents.length !== 1 ? "s" : ""}
          </p>
        </div>
        <CreateIncidentDialog
          open={isCreating}
          onOpenChange={setIsCreating}
          onSuccess={() => {
            setIsCreating(false);
            refetch();
          }}
        />
      </div>

      {incidents.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-xs text-muted-foreground mb-4">Nenhum incidente encontrado</p>
            <Button onClick={() => setIsCreating(true)} className="text-xs font-bold uppercase">
              Criar seu primeiro incidente
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {incidents.map((incident) => (
            <Card key={incident.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <CardTitle>{incident.title}</CardTitle>
                    <CardDescription>
                      {new Date(incident.createdAt).toLocaleDateString("pt-BR")}
                    </CardDescription>
                  </div>
                  <Badge className={statusColors[incident.status]}>
                    {incident.status === "open" ? "Aberto" :
                     incident.status === "in-progress" ? "Em Progresso" :
                     "Fechado"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-foreground">{incident.description}</p>
                <div className="flex gap-2 justify-end pt-2 border-t">
                  <UpdateIncidentDialog
                    incident={incident}
                    onSuccess={refetch}
                  />
                  <DeleteConfirmDialog
                    incidentTitle={incident.title}
                    onConfirm={() => handleDelete(incident.id)}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
