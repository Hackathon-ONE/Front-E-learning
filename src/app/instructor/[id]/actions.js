"use server";

import { getInstructorCourseSuggestions } from "@/ai/flows/ai-instructor-course-suggestions";

export async function getSuggestionsAction(input) {
  // En una app real, aquí podrías agregar validaciones de autenticación/autorización.
  try {
    const suggestions = await getInstructorCourseSuggestions(input);
    return suggestions;
  } catch (error) {
    console.error("Error al obtener sugerencias de IA:", error);
    // En producción, usarías un manejo de errores más robusto.
    throw new Error("No se pudieron obtener sugerencias. Por favor, intenta de nuevo.");
  }
}