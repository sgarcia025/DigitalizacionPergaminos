"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  TrendingUp,
  Upload,
  Eye,
  Download,
  BarChart3,
  Activity,
  Building2,
  Zap,
  Target,
  Users
} from "lucide-react";
import Link from "next/link";

// Mock data - replace with real API calls
const mockStats = {
  processedToday: 43,
  inQueue: 12,
  withIssues: 3,
  avgProcessingTime: "2.4 min",
  throughput: "145 páginas/hora",
  successRate: 97.2,
  totalProcessed: 1247
};

const mockRecentFiles = [
  {
    id: "1",
    name: "Expediente_Contrato_2024_001.pdf",
    status: "Ready",
    pages: 89,
    uploadedAt: "2024-01-15T10:30:00Z",
    company: "Empresa Alpha"
  },
  {
    id: "2", 
    name: "Factura_Serie_A_0234.pdf",
    status: "Processing",
    pages: 3,
    uploadedAt: "2024-01-15T10:15:00Z",
    company: "Corporación Beta"
  },
  {
    id: "3",
    name: "Expediente_Legal_2024_007.pdf", 
    status: "QA",
    pages: 127,
    uploadedAt: "2024-01-15T09:45:00Z",
    company: "Industrias Gamma"
  },
  {
    id: "4",
    name: "Contrato_Arrendamiento_456.pdf",
    status: "Error",
    pages: 45,
    uploadedAt: "2024-01-15T09:30:00Z",
    company: "Empresa Alpha"
  }
];

