"use client";

import { useState } from "react";
import { paymentsDashboard } from "@/data/paymentsData";

export default function PaymentsPage() {
  const [payments] = useState(paymentsDashboard);

  return (
    <div className="p-3 sm:p-4 md:p-6 bg-[var(--color-bg)] text-[var(--color-text)] min-h-screen transition-colors">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Gestión de Pagos</h1>
        <p className="text-sm sm:text-base text-[var(--color-muted)]">
          Revisa el historial de pagos y facturación.
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg sm:rounded-xl shadow-sm sm:shadow-md">
        <table className="w-full border border-[var(--color-accent)] rounded-lg sm:rounded-xl overflow-hidden">
          <thead
            className="bg-[var(--color-surface)] text-[var(--color-text)] uppercase text-xs sm:text-sm"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <tr>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left">ID</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left">Fecha</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left">Monto</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left hidden sm:table-cell">Método</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left">Estado</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr
                key={payment.id}
                className="border-t border-[var(--color-accent)] hover:bg-[var(--color-card-secondary)] transition-colors"
              >
                <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-500">{payment.id}</td>
                <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-500">{payment.date}</td>
                <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-500">
                  ${payment.amount.toFixed(2)}
                </td>
                <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-500 hidden sm:table-cell">
                  {payment.method}
                </td>
                <td
                  className={`px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold`}
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