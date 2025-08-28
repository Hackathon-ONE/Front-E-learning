"use client";

// Ejemplo de cómo importar datos desde la base de datos (Java/Spring Boot):
/*
import { useEffect, useState } from "react";
const [resources, setResources] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  async function fetchResources() {
    try {
      setLoading(true);
      setError(null);
      // Cambia la URL por tu endpoint real de Spring Boot
      const res = await fetch("http://localhost:8080/api/courses/{id}/resources");
      if (!res.ok) throw new Error("Error al obtener recursos");
      const data = await res.json();
      setResources(data);
    } catch (err) {
      setError("No se pudo cargar los recursos.");
    } finally {
      setLoading(false);
    }
  }
  fetchResources();
}, []);

// Puedes mostrar loading y error así:
// if (loading) return <div className="text-center py-10">Cargando recursos...</div>;
// if (error) return <div className="text-center text-red-500 py-10">{error}</div>;
*/

export default function QuizResourcesPage() {
  // Datos hardcodeados para demo
  const resources = [
    { title: "Guía de estudio de React", link: "https://react.dev" },
    { title: "Next.js Docs", link: "https://nextjs.org/docs" },
    { title: "MDN JavaScript", link: "https://developer.mozilla.org/es/docs/Web/JavaScript" },
    { title: "Curso de JavaScript Moderno", link: "https://www.freecodecamp.org/espanol/news/curso-de-javascript-moderno-gratis/" },
    { title: "Documentación de CSS", link: "https://developer.mozilla.org/es/docs/Web/CSS" },
  ];

  return (
    <main className="min-h-screen bg-[var(--color-bg)] flex flex-col items-center py-8 px-2 sm:px-4">
      <section className="w-full max-w-2xl bg-[var(--color-surface)] rounded-2xl shadow-xl p-4 sm:p-8 flex flex-col gap-8">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-primary)] text-center mb-2">
            Recursos para el Curso
          </h1>
          <p className="text-[var(--color-muted)] text-center mb-4">
            Materiales recomendados para complementar tu aprendizaje y prepararte para quizzes y proyectos.
          </p>
        </div>
        <ul className="space-y-3">
          {resources.map((res, idx) => (
            <li
              key={idx}
              className="p-4 border rounded-lg bg-[var(--color-card-primary)] hover:bg-[var(--color-primary)]/10 transition"
            >
              <a
                href={res.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-primary)] underline font-semibold break-all"
              >
                {res.title}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}