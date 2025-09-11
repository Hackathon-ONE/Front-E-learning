"use client";

import { useState } from "react";
import { paymentsDashboard } from "@/data/paymentsData";

export default function PaymentsPage() {
  const [payments] = useState(paymentsDashboard);

  return (
    <div 
      className="min-h-screen p-3 sm:p-4 md:p-6"
      style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 text-[var(--color-text)]">
                Gestión de Pagos
              </h1>
              <p className="text-sm sm:text-base text-[var(--color-muted)]">
                Revisa el historial de pagos y facturación.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <button aria-label="Exportar" className="px-4 py-2.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-lg text-sm font-medium transition-colors">
                Exportar
              </button>
              <button aria-label="Filtrar" className="px-4 py-2.5 border border-[var(--color-muted)] hover:bg-[var(--color-muted)] text-[var(--color-text)] rounded-lg text-sm font-medium transition-colors">
                Filtrar
              </button>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="mb-6 p-4 bg-[var(--color-card-primary)] rounded-xl shadow-sm border border-[var(--color-muted)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="date-from" className="block text-sm text-[var(--color-card-primary-text)] font-medium mb-1">Fecha desde</label>
              <input
                id="date-from"
                name="date-from"
                type="date"
                className="w-full p-2.5 rounded-lg border border-[var(--color-muted)] bg-[var(--color-card-secondary)] text-[var(--color-card-primary-text)] text-sm"
              />
            </div>
            <div>
              <label htmlFor="date-to" className="block text-sm text-[var(--color-card-primary-text)] font-medium mb-1">Fecha hasta</label>
              <input
                id="date-to"
                name="date-to"
                type="date"
                className="w-full p-2.5 rounded-lg border border-[var(--color-muted)] bg-[var(--color-card-secondary)] text-[var(--color-card-primary-text)] text-sm"
              />
            </div>
            <div>
              <label htmlFor="payment-status" className="block text-sm text-[var(--color-card-primary-text)] font-medium mb-1">Estado</label>
              <select id="payment-status" className="w-full p-2.5 rounded-lg border border-[var(--color-muted)] bg-[var(--color-card-secondary)] text-[var(--color-card-primary-text)] text-sm">
                <option value="">Todos los estados</option>
                <option value="completed">Completado</option>
                <option value="pending">Pendiente</option>
                <option value="failed">Fallido</option>
              </select>
            </div>
            <div className="flex items-end">
              <button aria-label="Aplicar filtros" className="w-full p-2.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-lg text-sm font-medium transition-colors">
                Aplicar Filtros
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-[var(--color-card-primary)] rounded-xl p-4 border border-[var(--color-muted)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--color-muted)]">Total Ingresos</p>
                <p className="text-2xl font-bold text-green-500">$12,450</p>
              </div>
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20">
                <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-[var(--color-card-primary)] rounded-xl p-4 border border-[var(--color-muted)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--color-muted)]">Pagos Hoy</p>
                <p className="text-2xl font-bold text-blue-500">23</p>
              </div>
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-[var(--color-card-primary)] rounded-xl p-4 border border-[var(--color-muted)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--color-muted)]">Pendientes</p>
                <p className="text-2xl font-bold text-yellow-500">5</p>
              </div>
              <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/20">
                <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-[var(--color-card-primary)] rounded-xl p-4 border border-[var(--color-muted)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--color-muted)]">Fallidos</p>
                <p className="text-2xl font-bold text-red-500">2</p>
              </div>
              <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/20">
                <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-[var(--color-card-primary)] rounded-xl shadow-sm border border-[var(--color-muted)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-[var(--color-muted)]">
              <thead className="bg-[var(--color-surface)]">
                <tr>
                  <th className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider">ID</th>
                  <th className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider">Fecha</th>
                  <th className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider">Monto</th>
                  <th className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider hidden sm:table-cell">Método</th>
                  <th className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider">Estado</th>
                  <th className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-[var(--color-card-primary)] divide-y divide-[var(--color-muted)]">
                {payments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="hover:bg-[var(--color-card-secondary)] transition-colors"
                  >
                    <td className="px-2 sm:px-4 py-3 whitespace-nowrap text-xs sm:text-sm text-[var(--color-muted)]">
                      #{payment.id}
                    </td>
                    <td className="px-2 sm:px-4 py-3 whitespace-nowrap text-xs sm:text-sm text-[var(--color-muted)]">
                      {payment.date}
                    </td>
                    <td className="px-2 sm:px-4 py-3 whitespace-nowrap text-xs sm:text-sm font-medium text-[var(--color-card-primary-text)]">
                      ${payment.amount.toFixed(2)}
                    </td>
                    <td className="px-2 sm:px-4 py-3 whitespace-nowrap text-xs sm:text-sm text-[var(--color-muted)] hidden sm:table-cell">
                      {payment.method}
                    </td>
                    <td className="px-2 sm:px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        payment.status === "Completado"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                          : payment.status === "Pendiente"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                      }`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-2 sm:px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                      <button aria-label="Ver detalles" className="text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] text-xs sm:text-sm">
                        Ver detalles
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginación */}
          <div className="bg-[var(--color-surface)] px-4 py-3 flex items-center justify-between border-t border-[var(--color-muted)] sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button aria-label="Anterior" className="relative inline-flex items-center px-4 py-2 border border-[var(--color-muted)] text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Anterior
              </button>
              <button aria-label="Siguiente" className="ml-3 relative inline-flex items-center px-4 py-2 border border-[var(--color-muted)] text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Siguiente
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-400">
                  Mostrando <span className="font-medium">1</span> a <span className="font-medium">10</span> de{' '}
                  <span className="font-medium">{payments.length}</span> resultados
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button aria-label="Anterior" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-[var(--color-muted)] bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Anterior</span>
                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button aria-label="Página 1" className="z-10 bg-[var(--color-primary)] border-[var(--color-primary)] text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    1
                  </button>
                  <button aria-label="Página 2" className="bg-white border-[var(--color-muted)] text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    2
                  </button>
                  <button aria-label="Página 3" className="bg-white border-[var(--color-muted)] text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    3
                  </button>
                  <button aria-label="Siguiente" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-[var(--color-muted)] bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Siguiente</span>
                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}