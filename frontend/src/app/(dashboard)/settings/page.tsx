"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Settings, 
  User, 
  Bell,
  Shield,
  Database,
  Palette,
  Globe,
  Save,
  RefreshCw,
  Key,
  Mail,
  Lock
} from "lucide-react";

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<'profile' | 'notifications' | 'security' | 'system'>('profile');

  const sections = [
    { id: 'profile', label: '👤 Perfil', icon: User },
    { id: 'notifications', label: '🔔 Notificaciones', icon: Bell },
    { id: 'security', label: '🔒 Seguridad', icon: Shield },
    { id: 'system', label: '⚙️ Sistema', icon: Database }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-950/20 dark:via-blue-950/20 dark:to-indigo-950/20 p-8 rounded-2xl border border-gray-200/50 dark:border-gray-800/50 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-xl">
            <Settings className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent">
              ⚙️ Configuración
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-lg mt-2">
              Gestiona tu perfil, notificaciones y configuraciones del sistema
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <Card className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-lg rounded-2xl">
            <CardContent className="p-4">
              <div className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id as any)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      activeSection === section.id
                        ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <section.icon className="h-5 w-5" />
                    {section.label}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {activeSection === 'profile' && (
            <Card className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-xl rounded-2xl">
              <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-t-2xl">
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  👤 Configuración de Perfil
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Actualiza tu información personal y preferencias
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-base font-semibold">Nombre Completo</Label>
                    <Input 
                      defaultValue="Carlos Administrador" 
                      className="h-12 text-base border-2 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-base font-semibold">Email</Label>
                    <Input 
                      defaultValue="carlos@pergaminos.com" 
                      className="h-12 text-base border-2 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-base font-semibold">Cargo</Label>
                    <Input 
                      defaultValue="Administrador del Sistema" 
                      className="h-12 text-base border-2 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-base font-semibold">Teléfono</Label>
                    <Input 
                      defaultValue="+34 612 345 678" 
                      className="h-12 text-base border-2 rounded-xl"
                    />
                  </div>
                </div>
                
                <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-xl">
                    <Save className="mr-2 h-5 w-5" />
                    Guardar Cambios
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === 'security' && (
            <Card className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-xl rounded-2xl">
              <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-t-2xl">
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  🔒 Configuración de Seguridad
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Gestiona la seguridad de tu cuenta y accesos
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="p-6 border-2 border-blue-200 dark:border-blue-800 rounded-2xl bg-blue-50 dark:bg-blue-900/30">
                  <div className="flex items-center gap-4 mb-4">
                    <Lock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100">Cambiar Contraseña</h4>
                  </div>
                  <div className="grid gap-4">
                    <div>
                      <Label className="text-base font-semibold">Contraseña Actual</Label>
                      <Input type="password" className="h-12 text-base border-2 rounded-xl" />
                    </div>
                    <div>
                      <Label className="text-base font-semibold">Nueva Contraseña</Label>
                      <Input type="password" className="h-12 text-base border-2 rounded-xl" />
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
                      Actualizar Contraseña
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}