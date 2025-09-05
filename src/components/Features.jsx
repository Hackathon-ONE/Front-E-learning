import React from "react";
import Card from "@/components/ui/Card";
import { BookOpen, Film, FileText, BarChart } from "lucide-react";

const features = [
  {
    title: "Catálogo de cursos",
    description: "Explora cursos en múltiples disciplinas con materiales multimedia.",
    icon: <BookOpen width={48} height={48} color="var(--color-primary)" />,
  },
  {
    title: "Materiales multimedia",
    description: "Videos, lecturas interactivas y ejercicios prácticos para cada curso.",
    icon: <Film width={48} height={48} color="var(--color-primary)" />,
  },
  {
    title: "Evaluaciones",
    description: "Exámenes y quizzes automáticos para medir tu progreso.",
    icon: <FileText width={48} height={48} color="var(--color-primary)" />,
  },
  {
    title: "Panel de progreso",
    description: "Visualiza tu avance en tiempo real con gráficos y reportes.",
    icon: <BarChart width={48} height={48} color="var(--color-primary)" />,
  },
];

export default function Features() {
  return (
    <section
      className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12"
      style={{ backgroundColor: "var(--color-secondary)" }}
    >
      <div className="container mx-auto text-center">
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 md:mb-16"
          style={{ color: "var(--color-text)" }}
        >
          Servicios Educativos
        </h2>

        <div className="grid gap-6 sm:gap-8 md:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Card
              key={i}
              title={f.title}
              description={f.description}
              icon={f.icon}
              className="max-w-md mx-auto"
            />
          ))}
        </div>
      </div>
    </section>
  );
}