"use client";

import { useState } from "react";
import { PlayCircle, Clock, CheckCircle, Linkedin, Github, Twitter } from "lucide-react";
import Card from "@/components/ui/Card";
import Link from "next/link";

export default function CourseDetailPage({ courseId }) {
  const [course, lesson] = useState({
    id: 1,
    title: "Curso de ChatGPT: optimizando la calidad de los resultados",
    description: "Domina la integración de IA con APIs.",
    cover: "/courses/react.jpg",
    lessons: 24,
    duration: "12h 30m",
    students: 320,
    progress: 45,
    objectives: [
      "Comprender la arquitectura de React",
      "Crear componentes reutilizables",
      "Gestionar estado con hooks",
      "Implementar rutas y navegación",
      "Consumir APIs REST",
    ],
  });
  const [progress] = useState(100); // Progreso del estudiante
  const [lessons] = useState([
    { id: 1, title: "Creando los primeros prompts", duration: "22min", completed: true },
    { id: 2, title: "Mejorando la confiabilidad de los resultados", duration: "43min", completed: true },
    { id: 3, title: "Explorando aplicaciones", duration: "25min", completed: false },
    { id: 4, title: "Estrategias para textos largos", duration: "27min", completed: false },
  ]);

  const linkedCourses = [
    { id: 1, title: "IA + OpenAI APIs", description: "Domina la integración de IA con APIs." },
    { id: 2, title: "Comenzando con IA", description: "Fundamentos para entrar al mundo de la IA." },
    { id: 3, title: "Jornada de IA para Desarrolladores", description: "Un camino completo de especialización." },
  ];

  return (
    <section className="p-6 md:p-12 space-y-8">
      {/* Header */}
      <header className="rounded-2xl p-8 shadow-md flex flex-col md:flex-row md:items-center md:justify-between
                         bg-primary text-primary-text">
        <div>
          <h1 className="text-xl md:text-2xl font-bold mb-2">
            Curso de ChatGPT: optimizando la calidad de los resultados
          </h1>
          <p className="text-sm text-secondary">
            Carga horaria: 8h · Última actualización: 14/04/2025 · Alumnos: 25,799
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-4">
          <Link href={`/courses/${courseId}/lessons/${lesson.id}`}>
            <button className="px-6 py-2 rounded-lg shadow transition bg-accent text-secondary hover:scale-105">
              Acceder Curso
            </button>
          </Link>
          <Link href="/courses">
            <button className="px-6 py-2 rounded-lg shadow transition bg-secondary text-secondary-text hover:scale-105">
              Otras acciones
            </button>
          </Link>
        </div>
      </header>

      {/* Progreso */}
      <div className="rounded-xl shadow p-6 bg-surface dark:bg-surface-dark">
        <h2 className="text-lg font-semibold mb-4 text-text dark:text-text-dark">Progreso del curso</h2>
        <div className="w-full rounded-full h-3 bg-card-secondary dark:bg-card-secondary-dark">
          <div
            className="h-3 rounded-full bg-accent"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm mt-2 text-muted dark:text-muted-dark">{progress}% completado</p>
      </div>

      {/* Contenido */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar izquierdo */}
        <aside className="space-y-8 lg:col-span-1">
          {/* Cursos vinculados */}
          <div className="rounded-xl shadow p-6 bg-surface dark:bg-surface-dark">
            <h3 className="text-lg font-semibold mb-4 text-text dark:text-text-dark">
              Formaciones con este curso
            </h3>
            <ul className="space-y-3">
              {linkedCourses.map((c) => (
                <li
                  key={c.id}
                  className="p-3 rounded-lg hover:shadow-md transition bg-card-secondary dark:bg-card-secondary-dark text-card-secondary-text dark:text-card-secondary-text-dark"
                >
                  <p className="text-sm font-semibold">{c.title}</p>
                  <p className="text-xs">{c.description}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructor */}
          <div className="rounded-xl shadow p-6 text-center bg-surface dark:bg-surface-dark">
            <img
              src="/images/instructor.jpg"
              alt="Instructor"
              className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-lg font-bold text-text dark:text-text-dark">Christian Velasco</h3>
            <p className="text-sm mb-4 text-muted dark:text-muted-dark">
              Ingeniero en sistemas, especializado en Ciencia de Datos e Inteligencia Artificial.
            </p>
            <div className="flex justify-center gap-4">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                <Linkedin className="w-5 h-5 text-blue-600 hover:scale-110 transition" />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer">
                <Github className="w-5 h-5 text-text dark:text-text-dark hover:scale-110 transition" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <Twitter className="w-5 h-5 text-sky-500 hover:scale-110 transition" />
              </a>
            </div>
          </div>
        </aside>

        {/* Aulas */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold mb-4 text-text dark:text-text-dark">Aulas</h2>
          <div className="space-y-4">
            {lessons.map((lesson) => (
              <Card
                key={lesson.id}
                className="flex items-center justify-between p-4 rounded-xl hover:shadow-lg transition bg-card-primary dark:bg-card-primary-dark text-card-primary-text dark:text-card-primary-text-dark"
              >
                <div className="flex items-center gap-3">
                  {lesson.completed ? (
                    <CheckCircle className="w-5 h-5 text-accent" />
                  ) : (
                    <PlayCircle className="w-5 h-5 text-primary" />
                  )}
                  <div>
                    <h3 className="text-md font-semibold">{lesson.title}</h3>
                    <p className="text-xs flex items-center gap-1 text-muted dark:text-muted-dark">
                      <Clock className="w-4 h-4" /> {lesson.duration}
                    </p>
                  </div>
                </div>
                <Link href={`/courses/${course.id}/lessons/${lesson.id}`}>
                <button className="text-sm text-primary hover:scale-110 transition">
                  {lesson.completed ? "Revisar" : "Ver ahora"}
                </button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}