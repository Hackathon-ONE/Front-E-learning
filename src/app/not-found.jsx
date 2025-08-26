"use client";

import Link from "next/link";
import { BookOpen, Home, AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-bg)] px-4 py-10">
      <div className="max-w-lg w-full bg-[var(--color-surface)] rounded-2xl shadow-2xl flex flex-col items-center p-8 gap-6">
        <div className="flex flex-col items-center gap-2">
          <span className="bg-[var(--color-primary)] rounded-full p-4 shadow-lg mb-2">
            <AlertTriangle size={48} className="text-white" />
          </span>
          <h1 className="text-5xl font-bold text-[var(--color-primary)] mb-2">404</h1>
          <h2 className="text-2xl font-bold text-[var(--color-text)] text-center">¡Ups! Página no encontrada</h2>
        </div>
        <p className="text-[var(--color-muted)] text-center text-lg">
          No pudimos encontrar la página que buscas.<br />
          Quizás el enlace está roto o fue removido.<br />
          Pero no te preocupes, ¡puedes seguir aprendiendo!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-2">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 btn-primary py-2 px-6 rounded-lg font-bold text-lg w-full sm:w-auto"
          >
            <Home size={20} /> Ir al inicio
          </Link>
          <Link
            href="/courses"
            className="flex items-center justify-center gap-2 bg-[var(--color-card-primary)] text-[var(--color-primary)] border border-[var(--color-primary)] py-2 px-6 rounded-lg font-bold text-lg w-full sm:w-auto hover:bg-[var(--color-primary)] hover:text-white transition"
          >
            <BookOpen size={20} /> Ver cursos
          </Link>
        </div>
        <div className="w-full flex flex-col items-center mt-6">
          <svg width="120" height="60" viewBox="0 0 120 60" fill="none" className="mb-2">
            <ellipse cx="60" cy="50" rx="50" ry="8" fill="#ff540033" />
            <circle cx="40" cy="30" r="10" fill="#ff5400" opacity="0.7" />
            <circle cx="80" cy="35" r="7" fill="#ff5400" opacity="0.4" />
            <rect x="55" y="20" width="10" height="20" rx="5" fill="#ff5400" opacity="0.2" />
          </svg>
          <span className="text-xs text-[var(--color-muted)] text-center">
            E-Learning Platform · Siempre aprendiendo, nunca perdido.
          </span>
        </div>
      </div>
    </main>
  );
}
