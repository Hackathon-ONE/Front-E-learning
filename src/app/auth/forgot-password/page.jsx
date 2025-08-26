"use client";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica real de envío (API, etc)
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setEmail("");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] px-4">
      <section className="w-full max-w-md bg-[var(--color-surface)] rounded-2xl shadow-xl p-8 flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-center text-[var(--color-text)] mb-2">¿Olvidaste tu contraseña?</h1>
        <p className="text-center text-[var(--color-muted)] mb-4">
          Ingresa tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="font-semibold text-[var(--color-muted)]">
            Correo electrónico
            <input
              type="email"
              name="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="mt-1 w-full px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-white text-[var(--color-card-primary-text)]"
              placeholder="tu@email.com"
            />
          </label>
          <button
            type="submit"
            className="btn-primary py-2 px-6 rounded-lg font-bold text-lg mt-2"
            disabled={sent}
          >
            {sent ? "¡Correo enviado!" : "Enviar instrucciones"}
          </button>
        </form>
        {sent && (
          <div className="text-green-600 text-center font-semibold mt-2">
            Si el correo existe, recibirás un enlace para restablecer tu contraseña.
          </div>
        )}
      </section>
    </main>
  );
}
