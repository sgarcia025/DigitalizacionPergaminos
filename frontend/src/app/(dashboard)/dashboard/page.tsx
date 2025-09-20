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
  Building2
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
  Ready: "text-emerald-700 bg-emerald-100 border-emerald-300 dark:text-emerald-300 dark:bg-emerald-900/30 dark:border-emerald-700",
  Processing: "text-blue-700 bg-blue-100 border-blue-300 dark:text-blue-300 dark:bg-blue-900/30 dark:border-blue-700", 
  QA: "text-amber-700 bg-amber-100 border-amber-300 dark:text-amber-300 dark:bg-amber-900/30 dark:border-amber-700",
  Error: "text-red-700 bg-red-100 border-red-300 dark:text-red-300 dark:bg-red-900/30 dark:border-red-700",
  Uploaded: "text-gray-700 bg-gray-100 border-gray-300 dark:text-gray-300 dark:bg-gray-900/30 dark:border-gray-700"
};

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20 p-8 rounded-2xl border border-blue-200/50 dark:border-blue-800/50 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              📊 Dashboard
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-lg">
              Resumen de actividad y métricas de procesamiento inteligente
            </p>
          </div>
          <Link href="/upload">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <Upload className="mr-2 h-5 w-5" />
              🚀 Cargar Expediente
            </Button>
          </Link>
        </div>
      </div>

      {/* Enhanced KPI Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Procesados Hoy */}
        <Card className="bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-950/40 dark:to-teal-950/40 border-emerald-200 dark:border-emerald-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold text-emerald-800 dark:text-emerald-200">
              📈 Procesados Hoy
            </CardTitle>
            <div className="p-2 bg-emerald-500/20 rounded-full">
              <FileText className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent>
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
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/40 dark:to-indigo-950/40 border-blue-200 dark:border-blue-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold text-blue-800 dark:text-blue-200">
              ⏳ En Cola
            </CardTitle>
            <div className="p-2 bg-blue-500/20 rounded-full">
              <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900 dark:text-blue-100 mb-1">
              {mockStats.inQueue}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Activity className="h-4 w-4 text-blue-500 animate-pulse" />
              <span className="text-blue-600 dark:text-blue-400 font-medium">Procesando...</span>
            </div>
          </CardContent>
        </Card>

        {/* Con Issues */}
        <Card className="bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-950/40 dark:to-orange-950/40 border-amber-200 dark:border-amber-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold text-amber-800 dark:text-amber-200">
              ⚠️ Con Issues
            </CardTitle>
            <div className="p-2 bg-amber-500/20 rounded-full">
              <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-900 dark:text-amber-100 mb-1">
              {mockStats.withIssues}
            </div>
            <div className="text-sm">
              <span className="text-amber-600 dark:text-amber-400 font-medium">Requieren atención</span>
            </div>
          </CardContent>
        </Card>

        {/* Throughput */}
        <Card className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-950/40 dark:to-pink-950/40 border-purple-200 dark:border-purple-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold text-purple-800 dark:text-purple-200">
              🚀 Throughput
            </CardTitle>
            <div className="p-2 bg-purple-500/20 rounded-full">
              <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900 dark:text-purple-100 mb-1">
              {mockStats.throughput}
            </div>
            <div className="text-sm">
              <span className="text-purple-600 dark:text-purple-400 font-medium">⏱️ {mockStats.avgProcessingTime}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Metrics Row */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900/50 dark:to-gray-900/50 border-slate-200 dark:border-slate-700 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              ✅ Tasa de Éxito
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-emerald-600 mb-3">
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

        <Card className="bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900/50 dark:to-gray-900/50 border-slate-200 dark:border-slate-700 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              📊 Total Procesados
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

        <Card className="bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900/50 dark:to-gray-900/50 border-slate-200 dark:border-slate-700 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              ⏰ Tiempo Promedio
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
      <Card className="bg-gradient-to-b from-white to-slate-50/80 dark:from-slate-900 dark:to-slate-800/80 border-slate-200 dark:border-slate-700 shadow-xl">
        <CardHeader className="border-b border-slate-200/80 dark:border-slate-700/80 bg-gradient-to-r from-slate-50/80 to-blue-50/50 dark:from-slate-800/80 dark:to-slate-700/80">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-3">
                📁 Últimos Expedientes
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-300 mt-1">
                Expedientes procesados recientemente con su estado actual
              </CardDescription>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-xl">
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {mockRecentFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-6 border border-slate-200/60 dark:border-slate-700/60 rounded-xl bg-gradient-to-r from-white to-slate-50/50 dark:from-slate-800/50 dark:to-slate-700/50 hover:shadow-lg hover:border-blue-300/60 transition-all duration-300 group"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl group-hover:scale-110 transition-transform">
                    <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-lg group-hover:text-blue-600 transition-colors">
                      {file.name}
                    </h4>
                    <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 mt-1">
                      <div className="flex items-center gap-1">
                        <Building2 className="h-4 w-4" />
                        <span className="font-medium">{file.company}</span>
                      </div>
                      <span className="text-slate-400">•</span>
                      <span>{file.pages} páginas</span>
                      <span className="text-slate-400">•</span>
                      <span>{new Date(file.uploadedAt).toLocaleDateString('es-ES')}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
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
                      <Button variant="outline" size="sm" className="shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105">
                        <Eye className="h-4 w-4 mr-1" />
                        Ver Detalle
                      </Button>
                    </Link>
                    
                    {file.status === 'Ready' && (
                      <Button variant="outline" size="sm" className="shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105">
                        <Download className="h-4 w-4 mr-1" />
                        Descargar
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-200/60 dark:border-slate-700/60">
            <Link href="/files">
              <Button 
                variant="outline" 
                size="lg"
                className="w-full bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-2 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-semibold hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <FileText className="mr-2 h-5 w-5" />
                📋 Ver Todos los Expedientes
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}