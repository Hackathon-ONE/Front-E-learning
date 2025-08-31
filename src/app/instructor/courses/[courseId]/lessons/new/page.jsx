"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function NewLessonPage() {
  const { id } = useParams(); // id del curso
  const router = useRouter();

  const [lesson, setLesson] = useState({
    title: "",
    description: "",
    videoUrl: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLesson({ ...lesson, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ⚡ Aquí luego conectas con tu backend
      console.log("Nueva lección creada:", { courseId: id, ...lesson });

      // Redirige al listado de lecciones del curso
      router.push(`/instructor/courses/${id}/lessons`);
    } catch (error) {
      console.error("Error al crear lección:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
        Nueva Lección para el Curso #{id}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
      >
        {/* Título */}
        <div>
          <label className="block font-semibold mb-2">Título</label>
          <input
            type="text"
            name="title"
            value={lesson.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
            placeholder="Ej: Introducción a React"
          />
        </div>

        {/* Descripción */}
        <div>
          <label className="block font-semibold mb-2">Descripción</label>
          <textarea
            name="description"
            value={lesson.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
            placeholder="Explica de qué trata la lección..."
          />
        </div>

        {/* URL del video */}
        <div>
          <label className="block font-semibold mb-2">URL del Video</label>
          <input
            type="url"
            name="videoUrl"
            value={lesson.videoUrl}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
            placeholder="https://www.youtube.com/watch?v=..."
          />
        </div>

        {/* Botones */}
        <div className="flex flex-col md:flex-row gap-4 justify-end">
          <button
            type="button"
            onClick={() => router.push(`/instructor/courses/${id}/lessons`)}
            className="px-6 py-2 rounded-lg border border-gray-400 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition disabled:opacity-50"
          >
            {loading ? "Guardando..." : "Guardar lección"}
          </button>
        </div>
        
      </form>
    </div>
  );
}