"use client";

import Button from "./ui/Button";
/* import Link from "daisyui/components/link"; */
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full h-[100vh] flex items-center justify-center text-center text-primary-text overflow-hidden">
      {/* Video de fondo */}
      <video
        className="absolute top-0 left-0 w-full h-full opacity-50 object-cover"
        src="/video/educacionenlinea.mp4"
        autoPlay
        loop
        muted
        playsInline
        poster="/video/educacionenlinea.jpg"
      />

      {/* Overlay para contraste */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Contenido */}
      <div className="relative z-10 px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-white">
          Aprende. <span className="text-primary">Enseña</span>. Crece.
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-white">
          La plataforma donde estudiantes, instructores y administradores se
          encuentran para construir el futuro de la educación.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/courses">
            <Button variant="primary" size="lg">
              Explorar cursos
            </Button>
          </Link>
          <Link href="/instructor/apply">
            <Button variant="outline" size="lg">
              Quiero ser instructor
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}