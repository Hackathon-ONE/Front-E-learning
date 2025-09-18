"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { HelpCircle, Plus, Edit, BarChart3, Users } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function InstructorQuizzesPage() {
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
            <HelpCircle className="w-8 h-8 text-purple-600" />
            Quizzes y Evaluaciones
          </h1>
          <p className="text-[var(--color-muted)]">
            Crea y gestiona evaluaciones para tus estudiantes
          </p>
        </div>

        {/* Acciones principales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Button
            type="button"
            className="cursor-pointer flex flex-col items-center gap-2 p-6 rounded-lg border-2 border-dashed border-purple-300 hover:border-purple-500 transition-colors"
          >
            <Plus className="w-8 h-8 text-purple-600" />
            <span className="font-semibold">Crear Quiz</span>
            <span className="text-xs text-gray-500">Nueva evaluación</span>
          </Button>

          <Button
            type="button"
            className="cursor-pointer flex flex-col items-center gap-2 p-6 rounded-lg border-2 border-dashed border-blue-300 hover:border-blue-500 transition-colors"
          >
            <Edit className="w-8 h-8 text-blue-600" />
            <span className="font-semibold">Editar Quiz</span>
            <span className="text-xs text-gray-500">Modificar existente</span>
          </Button>

          <Button
            type="button"
            className="cursor-pointer flex flex-col items-center gap-2 p-6 rounded-lg border-2 border-dashed border-green-300 hover:border-green-500 transition-colors"
          >
            <BarChart3 className="w-8 h-8 text-green-600" />
            <span className="font-semibold">Estadísticas</span>
            <span className="text-xs text-gray-500">Ver resultados</span>
          </Button>

          <Button
            type="button"
            className="cursor-pointer flex flex-col items-center gap-2 p-6 rounded-lg border-2 border-dashed border-orange-300 hover:border-orange-500 transition-colors"
          >
            <Users className="w-8 h-8 text-orange-600" />
            <span className="font-semibold">Estudiantes</span>
            <span className="text-xs text-gray-500">Ver progreso</span>
          </Button>
        </div>

        {/* Lista de quizzes */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Quizzes Recientes</h2>
          
          <div className="text-center py-12 text-gray-500">
            <HelpCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium mb-2">No hay quizzes creados aún</p>
            <p className="text-sm">Comienza creando tu primera evaluación para tus estudiantes</p>
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
