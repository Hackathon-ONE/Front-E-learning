export const courseDetailMock = {
    id: 1,
    title: "Curso de ChatGPT: optimizando la calidad de los resultados",
    description: "Domina la integración de IA con APIs.",
    cover: "https://storage.cloud.google.com/luminamp4/chatgpt.png",
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
    { id: "1", title: "Creando los primeros prompts", videoUrl: "https://storage.cloud.google.com/luminamp4/video1.mp4", duration: "08 min" },
    { id: "2", title: "Mejorando la confiabilidad de los resultados", videoUrl: "https://storage.cloud.google.com/luminamp4/video2.mp4", duration: "12 min" },
    { id: "3", title: "Explorando aplicaciones", videoUrl: "https://storage.cloud.google.com/luminamp4/video3.mp4", duration: "10 min" },
    /* { id: "4", title: "Estrategias para textos largos", videoUrl: "https://storage.cloud.google.com/luminamp4/vide4.mp4", duration: "27 min" }, */
  ];

export const lessonsCoursesData = [
  { id: 1, title: "Introducción al curso", videoUrl: "https://storage.cloud.google.com/luminamp4/video5.mp4", duration: "5:32", completed: true },
  { id: 2, title: "Fundamentos básicos", videoUrl: "https://storage.cloud.google.com/luminamp4/video6.mp4", duration: "12:15", completed: false },
  { id: 3, title: "Tema intermedio", videoUrl: "https://storage.cloud.google.com/luminamp4/video7.mp4", duration: "18:47", completed: false },
  /* { id: 4, title: "Ejercicios prácticos", videoUrl: "https://storage.cloud.google.com/luminamp4/video8.mp4", duration: "22:05", completed: false }, */
];

export const overviewCourse = {
  title: "Introducción a React",
  description:
    "Aprende React desde los fundamentos hasta crear aplicaciones modernas. Incluye hooks, componentes, rutas y mejores prácticas.",
  cover: "https://storage.cloud.google.com/luminamp4/react.png",
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
  instructor: "Marco Alonzo",
  category: "Frontend",
  description: "Construye aplicaciones modernas con React y Next.js.",
  cover: "https://storage.cloud.google.com/luminamp4/react-nextjs.png",
  isFree: false,
},
{
  id: 2,
  title: "Node.js desde cero",
  instructor: "Fernanda López",
  category: "Backend",
  description: "Aprende a crear APIs robustas con Node.js y Express.",
  cover: "https://storage.cloud.google.com/luminamp4/node-express.png",
  isFree: true,
},
{
  id: 3,
  title: "Diseño UI/UX",
  instructor: "Ana Torres",
  category: "Diseño",
  description: "Fundamentos de diseño centrado en el usuario.",
  cover: "https://storage.cloud.google.com/luminamp4/design-user.png",
  isFree: false,
},
{
  id: 4,
  title: "Bases de Datos SQL",
  instructor: "Carlos Mora",
  category: "Data",
  description: "Domina consultas SQL y gestión de datos relacionales.",
  cover: "https://storage.cloud.google.com/luminamp4/sql.png",
  isFree: false,
},
];
