"use client";

import { useState } from "react";

export default function Toast() {
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000); // Desaparece en 3s
  };

  return (
    <div className="relative h-screen flex items-center justify-center bg-gray-100">
      <button
        onClick={() => showToast("¡Acción completada con éxito!")}
        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg shadow-md transition"
      >
        Mostrar Toast
      </button>

      {/* Toast flotante */}
      {toast && (
        <div className="fixed bottom-5 right-5 bg-gray-800 text-white px-4 py-3 rounded-lg shadow-lg animate-fade-in">
          {toast}
        </div>
      )}

      {/* Animación con Tailwind (puedes extender en tailwind.config.js) */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeInOut 3s ease-in-out forwards;
        }
        @keyframes fadeInOut {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          10% {
            opacity: 1;
            transform: translateY(0);
          }
          90% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(20px);
          }
        }
      `}</style>
    </div>
  );
}