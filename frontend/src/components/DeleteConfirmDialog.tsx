import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface DeleteConfirmDialogProps {
  incidentTitle: string;
  onConfirm: () => void;
  isLoading?: boolean;
}

export function DeleteConfirmDialog({
  incidentTitle,
  onConfirm,
  isLoading = false,
}: DeleteConfirmDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          size="sm"
          className="text-xs font-bold uppercase"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Deletar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="flex flex-col">
        <AlertDialogHeader className="flex flex-col gap-5">
          <AlertDialogTitle className="uppercase font-bold">
            Deletar Incidente?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm">
            Tem certeza que deseja deletar o incidente "<strong>{incidentTitle}</strong>"? Esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex flex-row justify-around items-center">
          <AlertDialogCancel className="text-xs font-bold uppercase">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 text-xs font-bold uppercase"
          >
            {isLoading ? "Deletando..." : "Deletar"}
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
