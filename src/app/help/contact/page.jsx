"use client";

import { useState } from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const socialLinks = [
  {
    name: "Twitter",
    url: "https://twitter.com/",
    icon: <Twitter size={24} className="text-sky-500" />,
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/",
    icon: <Linkedin size={24} className="text-blue-700" />,
  },
  {
    name: "Facebook",
    url: "https://facebook.com/",
    icon: <Facebook size={24} className="text-blue-600" />,
  },
  {
    name: "Instagram",
    url: "https://instagram.com/",
    icon: <Instagram size={24} className="text-pink-500" />,
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica real de envío (API, etc)
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <main className="min-h-screen bg-[var(--color-bg)] flex flex-col items-center py-10 px-4">
      <section className="w-full max-w-5xl bg-[var(--color-surface)] rounded-2xl shadow-xl p-8 flex flex-col md:flex-row gap-10">
        {/* Mapa */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4 text-[var(--color-text)]">Nuestra ubicación</h2>
          <div className="rounded-lg overflow-hidden shadow-md w-full h-64 md:h-80">
            <iframe
              title="Ubicación"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019857755857!2d-122.41941518468144!3d37.7749297797597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c2f7e8b6d%3A0x7d0f1e6b7e6e6e6e!2sSan%20Francisco%2C%20CA!5e0!3m2!1ses-419!2sar!4v1680000000000!5m2!1ses-419!2sar"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "100%" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="flex gap-4 mt-6">
            {socialLinks.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
                aria-label={s.name}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
        {/* Formulario */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4 text-[var(--color-text)]">Contáctanos</h2>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 bg-[var(--color-card-primary)] rounded-xl shadow p-6"
          >
            <label className="font-semibold text-[var(--color-text)]">
              Nombre
              <input
                id="name"
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-[var(--color-text)]"
                placeholder="Tu nombre"
              />
            </label>
            <label className="font-semibold text-[var(--color-text)]">
              Email
              <input
                id="email"
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-[var(--color-text)]"
                placeholder="tu@email.com"
              />
            </label>
            <label className="font-semibold text-[var(--color-text)]">
              Mensaje
              <textarea
                id="message"
                name="message"
                required
                value={form.message}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-[var(--color-text)] focus:text-[var(--color-primary)]"
                rows={5}
                placeholder="¿En qué podemos ayudarte?"
              />
            </label>
            <button
              aria-label="Enviar mensaje"
              type="submit"
              className="cursor-pointer btn-primary py-2 px-6 rounded-lg font-bold text-lg mt-2"
              disabled={sent}
            >
              {sent ? "¡Mensaje enviado!" : "Enviar"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
