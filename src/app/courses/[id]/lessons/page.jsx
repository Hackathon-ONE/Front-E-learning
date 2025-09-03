"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { lessonsCoursesData } from "@/data/courses";

export default function LessonsPage() {
  const { id } = useParams(); // courseId
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    // fetch(`/api/courses/${id}/lessons`)
    setLessons(lessonsCoursesData);
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Título */}
      <h1 className="text-3xl font-bold mb-6 text-center">
        Lecciones del curso {id}
      </h1>

      {/* Lista de lecciones */}
      <ul className="space-y-4">
        {lessons.map((lesson) => (
          <li
            key={lesson.id}
            className="flex justify-between items-center bg-[var(--color-surface)] 
                       p-4 rounded-lg shadow hover:shadow-md transition"
          >
            {/* Info de la lección */}
            <div>
              <h2 className="text-lg font-semibold">{lesson.title}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Duración: {lesson.duration}
              </p>
            </div>

            {/* Acción */}
            <Link
              href={`/courses/${id}/lessons/${lesson.id}`}
              className="btn-primary px-4 py-2 rounded-lg text-sm font-medium"
            >
              {lesson.completed ? "Revisar" : "Ver ahora"}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
        <Link
          href={`/courses/${id}/quizzes/${id}`}
          className="btn-primary px-6 py-3 rounded-lg text-sm font-semibold text-center w-full sm:w-auto"
        >
          Tomar Quiz
        </Link>
        <Link
          href={`/courses/${id}/resources`}
          className="btn-primary px-6 py-3 rounded-lg text-sm font-semibold text-center w-full sm:w-auto"
        >
          Recursos
        </Link>
      </div>
    </div>
  );
}