const statusConfig = {
  Ready: { 
    icon: <CheckCircle className="h-5 w-5" />, 
    color: "text-green-700 bg-green-100 border border-green-300",
    dotColor: "bg-green-500"
  },
  Processing: { 
    icon: <Clock className="h-5 w-5" />, 
    color: "text-blue-700 bg-blue-100 border border-blue-300",
    dotColor: "bg-blue-500"
  },
  QA: { 
    icon: <AlertTriangle className="h-5 w-5" />, 
    color: "text-yellow-700 bg-yellow-100 border border-yellow-300",
    dotColor: "bg-yellow-500"
  },
  Error: { 
    icon: <AlertTriangle className="h-5 w-5" />, 
    color: "text-red-700 bg-red-100 border border-red-300",
    dotColor: "bg-red-500"
  }
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="space-y-8 p-6">
        {/* Beautiful Header */}
        <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 shadow-2xl border-2 border-blue-100 dark:border-blue-900">
          <div className="absolute inset-0 bg-blue-500 opacity-5"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400 rounded-full opacity-10 -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-400 rounded-full opacity-10 translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative p-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">
                  📊 Dashboard
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  Resumen de actividad y métricas de procesamiento inteligente
                </p>
              </div>
              <Link href="/upload">
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-lg font-bold"
                >
                  <Upload className="mr-3 h-6 w-6" />
                  🚀 Cargar Expediente
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Beautiful KPI Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Procesados Hoy */}
          <Card className="relative overflow-hidden bg-white dark:bg-gray-800 border-2 border-green-200 dark:border-green-800 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-2xl">
            <div className="absolute top-0 right-0 w-24 h-24 bg-green-400 rounded-full opacity-20 -translate-y-1/2 translate-x-1/2"></div>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold text-green-800 dark:text-green-200">
                  📈 PROCESADOS HOY
                </CardTitle>
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                  <FileText className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black text-green-900 dark:text-green-100 mb-2">
                {mockStats.processedToday}
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <span className="text-green-600 dark:text-green-400 font-bold">+12% desde ayer</span>
              </div>
            </CardContent>
          </Card>

          {/* En Cola */}
          <Card className="relative overflow-hidden bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-800 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-2xl">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-400 rounded-full opacity-20 -translate-y-1/2 translate-x-1/2"></div>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold text-blue-800 dark:text-blue-200">
                  ⏳ EN COLA
                </CardTitle>
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <Clock className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black text-blue-900 dark:text-blue-100 mb-2">
                {mockStats.inQueue}
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-blue-600 dark:text-blue-400 font-bold">Procesando...</span>
              </div>
            </CardContent>
          </Card>

          {/* Con Issues */}
          <Card className="relative overflow-hidden bg-white dark:bg-gray-800 border-2 border-yellow-200 dark:border-yellow-800 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-2xl">
            <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-400 rounded-full opacity-20 -translate-y-1/2 translate-x-1/2"></div>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold text-yellow-800 dark:text-yellow-200">
                  ⚠️ CON ISSUES
                </CardTitle>
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                  <AlertTriangle className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black text-yellow-900 dark:text-yellow-100 mb-2">
                {mockStats.withIssues}
              </div>
              <span className="text-yellow-600 dark:text-yellow-400 font-bold">Requieren atención</span>
            </CardContent>
          </Card>

          {/* Throughput */}
          <Card className="relative overflow-hidden bg-white dark:bg-gray-800 border-2 border-purple-200 dark:border-purple-800 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-2xl">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-400 rounded-full opacity-20 -translate-y-1/2 translate-x-1/2"></div>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold text-purple-800 dark:text-purple-200">
                  🚀 THROUGHPUT
                </CardTitle>
                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                  <BarChart3 className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-purple-900 dark:text-purple-100 mb-2">
                {mockStats.throughput}
              </div>
              <span className="text-purple-600 dark:text-purple-400 font-bold">⏱️ {mockStats.avgProcessingTime}</span>
            </CardContent>
          </Card>
        </div>

        {/* Stats Row */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-xl rounded-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Target className="h-6 w-6 text-green-500" />
                ✅ Tasa de Éxito
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-black text-green-600 mb-4">
                {mockStats.successRate}%
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                <div 
                  className="bg-green-500 h-4 rounded-full transition-all duration-1000" 
                  style={{ width: `${mockStats.successRate}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-xl rounded-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Users className="h-6 w-6 text-blue-500" />
                📊 Total Procesados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-black text-blue-600 mb-2">
                {mockStats.totalProcessed.toLocaleString()}
              </div>
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                Documentos este mes
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-xl rounded-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Zap className="h-6 w-6 text-purple-500" />
                ⏰ Tiempo Promedio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-black text-purple-600 mb-2">
                {mockStats.avgProcessingTime}
              </div>
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                Por documento
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Beautiful Recent Files */}
        <Card className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-2xl rounded-3xl">
          <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-t-3xl">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                  📁 Últimos Expedientes
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300 mt-2 text-lg">
                  Expedientes procesados recientemente con su estado actual
                </CardDescription>
              </div>
              <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-2xl">
                <FileText className="h-10 w-10 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              {mockRecentFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-6 border-2 border-gray-100 dark:border-gray-700 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:border-blue-300 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex items-center space-x-6">
                    <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-2xl group-hover:scale-110 transition-transform">
                      <FileText className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                        {file.name}
                      </h4>
                      <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 mt-2">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-5 w-5" />
                          <span className="font-semibold">{file.company}</span>
                        </div>
                        <span>•</span>
                        <span className="font-medium">{file.pages} páginas</span>
                        <span>•</span>
                        <span>{new Date(file.uploadedAt).toLocaleDateString('es-ES')}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm shadow-lg ${
                        statusConfig[file.status as keyof typeof statusConfig]?.color
                      }`}
                    >
                      <div className={`w-3 h-3 rounded-full ${statusConfig[file.status as keyof typeof statusConfig]?.dotColor}`}></div>
                      {statusConfig[file.status as keyof typeof statusConfig]?.icon}
                      {file.status}
                    </span>
                    
                    <div className="flex gap-3">
                      <Link href={`/files/${file.id}`}>
                        <Button variant="outline" size="lg" className="rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 font-bold">
                          <Eye className="h-5 w-5 mr-2" />
                          Ver Detalle
                        </Button>
                      </Link>
                      
                      {file.status === 'Ready' && (
                        <Button variant="outline" size="lg" className="rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 font-bold text-green-700 border-green-300 hover:bg-green-50">
                          <Download className="h-5 w-5 mr-2" />
                          Descargar
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10 pt-8 border-t-2 border-gray-200 dark:border-gray-700">
              <Link href="/files">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="w-full py-6 rounded-2xl text-lg font-bold border-2 border-blue-300 text-blue-700 hover:bg-blue-50 hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  <FileText className="mr-3 h-6 w-6" />
                  📋 Ver Todos los Expedientes
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}