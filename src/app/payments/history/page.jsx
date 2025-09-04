"use client";

import { useEffect, useState } from "react";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { paymentsHistory } from "@/data/paymentsData";
/* import { useFetch } from "@/hooks/useFetch"; */

export default function PaymentsHistoryPage() {
  const [payments, setPayments] = useState(paymentsHistory);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
/*   const { data: paymentsData, loading, error } = useFetch("/api/payments/history"); */
/* 
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
 */

// Simulación con mocks
useEffect(() => {
  setLoading(true);
  const timer = setTimeout(() => {
    try {
      setPayments(paymentsHistory);
    } catch {
      setError("No se pudo cargar el historial de pagos.");
    } finally {
      setLoading(false);
    }
  }, 1000);

  return () => clearTimeout(timer);
}, []);

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
