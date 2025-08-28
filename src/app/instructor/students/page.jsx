"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function StudentsPage() {
// 🔹 Datos HARDCODEADOS (simulación del backend)
const students = [
  {
    id: 1,
    name: "Ana Gómez",
    email: "ana@example.com",
    courseTitle: "React Avanzado",
  },
  {
    id: 2,
    name: "Luis Pérez",
    email: "luis@example.com",
    courseTitle: "Node.js desde cero",
  },
];

  const router = useRouter();
  // const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🚀 Fetch de estudiantes desde el backend
  /* useEffect(() => {
    async function fetchStudents() {
      try {
        setLoading(true);
        const res = await fetch("/api/students"); // Ajusta el endpoint a tu backend real
        if (!res.ok) throw new Error("Error al cargar los estudiantes");
        const data = await res.json();
        setStudents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchStudents();
  }, []);

  if (loading) {
    return (
      <p className="text-center mt-10 text-sm text-gray-500">
        Cargando estudiantes...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center mt-10 text-red-600 dark:text-red-400">
        {error}
      </p>
    );
  } */

  return (
    <main
      className="p-6 max-w-5xl mx-auto"
      style={{
        backgroundColor: "var(--color-bg)",
        color: "var(--color-text)",
      }}
    >
      <h1 className="text-3xl font-bold mb-6">Estudiantes inscritos</h1>

      {students.length === 0 ? (
        <p className="text-center text-sm text-gray-500">
          No hay estudiantes inscritos todavía.
        </p>
      ) : (
        <div className="bg-[var(--color-card-primary)] rounded-xl shadow overflow-hidden">
          <table className="w-full border-collapse text-sm md:text-base">
            <thead style={{ backgroundColor: "var(--color-surface)" }}>
              <tr>
                <th className="p-3 text-left">Nombre</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Curso</th>
                <th className="p-3 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr
                  key={s.id}
                  className="border-t hover:bg-[var(--color-surface)] transition"
                  style={{ borderColor: "var(--color-surface)" }}
                >
                  <td className="p-3">{s.name}</td>
                  <td className="p-3">{s.email}</td>
                  <td className="p-3">
                    {s.courseTitle || (
                      <span className="text-gray-400">Sin curso asignado</span>
                    )}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => router.push(`/students/${s.id}/progress`)}
                      className="px-3 py-1 rounded-lg text-sm md:text-base font-medium"
                      style={{
                        backgroundColor: "var(--color-primary)",
                        color: "var(--color-primary-text)",
                      }}
                    >
                      Ver progreso
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}