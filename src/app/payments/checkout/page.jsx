'use client';

import { useState /*, useEffect */ } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { CreditCard, CheckCircle, XCircle, LogIn } from 'lucide-react';
import Button from '@/components/ui/Button';
import { checkoutCourse, mockCard } from '@/data/paymentsData';
import { activateSubscription } from '@/utils/userUtils';

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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/checkout`);
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
  const params = useParams(); // obtiene dinámicamente el parámetro de la URL
  const { id } = params; // courseId
  const { data: session } = useSession();

  // Validar que el ID existe
  if (!id || id === 'undefined') {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[var(--color-bg)]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[var(--color-text)] mb-4">Curso no encontrado</h1>
          <p className="text-[var(--color-text)] mb-6">El ID del curso no es válido.</p>
          <button
            onClick={() => router.push('/courses')}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/80 transition"
          >
            Volver a Cursos
          </button>
        </div>
      </div>
    );
  }

  // Estado del curso
  const [course] = useState(checkoutCourse);

  // Estado de tarjeta
  const [card, setCard] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
  });

  // Estado de pago
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Manejar inputs de la tarjeta
  const handleChange = (e) => {
    setCard({ ...card, [e.target.name]: e.target.value });
  };

  // Lógica para procesar pago (mock + backend)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!session) {
      setError('Debes iniciar sesión antes de realizar el pago.');
      return;
    }

    // Validación con tarjeta mock
    const isMockValid =
      card.number === mockCard.number &&
      card.name.trim().toLowerCase() === mockCard.name.trim().toLowerCase() &&
      card.expiry === mockCard.expiry &&
      card.cvc === mockCard.cvc;

    if (!isMockValid) {
      setError('Los datos de la tarjeta no son válidos.');
      return;
    }

    try {
      // Simular procesamiento de pago
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Activar suscripción para el usuario
      if (session?.user?.id) {
        activateSubscription(session.user.id);
      }

      setSuccess(true);
      setCard({ number: '', name: '', expiry: '', cvc: '' });
    } catch (err) {
      setError('No se pudo procesar el pago. Intenta de nuevo.');
    }
  };

  return (
    <main className="min-h-screen text-[var(--color-text)] bg-[var(--color-bg)] flex flex-col items-center py-8 px-2 sm:px-4">
      <section className="w-full max-w-lg bg-[var(--color-surface)] rounded-2xl shadow-xl p-4 sm:p-8 flex flex-col gap-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-primary)] text-center mb-2">
          Checkout de Curso
        </h1>

        {/* Info del curso */}
        <div className="bg-[var(--color-card-primary)] rounded-xl shadow p-4 flex flex-col gap-2">
          <h2 className="text-lg font-bold text-[var(--color-text)]">{course.title}</h2>
          <p className="text-[var(--color-text)] text-sm">{course.description}</p>
          <div className="flex flex-wrap gap-4 mt-2 items-center">
            <span className="text-sm text-[var(--color-text)]">
              Instructor:{' '}
              <span className="font-semibold text-[var(--color-text)]">{course.instructor}</span>
            </span>
            <span className="text-lg font-bold text-[var(--color-primary)]">
              {course.currency} ${course.price}
            </span>
          </div>
        </div>

        {/* Si NO está logueado */}
        {!session && (
          <div className="flex flex-col gap-4 items-center text-center">
            <div className="text-red-600 font-semibold flex items-center gap-2">
              <LogIn size={20} /> Debes iniciar sesión para pagar este curso.
            </div>
            {/* 
            <Button
              aria-label="Iniciar sesión"
              type="button"
              onClick={() => router.push("/auth/login")}
              className="btn-primary cursor-pointer py-2 px-6 rounded-lg font-bold text-lg"
            >
              Iniciar sesión
            </Button> 
            */}
          </div>
        )}

        {/* Formulario de pago */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 bg-[var(--color-card-primary)] rounded-xl shadow p-4"
        >
          <h3 className="text-lg font-semibold text-[var(--color-text)] flex items-center gap-2 mb-2">
            <CreditCard size={20} /> Datos de la tarjeta
          </h3>

          <input
            id="number"
            type="text"
            name="number"
            value={card.number}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-[var(--color-text)]"
            placeholder="Número de tarjeta"
            autoComplete="on"
            required
            maxLength={16}
            inputMode="numeric"
          />
          <input
            id="name"
            type="text"
            name="name"
            value={card.name}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-[var(--color-text)]"
            placeholder="Nombre en la tarjeta"
            autoComplete="on"
            required
          />
          <div className="flex gap-4">
            <input
              id="expiry"
              type="text"
              name="expiry"
              value={card.expiry}
              onChange={handleChange}
              className="w-1/2 px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-[var(--color-text)]"
              placeholder="MM/AA"
              autoComplete="on"
              required
              maxLength={5}
            />
            <input
              id="cvc"
              type="text"
              name="cvc"
              value={card.cvc}
              onChange={handleChange}
              className="w-1/2 px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-[var(--color-text)]"
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
              aria-label="Pagar"
              type="submit"
              className="btn-primary cursor-pointer py-2 px-6 rounded-lg font-bold text-lg mt-2"
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
              <div className="flex flex-col gap-3">
                <Button
                  type="button"
                  aria-label="Ver confirmación"
                  onClick={() => router.push('/payments/success')}
                  className="btn-primary cursor-pointer text-[var(--color-text)] hover:bg-[var(--color-primary)] hover:text-white py-2 px-6 rounded-lg font-bold text-lg"
                >
                  Ver Confirmación
                </Button>
                <Button
                  type="button"
                  aria-label="Ir al curso"
                  onClick={() => router.push(`/courses/${id}`)}
                  className="btn-secondary cursor-pointer py-2 px-6 rounded-lg font-semibold text-lg"
                >
                  Ir al curso
                </Button>
              </div>
            </div>
          )}
        </form>
      </section>
    </main>
  );
}
