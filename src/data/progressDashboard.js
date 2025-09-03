export const mockProgress = {
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
        color: "bg-orange-100 dark:bg-orange-900/40",
      },
      {
        id: 2,
        title: "Next.js Avanzado",
        progress: 50,
        lastLesson: "SSR y SSG",
        status: "En progreso",
        color: "bg-blue-100 dark:bg-blue-900/40",
      },
      {
        id: 3,
        title: "UI/UX para Developers",
        progress: 100,
        lastLesson: "Proyecto final",
        status: "Completado",
        color: "bg-green-100 dark:bg-green-900/40",
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