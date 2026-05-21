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
import { Separator } from "./ui/separator";

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
        <p className="text-xs sm:text-sm md:text-base text-muted-foreground">Carregando incidentes...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      {error && (
        <Alert variant="destructive" className="text-xs sm:text-sm">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {deleteError && (
        <Alert variant="destructive" className="text-xs sm:text-sm">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <AlertDescription>{deleteError}</AlertDescription>
        </Alert>
      )}

      <div className="flex flex-row justify-around md:justify-start items-center md:gap-5">
        <CreateIncidentDialog
          open={isCreating}
          onOpenChange={setIsCreating}
          onSuccess={() => {
            setIsCreating(false);
            refetch();
          }}
        />
        <Separator orientation="vertical"/>
        <div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Total: {incidents.length} incidente{incidents.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {incidents.length === 0 ? (
        <div className="w-full flex flex-col justify-center items-center bg-transparent">
          <CardContent className="w-1/2 flex flex-col items-center justify-center gap-10">
            <p className="text-xs text-muted-foreground uppercase">Nenhum incidente encontrado</p>
            <Button onClick={() => setIsCreating(true)} className="text-xs font-bold uppercase">
              Reportar incidente
            </Button>
          </CardContent>
        </div>
      ) : (
        <div className="grid gap-3 sm:gap-4">
          {incidents.map((incident) => (
            <Card key={incident.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2 sm:pb-3">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-sm sm:text-base truncate">{incident.title}</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      {new Date(incident.createdAt).toLocaleDateString("pt-BR")}
                    </CardDescription>
                  </div>
                  <Badge className={`${statusColors[incident.status]} text-xs sm:text-sm flex-shrink-0`}>
                    {incident.status === "open" ? "Aberto" :
                     incident.status === "in-progress" ? "Em Progresso" :
                     "Fechado"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <p className="text-xs sm:text-sm text-foreground line-clamp-3">{incident.description}</p>
                <div className="flex flex-col sm:flex-row gap-2 sm:justify-end pt-2 border-t">
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
