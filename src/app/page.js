export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 p-6">
      {/* Header */}
      <header className="w-full max-w-5xl flex justify-between items-center mb-12">
        <h1 className="text-2xl font-bold text-blue-700">📚 E-Learning Platform</h1>
        <nav className="flex gap-6 text-gray-700 font-medium">
          <a href="#" className="hover:text-blue-600">Inicio</a>
          <a href="#" className="hover:text-blue-600">Cursos</a>
          <a href="#" className="hover:text-blue-600">Nosotros</a>
          <a href="#" className="hover:text-blue-600">Contacto</a>
        </nav>
      </header>

      {/* Main */}
      <main className="flex flex-col items-center text-center gap-8">
        <h2 className="text-4xl font-extrabold text-gray-900 max-w-2xl">
          Aprende a tu ritmo, desde cualquier lugar 🌍
        </h2>
        <p className="text-lg text-gray-600 max-w-xl">
          Bienvenido a la plataforma de aprendizaje en línea.  
          Aquí encontrarás cursos de calidad para impulsar tu conocimiento y tu carrera.
        </p>

        <div className="flex gap-4 mt-6">
          <a
            href="#"
            className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
          >
            Explorar cursos
          </a>
          <a
            href="#"
            className="px-6 py-3 rounded-xl bg-white border border-gray-300 font-semibold shadow hover:bg-gray-50 transition"
          >
            Registrarse
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 text-gray-500 text-sm">
        © {new Date().getFullYear()} E-Learning Platform. Todos los derechos reservados.
      </footer>
    </div>
  );
}