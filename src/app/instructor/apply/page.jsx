"use client";

import { useState } from "react";
import { Upload, Send, CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function InstructorApplyPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    linkedin: "",
    github: "",
    experience: "",
    category: "",
    demo: null,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-start p-6"
      style={{
        backgroundColor: "var(--color-bg)",
        color: "var(--color-text)",
      }}
    >
      {/* Botón Volver */}
      <div className="w-full flex justify-center md:justify-start max-w-2xl mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium 
                     bg-[var(--color-surface)] text-[var(--color-text)] 
                     hover:bg-[var(--color-primary)] hover:text-[var(--color-primary-text)]
                     transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm sm:text-base">Volver</span>
        </button>
      </div>

      {/* Formulario */}
      <section className="w-full max-w-2xl bg-[var(--color-surface)] rounded-2xl shadow-lg p-6 md:p-10">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          Solicitud para ser Instructor
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Nombre completo
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg border border-[var(--color-muted)] bg-[var(--color-card-primary)] text-[var(--color-card-primary-text)]"
            />
          </div>

          {/* LinkedIn */}
          <div>
            <label className="block text-sm font-medium mb-2">LinkedIn</label>
            <input
              id="linkedin"
              type="url"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/tu-perfil"
              required
              className="w-full p-3 rounded-lg border border-[var(--color-muted)] bg-[var(--color-card-primary)] text-[var(--color-card-primary-text)]"
            />
          </div>

          {/* GitHub */}
          <div>
            <label className="block text-sm font-medium mb-2">
              GitHub / Portafolio
            </label>
            <input
              id="github"
              type="url"
              name="github"
              value={formData.github}
              onChange={handleChange}
              placeholder="https://github.com/tuusuario"
              className="w-full p-3 rounded-lg border border-[var(--color-muted)] bg-[var(--color-card-primary)] text-[var(--color-card-primary-text)]"
            />
          </div>

          {/* Experiencia */}
          <div>
            <label className="block text-sm font-medium mb-2">Experiencia</label>
            <textarea
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              rows={4}
              required
              placeholder="Ej: 3 años como frontend developer e impartí talleres de React..."
              className="w-full p-3 rounded-lg border border-[var(--color-muted)] bg-[var(--color-card-primary)] text-[var(--color-card-primary-text)]"
            ></textarea>
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Categoría de enseñanza
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg border border-[var(--color-muted)] bg-[var(--color-card-primary)] text-[var(--color-card-primary-text)]"
            >
              <option value="">Selecciona una categoría</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="fullstack">Fullstack</option>
              <option value="uiux">UI/UX Design</option>
              <option value="data">Data Science</option>
              <option value="devops">DevOps</option>
            </select>
          </div>

          {/* Demo */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Sube un demo (video)
            </label>
            <input
              type="file"
              name="demo"
              accept="video/*"
              onChange={handleChange}
              required
              className="hidden"
              id="demoUpload"
            />
            <label
              htmlFor="demoUpload"
              className="flex items-center gap-2 px-4 py-3 rounded-lg border border-[var(--color-muted)] cursor-pointer bg-[var(--color-card-secondary)] hover:bg-[var(--color-card-primary)] transition"
            >
              <Upload className="w-5 h-5" />{" "}
              {formData.demo ? formData.demo.name : "Seleccionar archivo"}
            </label>
          </div>

          {/* Botón enviar */}
          <button
            aria-label="Enviar solicitud"
            type="submit"
            className="w-full cursor-pointer flex items-center justify-center gap-2 px-6 py-3 rounded-lg btn-primary text-lg font-semibold"
          >
            <Send className="w-5 h-5" /> Enviar solicitud
          </button>
        </form>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--color-surface)] rounded-2xl shadow-lg p-6 md:p-8 max-w-md w-full text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">¡Solicitud enviada!</h2>
            <p className="text-sm text-[var(--color-muted)] mb-6">
              Tu aplicación como instructor fue enviada. Recibirás un correo
              cuando nuestro equipo la revise.
            </p>
            <button
              type="button"
              aria-label="Cerrar modal"
              onClick={() => setIsModalOpen(false)}
              className="cursor-pointer w-full py-3 rounded-lg btn-primary font-semibold"
            >
              Cerrar
            </button>
            <div className="flex flex-col mt-4 gap-2">
              <Link href="/instructor/apply/status">
                <button
                  type="button"
                  aria-label="Ver estado de solicitud"
                  className="cursor-pointer w-full py-3 rounded-lg btn-primary font-semibold"
                >
                  Ver estado de solicitud
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}