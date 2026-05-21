import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IncidentList } from "../components/IncidentList";
import { useAuth } from "@/context/AuthContext";

export function IncidentsPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold uppercase">Gerenciamento de Incidentes</h1>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="text-xs font-bold uppercase"
          >
            Sair
          </Button>
        </div>
        <IncidentList />
      </div>
    </div>
  );
}
