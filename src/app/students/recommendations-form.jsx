"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getRecommendationsAction } from "./actions";
import { Sparkles, ArrowRight } from "lucide-react";

const formSchema = z.object({
  skills: z
    .string()
    .min(10, "Por favor describe tus habilidades con un poco más de detalle."),
  experience: z
    .string()
    .min(10, "Por favor describe tu experiencia con un poco más de detalle."),
  interests: z
    .string()
    .min(10, "Por favor describe tus intereses con un poco más de detalle."),
  marketDemand: z.string(),
});

export default function RecommendationsForm() {
  const [recommendations, setRecommendations] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skills: "",
      experience: "",
      interests: "",
      marketDemand:
        "Alta demanda de desarrolladores web con conocimientos de React y Node.js. Creciente necesidad de científicos de datos con conocimientos de Python y aprendizaje automático. Los diseñadores UX/UI también son muy solicitados.",
    },
  });

  async function onSubmit(values) {
    setIsLoading(true);
    setRecommendations(null);
    try {
      const result = await getRecommendationsAction(values);
      setRecommendations(result);
    } catch (error) {
      console.error("Error al obtener recomendaciones:", error);
      alert(
        "No se pudieron obtener las recomendaciones. Por favor, intenta de nuevo."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Card */}
      <div
        className="rounded-xl shadow-md p-4 sm:p-6 mb-6"
        style={{
          backgroundColor: "var(--color-card-primary)",
          color: "var(--color-card-primary-text)",
        }}
      >
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Perfil</h2>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Skills */}
          <div>
            <label className="block font-semibold mb-1 text-sm sm:text-base">
              Tus Habilidades
            </label>
            <textarea
              {...form.register("skills")}
              placeholder="ej. JavaScript, Python, UI Design, Project Management"
              className="w-full p-3 rounded-md border text-sm sm:text-base resize-y"
              rows={3}
            />
            {form.formState.errors.skills && (
              <p className="text-red-600 text-xs sm:text-sm mt-1">
                {form.formState.errors.skills.message}
              </p>
            )}
          </div>

          {/* Experience */}
          <div>
            <label className="block font-semibold mb-1 text-sm sm:text-base">
              Tu Experiencia
            </label>
            <textarea
              {...form.register("experience")}
              placeholder="ej. 2 años como desarrollador junior, pasante de marketing y fotógrafo aficionado."
              className="w-full p-3 rounded-md border text-sm sm:text-base resize-y"
              rows={3}
            />
            {form.formState.errors.experience && (
              <p className="text-red-600 text-xs sm:text-sm mt-1">
                {form.formState.errors.experience.message}
              </p>
            )}
          </div>

          {/* Interests */}
          <div>
            <label className="block font-semibold mb-1 text-sm sm:text-base">
              Tus Intereses
            </label>
            <textarea
              {...form.register("interests")}
              placeholder="ej. Me apasiona la visualización de datos, la creación de aplicaciones móviles y la escritura creativa."
              className="w-full p-3 rounded-md border text-sm sm:text-base resize-y"
              rows={3}
            />
            {form.formState.errors.interests && (
              <p className="text-red-600 text-xs sm:text-sm mt-1">
                {form.formState.errors.interests.message}
              </p>
            )}
          </div>

          {/* Market Demand */}
          <div>
            <label className="block font-semibold mb-1 text-sm sm:text-base">
              Demanda Actual (para contexto)
            </label>
            <textarea
              {...form.register("marketDemand")}
              readOnly
              className="w-full p-3 rounded-md border text-sm sm:text-base opacity-70 resize-y"
              rows={3}
            />
            <p className="text-xs sm:text-sm text-[var(--color-muted)] mt-1">
              Esto proporciona contexto a la IA sobre las tendencias laborales
              actuales.
            </p>
          </div>

          {/* Button */}
          <button
            aria-label="Obtener Recomendaciones"
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto btn-primary px-5 py-3 rounded-lg shadow-md flex items-center justify-center text-sm sm:text-base"
          >
            {isLoading ? "Generando..." : "Obtener Recomendaciones"}
            <Sparkles className="ml-2 h-4 w-4" />
          </button>
        </form>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div
          className="rounded-xl shadow-md p-4 sm:p-6"
          style={{
            backgroundColor: "var(--color-card-secondary)",
            color: "var(--color-card-secondary-text)",
          }}
        >
          <h2 className="text-lg sm:text-xl font-bold mb-4">
            Recomendaciones AI
          </h2>
          <div className="space-y-4 animate-pulse">
            <div className="h-4 sm:h-5 w-1/3 bg-gray-300 rounded" />
            <div className="h-3 sm:h-4 w-full bg-gray-300 rounded" />
            <div className="h-3 sm:h-4 w-4/5 bg-gray-300 rounded" />
          </div>
        </div>
      )}

      {/* Recommendations */}
      {recommendations && (
        <div
          className="rounded-xl shadow-md p-4 sm:p-6 mt-6 sm:mt-8"
          style={{
            backgroundColor: "var(--color-card-secondary)",
            color: "var(--color-card-secondary-text)",
          }}
        >
          <h2 className="text-lg sm:text-xl font-bold mb-4">
            Recomendaciones AI
          </h2>
          <div className="space-y-4">
            {recommendations.courseRecommendations.map((rec, index) => (
              <div key={index} className="p-3 sm:p-4 border rounded-lg">
                <h3 className="font-semibold text-base sm:text-lg flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-[var(--color-primary)]" />
                  {rec.courseName}
                </h3>
                <p className="mt-1 pl-6 text-xs sm:text-sm text-gray-500">
                  {rec.reason}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}