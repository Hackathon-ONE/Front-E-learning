"use client";

import { useEffect, useState } from "react";
import { PlusCircle, Users, BookOpen, LineChart, Pencil } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function InstructorDashboard() {
  // Simulación de datos (esto luego lo jalas desde tu API o DB)
  const [instructor] = useState({
    name: "Juan Pérez",
    bio: "Desarrollador Frontend con 8 años de experiencia. Instructor apasionado por React y Next.js.",
    avatar: "https://i.pravatar.cc/150?img=1", // 👈 URL del avatar (ejemplo)
    stats: {
      courses: 5,
      students: 320,
      progressReports: 78,
    },
  });

  /* const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchInstructor() {
      try {
        setLoading(true);
        setError(null);

        // 🔹 Cambia la ruta por tu endpoint real
        const res = await fetch("http://localhost:3000/api/instructor/dashboard");
        if (!res.ok) throw new Error("Error al obtener datos del dashboard");

        const data = await res.json();
        setInstructor(data);
      } catch (err) {
        console.error(err);
        setError("Hubo un problema al cargar los datos.");
      } finally {
        setLoading(false);
      }
    }

    fetchInstructor();
  }, []);

  if (loading) {
    return (
      <section className="p-8">
        <p className="text-center text-gray-400">Cargando datos...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="p-8">
        <p className="text-center text-red-500">{error}</p>
      </section>
    );
  } */

  return (
    <section className="p-8 space-y-8">
      {/* Perfil del Instructor */}
      <header className="flex flex-col md:flex-row items-center gap-6">
        {instructor.avatar ? (
          <img
            src={instructor.avatar}
            alt={instructor.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-primary/20 shadow"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-400 dark:bg-gray-700 flex items-center justify-center text-2xl font-bold text-gray-600 dark:text-gray-300">
            {instructor.name.charAt(0)}
          </div>
        )}
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-bold">
            Bienvenido, {instructor.name}
          </h1>
          <p className="text-gray-400 text-secondary-text">{instructor.bio}</p>
        </div>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex flex-col items-center">
            <BookOpen className="w-8 h-8 text-primary mb-2" />
            {/* <p className="text-lg font-semibold">{instructor.stats?.courses}</p> */}
            <p className="text-lg font-semibold">{instructor.stats.courses}</p>
            <p className="text-gray-500 text-sm">Cursos creados</p>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex flex-col items-center">
            <Users className="w-8 h-8 text-green-500 mb-2" />
            {/* <p className="text-lg font-semibold">{instructor.stats?.students}</p> */}
            <p className="text-lg font-semibold">{instructor.stats.students}</p>
            <p className="text-gray-500 text-sm">Estudiantes inscritos</p>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex flex-col items-center">
            <LineChart className="w-8 h-8 text-blue-500 mb-2" />
            {/* <p className="text-lg font-semibold">
              {instructor.stats.progressReports}
            </p> */}
            <p className="text-lg font-semibold">
              {instructor.stats.progressReports}
            </p>
            <Link href="/instructor/progress-reports">
              <p className="text-gray-500 text-sm">Reportes de progreso</p>
            </Link>
          </div>
        </Card>
      </div>

      {/* Acciones rápidas */}
      <div>
        <h2 className="text-xl font-bold mb-4">Acciones rápidas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 hover:shadow-md transition cursor-pointer">
            <div className="flex flex-col items-center">
              <PlusCircle className="w-10 h-10 text-primary mb-3" />
              <h3 className="text-lg font-semibold">Crear nuevo curso</h3>
              <Link href="/instructor/create">
                <Button className="mt-3 w-full">Ir</Button>
              </Link>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-md transition cursor-pointer">
            <div className="flex flex-col items-center">
              <Pencil className="w-10 h-10 text-accent mb-3" />
              <h3 className="text-lg font-semibold">Editar curso</h3>
              {/* Usa un id de ejemplo o lógica real */}
              <Link href="/instructor/edit/1">
                <Button className="mt-3 w-full">Ir</Button>
              </Link>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-md transition cursor-pointer">
            <div className="flex flex-col items-center">
              <Users className="w-10 h-10 text-green-500 mb-3" />
              <Link href="/instructor/students">
                <h3 className="text-lg font-semibold">Gestionar estudiantes</h3>
                <Button className="mt-3 w-full">Ir</Button>
              </Link>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-md transition cursor-pointer">
            <div className="flex flex-col items-center">
              <LineChart className="w-10 h-10 text-blue-500 mb-3" />
              <Link href="/instructor/analytics">
                <h3 className="text-lg font-semibold">Analíticas</h3>
              </Link>
              <Button className="mt-3 w-full">Ir</Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}