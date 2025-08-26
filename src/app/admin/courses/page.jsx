"use client";

import { useState, useEffect } from "react";

export default function CoursesPage() {
  // Estado local para almacenar los cursos (de momento hardcodeados)
  const [courses, setCourses] = useState([]);

  // Simulación de carga de datos desde backend
  useEffect(() => {
    // ⚡ En el futuro, aquí llamarás a tu API de Spring Boot
    /*
    async function fetchCourses() {
      try {
        const response = await fetch("http://localhost:8080/api/courses"); // endpoint de tu backend
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error al traer los cursos:", error);
      }
    }
    fetchCourses();
    */

    // 👉 De momento trabajamos con datos hardcodeados:
    const hardcodedCourses = [
      { id: 1, name: "Introducción a React", description: "Curso básico de React con proyectos." },
      { id: 2, name: "NestJS Avanzado", description: "Construcción de APIs robustas con NestJS." },
      { id: 3, name: "Spring Boot Essentials", description: "Curso práctico de Java + Spring Boot." },
    ];
    setCourses(hardcodedCourses);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestión de Cursos</h1>
      <p className="text-gray-400 mb-6">Aquí podrás crear, editar o eliminar cursos.</p>

      {/* Lista de cursos */}
      <div className="grid gap-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{course.name}</h2>
            <p className="text-gray-600">{course.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}