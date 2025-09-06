"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateCoursePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    level: "",
    price: 0,
    instructorId: "", // viene del login del instructor
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación rápida
    if (!form.title || !form.description) {
      setError("El título y la descripción son obligatorios.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Llamada real al backend
      // const res = await fetch("http://localhost:3000/api/courses", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(form),
      // });
      // if (!res.ok) throw new Error("Error al crear el curso");
      // const data = await res.json();

      console.log("Curso enviado al backend:", form);

      router.push("/instructor/courses");
    } catch (err) {
      console.error(err);
      setError("Hubo un problema al crear el curso.");
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
            type="text"
            name="title"
            value={form.title}
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
            name="description"
            value={form.description}
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
            type="text"
            name="category"
            value={form.category}
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
            name="level"
            value={form.level}
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
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            min="0"
            className="w-full p-3 border border-[var(--color-muted)] rounded-lg text-sm text-[var(--color-text)]"
          />
        </div>

        {/* Instructor (puede venir del login) */}
        <div>
          <label className="block mb-1 font-medium text-[var(--color-text)]">
            ID Instructor
          </label>
          <input
            type="text"
            name="instructorId"
            value={form.instructorId}
            onChange={handleChange}
            placeholder="Se obtiene del login"
            className="w-full p-3 border border-[var(--color-muted)] rounded-lg text-sm text-[var(--color-text)]"
          />
        </div>

        {/* Botón */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg font-semibold bg-[var(--color-primary)] text-white text-sm font-medium hover:bg-[var(--color-primary-hover)]"
        >
          {loading ? "Creando curso..." : "Crear curso"}
        </button>
        
      </form>
    </main>
  );
}