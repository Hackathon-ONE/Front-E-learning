"use client";
import { useState /*, useEffect */ } from "react";
import { BookOpen, CheckCircle, Clock, TrendingUp } from "lucide-react";

const mockProgress = {
  completed: 3,
  total: 8,
  percent: 37,
  courses: [
    {
      id: 1,
      title: "React desde Cero",
      progress: 80,
      lastLesson: "Hooks y Custom Hooks",
      status: "En progreso",
      color: "bg-orange-100",
    },
    {
      id: 2,
      title: "Next.js Avanzado",
      progress: 50,
      lastLesson: "SSR y SSG",
      status: "En progreso",
      color: "bg-blue-100",
    },
    {
      id: 3,
      title: "UI/UX para Developers",
      progress: 100,
      lastLesson: "Proyecto final",
      status: "Completado",
      color: "bg-green-100",
    },
  ],
  history: [
    {
      id: 1,
      course: "UI/UX para Developers",
      date: "2024-06-01",
      action: "Completado",
    },
    {
      id: 2,
      course: "React desde Cero",
      date: "2024-05-20",
      action: "Lección avanzada",
    },
  ],
};

export default function ProgressPage() {
  // Para datos reales desde Java/Spring Boot:
  // const [progress, setProgress] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   async function fetchProgress() {
  //     try {
  //       setLoading(true);
  //       setError(null);
  //       // Cambia la URL por tu endpoint real de Spring Boot
  //       const res = await fetch("http://localhost:8080/api/progress");
  //       if (!res.ok) throw new Error("Error al obtener el progreso");
  //       const data = await res.json();
  //       setProgress(data);
  //     } catch (err) {
  //       setError("No se pudo cargar el progreso.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   fetchProgress();
  // }, []);

  // if (loading) return <div className="text-center py-10">Cargando progreso...</div>;
  // if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

  const [progress] = useState(mockProgress);

  return (
    <main className="min-h-screen bg-[var(--color-bg)] flex flex-col items-center py-8 px-2 sm:px-4">
      <section className="w-full max-w-4xl bg-[var(--color-surface)] rounded-2xl shadow-xl p-4 sm:p-8 flex flex-col gap-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-primary)] text-center mb-2">
          Mi Progreso
        </h1>
        {/* Resumen general */}
        <div className="flex flex-col sm:flex-row gap-6 justify-between items-center">
          <div className="flex flex-col items-center flex-1">
            <TrendingUp size={36} className="text-[var(--color-primary)] mb-2" />
            <span className="text-3xl font-bold text-[var(--color-text)]">{progress.percent}%</span>
            <span className="text-[var(--color-muted)] text-sm">Progreso total</span>
          </div>
          <div className="flex flex-col items-center flex-1">
            <CheckCircle size={32} className="text-green-500 mb-2" />
            <span className="text-xl font-semibold text-[var(--color-text)]">{progress.completed} / {progress.total}</span>
            <span className="text-[var(--color-muted)] text-sm">Cursos completados</span>
          </div>
          <div className="flex flex-col items-center flex-1">
            <BookOpen size={32} className="text-blue-500 mb-2" />
            <span className="text-xl font-semibold text-[var(--color-text)]">{progress.total - progress.completed}</span>
            <span className="text-[var(--color-muted)] text-sm">Cursos en progreso</span>
          </div>
        </div>

        {/* Barra de progreso */}
        <div className="w-full bg-gray-200 rounded-full h-4 mt-2 mb-4 overflow-hidden">
          <div
            className="bg-[var(--color-primary)] h-4 rounded-full transition-all"
            style={{ width: `${progress.percent}%` }}
          />
        </div>

        {/* Cursos en progreso */}
        <div>
          <h2 className="text-xl font-bold text-[var(--color-text)] mb-4">Tus cursos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {progress.courses.map((c) => (
              <div
                key={c.id}
                className={`rounded-xl shadow p-5 flex flex-col gap-2 ${c.color} border border-gray-100`}
              >
                <div className="flex items-center gap-2">
                  <BookOpen size={22} className="text-[var(--color-primary)]" />
                  <span className="font-semibold text-[var(--color-text)]">{c.title}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
                  <Clock size={16} /> Última lección: {c.lastLesson}
                </div>
                <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
                  <div
                    className={`bg-[var(--color-primary)] h-2 rounded-full transition-all`}
                    style={{ width: `${c.progress}%` }}
                  />
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span
                    className={`text-xs font-bold ${
                      c.status === "Completado"
                        ? "text-green-600"
                        : "text-[var(--color-primary)]"
                    }`}
                  >
                    {c.status}
                  </span>
                  <span className="text-xs text-[var(--color-muted)]">{c.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Historial de actividad */}
        <div>
          <h2 className="text-xl font-bold text-[var(--color-text)] mb-4">Historial reciente</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr>
                  <th className="px-3 py-2 text-left text-[var(--color-muted)]">Curso</th>
                  <th className="px-3 py-2 text-left text-[var(--color-muted)]">Acción</th>
                  <th className="px-3 py-2 text-left text-[var(--color-muted)]">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {progress.history.map((h) => (
                  <tr key={h.id} className="border-b border-gray-100">
                    <td className="px-3 py-2">{h.course}</td>
                    <td className="px-3 py-2">{h.action}</td>
                    <td className="px-3 py-2">{h.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}