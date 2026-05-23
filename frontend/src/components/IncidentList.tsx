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
    <div className="flex flex-col gap-5 p-5">
      <Separator orientation="horizontal"/>
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
      <Separator orientation="horizontal"/>

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {incidents.map((incident) => (
            <Card key={incident.id} className="max-h-min border-1 border-primary/50 hover:border-primary gap-5">
              <CardHeader>
                <div className="flex flex-col gap-5">
                  <div className="flex flex-row justify-between items-center">
                    <Badge className="text-xs p-2">
                    {incident.user.name}
                  </Badge>
                  <Badge className={`${statusColors[incident.status]} text-xs sm:text-sm flex-shrink-0`}>
                      {incident.status === "open" ? "Aberto" :
                      incident.status === "in-progress" ? "Em Progresso" :
                      "Fechado"}
                  </Badge>
                  </div>
                  <div className="flex flex-col">
                    <CardTitle className="text-sm sm:text-base truncate">{incident.title}</CardTitle>
                    <CardDescription className="text-xs font-light">
                      {new Date(incident.createdAt).toLocaleDateString("pt-BR")}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col justify-center gap-5">
                <Separator orientation="horizontal"/>
                <p className="text-xs sm:text-sm text-foreground line-clamp-3">{incident.description}</p>
                <Separator orientation="horizontal"/>
                <div className="flex flex-row justify-around items-center">
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
