"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Sparkles, ArrowRight } from "lucide-react";

import { getSuggestionsAction } from "./actions";

// ✅ Esquema de validación con Zod
const formSchema = z.object({
  instructorSkills: z
    .string()
    .min(10, "Por favor, describe tus habilidades y experiencia en un poco más de detalle."),
  platformTrends: z.string(),
  studentDemand: z.string(),
});

export default function SuggestionsForm() {
  const [suggestions, setSuggestions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      instructorSkills: "",
      platformTrends:
        "Entre los temas más populares se incluyen JavaScript avanzado, Python para análisis de datos y UI/UX para aplicaciones móviles. El contenido de vídeo de corta duración está ganando terreno.",
      studentDemand:
        "Un alto número de búsquedas por 'TypeScript', 'Next.js 14', y 'Python principiante'. Los estudiantes están solicitando más cursos basados en proyectos.",
    },
  });

  async function onSubmit(values) {
    setIsLoading(true);
    setSuggestions(null);
    try {
      const result = await getSuggestionsAction(values);
      setSuggestions(result);
    } catch (error) {
      alert("No se pudieron obtener sugerencias. Por favor, intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Formulario */}
      <div className="bg-[var(--color-surface)] text-[var(--color-text)] shadow-md rounded-2xl p-6 sm:p-8 border">
        <h2 className="text-lg sm:text-xl font-bold text-[var(--color-text)] mb-4">Contexto</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-[var(--color-text)]">
          {/* Skills */}
          <div>
            <label className="block font-medium text-[var(--color-text)] mb-2 text-sm sm:text-base">
              Tus habilidades y experiencia
            </label>
            <textarea
              {...register("instructorSkills")}
              className="w-full border rounded-lg p-3 text-[var(--color-text)] focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
              rows={4}
              placeholder="ej. 10+ años en desarrollo backend con Node.js, experto en React y gestión de estado, arquitecto de soluciones AWS certificado."
            />
            {errors.instructorSkills && (
              <p className="text-red-500 text-sm mt-1">{errors.instructorSkills.message}</p>
            )}
          </div>

          {/* Trends */}
          <div>
            <label className="block font-medium text-[var(--color-text)] mb-2 text-sm sm:text-base">
              Tendencias actuales de la plataforma
            </label>
            <textarea
              {...register("platformTrends")}
              readOnly
              className="w-full border rounded-lg p-3 text-[var(--color-text)] text-sm sm:text-base"
              rows={3}
            />
            <p className="text-xs sm:text-sm text-[var(--color-text)] mt-1">
              Contexto proporcionado a la IA.
            </p>
          </div>

          {/* Demand */}
          <div>
            <label className="block font-medium text-[var(--color-text)] mb-2 text-sm sm:text-base">
              Demanda actual de los estudiantes
            </label>
            <textarea
              {...register("studentDemand")}
              readOnly
              className="w-full border rounded-lg p-3 text-[var(--color-text)] text-sm sm:text-base"
              rows={3}
            />
            <p className="text-xs sm:text-sm text-[var(--color-text)] mt-1">
              Contexto proporcionado a la IA.
            </p>
          </div>

          {/* Botón */}
          <button
            aria-label="Obtener sugerencias"
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto px-6 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-text)] hover:text-[var(--color-surface)] font-semibold rounded-lg shadow-md transition flex items-center justify-center sm:justify-start"
          >
            {isLoading ? "Generando..." : "Obtener sugerencias"}
            <Sparkles className="ml-2 h-4 w-4" />
          </button>
        </form>
      </div>

      {/* Loader Skeleton */}
      {isLoading && (
        <div className="bg-[var(--color-surface)] shadow-md rounded-2xl p-6 sm:p-8 border animate-pulse">
          <h2 className="text-lg sm:text-xl font-bold text-[var(--color-text)] mb-4">Sugerencias de IA</h2>
          <div className="space-y-4">
            <div className="h-4 text-[var(--color-text)] rounded w-1/3"></div>
            <div className="h-3 text-[var(--color-text)] rounded w-full"></div>
            <div className="h-3 text-[var(--color-text)] rounded w-4/5"></div>
          </div>
        </div>
      )}

      {/* Resultados */}
      {suggestions && (
        <div className="bg-[var(--color-surface)] text-[var(--color-text)] shadow-md rounded-2xl p-6 sm:p-8 border">
          <h2 className="text-lg sm:text-xl font-bold text-[var(--color-text)] mb-6">Sugerencias de IA</h2>

          <div className="space-y-6 text-[var(--color-text)]">
            {/* Cursos */}
            <div>
              <h3 className="font-semibold text-[var(--color-text)] text-base sm:text-lg mb-2">
                Temas de curso sugeridos
              </h3>
              <ul className="space-y-2">
                {suggestions.courseSuggestions.map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-1 text-[var(--color-primary)] shrink-0" />
                    <span className="text-sm sm:text-base">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recursos */}
            <div>
              <h3 className="font-semibold text-[var(--color-text)] text-base sm:text-lg mb-2">
                Recursos sugeridos
              </h3>
              <ul className="space-y-2">
                {suggestions.resourceSuggestions.map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-1 text-[var(--color-primary)] shrink-0" />
                    <span className="text-sm sm:text-base">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Razón */}
            <div>
              <h3 className="font-semibold text-[var(--color-text)] text-base sm:text-lg mb-2">Razonamiento</h3>
              <p className="text-[var(--color-text)] bg-[var(--color-surface)] p-4 rounded-lg text-sm sm:text-base leading-relaxed">
                {suggestions.reasoning}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}