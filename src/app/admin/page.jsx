"use client";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import Link from "next/link";
/* import { useAdminInstructors } from "@/hooks/useAdminInstructors";
import { useAdminDashboard } from "@/hooks/useAdminDashboard"; */

export default function AdminPage() {
  /* const {
    instructors,
    filter,
    setFilter,
    approveInstructor,
    rejectInstructor,
  } = useAdminInstructors();

  const { metrics, lineData, barData, pieData } = useAdminDashboard(); */
  // Datos de ejemplo
  const lineData = [
    { name: "Ene", usuarios: 400, ventas: 240 },
    { name: "Feb", usuarios: 300, ventas: 139 },
    { name: "Mar", usuarios: 200, ventas: 980 },
    { name: "Abr", usuarios: 278, ventas: 390 },
    { name: "May", usuarios: 189, ventas: 480 },
  ];

  const pieData = [
    { name: "Activos", value: 65 },
    { name: "Inactivos", value: 20 },
    { name: "Pendientes", value: 15 },
  ];

  const barData = [
    { name: "React Avanzado", estudiantes: 320 },
    { name: "Node.js desde Cero", estudiantes: 280 },
    { name: "NestJS Avanzado", estudiantes: 150 },
    { name: "Diseño UX/UI", estudiantes: 200 },
  ];

  const instructorRequests = [
    { id: 1, nombre: "Ana Gómez", experiencia: "3 años en React", estado: "Pendiente" },
    { id: 2, nombre: "Luis Pérez", experiencia: "5 años en Node.js", estado: "Pendiente" },
    { id: 3, nombre: "Carlos Ruiz", experiencia: "2 años en UX/UI", estado: "Revisión" },
  ];

  const COLORS = ["#6366F1", "#F59E0B", "#EF4444"];

  return (
    <div
      className="p-6 space-y-8 min-h-screen"
      style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}
    >
      <p className="mb-6 justify-center items-center text-center text-xl text-[var(--color-muted)]">
        Bienvenido al panel de control. Aquí tienes una visión general del estado de la plataforma.
      </p>

      {/* Tarjetas estadísticas */}
      <div className="grid gap-6 md:grid-cols-4">
        <div className="bg-[var(--color-card-primary)] shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold text-[var(--color-card-primary-text)]">Usuarios</h2>
          <p className="text-3xl font-bold text-indigo-500">1,245</p>
          <p className="text-[var(--color-muted)]">+12% este mes</p>
        </div>

        <div className="bg-[var(--color-card-primary)] shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold text-[var(--color-card-primary-text)]">Ventas</h2>
          <p className="text-3xl font-bold text-green-500">$8,460</p>
          <p className="text-[var(--color-muted)]">+8% respecto al mes anterior</p>
        </div>

        <div className="bg-[var(--color-card-primary)] shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold text-[var(--color-card-primary-text)]">Tickets Soporte</h2>
          <p className="text-3xl font-bold text-red-500">34</p>
          <p className="text-[var(--color-muted)]">-5% cerrados más rápido</p>
        </div>

        {/* Nuevo card de cursos */}
        <div className="bg-[var(--color-card-primary)] shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold text-[var(--color-card-primary-text)]">Cursos Publicados</h2>
          <p className="text-3xl font-bold text-orange-500">58</p>
          <p className="text-[var(--color-muted)]">+3 nuevos esta semana</p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Gráfico de línea */}
        <div className="bg-[var(--color-card-secondary)] shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Crecimiento de Usuarios y Ventas</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-muted)" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="usuarios" stroke="#6366F1" strokeWidth={3} />
              <Line type="monotone" dataKey="ventas" stroke="#10B981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de pastel */}
        <div className="bg-[var(--color-card-secondary)] shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Estado de Usuarios</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gráfico de barras */}
      <div className="bg-[var(--color-card-secondary)] shadow rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Cursos más populares</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-muted)" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="estudiantes" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tabla de solicitudes de instructores */}
      <div className="bg-[var(--color-card-secondary)] shadow rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Solicitudes recientes de Instructores</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead style={{ backgroundColor: "var(--color-surface)" }}>
              <tr>
                <th className="p-3 text-left">Nombre</th>
                <th className="p-3 text-left">Experiencia</th>
                <th className="p-3 text-left">Estado</th>
                <th className="p-3 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {instructorRequests.map((req) => (
                <tr
                  key={req.id}
                  className="border-t hover:bg-[var(--color-surface)] transition"
                  style={{ borderColor: "var(--color-muted)" }}
                >
                  <td className="p-3">{req.nombre}</td>
                  <td className="p-3">{req.experiencia}</td>
                  <td className="p-3">{req.estado}</td>
                  <td className="p-3">
                    <Link
                      href={`/admin/instructors/${req.id}`}
                      className="px-3 py-1.5 rounded-lg text-sm font-medium"
                      style={{
                        backgroundColor: "var(--color-primary)",
                        color: "var(--color-primary-text)",
                      }}
                    >
                      Ver solicitud
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}