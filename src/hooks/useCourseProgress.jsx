"use client";

import { useState, useEffect } from "react";

export function useCourseProgress(courseId) {
  const [progress, setProgress] = useState({
    completedLessons: [],
    totalLessons: 0,
    percentage: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!courseId) return;

    async function fetchProgress() {
      try {
        setLoading(true);
        const res = await fetch(`/api/courses/${courseId}/progress`);
        // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}/progress`);
        if (!res.ok) throw new Error("Error al cargar progreso");
        const data = await res.json();

        setProgress({
          completedLessons: data.completedLessons || [],
          totalLessons: data.totalLessons || 0,
          percentage: data.percentage || 0,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProgress();
  }, [courseId]);

  return { progress, loading, error };
}