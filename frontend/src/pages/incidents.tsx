import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IncidentList } from "../components/IncidentList";
import { useAuth } from "@/context/AuthContext";
import { LogOut } from "lucide-react";

export function IncidentsPage() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto flex flex-col justify-center py-5">
        <div className="flex flex-row justify-around md:justify-between items-center">
          <h1 className="md:text-xl font-normal uppercase">Bem vindo, <span className="font-bold text-primary">{user?.name}</span></h1>
          <Button
            onClick={handleLogout}
            className="text-sm font-bold uppercase flex items-center md:px-5 gap-3"
          >
            <LogOut/>
            <span className="hidden sm:inline">Sair</span>
          </Button>
        </div>
        <IncidentList />
      </div>
    </div>
  );
}
