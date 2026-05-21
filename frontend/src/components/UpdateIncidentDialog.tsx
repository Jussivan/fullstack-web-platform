import { useState } from "react";
import { useIncidentForm } from "../hooks/useIncidentForm";
import type { IncidentFormData } from "../schemas/incident.schema";
import { incidentSchema } from "../schemas/incident.schema";
import type { Incident } from "../types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Edit2 } from "lucide-react";

interface UpdateIncidentDialogProps {
  incident: Incident;
  onSuccess: () => void;
}

export function UpdateIncidentDialog({
  incident,
  onSuccess,
}: UpdateIncidentDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<IncidentFormData>({
    title: incident.title,
    description: incident.description,
    status: incident.status as "open" | "in-progress" | "closed",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { updateIncident, loading, error } = useIncidentForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const validated = incidentSchema.parse(formData);
      await updateIncident(incident.id, validated);
      setOpen(false);
      onSuccess();
    } catch (err: any) {
      if (err.issues) {
        const newErrors: Record<string, string> = {};
        err.issues.forEach((issue: any) => {
          newErrors[issue.path[0]] = issue.message;
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-xs font-bold uppercase">
          <Edit2 className="h-4 w-4 mr-2" />
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col justify-between px-5 gap-5">
        <DialogHeader className="flex flex-col justify-center items-center pt-5 gap-2">
          <DialogTitle className="uppercase font-bold text-lg">Atualizar Incidente</DialogTitle>
          <DialogDescription className="hyphens-auto text-justify">
            Atualize as informações do incidente preenchendo o formulário abaixo.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-5 w-5" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-xs font-bold uppercase">
              Título:
            </label>
            <Input
              id="title"
              placeholder="Digite o título do incidente"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className={errors.title ? "border-red-500" : "text-xs font-light"}
            />
            {errors.title && (
              <p className="text-xs text-red-500">{errors.title}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-xs font-bold uppercase">
              Descrição:
            </label>
            <Textarea
              id="description"
              placeholder="Digite a descrição do incidente"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className={errors.description ? "border-red-500" : "text-xs font-light"}
              rows={4}
            />
            {errors.description && (
              <p className="text-xs text-red-500">{errors.description}</p>
            )}
          </div>

          <div className="flex flex-row justify-start items-center gap-2">
            <label htmlFor="status" className="text-xs font-bold uppercase">
              Status:
            </label>
            <Select value={formData.status} onValueChange={(value) =>
              setFormData({ ...formData, status: value as "open" | "in-progress" | "closed" })
            }>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Aberto</SelectItem>
                <SelectItem value="in-progress">Em Progresso</SelectItem>
                <SelectItem value="closed">Fechado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
              className="text-xs font-bold uppercase"
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading} className="text-xs font-bold uppercase">
              {loading ? "Atualizando..." : "Atualizar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
