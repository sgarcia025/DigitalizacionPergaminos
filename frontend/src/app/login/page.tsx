"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, Building2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Mock tenants data - replace with real API
const mockTenants = [
  { id: "1", name: "Empresa Alpha", slug: "alpha" },
  { id: "2", name: "Corporación Beta", slug: "beta" },
  { id: "3", name: "Industrias Gamma", slug: "gamma" },
];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showTenantSelector, setShowTenantSelector] = useState(false);
  const [userTenants, setUserTenants] = useState<typeof mockTenants>([]);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Por favor complete todos los campos");
      return;
    }

    setIsLoading(true);

    try {
      // Mock login process - replace with real API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // TODO: Actual login logic here
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // });

      // Mock successful login - show tenant selector
      setUserTenants(mockTenants); // In real app, this comes from API response
      setShowTenantSelector(true);
      
    } catch (error) {
      toast.error("Credenciales inválidas");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTenantSelection = (tenant: typeof mockTenants[0]) => {
    // Store tenant selection and redirect to dashboard
    localStorage.setItem('currentTenant', JSON.stringify(tenant));
    toast.success(`Conectado a ${tenant.name}`);
    router.push('/dashboard');
  };

  if (showTenantSelector) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 bg-primary rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
            <CardTitle className="text-2xl">Seleccionar Empresa</CardTitle>
            <CardDescription>
              Selecciona la empresa con la que deseas trabajar
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {userTenants.map((tenant) => (
              <Button
                key={tenant.id}
                variant="outline"
                className="w-full justify-start p-4 h-auto"
                onClick={() => handleTenantSelection(tenant)}
              >
                <Building2 className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">{tenant.name}</div>
                  <div className="text-sm text-muted-foreground">@{tenant.slug}</div>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 bg-primary rounded-lg flex items-center justify-center">
              <FileText className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl">Pergaminos IDP</CardTitle>
          <CardDescription>
            Plataforma de Digitalización Inteligente de Documentos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@empresa.com"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-background border-t-transparent mr-2" />
                  Iniciando sesión...
                </>
              ) : (
                "Iniciar Sesión"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>¿Olvidaste tu contraseña?</p>
            <Button variant="link" className="p-0 h-auto font-normal">
              Recuperar contraseña
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}