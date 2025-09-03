"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { fakeCourseEdit } from "@/data/instructors";

export default function EditCoursePage() {
  const { id } = useParams();
  const router = useRouter();

  const [course, setCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    level: "",
    price: 0,
    instructor: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // 🚀 Simulación de fetch con datos hardcodeados
  useEffect(() => {
    setTimeout(() => {
      setCourse(fakeCourseEdit);
      setFormData(fakeCourseEdit);
      setLoading(false);
    }, 600);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación mínima
    if (!formData.title || !formData.description) {
      setError("El título y la descripción son obligatorios.");
      return;
    }

    try {
      setSaving(true);
      setError(null);

      // Aquí harías el PUT real al backend
      // await fetch(`/api/courses/${id}`, {
      //   method: "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData),
      // });

      console.log("Datos enviados:", formData);

      router.push("/instructor/courses");
    } catch (err) {
      setError("Error al guardar los cambios.");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center">Cargando curso...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md mb-4 mt-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Editar curso: {course.title}
      </h1>

      {error && (
        <p className="mb-4 text-red-600 dark:text-red-400 text-sm">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Título */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Título
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg text-sm text-gray-900 dark:text-gray-100"
            placeholder="Título del curso"
          />
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Descripción
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full p-3 border rounded-lg text-sm text-gray-900 dark:text-gray-100"
            placeholder="Descripción detallada del curso"
          />
        </div>

        {/* Categoría */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Categoría
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg text-sm text-gray-900 dark:text-gray-100"
          >
            <option value="">Selecciona categoría</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Data">Data</option>
            <option value="Diseño">Diseño</option>
          </select>
        </div>

        {/* Nivel */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Nivel
          </label>
          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg text-sm text-gray-900 dark:text-gray-100"
          >
            <option value="">Selecciona nivel</option>
            <option value="Principiante">Principiante</option>
            <option value="Intermedio">Intermedio</option>
            <option value="Avanzado">Avanzado</option>
          </select>
        </div>

        {/* Precio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Precio (USD)
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            className="w-full p-3 border rounded-lg text-sm text-gray-900 dark:text-gray-100"
          />
        </div>

        {/* Instructor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Instructor
          </label>
          <input
            type="text"
            name="instructor"
            value={formData.instructor}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg text-sm text-gray-900 dark:text-gray-100"
            placeholder="Nombre del instructor"
          />
        </div>

        {/* Botón */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-lg bg-primary text-white text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
          >
            {saving ? "Guardando..." : "Guardar cambios"}
          </button>
        </div>
      </form>
    </div>
  );
}