"use server";

import { getCourseRecommendations } from "@/ai/flows/ai-course-recommendations";

export async function getRecommendationsAction(input) {
  // In a real app, you might add authentication/authorization checks here.
  try {
    const recommendations = await getCourseRecommendations(input);
    return recommendations;
  } catch (error) {
    console.error("Error getting AI recommendations:", error);
    // In a production app, you'd want more robust error handling and logging.
    throw new Error("Failed to get recommendations from AI. Please try again later.");
  }
}