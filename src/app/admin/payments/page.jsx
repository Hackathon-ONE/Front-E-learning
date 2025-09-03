"use client";

import { useState } from "react";
import { paymentsDashboard } from "@/data/paymentsData";

export default function PaymentsPage() {
  const [payments] = useState(paymentsDashboard);

  return (
    <div className="p-6 bg-[var(--color-bg)] text-[var(--color-text)] min-h-screen transition-colors">
      {/* Encabezado */}
      <h1 className="text-2xl font-bold mb-2">Gestión de Pagos</h1>
      <p className="text-[var(--color-muted)] mb-6">
        Revisa el historial de pagos y facturación.
      </p>

      {/* Tabla */}
      <div className="overflow-x-auto rounded-xl shadow-md">
        <table className="w-full border border-[var(--color-accent)] rounded-xl overflow-hidden">
          <thead
            className="bg-[var(--color-surface)] text-[var(--color-text)] uppercase text-sm"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Fecha</th>
              <th className="px-4 py-3 text-left">Monto</th>
              <th className="px-4 py-3 text-left">Método</th>
              <th className="px-4 py-3 text-left">Estado</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr
                key={payment.id}
                className="border-t border-[var(--color-accent)] hover:bg-[var(--color-card-secondary)] transition-colors"
              >
                <td className="px-4 py-3 text-gray-500">{payment.id}</td>
                <td className="px-4 py-3 text-gray-500">{payment.date}</td>
                <td className="px-4 py-3 text-gray-500">
                  ${payment.amount.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-gray-500">{payment.method}</td>
                <td
                  className={`px-4 py-3 font-semibold`}
                  style={{
                    color:
                      payment.status === "Completado"
                        ? "green"
                        : payment.status === "Pendiente"
                        ? "orange"
                        : "red",
                  }}
                >
                  {payment.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}