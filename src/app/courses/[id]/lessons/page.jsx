"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

// 🔹 Datos mock para pruebas (harcodeados)
const mockLessons = [
  { id: 1, title: "Introducción al curso", duration: "5:32", completed: true },
  { id: 2, title: "Fundamentos básicos", duration: "12:15", completed: false },
  { id: 3, title: "Tema intermedio", duration: "18:47", completed: false },
  { id: 4, title: "Ejercicios prácticos", duration: "22:05", completed: false },
];

export default function LessonsPage() {
  const { id } = useParams(); // courseId
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    // En real: fetch(`/api/courses/${id}/lessons`)
    setLessons(mockLessons);
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Título */}
      <h1 className="text-3xl font-bold mb-6 text-center">
        Lecciones del curso #{id}
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
    </div>
  );
}