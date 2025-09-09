"use client";

import { motion } from "framer-motion";
import { Users, Target, Rocket, Lightbulb } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-bg text-foreground dark:bg-surface">
      {/* Hero con Imagen + Texto */}
      <section className="py-20 bg-surface">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center px-6">
          {/* Imagen */}
          <div className="relative">
            <Image
              src="/images/about-preview.jpg"
              alt="Sobre nosotros"
              className="rounded-2xl shadow-lg w-full object-cover"
              width={1280}   
              height={640}
              unoptimized
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl" />
          </div>

          {/* Contenido */}
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6 text-foreground leading-snug">
              Una comunidad que transforma el{" "}
              <span className="text-primary">aprendizaje</span>
            </h2>
            <p className="text-lg text-muted leading-relaxed mb-8">
              En nuestra plataforma educativa reunimos{" "}
              <span className="font-semibold text-primary">estudiantes</span>,{" "}
              <span className="font-semibold text-primary">instructores</span> y{" "}
              <span className="font-semibold text-primary">mentores</span> que
              creen en un futuro donde aprender es dinámico, accesible y
              colaborativo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cards de secciones */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 px-6 py-8">
        <motion.div
          className="bg-surface dark:bg-bg shadow-lg rounded-2xl p-8 border border-gray-100 dark:border-gray-700"
          whileHover={{ scale: 1.02 }}
        >
          <Users className="w-12 h-12 text-primary mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Quiénes Somos</h2>
          <p className="text-muted">
            Somos un equipo apasionado por la innovación tecnológica y la
            educación digital, comprometidos en brindar soluciones que generen
            impacto positivo en la sociedad.
          </p>
        </motion.div>

        <motion.div
          className="bg-surface dark:bg-bg shadow-lg rounded-2xl p-8 border border-gray-100 dark:border-gray-700"
          whileHover={{ scale: 1.02 }}
        >
          <Lightbulb className="w-12 h-12 text-yellow-500 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Nuestra Visión</h2>
          <p className="text-muted">
            Ser la plataforma líder en experiencias digitales, conectando a
            personas y empresas con oportunidades ilimitadas.
          </p>
        </motion.div>

        <motion.div
          className="bg-surface dark:bg-bg shadow-lg rounded-2xl p-8 border border-gray-100 dark:border-gray-700"
          whileHover={{ scale: 1.02 }}
        >
          <Target className="w-12 h-12 text-red-500 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Nuestra Misión</h2>
          <p className="text-muted">
            Facilitar el acceso a la tecnología y la educación con productos
            innovadores, accesibles y escalables.
          </p>
        </motion.div>

        <motion.div
          className="bg-surface dark:bg-bg shadow-lg rounded-2xl p-8 border border-gray-100 dark:border-gray-700"
          whileHover={{ scale: 1.02 }}
        >
          <Rocket className="w-12 h-12 text-green-500 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Nuestro Objetivo</h2>
          <p className="text-muted">
            Potenciar el crecimiento de las personas y empresas a través de
            herramientas digitales que inspiran y transforman.
          </p>
        </motion.div>
      </section>

      {/* CTA Final */}
      <section className="text-center py-20 bg-primary text-white px-6">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          ¿Listo para unirte a nuestra misión?
        </motion.h2>
        <p className="max-w-xl mx-auto text-lg mb-8 text-white/80">
          Forma parte de nuestra comunidad y construyamos juntos el futuro
          digital.
        </p>
        <motion.a
          href="/auth/login"
          className="inline-block bg-white text-primary font-semibold px-8 py-3 rounded-xl shadow-lg hover:bg-gray-100 transition"
          whileHover={{ scale: 1.05 }}
        >
          ¡Únete Ahora!
        </motion.a>
      </section>
    </main>
  );
}