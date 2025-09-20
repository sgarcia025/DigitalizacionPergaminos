"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, Building2, Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Mock tenants data - replace with real API
const mockTenants = [
  { id: "1", name: "Empresa Alpha", slug: "alpha", logo: "🏢" },
  { id: "2", name: "Corporación Beta", slug: "beta", logo: "🏭" },
  { id: "3", name: "Industrias Gamma", slug: "gamma", logo: "🏗️" },
  { id: "4", name: "Tech Solutions", slug: "tech", logo: "💻" },
];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // TODO: Actual login logic here
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // });

      // Mock successful login - show tenant selector
      setUserTenants(mockTenants); // In real app, this comes from API response
      setShowTenantSelector(true);
      toast.success("Credenciales verificadas exitosamente");
      
    } catch (error) {
      toast.error("Credenciales inválidas. Por favor intente nuevamente.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTenantSelection = (tenant: typeof mockTenants[0]) => {
    // Store tenant selection and redirect to dashboard
    localStorage.setItem('currentTenant', JSON.stringify(tenant));
    localStorage.setItem('authToken', 'mock-jwt-token'); // Mock token
    toast.success(`Conectado exitosamente a ${tenant.name}`);
    router.push('/dashboard');
  };

  if (showTenantSelector) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-3xl mb-4 shadow-2xl">
              <FileText className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2">
              Seleccionar Empresa
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Selecciona la empresa con la que deseas trabajar
            </p>
          </div>

          {/* Tenant Grid */}
          <div className="grid gap-4 md:grid-cols-2">
            {userTenants.map((tenant) => (
              <Card
                key={tenant.id}
                className="cursor-pointer border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white dark:bg-gray-800 rounded-2xl"
                onClick={() => handleTenantSelection(tenant)}
              >
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{tenant.logo}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {tenant.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        @{tenant.slug}
                      </p>
                    </div>
                    <Building2 className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button 
              variant="outline" 
              onClick={() => setShowTenantSelector(false)}
              className="rounded-xl"
            >
              ← Volver al Login
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-3xl mb-6 shadow-2xl">
            <FileText className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2">
            Pergaminos IDP
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Plataforma de Digitalización Inteligente
          </p>
        </div>

        {/* Login Card */}
        <Card className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-2xl rounded-3xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white text-center">
              Iniciar Sesión
            </CardTitle>
            <CardDescription className="text-center text-gray-600 dark:text-gray-400">
              Ingresa tus credenciales para acceder al sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-semibold text-gray-900 dark:text-white">
                  Correo Electrónico
                </Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@empresa.com"
                    className="pl-12 h-14 text-base border-2 rounded-xl focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
              </div>
              
              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-base font-semibold text-gray-900 dark:text-white">
                  Contraseña
                </Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-12 pr-12 h-14 text-base border-2 rounded-xl focus:border-blue-500 transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-4 h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              {/* Remember & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Recordarme</span>
                </label>
                <Button variant="link" className="p-0 h-auto font-medium text-blue-600 hover:text-blue-700">
                  ¿Olvidaste tu contraseña?
                </Button>
              </div>

              {/* Login Button */}
              <Button 
                type="submit" 
                className="w-full h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Verificando credenciales...
                  </>
                ) : (
                  "🚀 Iniciar Sesión"
                )}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                💡 Credenciales de Demo:
              </h4>
              <div className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <div><strong>Email:</strong> admin@pergaminos.com</div>
                <div><strong>Password:</strong> demo123</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-600 dark:text-gray-400">
          <p className="text-sm">
            ¿Necesitas ayuda? Contacta al{" "}
            <Button variant="link" className="p-0 h-auto font-medium text-blue-600">
              soporte técnico
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}