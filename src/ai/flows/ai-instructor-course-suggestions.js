'use server';

/**
 * @fileOverview This file defines the AI flow for providing course suggestions to instructors based on student demand and platform trends.
 *
 * - getInstructorCourseSuggestions - A function that retrieves AI-driven course suggestions for instructors.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const InstructorCourseSuggestionsInputSchema = z.object({
  instructorSkills: z
    .string()
    .describe('Las habilidades y experiencia del instructor.'),
  platformTrends: z
    .string()
    .describe('Las tendencias actuales y temas populares en la plataforma de aprendizaje.'),
  studentDemand: z
    .string()
    .describe('Información sobre los cursos que los estudiantes están solicitando o están interesados.'),
});

const InstructorCourseSuggestionsOutputSchema = z.object({
  courseSuggestions: z
    .array(z.string())
    .describe('Una lista de sugerencias de temas de curso para el instructor.'),
  resourceSuggestions: z
    .array(z.string())
    .describe('Una lista de sugerencias de recursos para compartir dentro de los cursos.'),
  reasoning: z
    .string()
    .describe(
      'Explicación de por qué estos cursos y recursos son recomendados.'
    ),
});

export async function getInstructorCourseSuggestions(input) {
  return instructorCourseSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'instructorCourseSuggestionsPrompt',
  input: { schema: InstructorCourseSuggestionsInputSchema },
  output: { schema: InstructorCourseSuggestionsOutputSchema },
  prompt: `Eres un asistente de IA diseñado para proporcionar sugerencias de cursos y recursos a los instructores en una plataforma de aprendizaje en línea.

  Considera las habilidades y experiencia del instructor, las tendencias actuales y los temas populares en la plataforma de aprendizaje, y la demanda de los estudiantes para recomendar cursos que el instructor puede crear y recursos que pueden compartir.

  Habilidades del instructor: {{{instructorSkills}}}
  Tendencias actuales: {{{platformTrends}}}
  Demanda de los estudiantes: {{{studentDemand}}}

  Basado en esta información, ¿cuáles cursos y recursos serían más beneficiosos para el instructor ofrecer? Explica tu razón.

  Formatea tu respuesta como un objeto JSON con los campos 'courseSuggestions', 'resourceSuggestions' y 'reasoning' como se describe en el esquema de salida.`,
});

const instructorCourseSuggestionsFlow = ai.defineFlow(
  {
    name: 'instructorCourseSuggestionsFlow',
    inputSchema: InstructorCourseSuggestionsInputSchema,
    outputSchema: InstructorCourseSuggestionsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output;
  }
);