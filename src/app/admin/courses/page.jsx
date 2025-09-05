"use client";

import { useState, useEffect } from "react";
import { coursesDashboardMock } from "@/data/courses";

export default function CoursesPage() {
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

    // De momento trabajamos con datos hardcodeados:
    const hardcodedCourses = coursesDashboardMock;
    setCourses(hardcodedCourses);
  }, []);

  return (
    <div className="p-3 sm:p-4 md:p-6">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Gestión de Cursos</h1>
        <p className="text-sm sm:text-base text-gray-400">Aquí podrás crear, editar o eliminar cursos.</p>
      </div>

      {/* Course List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="border rounded-lg p-3 sm:p-4 shadow-sm bg-white hover:shadow-md transition"
          >
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
              {course.name}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
              {course.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}