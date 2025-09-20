"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Users, 
  Building2, 
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Shield,
  UserCheck,
  Activity,
  Settings
} from "lucide-react";

// Mock data for tenants/clients
const mockTenants = [
  {
    id: "1",
    name: "Empresa Alpha",
    slug: "alpha",
    status: "active",
    users: 12,
    documents: 1247,
    createdAt: "2024-01-15",
    logo: "🏢"
  },
  {
    id: "2", 
    name: "Corporación Beta",
    slug: "beta",
    status: "active",
    users: 8,
    documents: 892,
    createdAt: "2024-01-10",
    logo: "🏭"
  },
  {
    id: "3",
    name: "Industrias Gamma",
    slug: "gamma", 
    status: "inactive",
    users: 5,
    documents: 456,
    createdAt: "2024-01-05",
    logo: "🏗️"
  },
  {
    id: "4",
    name: "Tech Solutions",
    slug: "tech",
    status: "active",
    users: 15,
    documents: 2103,
    createdAt: "2024-01-20",
    logo: "💻"
  }
];

// Mock data for users
const mockUsers = [
  {
    id: "1",
    name: "Carlos Administrador",
    email: "carlos@alpha.com",
    role: "Admin",
    tenant: "Empresa Alpha",
    status: "active",
    lastLogin: "2024-01-15T10:30:00Z"
  },
  {
    id: "2",
    name: "María Operador",
    email: "maria@beta.com", 
    role: "Operator",
    tenant: "Corporación Beta",
    status: "active",
    lastLogin: "2024-01-15T09:15:00Z"
  },
  {
    id: "3",
    name: "Juan Consultor",
    email: "juan@gamma.com",
    role: "Viewer", 
    tenant: "Industrias Gamma",
    status: "inactive",
    lastLogin: "2024-01-10T14:20:00Z"
  }
];

const statusColors = {
  active: "text-green-700 bg-green-100 border border-green-300",
  inactive: "text-red-700 bg-red-100 border border-red-300",
  pending: "text-yellow-700 bg-yellow-100 border border-yellow-300"
};

