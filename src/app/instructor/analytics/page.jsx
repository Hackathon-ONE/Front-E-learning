"use client";

import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid, PieChart, Pie, Cell, Legend
} from "recharts";

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        setLoading(true);
        // 🚀 Llamada real al backend
        // const res = await fetch("http://localhost:3000/api/courses/analytics");
        // if (!res.ok) throw new Error("Error al cargar analíticas");
        // const data = await res.json();

        // 🔹 Simulación de datos del backend
        const data = [
          {
            id: 1,
            title: "React Avanzado",
            students: 120,
            avgProgress: 68,
            revenue: 2400,
          },
          {
            id: 2,
            title: "Node.js desde cero",
            students: 95,
            avgProgress: 74,
            revenue: 1500,
          },
        ];

        setAnalytics(data);
      } catch (err) {
        setError("No se pudieron cargar las analíticas.");
      } finally {
        setLoading(false);
      }
    }
    fetchAnalytics();
  }, []);

   // Colores para gráficas
   const COLORS = ["#ff5400", "#3d3f3e", "#fca311"];

   return (
    <main
      className="max-w-6xl mx-auto p-6 rounded-xl shadow space-y-10"
      style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}
    >
      <h1 className="text-3xl font-bold mb-6 text-center">Analíticas de mis cursos</h1>

      {loading && <p className="text-center">Cargando datos...</p>}
      {error && <p className="text-center text-red-600 dark:text-red-400">{error}</p>}

      {!loading && analytics.length > 0 && (
        <>
          {/* 📋 Tabla de detalle */}
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
            <table className="w-full border-collapse">
              <thead style={{ backgroundColor: "var(--color-card-primary)" }}>
                <tr>
                  <th className="p-3 text-left text-sm font-semibold">Curso</th>
                  <th className="p-3 text-center text-sm font-semibold">Estudiantes</th>
                  <th className="p-3 text-center text-sm font-semibold">Progreso promedio</th>
                  <th className="p-3 text-center text-sm font-semibold">Ingresos (USD)</th>
                </tr>
              </thead>
              <tbody>
                {analytics.map((course, i) => (
                  <tr
                    key={course.id}
                    className={`text-sm ${
                      i % 2 === 0
                        ? "bg-[var(--color-surface)]"
                        : "bg-[var(--color-card-primary)]"
                    }`}
                  >
                    <td className="p-3 font-medium">{course.title}</td>
                    <td className="p-3 text-center">{course.students}</td>
                    <td className="p-3 text-center">{course.avgProgress}%</td>
                    <td className="p-3 text-center font-semibold text-green-600 dark:text-green-400">
                      ${course.revenue.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 📊 Gráficas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            {/* Estudiantes por curso */}
            <div className="h-72 bg-[var(--color-surface)] p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-3">Estudiantes por curso</h2>
              <ResponsiveContainer width="100%" height="90%">
                <BarChart data={analytics}>
                  <XAxis dataKey="title" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="students" fill="var(--color-primary)" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Progreso promedio */}
            <div className="h-72 bg-[var(--color-surface)] p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-3">Progreso promedio</h2>
              <ResponsiveContainer width="100%" height="90%">
                <LineChart data={analytics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="title" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="avgProgress" stroke="var(--color-accent)" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Distribución de ingresos */}
            <div className="h-90 md:col-span-2 bg-[var(--color-surface)] p-8 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-3 text-center">Distribución de ingresos</h2>
              <ResponsiveContainer width="100%" height="95%">
                <PieChart>
                  <Pie
                    data={analytics}
                    dataKey="revenue"
                    className="mb-6 mt-4"
                    nameKey="title"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="var(--color-primary)"
                    label
                  >
                    {analytics.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </main>
  );
}