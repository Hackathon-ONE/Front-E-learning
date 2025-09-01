"use client";

import { X } from "lucide-react";

export default function Modal({ isOpen, title, content, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div
        className="w-full max-w-md bg-[var(--color-surface)] rounded-2xl shadow-lg p-6 relative"
        style={{
          color: "var(--color-text)",
        }}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--color-muted)] hover:text-[var(--color-accent)]"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Título */}
        {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}

        {/* Contenido dinámico */}
        <div className="text-sm">{content}</div>

        {/* CTA */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg btn-primary"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}