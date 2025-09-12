"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { PlusCircle, Pencil, Trash2, PlayCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { fakeLessonPage } from "@/data/instructors";

export default function CourseLessonsPage() {
  const { id } = useParams();
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    setLessons(fakeLessonPage);
  }, [id]);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-center md:text-left">
          Lecciones del curso #{id}
        </h1>
        <Link href={`/instructor/courses/${id}/lessons/new`}>
          <button type="button" aria-label="Nueva lección" className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition">
            <PlusCircle size={18} />
            Nueva lección
          </button>
        </Link>
      </div>

      {/* Listado */}
      {lessons.length === 0 ? (
        <p className="text-center text-gray-500 py-10">
          No hay lecciones aún. ¡Agrega la primera!
        </p>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-xl shadow">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="p-3 text-sm font-semibold">#</th>
                <th className="p-3 text-sm font-semibold">Título</th>
                <th className="p-3 text-sm font-semibold">Duración</th>
                <th className="p-3 text-sm font-semibold">Estado</th>
                <th className="p-3 text-sm font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {lessons.map((lesson, index) => (
                <tr
                  key={lesson.id}
                  className="border-t hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3 flex items-center gap-2">
                    <PlayCircle className="text-primary" size={18} />
                    {lesson.title}
                  </td>
                  <td className="p-3">{lesson.duration}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        lesson.status === "publicada"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {lesson.status}
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-3">
                    <Link href={`/instructor/courses/${id}/lessons/${lesson.id}/edit`}>
                      <button type="button" aria-label="Editar lección" className="cursor-pointer text-blue-500 hover:text-blue-700">
                        <Pencil size={18} />
                      </button>
                    </Link>
                    <button type="button" aria-label="Eliminar lección" className="cursor-pointer text-red-500 hover:text-red-700">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}