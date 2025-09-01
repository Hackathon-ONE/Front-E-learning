"use client";

import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";

export default function InstructorApplyConfirmationPage() {
  return (
    <main
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        backgroundColor: "var(--color-bg)",
        color: "var(--color-text)",
      }}
    >
      <section className="w-full max-w-lg bg-[var(--color-surface)] rounded-2xl shadow-lg p-8 text-center">
        {/* Icono principal */}
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />

        {/* Título */}
        <h1 className="text-2xl md:text-3xl font-bold mb-4">
          ¡Solicitud enviada con éxito!
        </h1>

        {/* Texto */}
        <p className="text-sm md:text-base text-[var(--color-muted)] mb-8">
          Hemos recibido tu aplicación para convertirte en instructor.  
          Nuestro equipo revisará tu experiencia y demo, y recibirás un correo con la decisión.  
          Gracias por tu interés en formar parte de nuestra comunidad educativa.
        </p>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/">
            <button className="w-full sm:w-auto px-6 py-3 rounded-lg btn-primary font-semibold flex items-center justify-center gap-2">
              Ir al inicio <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
          <Link href="/courses">
            <button className="w-full sm:w-auto px-6 py-3 rounded-lg border border-[var(--color-muted)] bg-[var(--color-card-secondary)] hover:bg-[var(--color-card-primary)] transition font-semibold">
              Explorar cursos
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}