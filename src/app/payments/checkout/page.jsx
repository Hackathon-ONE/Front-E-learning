"use client";
import { useState /*, useEffect */ } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, CheckCircle, XCircle } from "lucide-react";
import Button from "@/components/ui/Button";

// Ejemplo de cómo importar datos desde la base de datos (Java/Spring Boot):
/*
import { useEffect, useState } from "react";
const [checkout, setCheckout] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  async function fetchCheckout() {
    try {
      setLoading(true);
      setError(null);
      // Cambia la URL por tu endpoint real de Spring Boot
      const res = await fetch("http://localhost:8080/api/payments/checkout");
      if (!res.ok) throw new Error("Error al obtener datos de checkout");
      const data = await res.json();
      setCheckout(data);
    } catch (err) {
      setError("No se pudo cargar el checkout.");
    } finally {
      setLoading(false);
    }
  }
  fetchCheckout();
}, []);

// Puedes mostrar loading y error así:
// if (loading) return <div className="text-center py-10">Cargando checkout...</div>;
// if (error) return <div className="text-center text-red-500 py-10">{error}</div>;
*/

export default function CheckoutPage() {
  const router = useRouter();
  // Datos hardcodeados para demo
  const [course] = useState({
    title: "React Avanzado",
    instructor: "Juan Pérez",
    price: 49.99,
    currency: "USD",
    description: "Construye aplicaciones modernas con React y Next.js.",
  });

  // Datos hardcodeados de pago (simulación)
  const mockCard = {
    number: "4111111111111111", // Visa test
    name: "JUAN PEREZ",
    expiry: "12/25",
    cvc: "123",
  };

  const [card, setCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCard({ ...card, [e.target.name]: e.target.value });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Aquí iría la lógica real de pago
  //   setSuccess(true);
  //   setTimeout(() => setSuccess(false), 4000);
  //   setCard({ number: "", name: "", expiry: "", cvc: "" });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validación con datos hardcodeados
    if (
      card.number === mockCard.number &&
      card.name.toUpperCase() === mockCard.name &&
      card.expiry === mockCard.expiry &&
      card.cvc === mockCard.cvc
    ) {
      setSuccess(true);
      setCard({ number: "", name: "", expiry: "", cvc: "" });
    } else {
      setError("❌ Los datos de la tarjeta no son válidos.");
    }
  };

  return (
    <main className="min-h-screen bg-[var(--color-bg)] flex flex-col items-center py-8 px-2 sm:px-4">
      <section className="w-full max-w-lg bg-[var(--color-surface)] rounded-2xl shadow-xl p-4 sm:p-8 flex flex-col gap-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-primary)] text-center mb-2">
          Checkout de Curso
        </h1>

        {/* 📌 Info del curso */}
        <div className="bg-[var(--color-card-primary)] rounded-xl shadow p-4 flex flex-col gap-2">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
            {course.title}
          </h2>
          <p className="text-gray-900 dark:text-gray-100 text-sm">
            {course.description}
          </p>
          <div className="flex flex-wrap gap-4 mt-2 items-center">
            <span className="text-sm text-gray-900 dark:text-gray-100">
              Instructor:{" "}
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {course.instructor}
              </span>
            </span>
            <span className="text-lg font-bold text-[var(--color-primary)]">
              {course.currency} ${course.price}
            </span>
          </div>
        </div>

        {/* 📌 Formulario de pago */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 bg-[var(--color-card-primary)] rounded-xl shadow p-4"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2 mb-2">
            <CreditCard size={20} /> Datos de la tarjeta
          </h3>

          <input
            type="text"
            name="number"
            value={card.number}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-white text-gray-900 dark:text-gray-100"
            placeholder="Número de tarjeta"
            autoComplete="on"
            required
            maxLength={16}
            inputMode="numeric"
          />
          <input
            type="text"
            name="name"
            value={card.name}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-white text-gray-900 dark:text-gray-100"
            placeholder="Nombre en la tarjeta"
            autoComplete="on"
            required
          />
          <div className="flex gap-4">
            <input
              type="text"
              name="expiry"
              value={card.expiry}
              onChange={handleChange}
              className="w-1/2 px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-white text-gray-900 dark:text-gray-100"
              placeholder="MM/AA"
              autoComplete="on"
              required
              maxLength={5}
            />
            <input
              type="text"
              name="cvc"
              value={card.cvc}
              onChange={handleChange}
              className="w-1/2 px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-white text-gray-900 dark:text-gray-100"
              placeholder="CVC"
              autoComplete="on"
              required
              maxLength={3}
              inputMode="numeric"
            />
          </div>

          {/* Error de validación */}
          {error && (
            <div className="text-red-600 text-center font-semibold flex items-center gap-2">
              <XCircle size={20} /> {error}
            </div>
          )}

          {/* Botón de pagar */}
          {!success && (
            <Button
              type="submit"
              className="btn-primary py-2 px-6 rounded-lg font-bold text-lg mt-2"
            >
              Pagar
            </Button>
          )}

          {/* Mensaje de éxito + Botón para ir al curso */}
          {success && (
            <div className="flex flex-col items-center gap-4 mt-4">
              <div className="text-green-600 text-center font-semibold flex items-center gap-2">
                <CheckCircle size={20} /> ¡Pago realizado con éxito!
              </div>
              <Button
                onClick={() => router.push(`/courses/${course.id}/overview`)}
                className="btn-secondary py-2 px-6 rounded-lg font-bold text-lg"
              >
                Ir al curso
              </Button>
            </div>
          )}
        </form>
      </section>
    </main>
  );
}