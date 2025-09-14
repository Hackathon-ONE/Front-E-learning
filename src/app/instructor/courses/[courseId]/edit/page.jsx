"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { fakeCourseEdit } from "@/data/instructors";
import { ArrowLeft } from "lucide-react";

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
    resourceUrl: "",
    resourceFile: null,
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

    if (!formData.title || !formData.description) {
      setError("El título y la descripción son obligatorios.");
      return;
    }

    try {
      setSaving(true);
      setError(null);

      // Crear FormData para enviar archivo o url
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("level", formData.level);
      data.append("price", formData.price);
      data.append("instructor", formData.instructor);

      if (formData.resourceUrl) data.append("resourceUrl", formData.resourceUrl);
      if (formData.resourceFile) data.append("resourceFile", formData.resourceFile);

      // Aquí harías el PUT real al backend
      // await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${id}`, {
      //   method: "PUT",
      //   body: data,
      // });

      // console.log("Datos enviados:", Object.fromEntries(data));

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
    <main className="min-h-screen bg-[var(--color-bg)] flex flex-col items-center py-8 px-2 sm:px-4">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 px-4 py-2 mb-4 rounded-lg font-medium 
                   bg-[var(--color-surface)] text-[var(--color-text)] 
                   hover:bg-[var(--color-primary)] hover:text-[var(--color-primary-text)]
                   transition w-full sm:w-auto"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm sm:text-base">Volver</span>
      </button>

      <div
        className="max-w-3xl mx-auto p-6 rounded-xl border border-[var(--color-border)] shadow-md mb-4 mt-4"
        style={{
          backgroundColor: "var(--color-bg)",
          color: "var(--color-text)",
        }}
      >
        <h1 className="text-2xl font-bold mb-6 text-[var(--color-text)] border-b border-[var(--color-border)]">
          Editar curso: {course.title}
        </h1>

        {error && (
          <p className="mb-4 text-red-600 dark:text-red-400 text-sm">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Título */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-text)] mb-1">
              Título
            </label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg text-sm text-[var(--color-text)]"
              placeholder="Título del curso"
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-text)] mb-1">
              Descripción
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full p-3 border rounded-lg text-sm text-[var(--color-text)]"
              placeholder="Descripción detallada del curso"
            />
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-text)] mb-1">
              Categoría
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg text-sm text-[var(--color-text)]"
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
            <label className="block text-sm font-medium text-[var(--color-text)] mb-1">
              Nivel
            </label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg text-sm text-[var(--color-text)]"
            >
              <option value="">Selecciona nivel</option>
              <option value="Principiante">Principiante</option>
              <option value="Intermedio">Intermedio</option>
              <option value="Avanzado">Avanzado</option>
            </select>
          </div>

          {/* Precio */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-text)] mb-1">
              Precio (USD)
            </label>
            <input
              id="price"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              className="w-full p-3 border rounded-lg text-sm text-[var(--color-text)]"
            />
          </div>

          {/* Recurso */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-text)] mb-1">
              Recurso del curso (imagen/documento)
            </label>

            <input
              id="resourceUrl"
              type="url"
              name="resourceUrl"
              value={formData.resourceUrl || ""}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg text-sm text-[var(--color-text)] mb-3"
              placeholder="Pega aquí un enlace (Drive, imagen, PDF, etc.)"
            />

            <input
              id="resourceFile"
              type="file"
              accept=".jpg,.jpeg,.png,.pdf,.docx"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setFormData((prev) => ({
                    ...prev,
                    resourceFile: file,
                  }));
                }
              }}
              className="w-full p-3 border rounded-lg text-sm text-[var(--color-text)]"
            />

            {formData.resourceUrl && (
              <p className="mt-2 text-xs text-[var(--color-text)]">
                URL añadida: {formData.resourceUrl}
              </p>
            )}
            {formData.resourceFile && (
              <p className="mt-2 text-xs text-[var(--color-text)]">
                Archivo seleccionado: {formData.resourceFile.name}
              </p>
            )}
          </div>

          {/* Instructor */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-text)] mb-1">
              Instructor
            </label>
            <input
              id="instructor"
              type="text"
              name="instructor"
              value={formData.instructor}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg text-sm text-[var(--color-text)]"
              placeholder="Nombre del instructor"
            />
          </div>

          {/* Botón */}
          <div className="flex justify-end">
            <button
              aria-label="Guardar cambios"
              type="submit"
              disabled={saving}
              className="cursor-pointer px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/80 transition"
            >
              {saving ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
