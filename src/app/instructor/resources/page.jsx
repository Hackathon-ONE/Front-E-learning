"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { FileText, Upload, Folder, Download } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function InstructorResourcesPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[var(--color-bg)] flex flex-col items-center py-8 px-2 sm:px-4">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 px-4 py-2 mb-4 rounded-lg font-medium 
                   bg-[var(--color-surface)] text-[var(--color-text)] 
                   hover:bg-[var(--color-primary)] hover:text-[var(--color-primary-text)]
                   transition w-full sm:w-auto"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm sm:text-base">Volver</span>
      </button>

      <section className="w-full max-w-4xl bg-[var(--color-surface)] rounded-2xl shadow-xl p-4 sm:p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 flex items-center justify-center gap-3">
            <FileText className="w-8 h-8 text-blue-600" />
            Recursos y Materiales
          </h1>
          <p className="text-[var(--color-muted)]">
            Gestiona todos los recursos y materiales de tus cursos
          </p>
        </div>

        {/* Acciones principales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Button
            type="button"
            className="cursor-pointer flex flex-col items-center gap-2 p-6 rounded-lg border-2 border-dashed border-blue-300 hover:border-blue-500 transition-colors"
          >
            <Upload className="w-8 h-8 text-blue-600" />
            <span className="font-semibold">Subir Archivo</span>
            <span className="text-xs text-gray-500">PDF, DOC, PPT, etc.</span>
          </Button>

          <Button
            type="button"
            className="cursor-pointer flex flex-col items-center gap-2 p-6 rounded-lg border-2 border-dashed border-green-300 hover:border-green-500 transition-colors"
          >
            <Folder className="w-8 h-8 text-green-600" />
            <span className="font-semibold">Crear Carpeta</span>
            <span className="text-xs text-gray-500">Organizar recursos</span>
          </Button>

          <Button
            type="button"
            className="cursor-pointer flex flex-col items-center gap-2 p-6 rounded-lg border-2 border-dashed border-purple-300 hover:border-purple-500 transition-colors"
          >
            <FileText className="w-8 h-8 text-purple-600" />
            <span className="font-semibold">Crear Documento</span>
            <span className="text-xs text-gray-500">Texto, notas, etc.</span>
          </Button>

          <Button
            type="button"
            className="cursor-pointer flex flex-col items-center gap-2 p-6 rounded-lg border-2 border-dashed border-orange-300 hover:border-orange-500 transition-colors"
          >
            <Download className="w-8 h-8 text-orange-600" />
            <span className="font-semibold">Exportar</span>
            <span className="text-xs text-gray-500">Descargar todo</span>
          </Button>
        </div>

        {/* Lista de recursos */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Recursos Recientes</h2>
          
          <div className="text-center py-12 text-gray-500">
            <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium mb-2">No hay recursos aún</p>
            <p className="text-sm">Comienza subiendo tu primer archivo o creando un documento</p>
          </div>
        </div>

        {/* Botón de regreso */}
        <div className="flex justify-center mt-8">
          <Link href="/instructor/courses">
            <Button
              type="button"
              className="cursor-pointer px-6 py-2 rounded-lg font-semibold bg-gray-600 text-white hover:bg-gray-700 transition"
            >
              Volver a Mis Cursos
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
