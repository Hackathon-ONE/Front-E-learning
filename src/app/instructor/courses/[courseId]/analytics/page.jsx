"use client";

import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid, PieChart, Pie, Cell, Legend
} from "recharts";
import { instructorAnalytics } from "@/data/instructors";

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        setLoading(true);
        // Llamada real al backend
        // const res = await fetch("http://localhost:3000/api/courses/analytics");
        // if (!res.ok) throw new Error("Error al cargar analíticas");
        // const data = await res.json();

        setAnalytics(instructorAnalytics);
      } catch (err) {
        setError("No se pudieron cargar las analíticas.");
      } finally {
        setLoading(false);
      }
    }
    fetchAnalytics();
  }, []);

  // Colores para gráficas
  const COLORS = ["#ff5400", "#3d3f3e", "#fca311", "#6366F1", "#F59E0B", "#EF4444"];

  // Estilos para modo oscuro
  const chartTextColor = 'var(--color-text)';
  const chartGridColor = 'var(--color-border)';
  const tooltipStyle = {
    backgroundColor: 'hsl(var(--card))',
    color: 'hsl(var(--card-foreground))',
    border: '1px solid hsl(var(--border))',
    borderRadius: '0.5rem',
    padding: '0.5rem 0.75rem',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
  };

  return (
    <main
      className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 rounded-xl shadow space-y-10"
      style={{ backgroundColor: "var(--color-surface)", color: "var(--color-text)" }}
    >
      <h1 className="text-3xl font-bold mb-6 text-center">Analíticas de mis cursos</h1>

      {loading && <p className="text-center">Cargando datos...</p>}
      {error && <p className="text-center text-red-600 dark:text-red-400">{error}</p>}

      {!loading && analytics.length > 0 && (
        <>
          {/* Tabla de detalle */}
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
            <table className="w-full border-collapse">
              <thead style={{ backgroundColor: "var(--color-card-primary)" }}>
                <tr>
                  <th className="p-3 text-left text-sm text-[var(--color-text)] font-semibold">Curso</th>
                  <th className="p-3 text-center text-sm text-[var(--color-text)] font-semibold">Estudiantes</th>
                  <th className="p-3 text-center text-sm text-[var(--color-text)] font-semibold">Progreso promedio</th>
                  <th className="p-3 text-center text-sm text-[var(--color-text)] font-semibold">Ingresos (USD)</th>
                </tr>
              </thead>
              <tbody>
                {analytics.map((course, i) => (
                  <tr
                    key={course.id}
                    className={`text-sm ${
                      i % 2 === 0
                        ? "bg-[var(--color-surface)] hover:bg-[var(--color-card-hover)]"
                        : "bg-[var(--color-card-primary)] hover:bg-[var(--color-card-hover)]"
                    } transition-colors duration-200`}
                  >
                    <td className="p-3 text-[var(--color-text)] font-medium">{course.title}</td>
                    <td className="p-3 text-center text-[var(--color-text)]">{course.students}</td>
                    <td className="p-3 text-center text-[var(--color-text)]">{course.avgProgress}%</td>
                    <td className="p-3 text-center font-semibold text-green-600">
                      ${course.revenue.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Gráficas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            {/* Estudiantes por curso */}
            <div className="h-72 p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-3 text-[var(--color-text)]">Estudiantes por curso</h2>
              <ResponsiveContainer width="100%" height="90%">
                <BarChart data={analytics}>
                  <XAxis dataKey="title" stroke="var(--color-primary)" color="var(--color-primary-text)" strokeDasharray="3 3" />
                  <YAxis stroke="var(--color-primary)" strokeDasharray="3 3"/>
                  <Tooltip 
                    contentStyle={tooltipStyle}
                    itemStyle={{ color: 'hsl(var(--card-foreground))' }}
                    labelStyle={{ color: 'hsl(var(--card-foreground))' }}
                  />
                  <Bar dataKey="students" fill={COLORS[0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Progreso promedio */}
            <div className="h-72 p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-3 text-[var(--color-text)]">Progreso promedio</h2>
              <ResponsiveContainer width="100%" height="90%">
                <LineChart data={analytics} >
                  <CartesianGrid strokeDasharray="3 3" stroke={chartGridColor} />
                  <XAxis 
                    dataKey="title" 
                    stroke={chartGridColor} 
                    tick={{ fill: chartTextColor }}
                    strokeDasharray="3 3" 
                  />
                  <YAxis 
                    stroke={chartGridColor} 
                    tick={{ fill: chartTextColor }}
                    strokeDasharray="3 3"
                  />
                  <Tooltip 
                    contentStyle={tooltipStyle}
                    itemStyle={{ color: 'hsl(var(--card-foreground))' }}
                    labelStyle={{ color: 'hsl(var(--card-foreground))' }}
                  />
                  <Line type="monotone" dataKey="avgProgress" fill="var(--color-primary)" stroke={COLORS[1]} strokeWidth={3} strokeDasharray="3 3" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Distribución de ingresos */}
            <div className="h-90 md:col-span-2 p-8 rounded-lg shadow">
             <h2 className="text-lg font-semibold mb-3 text-[var(--color-text)]">Distribución de ingresos</h2>
              <ResponsiveContainer width="100%" height="95%">
                <PieChart>
                  <Pie  
                    data={analytics}
                    dataKey="revenue"
                    nameKey="title"
                    stroke="var(--color-border)"
                    strokeWidth={1}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    label={({ name, percent }) => (
                      <text 
                        x={0} 
                        y={0} 
                        fill={chartTextColor}
                        textAnchor="middle"
                        dominantBaseline="central"
                        color="hsl(var(--card-foreground))"
                        className="ml-2"
                        style={{ fontSize: '12px' }}
                      >
                        {`${(percent * 100).toFixed(0)}%`}
                      </text>
                    )}
                  >
                    {analytics.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={tooltipStyle}
                    itemStyle={{ color: 'hsl(var(--card-foreground))' }}
                    labelStyle={{ color: 'hsl(var(--card-foreground))' }}
                  />
                  <Legend 
                    align="center" 
                    verticalAlign="bottom" 
                    wrapperStyle={{ padding: 0 }}
                    formatter={(value) => (
                      <span style={{ color: chartTextColor }}>{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </main>
  );
}