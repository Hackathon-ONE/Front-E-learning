"use client";

import Button from "./ui/Button";
import { Rocket } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <section
      className="relative py-24 px-4 md:px-8 lg:px-16 text-center overflow-hidden bg-[var(--color-bg)] text-[var(--color-text)]"
    >
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-6">
        <Rocket className="w-24 h-24 text-primary animate-bounce" />

        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          ¿Listo para comenzar?
        </h2>

        <p className="text-lg md:text-xl mb-8 text-muted max-w-xl">
          Únete hoy mismo y transforma la manera en que aprendes y enseñas en línea.
        </p>
        <Link href="/auth/login">
          <Button
            type="button"
            aria-label="Empezar ahora"
            className="flex items-center gap-2 px-8 py-4 text-lg font-semibold rounded-xl transition-transform transform hover:scale-105 hover:shadow-xl shadow-primary/50"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "var(--color-primary-text)",
            }}
          >
            Empezar ahora
          </Button>
        </Link>
      </div>
    </section>
  );
}