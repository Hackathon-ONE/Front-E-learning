"use client";

import { motion } from "framer-motion";
import { Users, Target, Rocket, Lightbulb } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-bg dark:bg-surface text-primary dark:text-primary">
      {/* Hero Section */}
      <section className="text-center py-20 px-6">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Sobre <span className="text-primary">Nuestra Empresa</span>
        </motion.h1>
        <motion.p
          className="max-w-2xl mx-auto text-lg text-gray-400 dark:text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Creamos experiencias digitales que transforman la manera en que las
          personas aprenden, trabajan y se conectan.
        </motion.p>
      </section>

      {/* Secciones */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 px-6 py-16">
        <motion.div
          className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100"
          whileHover={{ scale: 1.02 }}
        >
          <Users className="w-12 h-12 text-primary mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Quiénes Somos</h2>
          <p className="text-gray-600">
            Somos un equipo apasionado por la innovación tecnológica y la
            educación digital, comprometidos en brindar soluciones que generen
            impacto positivo en la sociedad.
          </p>
        </motion.div>

        <motion.div
          className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100"
          whileHover={{ scale: 1.02 }}
        >
          <Lightbulb className="w-12 h-12 text-yellow-500 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Nuestra Visión</h2>
          <p className="text-gray-600">
            Ser la plataforma líder en experiencias digitales, conectando a
            personas y empresas con oportunidades ilimitadas.
          </p>
        </motion.div>

        <motion.div
          className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100"
          whileHover={{ scale: 1.02 }}
        >
          <Target className="w-12 h-12 text-red-500 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Nuestra Misión</h2>
          <p className="text-gray-600">
            Facilitar el acceso a la tecnología y la educación con productos
            innovadores, accesibles y escalables.
          </p>
        </motion.div>

        <motion.div
          className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100"
          whileHover={{ scale: 1.02 }}
        >
          <Rocket className="w-12 h-12 text-green-500 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Nuestro Objetivo</h2>
          <p className="text-gray-600">
            Potenciar el crecimiento de las personas y empresas a través de
            herramientas digitales que inspiran y transforman.
          </p>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="text-center py-20 bg-primary text-white px-6">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          ¿Listo para unirte a nuestra misión?
        </motion.h2>
        <p className="max-w-xl mx-auto text-lg mb-8 text-blue-100">
          Forma parte de nuestra comunidad y construyamos juntos el futuro
          digital.
        </p>
        <motion.a
          href="/register"
          className="inline-block bg-gray-800 text-gray-400 font-semibold px-8 py-3 rounded-xl shadow-lg hover:bg-gray-100 transition"
          whileHover={{ scale: 1.05 }}
        >
          ¡Únete Ahora!
        </motion.a>
      </section>
    </main>
  );
}