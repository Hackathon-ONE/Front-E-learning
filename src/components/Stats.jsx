'use client';

import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { NotebookPen, Book, GraduationCap, Award } from "lucide-react";

const stats = [
  { label: "Estudiantes", value: 1200, icon: <NotebookPen size={60} /> },
  { label: "Cursos", value: 150, icon: <Book size={60} /> },
  { label: "Instructores", value: 15, icon: <GraduationCap size={60} /> },
  { label: "Certificados emitidos", value: 350, icon: <Award size={60} /> },
];

export default function Stats() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section
      ref={ref}
      className="py-16 bg-surface text-center"
      style={{ backgroundColor: "var(--color-secondary)" }}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-20 text-[var(--color-text)]">
        Nuestras Estadísticas
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 text-[var(--color-text)] gap-8 justify-items-center">
        {stats.map((s, i) => (
          <div
            key={i}
            className="flex flex-col items-center max-w-[220px] w-full"
          >
            <div className="text-5xl mb-4">
              {s.icon}
            </div>
            <div className="text-3xl font-bold text-[var(--color-primary)] mb-2">
              {inView ? (
                <CountUp end={s.value} duration={2.5} separator="." />
              ) : 0}
            </div>
            <p className="text-[var(--color-text)] text-center">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}