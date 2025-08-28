"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";
import Button from "@/components/ui/Button";

// 🔹 Datos harcodeados de planes (podrían venir de una API en el futuro)
const plans = [
  {
    id: "basic",
    name: "Básico",
    price: "$9.99/mes",
    description: "Ideal para empezar y probar la app.",
    benefits: [
      "Acceso limitado a funcionalidades",
      "Soporte por correo",
      "1 proyecto activo",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$19.99/mes",
    description: "Perfecto para usuarios frecuentes.",
    benefits: [
      "Acceso completo a todas las funcionalidades",
      "Soporte prioritario",
      "Proyectos ilimitados",
      "Integraciones externas",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: "$39.99/mes",
    description: "La mejor experiencia para equipos y empresas.",
    benefits: [
      "Todo en Pro",
      "Soporte 24/7",
      "Dashboard avanzado",
      "Reportes personalizados",
      "Gestión de equipos",
    ],
  },
];

// 🔹 Componente principal
export default function PaymentsPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div
      style={{
        backgroundColor: "var(--color-bg)",
        color: "var(--color-text)",
        minHeight: "100vh",
        padding: "2rem 1rem",
      }}
    >
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-3xl font-bold mb-3">Planes de Suscripción</h1>
        <p className="text-lg" style={{ color: "var(--color-muted)" }}>
          Elige el plan que mejor se adapte a tus necesidades.
        </p>
      </div>

      {/* Grid de planes */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            style={{
              backgroundColor: "var(--color-card-primary)",
              color: "var(--color-card-primary-text)",
            }}
            className="rounded-2xl p-6 shadow-lg flex flex-col justify-between hover:scale-105 transition-transform"
          >
            <div>
              <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
              <p
                className="text-lg font-semibold mb-4"
                style={{ color: "var(--color-primary)" }}
              >
                {plan.price}
              </p>
              <p className="mb-4">{plan.description}</p>

              <ul className="space-y-2">
                {plan.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle
                      size={18}
                      style={{ color: "var(--color-accent)" }}
                    />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button
              onClick={() => router.push("/payments/checkout")}
              className="mt-6 w-full py-3 rounded-lg font-semibold bg-primary hover:primary-hover text-white"
            >
              Suscribirse
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}