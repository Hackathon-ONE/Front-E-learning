"use client";

import { useState } from "react";
import { Mail, MessageSquare, Phone, HelpCircle } from "lucide-react";
import Link from "next/link";

export default function HelpSupportPage() {

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center p-8 text-center p-6 md:p-12"
      style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}
    >
      {/* Header */}
      <section className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Centro de Ayuda & Soporte
        </h1>
        <p className="text-sm md:text-base text-[var(--color-text)]">
          Encuentra respuestas a tus preguntas o ponte en contacto con nuestro
          equipo de soporte.
        </p>
      </section>

      {/* Cards de contacto */}
      <section className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto mb-12">
        <div className="bg-[var(--color-card-primary)] p-6 rounded-xl shadow hover:shadow-lg transition">
          <Mail className="w-8 h-8 mb-3 text-[var(--color-primary)]" />
          <h2 className="font-semibold text-[var(--color-text)] mb-2">Email</h2>
          <p className="text-sm text-[var(--color-text)] mb-4">
            Escríbenos un correo y te responderemos lo antes posible.
          </p>
          <a
            href="mailto:soporte@elearning.com"
            className="btn-primary px-4 py-2 rounded-lg text-sm font-medium inline-block"
          >
            Enviar correo
          </a>
        </div>

        <div className="bg-[var(--color-card-primary)] p-6 rounded-xl shadow hover:shadow-lg transition">
          <MessageSquare className="w-8 h-8 mb-3 text-[var(--color-primary)]" />
          <h2 className="font-semibold text-[var(--color-text)] mb-2">Chat en vivo</h2>
          <p className="text-sm text-[var(--color-text)] mb-4">
            Habla con un agente en tiempo real para resolver tus dudas.
          </p>
          <Link href="/help/support/chat">
            <button className="btn-primary px-4 py-2 rounded-lg text-sm font-medium">
              Iniciar chat
            </button>
          </Link>
        </div>

        <div className="bg-[var(--color-card-primary)] p-6 rounded-xl shadow hover:shadow-lg transition">
          <Phone className="w-8 h-8 mb-3 text-[var(--color-primary)]" />
          <h2 className="font-semibold text-[var(--color-text)] mb-2">Teléfono</h2>
          <p className="text-sm text-[var(--color-text)] mb-4">
            Llama a nuestro centro de atención de lunes a viernes.
          </p>
          <a
            href="tel:+123456789"
            className="btn-primary px-4 py-2 rounded-lg text-sm font-medium inline-block"
          >
            Llamar
          </a>
        </div>
      </section>

      {/* Botones principales */}
      <div className="grid gap-6 md:grid-cols-2 w-full max-w-3xl">
        {/* FAQ */}
        <Link href="/help/faq">
          <div className="cursor-pointer bg-[var(--color-card-primary)] p-8 rounded-2xl shadow hover:shadow-lg transition text-center">
            <HelpCircle className="w-10 h-10 mb-4 mx-auto text-[var(--color-primary)]" />
            <h2 className="text-xl font-semibold text-[var(--color-text)] mb-2">Preguntas frecuentes</h2>
            <p className="text-sm text-[var(--color-text)]">
              Explora respuestas rápidas a las dudas más comunes.
            </p>
          </div>
        </Link>

        {/* Contacto */}
        <Link href="/help/contact">
          <div className="cursor-pointer bg-[var(--color-card-primary)] p-8 rounded-2xl shadow hover:shadow-lg transition text-center">
            <MessageSquare className="w-10 h-10 mb-4 mx-auto text-[var(--color-primary)]" />
            <h2 className="text-xl font-semibold text-[var(--color-text)] mb-2">Contacto directo</h2>
            <p className="text-sm text-[var(--color-text)]">
              Escríbenos y nuestro equipo de soporte te ayudará personalmente.
            </p>
          </div>
        </Link>
      </div>
    </main>
  );
}