const roleColors = {
  Admin: "text-purple-700 bg-purple-100 border border-purple-300",
  Operator: "text-blue-700 bg-blue-100 border border-blue-300", 
  Viewer: "text-gray-700 bg-gray-100 border border-gray-300"
};

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'tenants' | 'users' | 'audit'>('tenants');
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const tabs = [
    { id: 'tenants', label: '🏢 Gestión de Clientes', icon: Building2 },
    { id: 'users', label: '👥 Gestión de Usuarios', icon: Users },
    { id: 'audit', label: '📋 Auditoría', icon: Activity }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 dark:from-purple-950/20 dark:via-indigo-950/20 dark:to-blue-950/20 p-8 rounded-2xl border border-purple-200/50 dark:border-purple-800/50 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent mb-2">
              🛡️ Administración
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-lg">
              Gestión de clientes, usuarios y configuraciones del sistema
            </p>
          </div>
          <Button 
            onClick={() => setShowCreateModal(true)}
            size="lg" 
            className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Plus className="mr-2 h-5 w-5" />
            Crear Nuevo
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-2xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-white dark:bg-gray-700 text-blue-600 shadow-lg transform scale-105'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <tab.icon className="h-5 w-5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <Card className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-lg rounded-2xl">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
            <Input
              placeholder={`Buscar ${activeTab === 'tenants' ? 'clientes' : activeTab === 'users' ? 'usuarios' : 'actividades'}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-14 text-base border-2 rounded-xl focus:border-blue-500 transition-colors"
            />
          </div>
        </CardContent>
      </Card>

      {/* Content based on active tab */}
      {activeTab === 'tenants' && (
        <Card className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-xl rounded-2xl">
          <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-t-2xl">
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              🏢 Gestión de Clientes
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Administra los clientes y sus configuraciones
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {mockTenants.map((tenant) => (
                <div
                  key={tenant.id}
                  className="flex items-center justify-between p-6 border-2 border-gray-100 dark:border-gray-700 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center space-x-6">
                    <div className="text-4xl">{tenant.logo}</div>
                    <div>
                      <h4 className="font-bold text-xl text-gray-900 dark:text-white">
                        {tenant.name}
                      </h4>
                      <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 mt-2">
                        <span className="font-medium">@{tenant.slug}</span>
                        <span>•</span>
                        <span>{tenant.users} usuarios</span>
                        <span>•</span>
                        <span>{tenant.documents.toLocaleString()} documentos</span>
                        <span>•</span>
                        <span>Creado: {new Date(tenant.createdAt).toLocaleDateString('es-ES')}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span
                      className={`px-4 py-2 rounded-xl font-bold text-sm ${
                        statusColors[tenant.status as keyof typeof statusColors]
                      }`}
                    >
                      {tenant.status === 'active' ? '✅ Activo' : '❌ Inactivo'}
                    </span>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="rounded-xl">
                        <Eye className="h-4 w-4 mr-1" />
                        Ver
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-xl">
                        <Edit className="h-4 w-4 mr-1" />
                        Editar
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-xl text-red-600 border-red-300 hover:bg-red-50">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Eliminar
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'users' && (
        <Card className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-xl rounded-2xl">
          <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-t-2xl">
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              👥 Gestión de Usuarios
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Administra usuarios y sus roles por cliente
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {mockUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-6 border-2 border-gray-100 dark:border-gray-700 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center space-x-6">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl text-gray-900 dark:text-white">
                        {user.name}
                      </h4>
                      <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 mt-2">
                        <span className="font-medium">{user.email}</span>
                        <span>•</span>
                        <span>{user.tenant}</span>
                        <span>•</span>
                        <span>Último login: {new Date(user.lastLogin).toLocaleDateString('es-ES')}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span
                      className={`px-4 py-2 rounded-xl font-bold text-sm ${
                        roleColors[user.role as keyof typeof roleColors]
                      }`}
                    >
                      <Shield className="h-4 w-4 inline mr-1" />
                      {user.role}
                    </span>
                    
                    <span
                      className={`px-4 py-2 rounded-xl font-bold text-sm ${
                        statusColors[user.status as keyof typeof statusColors]
                      }`}
                    >
                      {user.status === 'active' ? '✅ Activo' : '❌ Inactivo'}
                    </span>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="rounded-xl">
                        <Edit className="h-4 w-4 mr-1" />
                        Editar
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-xl text-red-600 border-red-300 hover:bg-red-50">
                        <UserCheck className="h-4 w-4 mr-1" />
                        Desactivar
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'audit' && (
        <Card className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-xl rounded-2xl">
          <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-t-2xl">
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              📋 Registro de Auditoría
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Historial de actividades y cambios en el sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="p-6 border-2 border-blue-100 dark:border-blue-800 rounded-2xl bg-blue-50 dark:bg-blue-900/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <Settings className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-blue-900 dark:text-blue-100">
                        Usuario creado: María Operador
                      </h4>
                      <p className="text-blue-700 dark:text-blue-200">
                        Admin Carlos creó nuevo usuario en Corporación Beta
                      </p>
                    </div>
                  </div>
                  <span className="text-sm text-blue-600 dark:text-blue-300 font-medium">
                    Hace 2 horas
                  </span>
                </div>
              </div>

              <div className="p-6 border-2 border-green-100 dark:border-green-800 rounded-2xl bg-green-50 dark:bg-green-900/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-green-900 dark:text-green-100">
                        Cliente activado: Tech Solutions
                      </h4>
                      <p className="text-green-700 dark:text-green-200">
                        Cliente cambió de estado inactivo a activo
                      </p>
                    </div>
                  </div>
                  <span className="text-sm text-green-600 dark:text-green-300 font-medium">
                    Hace 1 día
                  </span>
                </div>
              </div>

              <div className="p-6 border-2 border-yellow-100 dark:border-yellow-800 rounded-2xl bg-yellow-50 dark:bg-yellow-900/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                      <Shield className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-yellow-900 dark:text-yellow-100">
                        Rol modificado: Juan Consultor
                      </h4>
                      <p className="text-yellow-700 dark:text-yellow-200">
                        Rol cambiado de Admin a Viewer en Industrias Gamma
                      </p>
                    </div>
                  </div>
                  <span className="text-sm text-yellow-600 dark:text-yellow-300 font-medium">
                    Hace 3 días
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}