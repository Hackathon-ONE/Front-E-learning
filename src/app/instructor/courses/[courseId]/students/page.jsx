"use client";

import { useState } from "react";
import { Users } from "lucide-react";
import { useRouter, useParams } from "next/navigation";

export default function ProgressReportsPage() {
  const router = useRouter();
  const { courseId } = useParams(); // en caso de usar dinámica [courseId]

  // 🔹 Datos HARDCODEADOS
  const [students] = useState([
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
  ]);

  const [courses] = useState([
    {
      id: 1,
      title: "Curso de React desde Cero",
      students: 120,
      progress: 75,
    },
    {
      id: 2,
      title: "NestJS Avanzado",
      students: 80,
      progress: 40,
    },
    {
      id: 3,
      title: "Diseño UX/UI en Figma",
      students: 150,
      progress: 90,
    },
    {
      id: 4,
      title: "Introducción a TypeScript",
      students: 200,
      progress: 60,
    },
  ]);

  return (
    <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] p-4 sm:p-6 md:p-8">
      <section className="max-w-6xl mx-auto space-y-10">
        {/* ====================== */}
        {/* Reporte global cursos */}
        {/* ====================== */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2">
            Reportes de Progreso de Cursos
          </h1>

          <div className="overflow-x-auto rounded-xl shadow-md border border-[var(--color-muted)]">
            <table className="w-full border-collapse text-sm md:text-base">
              <thead className="bg-[var(--color-surface)]">
                <tr>
                  <th className="p-4 text-left">Curso</th>
                  <th className="p-4 text-left">Estudiantes</th>
                  <th className="p-4 text-left">Progreso</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr
                    key={course.id}
                    className="border-t border-[var(--color-muted)] hover:bg-[var(--color-card-secondary)] transition"
                  >
                    <td className="p-4 font-medium">{course.title}</td>
                    <td className="p-4 flex items-center gap-2">
                      <Users className="w-4 h-4 text-[var(--color-muted)]" />
                      {course.students}
                    </td>
                    <td className="p-4 w-64">
                      <div className="w-full bg-[var(--color-card-secondary)] rounded-full h-4 overflow-hidden">
                        <div
                          className="h-4 rounded-full"
                          style={{
                            width: `${course.progress}%`,
                            backgroundColor: "var(--color-progress)",
                          }}
                        ></div>
                      </div>
                      <span className="text-sm mt-1 block">
                        {course.progress}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ====================== */}
        {/* Listado de estudiantes */}
        {/* ====================== */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Estudiantes inscritos
          </h2>

          {students.length === 0 ? (
            <p className="text-center text-sm text-gray-500">
              No hay estudiantes inscritos todavía.
            </p>
          ) : (
            <div className="bg-[var(--color-card-primary)] rounded-xl shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px] border-collapse text-xs sm:text-sm md:text-base">
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
                            <span className="text-gray-400">
                              Sin curso asignado
                            </span>
                          )}
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() =>
                              router.push(
                                `/instructor/courses/${courseId}/students/${s.id}/progress`
                              )
                            }
                            className="px-3 py-1.5 rounded-lg text-sm font-medium"
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
            </div>
          )}
        </div>
      </section>
    </main>
  );
}