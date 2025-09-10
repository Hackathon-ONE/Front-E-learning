export const courseDetailMock = {
    id: 1,
    title: "Curso de ChatGPT: optimizando la calidad de los resultados",
    description: "Domina la integración de IA con APIs.",
    cover: "/courses/react.jpg",
    lessons: 24,
    duration: "12h 30m",
    students: 320,
    progress: 45,
    objectives: [
      "Comprender la arquitectura de React",
      "Crear componentes reutilizables",
      "Gestionar estado con hooks",
      "Implementar rutas y navegación",
      "Consumir APIs REST",
    ],
  };
  
export const coursesDashboardMock = [
    {
      id: 1,
      name: "Introducción a React",
      description: "Curso básico de React con proyectos.",
    },
    {
      id: 2,
      name: "NestJS Avanzado",
      description: "Construcción de APIs robustas con NestJS.",
    },
    {
      id: 3,
      name: "Spring Boot Essentials",
      description: "Curso práctico de Java + Spring Boot.",
    },
  ];

export const lessonsPlayerData = [
    { id: "1", title: "Creando los primeros prompts", videoUrl: "/video/video1.mp4", duration: "08 min" },
    { id: "2", title: "Mejorando la confiabilidad de los resultados", videoUrl: "/video/video2.mp4", duration: "12 min" },
    { id: "3", title: "Explorando aplicaciones", videoUrl: "/video/video3.mp4", duration: "10 min" },
    /* { id: "4", title: "Estrategias para textos largos", videoUrl: "/video/video4.mp4", duration: "27 min" }, */
  ];

export const lessonsCoursesData = [
  { id: 1, title: "Introducción al curso", videoUrl: "/video/video5.mp4", duration: "5:32", completed: true },
  { id: 2, title: "Fundamentos básicos", videoUrl: "/video/video6.mp4", duration: "12:15", completed: false },
  { id: 3, title: "Tema intermedio", videoUrl: "/video/video7.mp4", duration: "18:47", completed: false },
  /* { id: 4, title: "Ejercicios prácticos", videoUrl: "/video/video7.mp4", duration: "22:05", completed: false }, */
];

export const overviewCourse = {
  title: "React desde Cero",
  description:
    "Aprende React desde los fundamentos hasta crear aplicaciones modernas. Incluye hooks, componentes, rutas y mejores prácticas.",
  cover: "/courses/react.jpg",
  lessons: 24,
  duration: "12h 30m",
  students: 320,
  progress: 45,
  objectives: [
    "Comprender la arquitectura de React",
    "Crear componentes reutilizables",
    "Gestionar estado con hooks",
    "Implementar rutas y navegación",
    "Consumir APIs REST",
  ],
};

export const coursesPageData = [
{
  id: 1,
  title: "React Avanzado",
  instructor: "Juan Pérez",
  category: "Frontend",
  description: "Construye aplicaciones modernas con React y Next.js.",
  isFree: false,
},
{
  id: 2,
  title: "Node.js desde cero",
  instructor: "Fernanda López",
  category: "Backend",
  description: "Aprende a crear APIs robustas con Node.js y Express.",
  isFree: true,
},
{
  id: 3,
  title: "Diseño UI/UX",
  instructor: "Ana Torres",
  category: "Diseño",
  description: "Fundamentos de diseño centrado en el usuario.",
  isFree: false,
},
{
  id: 4,
  title: "Bases de Datos SQL",
  instructor: "Carlos Mora",
  category: "Data",
  description: "Domina consultas SQL y gestión de datos relacionales.",
  isFree: false,
},
];
