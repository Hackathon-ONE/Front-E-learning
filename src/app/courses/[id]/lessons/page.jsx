"use client";

import { useState } from "react";

export default function LessonsPage() {
  const [lesson, setLesson] = useState({
    title: "",
    content: "",
    videoUrl: "",
    duration: "",
    file: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) =>
    setLesson({ ...lesson, [e.target.name]: e.target.value });

  const handleFile = (e) =>
    setLesson({ ...lesson, file: e.target.files[0] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      // 📌 Simulación de POST al backend
      // const formData = new FormData();
      // Object.entries(lesson).forEach(([key, value]) =>
      //   formData.append(key, value)
      // );
      // const res = await fetch("http://localhost:3000/api/lessons", {
      //   method: "POST",
      //   body: formData,
      // });
      // if (!res.ok) throw new Error("Error al publicar la lección");

      console.log("✅ Nueva lección publicada:", lesson);
    } catch (err) {
      console.error(err);
      setError("Hubo un problema al publicar la lección.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="p-6 max-w-3xl mx-auto"
      style={{
        backgroundColor: "var(--color-bg)",
        color: "var(--color-text)",
      }}
    >
      <h1 className="text-3xl font-bold mb-6">
        Publicar lecciones y materiales
      </h1>

      {error && (
        <p className="text-red-600 dark:text-red-400 mb-4 text-sm">{error}</p>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-[var(--color-card-primary)] p-6 rounded-xl shadow"
      >
        {/* Título */}
        <div>
          <label className="block mb-1 text-sm text-gray-900 dark:text-gray-100">
            Título de la lección
          </label>
          <input
            type="text"
            name="title"
            value={lesson.title}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg text-sm text-gray-900 dark:text-gray-100"
            placeholder="Ej: Introducción a React"
          />
        </div>

        {/* Contenido */}
        <div>
          <label className="block mb-1 text-sm text-gray-900 dark:text-gray-100">
            Contenido
          </label>
          <textarea
            name="content"
            value={lesson.content}
            onChange={handleChange}
            rows={4}
            className="w-full p-3 border rounded-lg text-sm text-gray-900 dark:text-gray-100"
            placeholder="Describe la lección, temas o materiales..."
          />
        </div>

        {/* URL del video */}
        <div>
          <label className="block mb-1 text-sm text-gray-900 dark:text-gray-100">
            URL del video (opcional)
          </label>
          <input
            type="url"
            name="videoUrl"
            value={lesson.videoUrl}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg text-sm text-gray-900 dark:text-gray-100"
            placeholder="https://youtube.com/..."
          />
        </div>

        {/* Duración */}
        <div>
          <label className="block mb-1 text-sm text-gray-900 dark:text-gray-100">
            Duración (minutos)
          </label>
          <input
            type="number"
            name="duration"
            value={lesson.duration}
            onChange={handleChange}
           className="w-full p-3 border rounded-lg text-sm text-gray-900 dark:text-gray-100"
            min="1"
            placeholder="Ej: 15"
          />
        </div>

        {/* Archivo */}
        <div>
          <label className="block mb-1 text-sm text-gray-900 dark:text-gray-100">
            Material adjunto (PDF, PPT, etc.)
          </label>
          <input
            type="file"
            onChange={handleFile}
            className="w-full p-3 border rounded-lg text-sm text-gray-900 dark:text-gray-100"
          />
        </div>

        {/* Botón */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg font-semibold bg-primary text-white text-sm font-medium hover:bg-gray-800"
        >
          {loading ? "Publicando..." : "Publicar lección"}
        </button>
      </form>
    </main>
  );
}
