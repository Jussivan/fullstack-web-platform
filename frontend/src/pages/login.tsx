import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Alert, AlertDescription } from "../components/ui/alert";
import { AlertCircle } from "lucide-react";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await api.auth.login({ email, password });
      setToken(result.token);
      navigate("/incidents");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 sm:p-6">
      <Card className="w-full max-w-md border-1 border-primary py-7">
        <CardHeader className="w-full flex flex-col justify-center items-center gap-2 sm:gap-3">
          <CardTitle className="text-foreground uppercase font-bold text-lg sm:text-xl">Login</CardTitle>
          <CardDescription className="text-xs sm:text-sm text-center">Informe suas credenciais para acessar sua conta.</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-5">
          {error && (
            <Alert variant="destructive" className="text-xs sm:text-sm">   
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col justify-between gap-5 sm:gap-7">
            <div className="flex flex-col gap-2 md:gap-3">
              <label className="text-xs font-bold uppercase">Digite seu Email :</label>
              <Input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="text-xs font-light"
              />
            </div>

            <div className="flex flex-col gap-2 md:gap-3">
              <label className="text-xs font-bold uppercase">Digite sua Senha :</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                className="text-xs font-light"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full text-xs font-bold uppercase"
            >
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Não tem conta?{" "}
              <Link
                to="/register"
                className="font-semibold underline hover:no-underline text-primary"
              >
                Registre-se
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}