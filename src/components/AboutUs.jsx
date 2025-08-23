"use client";

import Link from "next/link";

export default function AboutUsPreview() {
  return (
    <section className="py-20 bg-surface">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Imagen o ilustración */}
        <div className="relative">
          <img
            src="/images/about-preview.jpg"
            alt="Sobre nosotros"
            className="rounded-2xl shadow-lg w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl" />
        </div>

        {/* Contenido */}
        <div className="text-center md:text-left">
          <h2 className="text-4xl font-bold mb-6 text-foreground leading-snug">
            Una comunidad que transforma el{" "}
            <span className="text-primary">aprendizaje</span>
          </h2>
          <p className="text-lg text-muted leading-relaxed mb-8">
            En nuestra plataforma educativa reunimos{" "}
            <span className="font-semibold text-primary">estudiantes</span>,
            <span className="font-semibold text-primary"> instructores</span> y{" "}
            <span className="font-semibold text-primary">mentores</span> que
            creen en un futuro donde aprender es dinámico, accesible y
            colaborativo. 🚀
          </p>

          {/* CTA */}
          <Link
            href="/about"
            variant="primary"
            className="inline-block px-6 py-3 bg-primary text-secondary justify-center items-center rounded-xl shadow-md hover:bg-primary-hover transition"
          >
            Conócenos más
          </Link>
        </div>
      </div>
    </section>
  );
}