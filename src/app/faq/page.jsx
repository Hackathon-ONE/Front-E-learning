"use client";

import { useState } from "react";

export default function FAQPage() {
  const faqs = [
    {
      question: "¿Qué es esta plataforma?",
      answer:
        "Nuestra plataforma es un espacio de aprendizaje interactivo que combina cursos, recursos y comunidad para potenciar tus habilidades.",
    },
    {
      question: "¿Cómo puedo registrarme?",
      answer:
        "Simplemente haz clic en el botón 'Registrarse' en la parte superior y completa el formulario con tus datos. En pocos segundos tendrás tu cuenta lista.",
    },
    {
      question: "¿La plataforma es gratuita?",
      answer:
        "Ofrecemos un plan gratuito con acceso limitado y planes premium con beneficios avanzados como mentorías y certificaciones.",
    },
    {
      question: "¿Puedo cancelar mi suscripción?",
      answer:
        "Sí, puedes cancelar en cualquier momento desde tu panel de usuario. No hay cláusulas ocultas ni cargos adicionales.",
    },
    {
      question: "¿Qué tipo de soporte ofrecen?",
      answer:
        "Contamos con soporte técnico 24/7 por correo y chat en vivo, además de foros comunitarios para resolver dudas rápidamente.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          Preguntas Frecuentes (FAQ)
        </h1>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              <button
                className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-medium">{faq.question}</span>
                <span className="text-xl">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}