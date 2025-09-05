"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import { plans } from "@/data/paymentsData";

export default function PaymentsPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="bg-[var(--color-bg)] text-[var(--color-text)] min-h-screen px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-10 sm:mb-14">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2 sm:mb-3">
          Planes de Suscripción
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-[var(--color-muted)]">
          Accede a todos los cursos, herramientas y soporte exclusivo.
        </p>
      </div>

      {/* Grid de planes */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
        {plans.map((plan, index) => (
          <div
            key={plan.id}
            className={`relative rounded-2xl p-4 sm:p-6 shadow-lg flex flex-col justify-between 
              hover:scale-105 transition-transform duration-200
              bg-[var(--color-card-primary)] text-[var(--color-card-primary-text)] 
              ${index === 1 ? "border-2 border-[var(--color-primary)]" : ""}`}
          >
            {/* Badge para el plan destacado */}
            {index === 1 && (
              <span className="absolute top-0 right-0 bg-[var(--color-primary)] text-[var(--color-primary-text)] text-xs font-bold px-2 sm:px-3 py-1 rounded-bl-lg rounded-tr-2xl">
                Más popular
              </span>
            )}

            <div>
              <h2 className="text-xl md:text-2xl font-bold mb-2">{plan.name}</h2>
              <p className="text-2xl md:text-3xl font-extrabold mb-4 text-[var(--color-primary)]">
                {plan.price}
              </p>
              <p className="mb-4 text-sm text-[var(--color-muted)]">{plan.description}</p>

              <ul className="space-y-2">
                {plan.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm md:text-base">
                    <CheckCircle size={18} className="text-[var(--color-accent)]" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button
              onClick={() => router.push("/payments/checkout")}
              className="mt-6 w-full py-3 rounded-lg font-semibold btn-primary"
            >
              Suscribirse
            </Button>
          </div>
        ))}
      </div>

      {/* Comparativa de planes */}
      <div className="max-w-5xl mx-auto mb-20">
        <h2 className="text-2xl font-bold text-center mb-6">
          Comparación de planes
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm md:text-base">
            <thead>
              <tr className="bg-[var(--color-surface)]">
                <th className="p-3 text-left">Características</th>
                {plans.map((p) => (
                  <th key={p.id} className="p-3 text-center">{p.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3">Acceso a todos los cursos</td>
                {plans.map((p, i) => (
                  <td key={i} className="p-3 text-center">
                    <CheckCircle className="text-green-500 mx-auto" size={20} />
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3">Soporte prioritario</td>
                <td className="p-3 text-center">
                  <XCircle className="text-red-500 mx-auto" size={20} />
                </td>
                <td className="p-3 text-center">
                  <CheckCircle className="text-green-500 mx-auto" size={20} />
                </td>
                <td className="p-3 text-center">
                  <CheckCircle className="text-green-500 mx-auto" size={20} />
                </td>
              </tr>
              <tr>
                <td className="p-3">Certificados oficiales</td>
                <td className="p-3 text-center">
                  <XCircle className="text-red-500 mx-auto" size={20} />
                </td>
                <td className="p-3 text-center">
                  <CheckCircle className="text-green-500 mx-auto" size={20} />
                </td>
                <td className="p-3 text-center">
                  <CheckCircle className="text-green-500 mx-auto" size={20} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-2 sm:px-0">
        <h2 className="text-2xl font-bold text-center mb-6">
          Preguntas Frecuentes
        </h2>
        <div className="space-y-4">
          <details className="bg-[var(--color-surface)] p-4 rounded-lg shadow cursor-pointer">
            <summary className="font-semibold">¿Puedo cancelar en cualquier momento?</summary>
            <p className="mt-2 text-sm text-[var(--color-muted)]">
              Sí, puedes cancelar tu plan desde tu perfil y no se te cobrará en el siguiente ciclo.
            </p>
          </details>

          <details className="bg-[var(--color-surface)] p-4 rounded-lg shadow cursor-pointer">
            <summary className="font-semibold">¿Recibiré factura o comprobante?</summary>
            <p className="mt-2 text-sm text-[var(--color-muted)]">
              Sí, recibirás una factura digital automáticamente en tu correo electrónico.
            </p>
          </details>

          <details className="bg-[var(--color-surface)] p-4 rounded-lg shadow cursor-pointer">
            <summary className="font-semibold">¿Qué métodos de pago aceptan?</summary>
            <p className="mt-2 text-sm text-[var(--color-muted)]">
              Aceptamos tarjetas de crédito, débito, PayPal y transferencias bancarias.
            </p>
          </details>
        </div>
      </div>
    </div>
  );
}