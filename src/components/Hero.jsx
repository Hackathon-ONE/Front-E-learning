"use client";

import { useState } from "react";
import Button from "./ui/Button";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function Hero() {
  const [loading, setLoading] = useState(true);

  return (
    <section className="relative w-full h-[100vh] flex items-center justify-center text-center text-primary-text overflow-hidden">
      {/* Video de fondo */}
      <video
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${
          loading ? "opacity-0" : "opacity-50"
        }`}
        src="/video/demo_inicial.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"                // Pre-carga el video
        poster="/video/demo_poster.jpg" // Imagen estática inicial
        aria-label="Video hero"
        onCanPlayThrough={() => setLoading(false)} // Más rápido que onLoadedData
      />


      {/* Overlay para contraste */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Loader centrado mientras carga */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <Loader2 className="w-16 h-16 text-primary animate-spin" />
        </div>
      )}

      {/* Contenido */}
      {!loading && (
        <div className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 transition-opacity duration-700">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight text-white">
            Aprende. <span className="text-primary">Enseña.</span> Crece.
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-6 sm:mb-8 text-white">
            La plataforma donde estudiantes, instructores y administradores se
            encuentran para construir el futuro de la educación.
          </p>
          <div className="flex flex-col cursor-pointer sm:flex-row justify-center gap-3 sm:gap-4">
            <Link href="/about">
              <Button type="button" aria-label="Conoce Lumina" variant="primary" size="lg">
                Conoce Lumina
              </Button>
            </Link>
            <Link href="/instructor/apply">
              <Button type="button" aria-label="Quiero ser instructor" variant="outline" size="lg">
                Quiero ser instructor
              </Button>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}