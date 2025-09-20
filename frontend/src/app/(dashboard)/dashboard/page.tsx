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
  Activity
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

const statusIcons = {
  Ready: <CheckCircle className="h-5 w-5 text-emerald-500" />,
  Processing: <Clock className="h-5 w-5 text-blue-500" />,
  QA: <AlertTriangle className="h-5 w-5 text-amber-500" />,
  Error: <AlertTriangle className="h-5 w-5 text-red-500" />,
  Uploaded: <Upload className="h-5 w-5 text-gray-500" />
};

const statusColors = {
  Ready: "text-emerald-700 bg-emerald-50 border-emerald-200 dark:text-emerald-300 dark:bg-emerald-950/30 dark:border-emerald-800",
  Processing: "text-blue-700 bg-blue-50 border-blue-200 dark:text-blue-300 dark:bg-blue-950/30 dark:border-blue-800", 
  QA: "text-amber-700 bg-amber-50 border-amber-200 dark:text-amber-300 dark:bg-amber-950/30 dark:border-amber-800",
  Error: "text-red-700 bg-red-50 border-red-200 dark:text-red-300 dark:bg-red-950/30 dark:border-red-800",
  Uploaded: "text-gray-700 bg-gray-50 border-gray-200 dark:text-gray-300 dark:bg-gray-950/30 dark:border-gray-800"
};

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header with gradient background */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-teal-600/10 rounded-2xl blur-3xl"></div>
        <div className="relative flex items-center justify-between p-8 bg-gradient-to-r from-slate-50 to-blue-50/50 dark:from-slate-900 dark:to-slate-800 rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mt-2 text-lg">
              Resumen de actividad y métricas de procesamiento inteligente
            </p>
          </div>
          <Link href="/upload">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all duration-300">
              <Upload className="mr-2 h-5 w-5" />
              Cargar Expediente
            </Button>
          </Link>
        </div>
      </div>

      {/* Enhanced KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Procesados Hoy */}
        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10"></div>
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-emerald-800 dark:text-emerald-200">
              Procesados Hoy
            </CardTitle>
            <div className="p-2 bg-emerald-500/20 rounded-lg">
              <FileText className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-emerald-900 dark:text-emerald-100 mb-1">
              {mockStats.processedToday}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4 text-emerald-500" />
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">+12% desde ayer</span>
            </div>
          </CardContent>
        </Card>

        {/* En Cola */}
        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10"></div>
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-blue-800 dark:text-blue-200">
              En Cola
            </CardTitle>
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-blue-900 dark:text-blue-100 mb-1">
              {mockStats.inQueue}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Activity className="h-4 w-4 text-blue-500" />
              <span className="text-blue-600 dark:text-blue-400 font-medium">Procesando...</span>
            </div>
          </CardContent>
        </Card>

        {/* Con Issues */}
        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/50 dark:to-orange-950/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10"></div>
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-amber-800 dark:text-amber-200">
              Con Issues
            </CardTitle>
            <div className="p-2 bg-amber-500/20 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-amber-900 dark:text-amber-100 mb-1">
              {mockStats.withIssues}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-amber-600 dark:text-amber-400 font-medium">Requieren atención</span>
            </div>
          </CardContent>
        </Card>

        {/* Throughput */}
        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10"></div>
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-purple-800 dark:text-purple-200">
              Throughput
            </CardTitle>
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-2xl font-bold text-purple-900 dark:text-purple-100 mb-1">
              {mockStats.throughput}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-purple-600 dark:text-purple-400 font-medium">⏱️ {mockStats.avgProcessingTime}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Success Rate Section */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-900 dark:to-gray-900 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-slate-800 dark:text-slate-200">
              Tasa de Éxito
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-emerald-600 mb-2">
              {mockStats.successRate}%
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full transition-all duration-1000" 
                style={{ width: `${mockStats.successRate}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-900 dark:to-gray-900 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-slate-800 dark:text-slate-200">
              Total Procesados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {mockStats.totalProcessed.toLocaleString()}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Documentos este mes
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-900 dark:to-gray-900 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-slate-800 dark:text-slate-200">
              Tiempo Promedio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-purple-600 mb-2">
              {mockStats.avgProcessingTime}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Por documento
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Recent Files */}
      <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-b from-white to-slate-50/50 dark:from-slate-900 dark:to-slate-800/50">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-teal-500/5"></div>
        <CardHeader className="relative border-b border-slate-200/50 dark:border-slate-700/50 bg-gradient-to-r from-slate-50 to-blue-50/30 dark:from-slate-800 dark:to-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                📁 Últimos Expedientes
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-300 mt-1">
                Expedientes procesados recientemente con su estado actual
              </CardDescription>
            </div>
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative p-6">
          <div className="space-y-4">
            {mockRecentFiles.map((file, index) => (
              <div
                key={file.id}
                className="group relative flex items-center justify-between p-6 border border-slate-200/50 dark:border-slate-700/50 rounded-xl bg-gradient-to-r from-white to-slate-50/30 dark:from-slate-800 dark:to-slate-700/30 hover:shadow-lg hover:border-blue-300/50 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                
                <div className="relative flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl">
                    <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-lg group-hover:text-blue-600 transition-colors">
                      {file.name}
                    </h4>
                    <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 mt-1">
                      <span className="font-medium">{file.company}</span>
                      <span className="text-slate-400">•</span>
                      <span>{file.pages} páginas</span>
                      <span className="text-slate-400">•</span>
                      <span>{new Date(file.uploadedAt).toLocaleDateString('es-ES')}</span>
                    </div>
                  </div>
                </div>
                
                <div className="relative flex items-center space-x-3">
                  <span
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border-2 shadow-sm ${
                      statusColors[file.status as keyof typeof statusColors]
                    }`}
                  >
                    {statusIcons[file.status as keyof typeof statusIcons]}
                    {file.status}
                  </span>
                  
                  <div className="flex gap-2">
                    <Link href={`/files/${file.id}`}>
                      <Button variant="outline" size="sm" className="shadow-sm hover:shadow-md transition-all duration-200">
                        <Eye className="h-4 w-4 mr-1" />
                        Ver Detalle
                      </Button>
                    </Link>
                    
                    {file.status === 'Ready' && (
                      <Button variant="outline" size="sm" className="shadow-sm hover:shadow-md transition-all duration-200">
                        <Download className="h-4 w-4 mr-1" />
                        Descargar
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-200/50 dark:border-slate-700/50">
            <Link href="/files">
              <Button 
                variant="outline" 
                size="lg"
                className="w-full bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-2 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-semibold hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 hover:shadow-lg transition-all duration-300"
              >
                <FileText className="mr-2 h-5 w-5" />
                Ver Todos los Expedientes
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}