"use client";

import { useState } from "react";
import { CheckCircle, Clock, XCircle } from "lucide-react";

export default function AdminInstructorsPage() {
  const [instructors, setInstructors] = useState([
    {
      id: 1,
      name: "Ana Gómez",
      email: "ana@example.com",
      experience: "5 años enseñando React y Node.js",
      demoLink: "https://youtube.com/demo1",
      status: "pending",
    },
    {
      id: 2,
      name: "Luis Pérez",
      email: "luis@example.com",
      experience: "Instructor en universidades, experto en NestJS",
      demoLink: "https://youtube.com/demo2",
      status: "approved",
    },
    {
      id: 3,
      name: "María Rodríguez",
      email: "maria@example.com",
      experience: "Diseñadora UX/UI freelance",
      demoLink: "https://youtube.com/demo3",
      status: "rejected",
    },
  ]);

  const [modalData, setModalData] = useState(null);

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return (
          <span className="flex items-center gap-1 text-green-600 font-medium">
            <CheckCircle className="w-4 h-4" /> Aprobado
          </span>
        );
      case "pending":
        return (
          <span className="flex items-center gap-1 text-yellow-600 font-medium">
            <Clock className="w-4 h-4" /> Pendiente
          </span>
        );
      case "rejected":
        return (
          <span className="flex items-center gap-1 text-red-600 font-medium">
            <XCircle className="w-4 h-4" /> Rechazado
          </span>
        );
      default:
        return "Desconocido";
    }
  };

  const handleAction = (id, action) => {
    setInstructors((prev) =>
      prev.map((inst) =>
        inst.id === id ? { ...inst, status: action } : inst
      )
    );
    setModalData(null); // Cierra modal
  };

  return (
    <main
      className="min-h-screen p-6 md:p-10"
      style={{
        backgroundColor: "var(--color-bg)",
        color: "var(--color-text)",
      }}
    >
      <section className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2">
          Gestión de Instructores
        </h1>

        {/* Tabla */}
        <div className="overflow-x-auto bg-[var(--color-surface)] rounded-xl shadow-lg border border-[var(--color-muted)]">
          <table className="w-full border-collapse text-sm md:text-base">
            <thead className="bg-[var(--color-card-secondary)]">
              <tr>
                <th className="p-4 text-left text-gray-500">Nombre</th>
                <th className="p-4 text-left text-gray-500">Email</th>
                <th className="p-4 text-left text-gray-500">Experiencia</th>
                <th className="p-4 text-left text-gray-500">Demo</th>
                <th className="p-4 text-left text-gray-500">Estado</th>
                <th className="p-4 text-left text-gray-500">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {instructors.map((inst) => (
                <tr
                  key={inst.id}
                  className="border-t border-[var(--color-muted)] hover:bg-[var(--color-card-primary)] transition"
                >
                  <td className="p-4 font-semibold text-gray-500">{inst.name}</td>
                  <td className="p-4 text-gray-500">{inst.email}</td>
                  <td className="p-4 text-gray-500">{inst.experience}</td>
                  <td className="p-4">
                    <a
                      href={inst.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition"
                    >
                      Ver demo
                    </a>
                  </td>
                  <td className="p-4">{getStatusBadge(inst.status)}</td>
                  <td className="p-4 flex flex-col sm:flex-row gap-2">
                    {inst.status === "pending" && (
                      <>
                        <button
                          className="px-4 py-2 rounded-lg btn-primary text-sm"
                          onClick={() =>
                            setModalData({
                              instructor: inst,
                              action: "approved",
                              message: `¿Aprobar a ${inst.name} como instructor?`,
                            })
                          }
                        >
                          Aprobar
                        </button>
                        <button
                          className="px-4 py-2 rounded-lg text-sm bg-red-500 text-white hover:bg-red-600 transition"
                          onClick={() =>
                            setModalData({
                              instructor: inst,
                              action: "rejected",
                              message: `¿Rechazar la solicitud de ${inst.name}?`,
                            })
                          }
                        >
                          Rechazar
                        </button>
                      </>
                    )}
                    {inst.status === "approved" && (
                      <button
                        className="px-4 py-2 rounded-lg text-sm bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
                        onClick={() =>
                          setModalData({
                            instructor: inst,
                            action: "rejected",
                            message: `¿Revocar acceso a ${inst.name}?`,
                          })
                        }
                      >
                        Revocar acceso
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Modal */}
      {modalData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div
            className="bg-[var(--color-card-primary)] text-[var(--color-card-primary-text)] p-6 rounded-xl shadow-xl max-w-md w-full mx-4"
          >
            <h2 className="text-lg font-bold mb-4">Confirmación</h2>
            <p className="mb-6">{modalData.message}</p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 rounded-lg text-sm bg-gray-300 hover:bg-gray-400"
                onClick={() => setModalData(null)}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 rounded-lg text-sm btn-primary"
                onClick={() =>
                  handleAction(modalData.instructor.id, modalData.action)
                }
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