"use client";

import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import Button from "./ui/Button";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black text-white overflow-x-hidden">
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Marca y redes */}
        <div className="flex flex-col items-start min-w-0">
          <Link href="/" className="text-xl mt-6 mb-6 font-bold text-[var(--color-primary)] whitespace-nowrap">
            <Image
              src="/Logo.png"
              alt="Logo"
              width={148}
              height={148}
              priority
              unoptimized
              style={{ height: "auto", width: "70%" }}
            />
          </Link>
          <p className="text-gray-300 text-sm mb-4 break-words">
            Plataforma líder para aprender y enseñar en línea con cursos de calidad y materiales interactivos.
          </p>
          <div className="flex gap-2 mt-6 text-white justify-center text-center items-center md:text-left flex-wrap">
            <a href="#" aria-label="Facebook"><Facebook size={20} className="hover:text-[var(--color-primary)] transition" /></a>
            <a href="#" aria-label="Twitter"><Twitter size={20} className="hover:text-[var(--color-primary)] transition" /></a>
            <a href="#" aria-label="Instagram"><Instagram size={20} className="hover:text-[var(--color-primary)] transition" /></a>
            <a href="#" aria-label="LinkedIn"><Linkedin size={20} className="hover:text-[var(--color-primary)] transition" /></a>
          </div>
        </div>

        {/* Links de navegación */}
        <div className="min-w-0">
          <h4 className="font-semibold mt-6 mb-6 text-center md:text-left">Contenido</h4>
          <ul className="flex flex-col gap-2 text-sm md:text-md text-gray-300 text-center md:text-left">
            <li><Link href="/courses" className="hover:text-[var(--color-primary)] transition">Cursos</Link></li>
            <li><Link href="/instructor" className="hover:text-[var(--color-primary)] transition">Instructores</Link></li>
            {/* <li><Link href="/team" className="hover:text-[var(--color-primary)] transition">Equipo 4 - LATAM</Link></li> */}
            {/* <li><Link href="/help/faq" className="hover:text-[var(--color-primary)] transition">FAQ</Link></li> */}
            <li><Link href="/help/contact" className="hover:text-[var(--color-primary)] transition">Contacto</Link></li>
            <li><Link href="/help/support" className="hover:text-[var(--color-primary)] transition">Soporte</Link></li>
          </ul>
        </div>

        {/* Links legales */}
        <div className="min-w-0">
          <h4 className="font-semibold mt-6 mb-6 text-center md:text-left">Legal</h4>
          <ul className="flex flex-col gap-2 text-sm md:text-md text-gray-300 text-center md:text-left">
            <li><Link href="/help/terms" className="hover:text-[var(--color-primary)] transition">Términos y Condiciones</Link></li>
            <li><Link href="/help/policies" className="hover:text-[var(--color-primary)] transition">Políticas de Privacidad</Link></li>
            <li><Link href="/help/cookies" className="hover:text-[var(--color-primary)] transition">Política de Cookies</Link></li>
          </ul>
        </div>

        {/* Newsletter: columna 4 en desktop, debajo de legal en mobile */}
        <div className="mt-6 md:mt-6 flex flex-col min-w-0">
          <h4 className="font-semibold mb-2 text-center md:text-left">Suscríbete a nuestra Newsletter</h4>
          <p className="text-gray-300 text-sm mb-4 text-center md:text-left break-words">
            Recibe las últimas noticias, cursos y promociones directamente en tu correo.
          </p>
          <form className="flex flex-col sm:flex-row gap-2 justify-center md:justify-start w-full">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="flex-1 min-w-0 p-2 text-sm rounded-lg border border-gray-600 bg-black text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
            <Button type="submit">
              Suscribirse
            </Button>
          </form>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="border-t border-gray-700 mt-4 py-4 text-center text-gray-400 text-sm overflow-x-hidden">
        © {new Date().getFullYear()} Lumina Platform. Todos los derechos reservados.
      </div>
    </footer>
  );
}