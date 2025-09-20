"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  Search, 
  Filter,
  Download,
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock,
  Upload
} from "lucide-react";
import Link from "next/link";

// Mock data - replace with real API calls
const mockFiles = [
  {
    id: "1",
    name: "Expediente_Contrato_2024_001.pdf",
    status: "Ready",
    pages: 89,
    uploadedAt: "2024-01-15T10:30:00Z",
    company: "Empresa Alpha",
    size: "12.4 MB",
    hash: "a1b2c3d4e5f6",
    confidenceLevel: 95
  },
  {
    id: "2", 
    name: "Factura_Serie_A_0234.pdf",
    status: "Processing",
    pages: 3,
    uploadedAt: "2024-01-15T10:15:00Z",
    company: "Corporación Beta",
    size: "1.2 MB",
    hash: "f6e5d4c3b2a1",
    confidenceLevel: null
  },
  {
    id: "3",
    name: "Expediente_Legal_2024_007.pdf", 
    status: "QA",
    pages: 127,
    uploadedAt: "2024-01-15T09:45:00Z",
    company: "Industrias Gamma",
    size: "18.7 MB",
    hash: "123456789abc",
    confidenceLevel: 87
  },
  {
    id: "4",
    name: "Contrato_Arrendamiento_456.pdf",
    status: "Error",
    pages: 45,
    uploadedAt: "2024-01-15T09:30:00Z",
    company: "Empresa Alpha",
    size: "5.8 MB",
    hash: "abc987654321",
    confidenceLevel: null
  },
  {
    id: "5",
    name: "Documento_Identidad_789.pdf",
    status: "Ready",
    pages: 2,
    uploadedAt: "2024-01-15T08:45:00Z",
    company: "Corporación Beta",
    size: "0.8 MB",
    hash: "def456123ghi",
    confidenceLevel: 98
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
  Ready: "text-green-700 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-950/30 dark:border-green-800",
  Processing: "text-blue-700 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-950/30 dark:border-blue-800", 
  QA: "text-yellow-700 bg-yellow-50 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-950/30 dark:border-yellow-800",
  Error: "text-red-700 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-950/30 dark:border-red-800",
  Uploaded: "text-gray-700 bg-gray-50 border-gray-200 dark:text-gray-400 dark:bg-gray-950/30 dark:border-gray-800"
};

export default function FilesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFiles, setFilteredFiles] = useState(mockFiles);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = mockFiles.filter(file => 
      file.name.toLowerCase().includes(term.toLowerCase()) ||
      file.company.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredFiles(filtered);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Expedientes</h1>
          <p className="text-muted-foreground">
            Gestiona y revisa todos los expedientes procesados
          </p>
        </div>
        <Link href="/upload">
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Cargar Nuevo
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre de expediente o empresa..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Files List */}
      <Card>
        <CardHeader>
          <CardTitle>Expedientes ({filteredFiles.length})</CardTitle>
          <CardDescription>
            Lista de todos los expedientes con su estado de procesamiento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-4 flex-1">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{file.name}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span>{file.company}</span>
                      <span>•</span>
                      <span>{file.pages} páginas</span>
                      <span>•</span>
                      <span>{file.size}</span>
                      <span>•</span>
                      <span>{formatDate(file.uploadedAt)}</span>
                      {file.confidenceLevel && (
                        <>
                          <span>•</span>
                          <span className="text-green-600 dark:text-green-400">
                            {file.confidenceLevel}% confianza
                          </span>
                        </>
                      )}
                    </div>
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
                  
                  <div className="flex gap-2">
                    <Link href={`/files/${file.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Ver
                      </Button>
                    </Link>
                    
                    {file.status === 'Ready' && (
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Descargar
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {filteredFiles.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium mb-2">No se encontraron expedientes</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm ? 
                    "Intenta ajustar los términos de búsqueda" : 
                    "Comienza cargando tu primer expediente"
                  }
                </p>
                {!searchTerm && (
                  <Link href="/upload">
                    <Button>
                      <Upload className="mr-2 h-4 w-4" />
                      Cargar Expediente
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}