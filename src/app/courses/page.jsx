"use client";

import { useState, useEffect } from "react";
import { Search, ChevronDown, Loader2 } from "lucide-react";
import Card from "@/components/ui/Card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { coursesPageData } from "@/data/courses"; 

// Fake user para simular login/inscripción
const fakeUser = {
  isLoggedIn: true, // cambia a false para probar como visitante
  enrolledCourses: [2],
};

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Simulación de carga (con mocks)
  useEffect(() => {
    try {
      setLoading(true);
      // Simulamos un pequeño delay (para que se vea el loader)
      const timer = setTimeout(() => {
        setCourses(coursesPageData);
        setLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    } catch (err) {
      setError("No se pudieron cargar los cursos.");
      setLoading(false);
    }
  }, []);

  // Estados de filtros
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [instructor, setInstructor] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [type, setType] = useState("all");

  // Extraer categorías e instructores únicos
  const categories = ["all", ...new Set(courses.map((c) => c.category))];
  const instructors = ["all", ...new Set(courses.map((c) => c.instructor))];

  // 🔎 Filtrado de cursos
  const filteredCourses = courses
    .filter((c) => c.title.toLowerCase().includes(search.toLowerCase()))
    .filter((c) => (category === "all" ? true : c.category === category))
    .filter((c) => (instructor === "all" ? true : c.instructor === instructor))
    .filter((c) => {
      if (type === "free") return c.isFree === true;
      if (type === "paid") return c.isFree === false;
      return true;
    })
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );

  // Renderizar acceso
  const renderAccessInfo = (course) => {
    if (course.isFree) {
      return (
        <p className="text-green-600 dark:text-green-400 font-semibold text-sm mt-2">
          Curso gratuito: acceso libre
        </p>
      );
    }
    if (!fakeUser.isLoggedIn) {
      return (
        <p className="text-red-600 dark:text-red-400 text-sm mt-2">
          Inicia sesión para acceder
        </p>
      );
    }
    if (fakeUser.enrolledCourses.includes(course.id)) {
      return (
        <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm mt-2">
          Inscrito: acceso completo
        </p>
      );
    }
    return (
      <button
        type="button"
        className="mt-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-gray-800 transition text-sm"
        onClick={(e) => {
          e.preventDefault();
          router.push("/payments");
        }}
      >
        Inscribirse
      </button>
    );
  };

  // Loader y error
  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin w-12 h-12 text-primary" />
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center text-red-500 py-10">
        {error}
      </div>
    );
  }

  // Render principal
  return (
    <section className="flex flex-col md:flex-row p-6 md:p-12 gap-8">
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md h-fit">
        <h2 className="text-lg font-bold mb-6 text-gray-900 dark:text-gray-100">
          Filtros
        </h2>

        {/* Búsqueda */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar cursos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
        </div>

        {/* Categorías */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
            Categoría
          </h3>
          <ul className="space-y-2">
            {categories.map((cat, i) => (
              <li key={i} className="flex items-center gap-2">
                <input
                  type="radio"
                  id={`cat-${cat}`}
                  name="category"
                  value={cat}
                  checked={category === cat}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                />
                <label
                  htmlFor={`cat-${cat}`}
                  className="text-sm text-gray-600 dark:text-gray-300 cursor-pointer"
                >
                  {cat === "all" ? "Todas" : cat}
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Instructores */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
            Instructor
          </h3>
          <ul className="space-y-2">
            {instructors.map((inst, i) => (
              <li key={i} className="flex items-center gap-2">
                <input
                  type="radio"
                  id={`inst-${inst}`}
                  name="instructor"
                  value={inst}
                  checked={instructor === inst}
                  onChange={(e) => setInstructor(e.target.value)}
                  className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                />
                <label
                  htmlFor={`inst-${inst}`}
                  className="text-sm text-gray-600 dark:text-gray-300 cursor-pointer"
                >
                  {inst === "all" ? "Todos" : inst}
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Tipo */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
            Tipo
          </h3>
          <ul className="space-y-2">
            {["all", "free", "paid"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <input
                  type="radio"
                  id={`type-${t}`}
                  name="type"
                  value={t}
                  checked={type === t}
                  onChange={(e) => setType(e.target.value)}
                  className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                />
                <label
                  htmlFor={`type-${t}`}
                  className="text-sm text-gray-600 dark:text-gray-300 cursor-pointer"
                >
                  {t === "all"
                    ? "Todos"
                    : t === "free"
                      ? "Gratis"
                      : "De pago"}
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Orden */}
        <div>
          <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
            Ordenar por
          </h3>
          <button
            onClick={() =>
              setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
            }
            className="w-full flex items-center justify-between px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-sm text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            {sortOrder === "asc" ? "Ascendente (A-Z)" : "Descendente (Z-A)"}
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </aside>

      {/* Catálogo */}
      <main className="flex-1">
        <h1 className="text-2xl font-bold mb-6">Catálogo de Cursos</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Link
              key={course.id}
              href={`/courses/${course.id}/overview`}
              className="block"
              style={{ textDecoration: "none" }}
            >
              <Card className="p-6 flex flex-col justify-between bg-white dark:bg-gray-800 hover:shadow-xl transition rounded-xl border border-gray-200 dark:border-gray-700 cursor-pointer h-full">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    {course.description}
                  </p>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  <p>
                    <span className="font-medium">Instructor:</span>{" "}
                    {course.instructor}
                  </p>
                  <p>
                    <span className="font-medium">Categoría:</span>{" "}
                    {course.category}
                  </p>
                  {renderAccessInfo(course)}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </section>
  );
}