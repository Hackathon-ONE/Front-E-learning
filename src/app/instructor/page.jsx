"use client";
import { useState /*, useEffect */ } from "react";
import { BookOpen, Users, Edit } from "lucide-react";
import Link from "next/link";
import Button from "../../components/ui/button";

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

export default function InstructorCoursesPage() {
  // Datos hardcodeados para demo
  const [courses] = useState([
    {
      id: 1,
      title: "React desde Cero",
      students: 120,
      lessons: 18,
      published: true,
    },
    {
      id: 2,
      title: "Next.js Avanzado",
      students: 80,
      lessons: 22,
      published: false,
    },
    {
      id: 3,
      title: "UI/UX para Developers",
      students: 60,
      lessons: 15,
      published: true,
    },
  ]);

  return (
    <main className="min-h-screen bg-[var(--color-bg)] flex flex-col items-center py-8 px-2 sm:px-4">
      <section className="w-full max-w-4xl bg-[var(--color-surface)] rounded-2xl shadow-xl p-4 sm:p-8 flex flex-col gap-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-primary)] text-center mb-2">
          Mis Cursos como Instructor
        </h1>
        <div className="flex justify-end mb-4">
          <Link href="/instructor/create">
            <Button className="btn-primary px-6 py-2 rounded-lg font-bold">
              Crear nuevo curso
            </Button>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <th className="px-3 py-2 text-left text-[var(--color-muted)]">Curso</th>
                <th className="px-3 py-2 text-left text-[var(--color-muted)]">Lecciones</th>
                <th className="px-3 py-2 text-left text-[var(--color-muted)]">Estudiantes</th>
                <th className="px-3 py-2 text-left text-[var(--color-muted)]">Estado</th>
                <th className="px-3 py-2 text-left text-[var(--color-muted)]"></th>
              </tr>
            </thead>
            <tbody>
              {courses.map((c) => (
                <tr key={c.id} className="border-b border-gray-100">
                  <td className="px-3 py-2 flex items-center gap-2">
                    <BookOpen size={18} className="text-[var(--color-primary)]" />
                    <span className="font-semibold text-[var(--color-text)]">{c.title}</span>
                  </td>
                  <td className="px-3 py-2">{c.lessons}</td>
                  <td className="px-3 py-2 flex items-center gap-1">
                    <Users size={16} className="text-blue-500" /> {c.students}
                  </td>
                  <td className="px-3 py-2">
                    <span className={`text-xs font-bold rounded px-2 py-1 ${
                      c.published
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {c.published ? "Publicado" : "Borrador"}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <Link href={`/instructor/edit/${c.id}`}>
                      <Button className="flex items-center gap-1 px-3 py-1 text-sm">
                        <Edit size={16} /> Editar
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}