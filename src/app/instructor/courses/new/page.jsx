"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function CreateCoursePage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    level: "",
    price: 0,
    instructorId: "", // agregado
    resourceUrl: "",
    resourceFile: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

    if (!formData.category || !formData.level) {
      setError("La categoría y el nivel son obligatorios.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      console.log("📝 Enviando curso al backend:", formData);

      // Enviar al endpoint de creación de cursos
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          category: formData.category,
          level: formData.level,
          price: formData.price,
          resourceUrl: formData.resourceUrl,
          imageUrl: '/courses/default.jpg' // Por ahora usar imagen por defecto
        })
      });

      const data = await response.json();

      if (response.ok) {
        console.log('✅ Curso creado exitosamente:', data);
        router.push("/instructor/courses?message=Curso creado exitosamente");
      } else {
        console.error('❌ Error creando curso:', data);
        setError(data.message || "Hubo un problema al crear el curso.");
      }
    } catch (err) {
      console.error('❌ Error de conexión:', err);
      setError("Error de conexión. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="p-6 max-w-3xl mx-auto mb-4 mt-4"
      style={{
        backgroundColor: "var(--color-bg)",
        color: "var(--color-text)",
      }}
    >
      {/* Botón volver */}
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

      <h1 className="text-3xl font-bold mb-6">Crear nuevo curso</h1>

      {error && (
        <p className="text-red-600 dark:text-red-400 mb-4 text-sm">{error}</p>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-[var(--color-card-primary)] p-6 rounded-xl shadow"
      >
        {/* Título */}
        <div>
          <label className="block mb-1 font-medium text-[var(--color-text)]">
            Título del curso
          </label>
          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg text-sm text-[var(--color-text)]"
          />
        </div>

        {/* Descripción */}
        <div>
          <label className="block mb-1 font-medium text-[var(--color-text)]">
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full p-3 border rounded-lg text-sm text-[var(--color-text)]"
          />
        </div>

        {/* Categoría */}
        <div>
          <label className="block mb-1 font-medium text-[var(--color-text)]">
            Categoría
          </label>
          <input
            id="category"
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg text-sm text-[var(--color-text)]"
          />
        </div>

        {/* Nivel */}
        <div>
          <label className="block mb-1 font-medium text-[var(--color-text)]">
            Nivel
          </label>
          <select
            id="level"
            name="level"
            value={formData.level}
            onChange={handleChange}
            className="w-full p-3 border border-[var(--color-muted)] rounded-lg text-sm text-[var(--color-text)]"
          >
            <option value="">Selecciona nivel</option>
            <option value="Principiante">Principiante</option>
            <option value="Intermedio">Intermedio</option>
            <option value="Avanzado">Avanzado</option>
          </select>
        </div>

        {/* Precio */}
        <div>
          <label className="block mb-1 font-medium text-[var(--color-text)]">
            Precio (USD)
          </label>
          <input
            id="price"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            className="w-full p-3 border border-[var(--color-muted)] rounded-lg text-sm text-[var(--color-text)]"
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
          <label className="block mb-1 font-medium text-[var(--color-text)]">
            ID Instructor
          </label>
          <input
            id="instructorId"
            type="text"
            name="instructorId"
            value={formData.instructorId}
            onChange={handleChange}
            placeholder="Se obtiene del login"
            className="w-full p-3 border border-[var(--color-muted)] rounded-lg text-sm text-[var(--color-text)]"
          />
        </div>

        {/* Botón */}
        <button
          aria-label="Crear curso"
          type="submit"
          disabled={loading}
          className="cursor-pointer w-full py-3 rounded-lg font-semibold bg-[var(--color-primary)] text-white text-sm hover:bg-[var(--color-primary-hover)]"
        >
          {loading ? "Creando curso..." : "Crear curso"}
        </button>
      </form>
    </main>
  );
}