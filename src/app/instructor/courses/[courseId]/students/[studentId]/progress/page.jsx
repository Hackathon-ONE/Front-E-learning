"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle, Circle } from "lucide-react";
import { studentsInstructorData } from "@/data/instructors";
import Image from "next/image";

export default function StudentProgressPage() {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const found = studentsInstructorData.find((s) => s.id === studentId);
    setStudent(found);
    setLoading(false);
  }, [studentId]);

  if (loading) return <p className="text-center py-10">Cargando progreso...</p>;
  if (!student) return <p className="text-center py-10">Estudiante no encontrado</p>;

  return (
    <main className="min-h-screen bg-[var(--color-bg)] py-6 px-3 sm:px-6 lg:px-12">
      {/* Perfil del estudiante */}
      <section className="max-w-6xl mx-auto bg-[var(--color-surface)] rounded-2xl shadow-lg p-6 flex flex-col sm:flex-row sm:items-center gap-6">
        <Image
          src={student.avatar}
          alt={student.name}
          width={128}
          height={64}
          unoptimized
          priority
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-primary/30 shadow-md object-cover mx-auto sm:mx-0"
        />
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text)]">
            {student.name}
          </h1>
          <p className="text-[var(--color-text)] text-sm sm:text-base text-center sm:text-left">{student.email}</p>
        </div>
      </section>

      {/* Cursos */}
      <section className="max-w-6xl mx-auto mt-10 space-y-8">
        <h2 className="text-lg sm:text-xl font-bold mb-4 text-center sm:text-left">
          Progreso en cursos
        </h2>

        {student.courses.map((course) => (
          <div
            key={course.id}
            className="bg-[var(--color-surface)] rounded-xl shadow p-6 flex flex-col gap-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h3 className="text-lg font-semibold text-center sm:text-left text-[var(--color-text)]">{course.title}</h3>
              <span className="text-sm text-[var(--color-text)] text-center sm:text-right">
                {course.progress}% completado
              </span>
            </div>

            {/* Barra de progreso */}
            <div className="w-full bg-gray-200 h-3 rounded-lg overflow-hidden">
              <div
                className="bg-primary h-3 rounded-lg transition-all duration-300 ease-in-out"
                style={{ width: `${course.progress}%` }}
              />
            </div>

            {/* Lecciones */}
            <ul className="space-y-3">
              {course.lessons.map((lesson) => (
                <li
                  key={lesson.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-text)]"
                >
                  {lesson.completed ? (
                    <CheckCircle className="text-green-400 flex-shrink-0" size={20} />
                  ) : (
                    <Circle className="text-[var(--color-text)] flex-shrink-0" size={20} />
                  )}
                  <span
                    className={`text-sm sm:text-base ${
                      lesson.completed
                        ? "line-through text-[var(--color-text)]"
                        : "text-[var(--color-text)]"
                    }`}
                  >
                    {lesson.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </main>
  );
}