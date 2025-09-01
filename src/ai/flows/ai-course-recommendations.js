'use server';

/**
 * @fileOverview AI-powered course recommendations for students.
 *
 * - getCourseRecommendations - A function that returns course recommendations based on user profile and market demand.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const CourseRecommendationInputSchema = z.object({
  skills: z.string().describe('Las habilidades del estudiante.'),
  experience: z.string().describe('La experiencia del estudiante.'),
  interests: z.string().describe('Los intereses del estudiante.'),
  marketDemand: z.string().describe('La demanda actual del mercado para diferentes habilidades.'),
});

const CourseRecommendationOutputSchema = z.object({
  courseRecommendations: z.array(
    z.object({
      courseName: z.string().describe('El nombre del curso recomendado.'),
      reason: z.string().describe('El motivo por el que se recomienda este curso.'),
    })
  ).describe('Una lista de recomendaciones de cursos con razones.'),
});

export async function getCourseRecommendations(input) {
  return courseRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'courseRecommendationPrompt',
  input: { schema: CourseRecommendationInputSchema },
  output: { schema: CourseRecommendationOutputSchema },
  prompt: `Eres un sistema de recomendación de cursos basado en IA. Recibirás las habilidades, la experiencia y los intereses de un estudiante, así como la demanda actual del mercado para diferentes habilidades. Con base en esta información, recomendarás los mejores cursos en línea para el estudiante.

Skills: {{{skills}}}
Experience: {{{experience}}}
Interests: {{{interests}}}
Market Demand: {{{marketDemand}}}

Recomienda cursos que se alineen con el perfil del estudiante y que estén en alta demanda en el mercado. Proporciona una razón para cada recomendación.

Formatea tu respuesta como un objeto JSON con un array 'courseRecommendations'. Cada objeto en el array debe tener las claves 'courseName' y 'reason'.
`,
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const courseRecommendationFlow = ai.defineFlow(
  {
    name: 'courseRecommendationFlow',
    inputSchema: CourseRecommendationInputSchema,
    outputSchema: CourseRecommendationOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output;
  }
);