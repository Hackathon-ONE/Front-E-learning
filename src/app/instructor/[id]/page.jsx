"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BookOpen, Users, Star, Lightbulb } from "lucide-react";
import Link from "next/link";
import SuggestionsForm from "./suggestions-form";

export default function InstructorProfilePage() {
  const { id } = useParams();
  const [instructor, setInstructor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔹 Simulación de datos (esto luego viene del backend)
    const mockInstructors = [
      {
        id: "1",
        name: "Juan Pérez",
        avatar: "https://i.pravatar.cc/150?img=1",
        specialty: "Frontend Developer & React Expert",
        bio: "Desarrollador con 8+ años de experiencia en JavaScript, React y Next.js. Apasionado por enseñar y crear experiencias digitales modernas.",
        stats: { courses: 5, students: 320, rating: 4.8 },
        courses: [
          { id: 101, title: "React desde cero", lessons: 20, students: 120 },
          { id: 102, title: "Next.js avanzado", lessons: 18, students: 85 },
        ],
        reviews: [
          {
            id: 1,
            student: "Ana Gómez",
            comment: "Excelente instructor, explica muy claro y con ejemplos prácticos.",
            rating: 5,
          },
          {
            id: 2,
            student: "Luis Pérez",
            comment: "Me ayudó a entender Next.js de forma sencilla.",
            rating: 4,
          },
        ],
      },
      {
        id: "2",
        name: "María Gómez",
        avatar: "https://i.pravatar.cc/150?img=5",
        specialty: "Fullstack Developer & Mentora",
        bio: "Apasionada por el desarrollo web moderno y la mentoría de nuevos talentos. Experiencia en React, Node.js y arquitectura cloud.",
        stats: { courses: 4, students: 210, rating: 4.9 },
        courses: [
          { id: 103, title: "Node.js para principiantes", lessons: 15, students: 90 },
          { id: 104, title: "Arquitectura web moderna", lessons: 25, students: 120 },
        ],
        reviews: [
          {
            id: 1,
            student: "Pedro Sánchez",
            comment: "María es una excelente mentora, aprendí muchísimo.",
            rating: 5,
          },
          {
            id: 2,
            student: "Laura Fernández",
            comment: "Muy clara en los conceptos, la recomiendo al 100%.",
            rating: 5,
          },
        ],
      },
    ];

    const found = mockInstructors.find((i) => i.id === id);
    setInstructor(found);
    setLoading(false);
  }, [id]);

  if (loading) return <p className="text-center py-10">Cargando perfil...</p>;
  if (!instructor) return <p className="text-center py-10">Instructor no encontrado</p>;

  return (
    <main className="min-h-screen bg-[var(--color-bg)] px-4 sm:px-6 lg:px-10 py-6">
      {/* Perfil principal */}
      <section className="max-w-6xl mx-auto bg-[var(--color-surface)] rounded-2xl shadow-xl p-6 sm:p-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-10">
        <img
          src={instructor.avatar}
          alt={instructor.name}
          className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-primary/30 shadow-md"
        />
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--color-primary)]">
            {instructor.name}
          </h1>
          <p className="text-gray-500 dark:text-gray-200 text-sm sm:text-base mt-1">
            {instructor.specialty}
          </p>
          <p className="mt-4 text-[var(--color-text)] leading-relaxed text-sm sm:text-base lg:text-lg">
            {instructor.bio}
          </p>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-3 gap-4 sm:gap-6 text-center">
            <div className="bg-[var(--color-card-primary)] p-4 rounded-xl shadow">
              <BookOpen className="mx-auto text-primary mb-2 w-6 h-6 sm:w-8 sm:h-8" />
              <p className="font-semibold text-base sm:text-lg text-black">{instructor.stats.courses}</p>
              <p className="text-xs sm:text-sm text-gray-500">Cursos</p>
            </div>
            <div className="bg-[var(--color-card-primary)] p-4 rounded-xl shadow">
              <Users className="mx-auto text-green-500 mb-2 w-6 h-6 sm:w-8 sm:h-8" />
              <p className="font-semibold text-base sm:text-lg text-black">{instructor.stats.students}</p>
              <p className="text-xs sm:text-sm text-gray-500">Estudiantes</p>
            </div>
            <div className="bg-[var(--color-card-primary)] p-4 rounded-xl shadow">
              <Star className="mx-auto text-yellow-500 mb-2 w-6 h-6 sm:w-8 sm:h-8" />
              <p className="font-semibold text-base sm:text-lg text-black">{instructor.stats.rating}</p>
              <p className="text-xs sm:text-sm text-gray-500">Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cursos */}
      <section className="max-w-6xl mx-auto mt-10">
        <h2 className="text-xl sm:text-2xl font-bold mb-6">Cursos creados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-black">
          {instructor.courses.map((c) => (
            <div
              key={c.id}
              className="bg-[var(--color-card-primary)] p-5 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-lg sm:text-xl">{c.title}</h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                {c.lessons} lecciones · {c.students} estudiantes
              </p>
              <Link
                href={`/courses/${c.id}`}
                className="inline-block mt-3 text-primary font-medium hover:text-primary/40 text-sm sm:text-base"
              >
                Ver curso →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Reseñas */}
      <section className="max-w-6xl mx-auto mt-10">
        <h2 className="text-xl sm:text-2xl font-bold mb-6">Reseñas de estudiantes</h2>
        <div className="space-y-4">
          {instructor.reviews.map((r) => (
            <div
              key={r.id}
              className="bg-[var(--color-surface)] p-4 rounded-xl shadow border border-gray-200 dark:border-gray-700"
            >
              <p className="font-semibold text-sm sm:text-base">{r.student}</p>
              <p className="text-yellow-500 text-sm">{"★".repeat(r.rating)}</p>
              <p className="text-xs sm:text-sm text-gray-400 mt-2">
                "{r.comment}"
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* AI Suggestions */}
      <section className="max-w-5xl mx-auto mt-14 px-2">
        <div className="text-center">
          <Lightbulb className="mx-auto h-12 w-12 text-primary" />
          <h2 className="text-2xl sm:text-3xl font-bold mt-4">Sugerencias para la enseñanza con IA</h2>
          <p className="text-gray-500 mt-2 max-w-2xl mx-auto text-sm sm:text-base">
            Descubre nuevas ideas de cursos y recursos valiosos basados en las tendencias de la plataforma y la demanda de los estudiantes.
          </p>
        </div>
        <div className="mt-8">
          <SuggestionsForm />
        </div>
      </section>
    </main>
  );
}