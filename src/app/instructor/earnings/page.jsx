"use client";

import { useEffect, useState } from "react";
import { DollarSign, TrendingUp, BookOpen } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function EarningsPage() {
  const [earnings] = useState({
    total: 12500,
    monthly: [
      { month: "Ene", amount: 1200 },
      { month: "Feb", amount: 1800 },
      { month: "Mar", amount: 1500 },
      { month: "Abr", amount: 2000 },
      { month: "May", amount: 2200 },
      { month: "Jun", amount: 2800 },
    ],
    courses: [
      { id: 1, title: "React desde cero", revenue: 5500 },
      { id: 2, title: "Next.js avanzado", revenue: 4500 },
      { id: 3, title: "UI/UX Design", revenue: 2500 },
    ],
    transactions: [
      { id: 1, student: "Ana Gómez", course: "React desde cero", amount: 200, date: "2025-05-01" },
      { id: 2, student: "Luis Pérez", course: "Next.js avanzado", amount: 250, date: "2025-05-05" },
      { id: 3, student: "María López", course: "UI/UX Design", amount: 150, date: "2025-05-10" },
    ],
  });

  useEffect(() => {
    
  }, []);

  const formatter = new Intl.NumberFormat("es-ES"); // 🔹 fijo, siempre igual

  return (
    <main className="min-h-screen bg-[var(--color-bg)] py-8 px-4 sm:px-8">
      <section className="max-w-7xl mx-auto space-y-10">
        {/* Título */}
        <header className="text-center">
          <h1 className="text-3xl font-bold">
            Ganancias del Instructor
          </h1>
          <p className="text-[var(--color-muted)] mt-2">
            Resumen de ingresos y transacciones por tus cursos
          </p>
        </header>

        {/* Cards resumen */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-[var(--color-surface)] rounded-2xl p-6 shadow-lg flex flex-col items-center">
            <DollarSign className="w-10 h-10 text-yellow-500 mb-3" />
            <p className="text-2xl font-bold">${formatter.format(earnings.total)}</p>
            <span className="text-[var(--color-muted)] text-sm">Total Ganado</span>
          </div>

          <div className="bg-[var(--color-surface)] rounded-2xl p-6 shadow-lg flex flex-col items-center">
            <TrendingUp className="w-10 h-10 text-green-500 mb-3" />
            <p className="text-2xl font-bold">
              ${formatter.format(earnings.monthly[earnings.monthly.length - 1].amount)}
            </p>
            <span className="text-[var(--color-muted)] text-sm">Último mes</span>
          </div>

          <div className="bg-[var(--color-surface)] rounded-2xl p-6 shadow-lg flex flex-col items-center">
            <BookOpen className="w-10 h-10 text-indigo-500 mb-3" />
            <p className="text-2xl font-bold">{earnings.courses.length}</p>
            <span className="text-[var(--color-muted)] text-sm">Cursos activos</span>
          </div>
        </div>

        {/* Gráfica de ingresos mensuales */}
        <div className="bg-[var(--color-surface)] rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Ingresos mensuales</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={earnings.monthly}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-muted)" />
                <XAxis dataKey="month" stroke="var(--color-text)" />
                <YAxis stroke="var(--color-text)" />
                <Tooltip />
                <Bar dataKey="amount" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tabla de transacciones */}
        <div className="bg-[var(--color-surface)] rounded-2xl shadow-lg p-6 overflow-x-auto">
          <h2 className="text-xl font-bold mb-4">Transacciones recientes</h2>
          <table className="w-full border-collapse text-sm sm:text-base">
            <thead>
              <tr className="text-left border-b border-gray-300 dark:border-gray-600">
                <th className="py-2 px-3">Estudiante</th>
                <th className="py-2 px-3">Curso</th>
                <th className="py-2 px-3">Monto</th>
                <th className="py-2 px-3">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {earnings.transactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="py-2 px-3 text-gray-500">{tx.student}</td>
                  <td className="py-2 px-3 text-gray-500">{tx.course}</td>
                  <td className="py-2 px-3 font-semibold text-gray-500">${formatter.format(tx.amount)}</td>
                  <td className="py-2 px-3 text-gray-500">{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}