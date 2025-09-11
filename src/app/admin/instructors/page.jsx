'use client';

import { useState } from 'react';
import { CheckCircle, Clock, XCircle } from 'lucide-react';
import { instructorsDashboard } from '@/data/instructors';

export default function AdminInstructorsPage() {
  const [instructors, setInstructors] = useState(instructorsDashboard);
  const [modalData, setModalData] = useState(null);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return (
          <span className="flex items-center gap-1 text-green-600 font-medium text-xs sm:text-sm">
            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" /> <span className="hidden xs:inline">Aprobado</span>
          </span>
        );
      case 'pending':
        return (
          <span className="flex items-center gap-1 text-yellow-600 font-medium text-xs sm:text-sm">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4" /> <span className="hidden xs:inline">Pendiente</span>
          </span>
        );
      case 'rejected':
        return (
          <span className="flex items-center gap-1 text-red-600 font-medium text-xs sm:text-sm">
            <XCircle className="w-3 h-3 sm:w-4 sm:h-4" /> <span className="hidden xs:inline">Rechazado</span>
          </span>
        );
      default:
        return <span className="text-xs sm:text-sm">Desconocido</span>;
    }
  };

  const handleAction = (id, action) => {
    setInstructors((prev) =>
      prev.map((inst) => (inst.id === id ? { ...inst, status: action } : inst))
    );
    setModalData(null); // Cierra modal
  };

  return (
    <main
      className="min-h-screen p-2 sm:p-4 md:p-6 lg:p-8 w-full"
      style={{
        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-text)',
      }}
    >
      <section className="w-full max-w-full mx-auto">
        {/* Header */}
        <div className="mb-4 sm:mb-6 px-2 sm:px-0">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">
            Gestión de Instructores
          </h1>
          <p className="text-sm text-[var(--color-muted)]">
            Administra las solicitudes de los instructores
          </p>
        </div>

        {/* Table */}
        <div className="bg-[var(--color-card-primary)] rounded-lg sm:rounded-xl shadow-sm sm:shadow-md border border-[var(--color-muted)] overflow-x-auto">
          <div className="min-w-[600px] md:min-w-0">
            <table className="w-full border-collapse text-xs sm:text-sm">
              <thead className="bg-[var(--color-surface)]">
                <tr>
                  <th className="px-2 sm:px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="px-2 sm:px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden sm:table-cell">
                    Email
                  </th>
                  <th className="px-2 sm:px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden md:table-cell">
                    Experiencia
                  </th>
                  <th className="px-2 sm:px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Demo
                  </th>
                  <th className="px-2 sm:px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-2 sm:px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-[var(--color-card-primary)] divide-y divide-[var(--color-muted)]">
                {instructors.map((inst) => (
                  <tr
                    key={inst.id}
                    className="hover:bg-[var(--color-card-secondary)] transition-colors"
                  >
                    <td className="px-2 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-medium">
                          {inst.name.charAt(0)}
                        </div>
                        <div className="ml-2">
                          <div className="text-xs font-medium text-[var(--color-card-primary-text)] line-clamp-1">
                            {inst.name}
                          </div>
                          <div className="text-xs text-[var(--color-muted)] sm:hidden">
                            {inst.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-3 whitespace-nowrap text-xs text-gray-800 hidden sm:table-cell">
                      <div className="line-clamp-1">{inst.email}</div>
                    </td>
                    <td className="px-2 py-3 whitespace-nowrap text-xs text-gray-800 hidden md:table-cell">
                      <div className="line-clamp-1">{inst.experience}</div>
                    </td>
                    <td className="px-2 py-3 whitespace-nowrap">
                      <a
                        href={inst.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition whitespace-nowrap"
                      >
                        Ver demo
                      </a>
                    </td>
                    <td className="px-2 py-3 whitespace-nowrap">
                      <div className="text-xs">{getStatusBadge(inst.status)}</div>
                    </td>
                    <td className="px-2 py-3 whitespace-nowrap text-right text-xs font-medium">
                      <div className="flex flex-col xs:flex-row gap-1 flex-wrap">
                        {inst.status === 'pending' ? (
                          <>
                            <button
                              type="button"
                              aria-label="Aprobar instructor"
                              className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white transition"
                              onClick={() =>
                                setModalData({
                                  instructor: inst,
                                  action: 'approved',
                                  message: `¿Aprobar a ${inst.name} como instructor?`,
                                })
                              }
                            >
                              Aprobar
                            </button>
                            <button
                              type="button"
                              aria-label="Rechazar instructor"
                              className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                              onClick={() =>
                                setModalData({
                                  instructor: inst,
                                  action: 'rejected',
                                  message: `¿Rechazar la solicitud de ${inst.name}?`,
                                })
                              }
                            >
                              Rechazar
                            </button>
                          </>
                        ) : inst.status === 'approved' ? (
                          <>
                            <button
                              type="button"
                              aria-label="Rechazar instructor"
                              className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
                              onClick={() =>
                                setModalData({
                                  instructor: inst,
                                  action: 'rejected',
                                  message: `¿Rechazar la solicitud de ${inst.name}?`,
                                })
                              }
                            >
                              Rechazar
                            </button>
                            <button
                              type="button"
                              aria-label="Revocar acceso instructor"
                              className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition"
                              onClick={() =>
                                setModalData({
                                  instructor: inst,
                                  action: 'revoked',
                                  message: `¿Revocar acceso a ${inst.name}?`,
                                })
                              }
                            >
                              Revocar acceso
                            </button>
                          </>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Modal */}
      {modalData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
          <div className="bg-[var(--color-card-primary)] text-[var(--color-card-primary-text)] p-4 sm:p-6 rounded-xl shadow-xl w-full max-w-[95vw] sm:max-w-md">
            <h2 className="text-lg font-bold mb-4">Confirmación</h2>
            <p className="mb-6 text-sm">{modalData.message}</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                aria-label="Cancelar"
                className="px-4 py-2 rounded-lg text-sm bg-gray-300 hover:bg-gray-400 transition-colors w-full"
                onClick={() => setModalData(null)}
              >
                Cancelar
              </button>
              <button
                type="button"
                aria-label="Confirmar"
                className="px-4 py-2 rounded-lg text-sm bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white transition-colors w-full"
                onClick={() => handleAction(modalData.instructor.id, modalData.action)}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
