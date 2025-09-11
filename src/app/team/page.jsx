"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const team = [
  {
    name: "Orlibet Dun",
    role: "Team Lead • Team Frontend",
    image: "/team/orli.jpg",
  },
  {
    name: "Osiris Aguilazocho Lopez",
    role: "Team Backend",
    image: "/team/osiris.jpg",
  },
  {
    name: "Mariana Andrea Lois",
    role: "Team Backend",
    image: "/team/mariana.jpg",
  },
  {
    name: "Francisco Xavier Vera Fabila",
    role: "Team Backend",
    image: "/team/francisco.jpg",
  },
  {
    name: "Angeles Escudero Gedge",
    role: "Team Backend",
    image: "/team/angeles.jpg",
  },
];

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-bg text-foreground dark:bg-surface py-20 px-6">
      {/* Título */}
      <motion.h1
        className="text-center text-4xl md:text-5xl font-bold mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Nuestro <span className="text-primary">Equipo 4 - LATAM</span>
      </motion.h1>

      {/* Grid de Miembros */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 max-w-7xl mx-auto">
        {team.map((member, idx) => (
          <motion.div
            key={idx}
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
          >
            {/* Imagen circular */}
            <div className="w-40 h-40 relative mb-4">
              <Image
                aria-label={member.name}
                src={member.image}
                alt={member.name}
                fill
                className="rounded-full object-cover border-4 border-primary shadow-lg"
              />
            </div>

            {/* Nombre */}
            <h3 className="text-lg font-semibold">{member.name}</h3>

            {/* Rol */}
            <p className="text-sm text-muted">{member.role}</p>
          </motion.div>
        ))}
      </section>
      <section className="max-w-2xl mt-14 mx-auto text-center mb-4">
        <motion.p
          className="text-lg text-muted leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Somos un grupo de <span className="font-semibold">desarrolladores de distintos países de Latinoamérica</span> unidos por la pasión por la tecnología.  
          Creemos en el <span className="font-semibold text-primary">crecimiento profesional</span>, en el poder de la colaboración y en la construcción de oportunidades que nos permitan avanzar en nuestras carreras,  
          aportando soluciones digitales con impacto humano y real.
        </motion.p>
      </section>
    </main>
  );
}