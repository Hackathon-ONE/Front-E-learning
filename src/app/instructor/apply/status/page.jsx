"use client";

import { useState } from "react";
import { Clock, CheckCircle, XCircle, HelpCircle } from "lucide-react";
import { useInstructorStatus } from "@/hooks/useInstructorStatus";

export default function InstructorApplyStatusPage({ params }) {
  const userId = params.id; // o desde session
  // const { status, loading, error } = useInstructorStatus(userId);
  // 🔹 Estados disponibles de prueba
  const statuses = ["pending", "approved", "rejected", "unknown"];

  // 🔹 Estado actual (puedes cambiar manualmente o con el selector)
  const [status, setStatus] = useState("pending");

  const statusInfo = {
    pending: {
      icon: <Clock className="w-12 h-12 text-yellow-500 mx-auto mb-4" />,
      title: "Tu solicitud está en revisión",
      message:
        "Nuestro equipo está evaluando tu experiencia y la demo enviada. Te notificaremos por correo cuando tengamos una respuesta.",
    },
    approved: {
      icon: <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />,
      title: "¡Felicidades, eres instructor!",
      message:
        "Tu aplicación ha sido aprobada. Ya puedes crear y publicar cursos en nuestra plataforma.",
    },
    rejected: {
      icon: <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />,
      title: "Solicitud rechazada",
      message:
        "Tu aplicación no cumple con los requisitos en este momento. Puedes volver a intentarlo más adelante.",
    },
    unknown: {
      icon: <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />,
      title: "Estado desconocido",
      message:
        "No hemos encontrado ninguna solicitud registrada. Verifica si ya enviaste tu aplicación.",
    },
  };

  const { icon, title, message } = statusInfo[status] || statusInfo.unknown;
  /* if (loading) return <p>Cargando estado...</p>;
  if (error) return <p className="text-red-500">{error}</p>; */

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center gap-8 p-6"
      style={{
        backgroundColor: "var(--color-bg)",
        color: "var(--color-text)",
      }}
    >
      {/* Selector de estado para pruebas */}
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium">Simular estado:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="p-2 border rounded-md bg-[var(--color-card-primary)] text-[var(--color-card-primary-text)]"
        >
          {statuses.map((s) => (
            <option
              key={s}
              value={s}
              className="hover:bg-[#c9ce89ff] cursor-pointer"
            >
              {s}
            </option>
          ))}
        </select>
      </div>

      <section className="w-full max-w-lg bg-[var(--color-surface)] rounded-2xl shadow-lg p-8 text-center">
        {/* Icono dinámico según estado */}
        {icon}

        {/* Título */}
        <h1 className="text-2xl md:text-3xl font-bold mb-4">{title}</h1>

        {/* Mensaje */}
        <p className="text-sm md:text-base text-[var(--color-muted)] mb-6">
          {message}
        </p>

        {/* CTA según estado */}
        {status === "approved" && (
          <a
            href="/instructor/dashboard"
            className="w-full px-6 py-3 rounded-lg btn-primary font-semibold inline-block"
          >
            Ir a mi dashboard
          </a>
        )}

        {status === "rejected" && (
          <a
            href="/instructor/apply"
            className="w-full px-6 py-3 rounded-lg btn-primary font-semibold inline-block"
          >
            Volver a aplicar
          </a>
        )}
        {/* <p>
        {status === "pending" && "En revisión..."}
        {status === "approved" && "¡Felicidades, eres instructor!"}
        {status === "rejected" && "Lo sentimos, fue rechazada."}
        {status === "unknown" && "No encontramos tu solicitud."}
      </p> */}
      </section>
    </main>
  );
}