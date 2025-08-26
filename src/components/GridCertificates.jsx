"use client";

import { Award, Medal, GraduationCap } from "lucide-react"; // iconos
import { Card } from "@/components/ui/card";

export default function CertificationsSection() {
  const certifications = [
    {
      id: 1,
      title: "Frontend Developer",
      description: "Certificado en desarrollo web con React y Next.js",
      icon: <GraduationCap className="w-10 h-10 text-blue-500" />,
    },
    {
      id: 2,
      title: "JavaScript Mastery",
      description: "Badge avanzado en JavaScript moderno",
      icon: <Medal className="w-10 h-10 text-yellow-500" />,
    },
    {
      id: 3,
      title: "UI/UX Design",
      description: "Certificación en diseño de interfaces y experiencia de usuario",
      icon: <Award className="w-10 h-10 text-green-500" />,
    },
  ];

  return (
    <section className="my-12">
      {/* Título */}
      <div className="text-center mb-10">
        <h2 className="text-xl md:text-2xl font-bold mb-2">
          Certificaciones & Badges
        </h2>
        <p className="text-muted-foreground text-lg">
          Reconocimientos que validan mi aprendizaje y experiencia
        </p>
      </div>

      {/* Grid de certificados */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {certifications.map((cert) => (
          <Card
            key={cert.id}
            className="flex flex-col items-center text-center p-6 rounded-2xl shadow-lg hover:shadow-xl transition-transform hover:scale-105 bg-card-secondary"
          >
            {/* Icono */}
            <div className="mb-4">{cert.icon}</div>

            {/* Título */}
            <h3 className="text-xl font-semibold mb-2">{cert.title}</h3>

            {/* Descripción */}
            <p className="text-sm text-muted-foreground">{cert.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}