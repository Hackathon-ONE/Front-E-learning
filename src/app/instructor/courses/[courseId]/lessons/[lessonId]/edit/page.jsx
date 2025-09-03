"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { fakeLessonEdit } from "@/data/instructors";

export default function EditLessonPage() {
  const { id, lessonId } = useParams();
  const router = useRouter();
  const [lesson, setLesson] = useState(fakeLessonEdit);

  useEffect(() => {
    setTimeout(() => {
      setLesson(fakeLessonEdit);
    }, 600);
  }, [lessonId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLesson((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Lección actualizada:", lesson);

    // Simular guardado
    alert("Lección actualizada con éxito");

    // Redirigir al listado
    router.push(`/instructor/courses/${id}/lessons`);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold">
          Editar lección #{lessonId}
        </h1>
        <Link href={`/instructor/courses/${id}/lessons`}>
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft size={18} /> Volver
          </button>
        </Link>
      </div>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-white dark:bg-gray-900 shadow p-6 rounded-xl"
      >
        {/* Título */}
        <div>
          <label className="block text-sm font-medium mb-1">Título</label>
          <input
            type="text"
            name="title"
            value={lesson.title}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-medium mb-1">Descripción</label>
          <textarea
            name="description"
            value={lesson.description}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary"
            rows={4}
            required
          />
        </div>

        {/* Duración */}
        <div>
          <label className="block text-sm font-medium mb-1">Duración (mm:ss)</label>
          <input
            type="text"
            name="duration"
            value={lesson.duration}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary"
            placeholder="Ej: 12:45"
            required
          />
        </div>

        {/* Estado */}
        <div>
          <label className="block text-sm font-medium mb-1">Estado</label>
          <select
            name="status"
            value={lesson.status}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary"
          >
            <option value="borrador">Borrador</option>
            <option value="publicada">Publicada</option>
          </select>
        </div>

        {/* Botón Guardar */}
        <button
          type="submit"
          className="flex items-center gap-2 px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
        >
          <Save size={18} /> Guardar cambios
        </button>
      </form>
    </div>
  );
}
