import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col items-start">
          <Link href="/" className="text-xl mt-6 mb-6 font-bold text-[var(--color-primary)]">
            🎓 E-Learning
          </Link>
          <p className="text-gray-300 text-sm mb-4">
            Plataforma líder para aprender y enseñar en línea con cursos de calidad y materiales interactivos.
          </p>
          <div className="flex gap-4 mt-6 text-white justify-center text-center items-center md:text-left">
            <a href="#" aria-label="Facebook"><Facebook size={20} className="hover:text-[var(--color-primary)] transition" /></a>
            <a href="#" aria-label="Twitter"><Twitter size={20} className="hover:text-[var(--color-primary)] transition" /></a>
            <a href="#" aria-label="Instagram"><Instagram size={20} className="hover:text-[var(--color-primary)] transition" /></a>
            <a href="#" aria-label="LinkedIn"><Linkedin size={20} className="hover:text-[var(--color-primary)] transition" /></a>
          </div>
        </div>

        {/* Links de navegación */}
        <div>
          <h4 className="px-12 font-semibold mt-6 mb-6 text-center md:text-left">Contenido</h4>
          <ul className="px-12 flex flex-col gap-2 text-sm md:text-md text-gray-300 text-center md:text-left">
            <li><Link href="/about" className="hover:text-[var(--color-primary)] transition">Sobre Nosotros</Link></li>
            <li><Link href="/courses" className="hover:text-[var(--color-primary)] transition">Cursos</Link></li>
            <li><Link href="/instructors" className="hover:text-[var(--color-primary)] transition">Instructores</Link></li>
            <li><Link href="/team" className="hover:text-[var(--color-primary)] transition">Equipo 4 - LATAM</Link></li>
            <li><Link href="/faq" className="hover:text-[var(--color-primary)] transition">FAQ</Link></li>
            <li><Link href="/terms" className="hover:text-[var(--color-primary)] transition">Términos y Condiciones</Link></li>
            <li><Link href="/policies" className="hover:text-[var(--color-primary)] transition">Políticas de Privacidad</Link></li>
          </ul>
        </div>

  <div className="md:col-span-2 mt-6">
          <h4 className="font-semibold mt-6 mb-2 text-center md:text-left">Suscríbete a nuestra Newsletter</h4>
          <p className="text-gray-300 text-sm mb-4 text-center md:text-left">
            Recibe las últimas noticias, cursos y promociones directamente en tu correo.
          </p>
          <form className="flex flex-col sm:flex-row gap-2 justify-center md:justify-start">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="flex-1 p-2 rounded-lg border border-gray-600 bg-black text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
            <Button type="submit">
              Suscribirse
            </Button>
          </form>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="border-t border-gray-700 mt-4 py-4 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} E-Learning Platform. Todos los derechos reservados.
      </div>
    </footer>
  );
}