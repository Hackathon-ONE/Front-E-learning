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
} from "recharts";

export default function AdminPage() {
  // Datos de ejemplo (puedes traerlos desde tu API después)
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

  const COLORS = ["#6366F1", "#F59E0B", "#EF4444"];

  return (
    <div className="p-6 space-y-8">
      {/* <h1 className="text-3xl font-bold mb-2">Dashboard</h1> */}
      <p className="text-gray-400 mb-6 justify-center items-center text-center text-xl">
        Bienvenido al panel de control. Aquí tienes una visión general del estado
        de la plataforma.
      </p>

      {/* Tarjetas estadísticas */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
          <h2 className="text-lg text-gray-900 dark:text-gray-100 font-semibold">Usuarios</h2>
          <p className="text-3xl font-bold text-indigo-500">1,245</p>
          <p className="text-gray-400">+12% este mes</p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
          <h2 className="text-lg text-gray-900 dark:text-gray-100 font-semibold">Ventas</h2>
          <p className="text-3xl font-bold text-green-500">$8,460</p>
          <p className="text-gray-400">+8% respecto al mes anterior</p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
          <h2 className="text-lg text-gray-900 dark:text-gray-100 font-semibold">Tickets Soporte</h2>
          <p className="text-3xl font-bold text-red-500">34</p>
          <p className="text-gray-400">-5% cerrados más rápido</p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Gráfico de línea */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Crecimiento de Usuarios y Ventas</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="usuarios" stroke="#6366F1" strokeWidth={3} />
              <Line type="monotone" dataKey="ventas" stroke="#10B981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de pastel */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Estado de Usuarios</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
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
    </div>
  );
}