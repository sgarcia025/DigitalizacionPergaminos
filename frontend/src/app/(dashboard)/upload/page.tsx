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
  Building2,
  Sparkles,
  Zap,
  Shield,
  Clock
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
        {/* Header */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 via-teal-600/10 to-cyan-600/10 rounded-2xl blur-3xl"></div>
          <div className="relative p-8 bg-gradient-to-r from-emerald-50 to-teal-50/50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-2xl border border-emerald-200/50 dark:border-emerald-700/50">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Cargar Expediente
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mt-2 text-lg">
              Subir y procesar documentos PDF para digitalización inteligente
            </p>
          </div>
        </div>

        <Card className="max-w-3xl mx-auto relative overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/30 dark:from-slate-900 dark:via-emerald-950/20 dark:to-teal-950/20">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10"></div>
          <CardContent className="relative p-12 text-center">
            <div className="relative inline-flex items-center justify-center w-24 h-24 mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-pulse"></div>
              <div className="relative bg-white dark:bg-slate-900 rounded-full p-4 shadow-lg">
                <CheckCircle className="h-12 w-12 text-emerald-500" />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              🎉 ¡Expediente Cargado!
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-8 text-lg max-w-2xl mx-auto">
              El expediente &quot;{expedienteName}&quot; ha sido cargado exitosamente y está siendo procesado por nuestro sistema de IA.
            </p>
            
            <div className="flex gap-4 justify-center">
              <Button onClick={resetForm} variant="outline" size="lg" className="shadow-lg">
                <Upload className="mr-2 h-5 w-5" />
                Cargar Otro
              </Button>
              <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg">
                <FileText className="mr-2 h-5 w-5" />
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
      {/* Enhanced Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10 rounded-2xl blur-3xl"></div>
        <div className="relative p-8 bg-gradient-to-r from-blue-50 to-purple-50/50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-2xl border border-blue-200/50 dark:border-blue-700/50">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl">
              <Upload className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                Cargar Expediente
              </h1>
              <p className="text-slate-600 dark:text-slate-300 mt-2 text-lg">
                Subir y procesar documentos PDF para digitalización inteligente
              </p>
            </div>
          </div>
          
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg">
              <Zap className="h-5 w-5 text-amber-500" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Procesamiento IA</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg">
              <Shield className="h-5 w-5 text-emerald-500" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Seguro y Confiable</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg">
              <Clock className="h-5 w-5 text-blue-500" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Procesamiento Rápido</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Upload Form */}
      <Card className="max-w-4xl mx-auto relative overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-white via-slate-50/30 to-blue-50/30 dark:from-slate-900 dark:via-slate-800/50 dark:to-blue-950/20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
        
        <CardHeader className="relative border-b border-slate-200/50 dark:border-slate-700/50 bg-gradient-to-r from-slate-50/50 to-blue-50/30 dark:from-slate-800/50 dark:to-slate-700/50">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl">
              <Sparkles className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                Nuevo Expediente
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-300">
                Sube un archivo PDF para iniciar el procesamiento inteligente con IA
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="relative p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Tenant Info */}
            <div className="space-y-3">
              <Label className="text-base font-semibold text-slate-800 dark:text-slate-200">Empresa</Label>
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50/30 dark:from-blue-950/30 dark:to-purple-950/20 rounded-xl border border-blue-200/50 dark:border-blue-800/50">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{currentTenant}</span>
              </div>
            </div>

            {/* Expedient Name */}
            <div className="space-y-3">
              <Label htmlFor="expedient-name" className="text-base font-semibold text-slate-800 dark:text-slate-200">
                Nombre del Expediente *
              </Label>
              <Input
                id="expedient-name"
                value={expedienteName}
                onChange={(e) => setExpedienteName(e.target.value)}
                placeholder="Ej: Contrato Arrendamiento 2024-001"
                required
                className="h-12 text-base border-2 focus:border-blue-500 transition-all duration-200"
              />
            </div>

            {/* Enhanced File Upload */}
            <div className="space-y-3">
              <Label className="text-base font-semibold text-slate-800 dark:text-slate-200">Archivo PDF *</Label>
              <div
                className={`relative border-2 border-dashed rounded-2xl p-12 transition-all duration-300 ${
                  dragActive
                    ? "border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/30 scale-105"
                    : "border-slate-300 dark:border-slate-600 hover:border-blue-400 hover:bg-gradient-to-br hover:from-slate-50 hover:to-blue-50/30 dark:hover:from-slate-800/50 dark:hover:to-blue-950/20"
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
                    <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6">
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-pulse opacity-20"></div>
                      <div className="relative bg-emerald-500/20 rounded-full p-4">
                        <FileText className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                      </div>
                    </div>
                    <h3 className="font-bold text-xl text-slate-900 dark:text-slate-100 mb-2">{selectedFile.name}</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                      📊 {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="shadow-md hover:shadow-lg transition-all duration-200"
                      onClick={() => setSelectedFile(null)}
                    >
                      🔄 Cambiar archivo
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse opacity-20"></div>
                      <div className="relative bg-blue-500/20 rounded-full p-4">
                        <Upload className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <h3 className="font-bold text-xl text-slate-900 dark:text-slate-100 mb-2">
                      📁 Arrastra tu archivo PDF aquí
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      o haz clic para seleccionar desde tu computadora
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Validation Info */}
            <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30 p-6 rounded-2xl border border-blue-200/50 dark:border-blue-800/50">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-500/20 rounded-lg flex-shrink-0">
                  <AlertCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-3 text-lg">
                    📋 Requisitos del archivo:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span className="text-blue-800 dark:text-blue-200">Formato: PDF únicamente</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      <span className="text-blue-800 dark:text-blue-200">Tamaño máximo: 50MB</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                      <span className="text-blue-800 dark:text-blue-200">Páginas: 80-120 recomendadas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                      <span className="text-blue-800 dark:text-blue-200">Texto legible para OCR óptimo</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Submit Button */}
            <Button 
              type="submit" 
              size="lg"
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105" 
              disabled={!selectedFile || !expedienteName.trim() || isUploading}
            >
              {isUploading ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent mr-3" />
                  🚀 Cargando y procesando...
                </>
              ) : (
                <>
                  <Sparkles className="mr-3 h-6 w-6" />
                  ✨ Enviar Expediente
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}