"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Upload,
  FileText,
  AlertCircle,
  CheckCircle,
  Building2
} from "lucide-react";
import { toast } from "sonner";

export default function UploadPage() {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [expedienteName, setExpedienteName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Mock current tenant - replace with real tenant from context/auth
  const currentTenant = "Empresa Alpha";

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileSelection(files[0]);
    }
  };

  const handleFileSelection = (file: File) => {
    // Validation
    if (!file.type.includes("pdf")) {
      toast.error("Solo se permiten archivos PDF");
      return;
    }

    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      toast.error("El archivo es demasiado grande. Tamaño máximo: 50MB");
      return;
    }

    setSelectedFile(file);
    if (!expedienteName) {
      setExpedienteName(file.name.replace('.pdf', ''));
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile || !expedienteName.trim()) {
      toast.error("Por favor complete todos los campos");
      return;
    }

    setIsUploading(true);

    try {
      // Mock upload process - replace with real API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // TODO: Actual upload logic here
      // const formData = new FormData();
      // formData.append('file', selectedFile);
      // formData.append('name', expedienteName);
      // formData.append('tenant', currentTenant);
      // 
      // const response = await fetch('/api/upload', {
      //   method: 'POST',
      //   body: formData
      // });

      setUploadSuccess(true);
      toast.success("Expediente cargado exitosamente");
      
    } catch (error) {
      toast.error("Error al cargar el expediente");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    setExpedienteName("");
    setUploadSuccess(false);
  };

  if (uploadSuccess) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cargar Expediente</h1>
          <p className="text-muted-foreground">
            Subir y procesar documentos PDF para digitalización inteligente
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">¡Expediente Cargado!</h2>
            <p className="text-muted-foreground mb-6">
              El expediente "{expedienteName}" ha sido cargado exitosamente y está siendo procesado.
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={resetForm} variant="outline">
                Cargar Otro
              </Button>
              <Button>
                Ver Expediente
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Cargar Expediente</h1>
        <p className="text-muted-foreground">
          Subir y procesar documentos PDF para digitalización inteligente
        </p>
      </div>

      {/* Upload Form */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Nuevo Expediente</CardTitle>
          <CardDescription>
            Sube un archivo PDF para iniciar el procesamiento inteligente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tenant Info */}
            <div className="space-y-2">
              <Label>Empresa</Label>
              <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{currentTenant}</span>
              </div>
            </div>

            {/* Expedient Name */}
            <div className="space-y-2">
              <Label htmlFor="expedient-name">Nombre del Expediente *</Label>
              <Input
                id="expedient-name"
                value={expedienteName}
                onChange={(e) => setExpedienteName(e.target.value)}
                placeholder="Ej: Contrato Arrendamiento 2024-001"
                required
              />
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <Label>Archivo PDF *</Label>
              <div
                className={`relative border-2 border-dashed rounded-lg p-8 transition-colors ${
                  dragActive
                    ? "border-primary bg-primary/10"
                    : "border-muted-foreground/25 hover:border-muted-foreground/50"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileInput}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                {selectedFile ? (
                  <div className="text-center">
                    <FileText className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <p className="font-medium">{selectedFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => setSelectedFile(null)}
                    >
                      Cambiar archivo
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="font-medium">Arrastra tu archivo PDF aquí</p>
                    <p className="text-sm text-muted-foreground">
                      o haz clic para seleccionar
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Validation Info */}
            <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-900 dark:text-blue-100">
                    Requisitos del archivo:
                  </p>
                  <ul className="mt-1 text-blue-700 dark:text-blue-200 space-y-1">
                    <li>• Formato: PDF únicamente</li>
                    <li>• Tamaño máximo: 50MB</li>
                    <li>• Páginas recomendadas: 80-120 páginas</li>
                    <li>• Calidad: Texto legible para OCR óptimo</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full" 
              disabled={!selectedFile || !expedienteName.trim() || isUploading}
            >
              {isUploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-background border-t-transparent mr-2" />
                  Cargando...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Enviar Expediente
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}