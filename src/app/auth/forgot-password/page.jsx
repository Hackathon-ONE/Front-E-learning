"use client";

import { useState } from "react";
import AuthLayout from "../../../components/AuthLayout";

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
    <AuthLayout>
      <h1 className="text-2xl font-bold text-center mb-2">¿Olvidaste tu contraseña?</h1>
      <p className="text-center mb-4 text-sm">
        Ingresa tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="font-semibold text-sm">
          Correo electrónico
          <input
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            placeholder="tu@email.com"
          />
        </label>
        <button
          type="submit"
          className="w-full py-2 rounded-lg font-bold text-lg"
          style={{ backgroundColor: "var(--color-primary)", color: "var(--color-primary-text)" }}
          disabled={sent}
        >
          {sent ? "¡Correo enviado!" : "Enviar instrucciones"}
        </button>
      </form>
      {sent && (
        <div className="text-green-600 text-center font-semibold mt-2 text-sm">
          Si el correo existe, recibirás un enlace para restablecer tu contraseña.
        </div>
      )}
    </AuthLayout>
  );
}