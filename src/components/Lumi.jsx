"use client";

import React from "react";

export default function LumiSection() {
  return (
    <section className="w-full bg-surface text-[var(--color-text)] py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Video */}
        <div className="w-full">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <video
              src="https://storage.cloud.google.com/luminamp4/lumi_asistente.mp4"
              controls
              autoPlay
              loop
              muted
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Texto */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4">
            Conoce a Lumi
          </h2>
          <p className="text-base md:text-lg text-[var(--color-text)] mb-6">
            Tu asistente en <span className="font-semibold text-[var(--color-primary)]">Lumina</span>, lista para guiarte
            en cada paso de tu recorrido dentro de la plataforma.
          </p>
          {/* <button className="px-6 py-3 bg-primary hover:bg-primary/60 text-white font-semibold rounded-xl shadow-md transition">
            Empezar con Lumi
          </button> */}
        </div>
      </div>
    </section>
  );
}