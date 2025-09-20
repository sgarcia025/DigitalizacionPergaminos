"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  TrendingUp,
  Upload
} from "lucide-react";
import Link from "next/link";

// Mock data - replace with real API calls
const mockStats = {
  processedToday: 43,
  inQueue: 12,
  withIssues: 3,
  avgProcessingTime: "2.4 min",
  throughput: "145 páginas/hora"
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
  Ready: <CheckCircle className="h-4 w-4 text-green-500" />,
  Processing: <Clock className="h-4 w-4 text-blue-500" />,
  QA: <AlertTriangle className="h-4 w-4 text-yellow-500" />,
  Error: <AlertTriangle className="h-4 w-4 text-red-500" />,
  Uploaded: <Upload className="h-4 w-4 text-gray-500" />
};

const statusColors = {
  Ready: "text-green-700 bg-green-50 border-green-200",
  Processing: "text-blue-700 bg-blue-50 border-blue-200", 
  QA: "text-yellow-700 bg-yellow-50 border-yellow-200",
  Error: "text-red-700 bg-red-50 border-red-200",
  Uploaded: "text-gray-700 bg-gray-50 border-gray-200"
};

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Resumen de actividad y métricas de procesamiento
          </p>
        </div>
        <Link href="/upload">
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Cargar Expediente
          </Button>
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Procesados Hoy
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.processedToday}</div>
            <p className="text-xs text-muted-foreground">
              +12% desde ayer
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Cola</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.inQueue}</div>
            <p className="text-xs text-muted-foreground">
              Esperando procesamiento
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Con Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.withIssues}</div>
            <p className="text-xs text-muted-foreground">
              Requieren atención
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Throughput</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.throughput}</div>
            <p className="text-xs text-muted-foreground">
              Tiempo promedio: {mockStats.avgProcessingTime}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Files */}
      <Card>
        <CardHeader>
          <CardTitle>Últimos Expedientes</CardTitle>
          <CardDescription>
            Expedientes procesados recientemente con su estado actual
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockRecentFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <h4 className="font-medium">{file.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {file.company} • {file.pages} páginas
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${
                      statusColors[file.status as keyof typeof statusColors]
                    }`}
                  >
                    {statusIcons[file.status as keyof typeof statusIcons]}
                    {file.status}
                  </span>
                  
                  <Link href={`/files/${file.id}`}>
                    <Button variant="outline" size="sm">
                      Ver Detalle
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t">
            <Link href="/files">
              <Button variant="outline" className="w-full">
                Ver Todos los Expedientes
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}