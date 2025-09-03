"use client";

import Card from "@/components/ui/Card";
import { certificationsMock } from "@/data/certifications"; 

export default function CertificationsSection() {
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
        {certificationsMock.map((cert) => (
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