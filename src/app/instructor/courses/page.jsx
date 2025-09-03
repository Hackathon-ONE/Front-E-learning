"use client";

import { useEffect, useState } from "react";
import { PlusCircle, BookOpen, Users, Edit } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { instructorCourses } from "@/data/instructors";

export default function InstructorCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setCourses(instructorCourses);
      setLoading(false);
    }, 800);
  }, []);

  if (loading)
    return <p className="text-center py-10 text-gray-500">Cargando cursos...</p>;

  if (error)
    return (
      <p className="text-center py-10 text-red-500">
        Hubo un error al cargar cursos.
      </p>
    );

  // Ejemplo de cómo importar datos desde la base de datos (Java/Spring Boot):
/*
import { useEffect, useState } from "react";
const [courses, setCourses] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  async function fetchCourses() {
    try {
      setLoading(true);
      setError(null);
      // Cambia la URL por tu endpoint real de Spring Boot
      const res = await fetch("http://localhost:8080/api/instructor/courses");
      if (!res.ok) throw new Error("Error al obtener cursos");
      const data = await res.json();
      setCourses(data);
    } catch (err) {
      setError("No se pudo cargar los cursos.");
    } finally {
      setLoading(false);
    }
  }
  fetchCourses();
}, []);

// Puedes mostrar loading y error así:
// if (loading) return <div className="text-center py-10">Cargando cursos...</div>;
// if (error) return <div className="text-center text-red-500 py-10">{error}</div>;
*/

return (
  <main className="min-h-screen bg-[var(--color-bg)] flex flex-col items-center py-8 px-2 sm:px-4">
    <section className="w-full max-w-4xl bg-[var(--color-surface)] rounded-2xl shadow-xl p-4 sm:p-8 flex flex-col gap-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2">
        Mis Cursos como Instructor
      </h1>

      {/* Botón Crear curso */}
      <div className="flex justify-end mb-4">
        <Link href="/instructor/courses/new">
          <Button className="btn-primary px-6 py-2 rounded-lg font-bold">
            Crear nuevo curso
          </Button>
        </Link>
      </div>

      {/* Tabla de cursos */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-3 py-2 text-left text-[var(--color-muted)]">
                Curso
              </th>
              <th className="px-3 py-2 text-left text-center text-[var(--color-muted)]">
                Lecciones
              </th>
              <th className="px-3 py-2 text-left text-center text-[var(--color-muted)]">
                Estudiantes
              </th>
              <th className="px-3 py-2 text-left text-center text-[var(--color-muted)]">
                Estado
              </th>
              <th className="px-3 py-2 text-center text-[var(--color-muted)]">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {courses.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-6 text-gray-500"
                >
                  No tienes cursos aún. ¡Crea tu primer curso!
                </td>
              </tr>
            ) : (
              courses.map((c) => (
                <tr key={c.id} className="border-b border-gray-100">
                  <td className="px-3 py-2 flex items-center gap-2">
                    <BookOpen
                      size={18}
                      className="text-[var(--color-primary)]"
                    />
                    <span className="font-semibold text-[var(--color-text)]">
                      {c.title}
                    </span>
                  </td>
                  <td className="px-3 py-2 justify-center items-center">{c.lessons}</td>
                  <td className="px-3 py-2 flex items-center gap-1 justify-center items-center">
                    <Users size={16} className="text-blue-500" />
                    {c.studentsCount}
                  </td>
                  <td className="px-3 py-2 justify-center items-center">
                    <span
                      className={`text-xs font-bold rounded px-2 py-1 ${
                        c.published
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {c.published ? "Publicado" : "Borrador"}
                    </span>
                  </td>
                  <td className="px-3 py-2 flex gap-2 justify-center items-center">
                    <Link href={`/instructor/courses/${c.id}`}>
                      <Button className="flex items-center gap-1 px-3 py-1 rounded-lg text-sm border border-primary text-primary hover:bg-primary hover:text-white transition">
                        Ver detalles
                      </Button>
                    </Link>
                    <Link href={`/instructor/courses/${c.id}/edit`}>
                      <Button className="flex items-center gap-1 px-3 py-1 rounded-lg text-sm">
                        <Edit size={16} /> Editar
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  </main>
);
}