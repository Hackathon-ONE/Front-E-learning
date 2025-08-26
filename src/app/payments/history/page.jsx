"use client";
import { useState /*, useEffect */ } from "react";
import { CheckCircle, XCircle } from "lucide-react";

// Ejemplo de cómo importar datos desde la base de datos (Java/Spring Boot):
/*
import { useEffect, useState } from "react";
const [payments, setPayments] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  async function fetchPayments() {
    try {
      setLoading(true);
      setError(null);
      // Cambia la URL por tu endpoint real de Spring Boot
      const res = await fetch("http://localhost:8080/api/payments/history");
      if (!res.ok) throw new Error("Error al obtener historial de pagos");
      const data = await res.json();
      setPayments(data);
    } catch (err) {
      setError("No se pudo cargar el historial.");
    } finally {
      setLoading(false);
    }
  }
  fetchPayments();
}, []);

// Puedes mostrar loading y error así:
// if (loading) return <div className="text-center py-10">Cargando historial...</div>;
// if (error) return <div className="text-center text-red-500 py-10">{error}</div>;
*/

export default function PaymentsHistoryPage() {
  // Datos hardcodeados para demo
  const [payments] = useState([
    {
      id: 1,
      course: "React Avanzado",
      date: "2024-06-10",
      amount: 49.99,
      currency: "USD",
      status: "success",
    },
    {
      id: 2,
      course: "Diseño UI/UX",
      date: "2024-05-22",
      amount: 39.99,
      currency: "USD",
      status: "success",
    },
    {
      id: 3,
      course: "Bases de Datos SQL",
      date: "2024-05-10",
      amount: 29.99,
      currency: "USD",
      status: "failed",
    },
  ]);

  return (
    <main className="min-h-screen bg-[var(--color-bg)] flex flex-col items-center py-8 px-2 sm:px-4">
      <section className="w-full max-w-3xl bg-[var(--color-surface)] rounded-2xl shadow-xl p-4 sm:p-8 flex flex-col gap-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-primary)] text-center mb-2">
          Historial de Pagos
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <th className="px-3 py-2 text-left text-[var(--color-muted)]">Curso</th>
                <th className="px-3 py-2 text-left text-[var(--color-muted)]">Fecha</th>
                <th className="px-3 py-2 text-left text-[var(--color-muted)]">Monto</th>
                <th className="px-3 py-2 text-left text-[var(--color-muted)]">Estado</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} className="border-b border-gray-100">
                  <td className="px-3 py-2 font-semibold text-[var(--color-text)]">{p.course}</td>
                  <td className="px-3 py-2">{p.date}</td>
                  <td className="px-3 py-2">
                    {p.currency} ${p.amount}
                  </td>
                  <td className="px-3 py-2">
                    {p.status === "success" ? (
                      <span className="flex items-center gap-1 text-green-600 font-semibold">
                        <CheckCircle size={16} /> Pagado
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-red-600 font-semibold">
                        <XCircle size={16} /> Fallido
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
