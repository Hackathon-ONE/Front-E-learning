export const instructorMock = {
    id: 1,
    name: "Christian Velasco",
    bio: "Ingeniero en sistemas, especializado en Ciencia de Datos e Inteligencia Artificial.",
    avatar: "/images/instructor.jpg",
    social: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      twitter: "https://twitter.com",
    },
  };

export const instructorsDashboard = [
  {
    id: 1,
    name: "Ana Gómez",
    email: "ana@example.com",
    experience: "5 años enseñando React y Node.js",
    demoLink: "https://youtube.com/demo1",
    status: "pending",
  },
  {
    id: 2,
    name: "Luis Pérez",
    email: "luis@example.com",
    experience: "Instructor en universidades, experto en NestJS",
    demoLink: "https://youtube.com/demo2",
    status: "approved",
  },
  {
    id: 3,
    name: "María Rodríguez",
    email: "maria@example.com",
    experience: "Diseñadora UX/UI freelance",
    demoLink: "https://youtube.com/demo3",
    status: "rejected",
  },
];

export const instructorsPage = [
  {
    id: 1,
    name: "Benjamín Pérez",
    bio: "Especialista en React y Next.js con 8 años de experiencia.",
    avatar: "https://i.pravatar.cc/150?img=60",
    courses: 5,
    reviews: 4.7,
    students: 320,
  },
  {
    id: 2,
    name: "María Gómez",
    bio: "Apasionada por el diseño web y UX. Instructora de Figma y Tailwind.",
    avatar: "https://i.pravatar.cc/150?img=32",
    courses: 3,
    reviews: 4.9,
    students: 210,
  },
  {
    id: 3,
    name: "Carlos López",
    bio: "Backend developer con foco en Node.js, NestJS y bases de datos.",
    avatar: "https://i.pravatar.cc/150?img=14",
    courses: 7,
    reviews: 4.5,
    students: 410,
  },
];

export const earningsData = {
    total: 12500,
    monthly: [
      { month: "Ene", amount: 1200 },
      { month: "Feb", amount: 1800 },
      { month: "Mar", amount: 1500 },
      { month: "Abr", amount: 2000 },
      { month: "May", amount: 2200 },
      { month: "Jun", amount: 2800 },
    ],
    courses: [
      { id: 1, title: "React desde cero", revenue: 5500 },
      { id: 2, title: "Next.js avanzado", revenue: 4500 },
      { id: 3, title: "UI/UX Design", revenue: 2500 },
    ],
    transactions: [
      { id: 1, student: "Carla Martínez", course: "React desde cero", amount: 200, date: "2025-05-01" },
      { id: 2, student: "Gustavo Pérez", course: "Next.js avanzado", amount: 250, date: "2025-05-05" },
      { id: 3, student: "Fernanda López", course: "UI/UX Design", amount: 150, date: "2025-05-10" },
    ],
};

export const instructorDashboardData = {
  name: "Benjamín Pérez",
  bio: "Desarrollador Frontend con 8 años de experiencia. Instructor apasionado por React y Next.js.",
  avatar: "https://i.pravatar.cc/150?img=60", 
  stats: {
    courses: 5,
    students: 320,
    progressReports: 78,
    earnings: 12500, 
  },
};

export const instructorsData = [
  {
    id: "1",
    name: "Benjamín Pérez",
    avatar: "https://i.pravatar.cc/150?img=60",
    specialty: "Frontend Developer & React Expert",
    bio: "Desarrollador con 8+ años de experiencia en JavaScript, React y Next.js. Apasionado por enseñar y crear experiencias digitales modernas.",
    stats: { courses: 5, students: 320, rating: 4.8 },
    courses: [
      { id: 101, title: "React desde cero", lessons: 20, students: 120 },
      { id: 102, title: "Next.js avanzado", lessons: 18, students: 85 },
    ],
    reviews: [
      {
        id: 1,
        student: "Carla Martínez",
        comment: "Excelente instructor, explica muy claro y con ejemplos prácticos.",
        rating: 5,
      },
      {
        id: 2,
        student: "Gustavo Pérez",
        comment: "Me ayudó a entender Next.js de forma sencilla.",
        rating: 4,
      },
    ],
  },
  {
    id: "2",
    name: "María Gómez",
    avatar: "https://i.pravatar.cc/150?img=32",
    specialty: "Fullstack Developer & Mentora",
    bio: "Apasionada por el desarrollo web moderno y la mentoría de nuevos talentos. Experiencia en React, Node.js y arquitectura cloud.",
    stats: { courses: 4, students: 210, rating: 4.9 },
    courses: [
      { id: 103, title: "Node.js para principiantes", lessons: 15, students: 90 },
      { id: 104, title: "Arquitectura web moderna", lessons: 25, students: 120 },
    ],
    reviews: [
      {
        id: 1,
        student: "Pedro Sánchez",
        comment: "María es una excelente mentora, aprendí muchísimo.",
        rating: 5,
      },
      {
        id: 2,
        student: "Laura Fernández",
        comment: "Muy clara en los conceptos, la recomiendo al 100%.",
        rating: 5,
      },
    ],
  },
];

export const instructorCourses = [
  {
    id: 1,
    title: "Introducción a React",
    description: "Aprende los fundamentos de React, componentes y props.",
    studentsCount: 120,
    lessons: 18,
    published: true,
  },
  {
    id: 2,
    title: "Next.js Avanzado",
    description:
      "Explora SSR, ISR, rutas dinámicas y despliegue en producción.",
    studentsCount: 85,
    lessons: 22,
    published: false,
  },
  {
    id: 3,
    title: "TailwindCSS desde cero",
    description:
      "Domina el diseño responsive moderno con utilidades y buenas prácticas.",
    studentsCount: 60,
    lessons: 15,
    published: true,
  },
];

export const instructorAnalytics = [
  {
    id: 1,
    title: "React Avanzado",
    students: 120,
    avgProgress: 68,
    revenue: 2400,
  },
  {
    id: 2,
    title: "Node.js desde cero",
    students: 95,
    avgProgress: 74,
    revenue: 1500,
  },
];

export const fakeCourseEdit = {
  id: 1,
  title: "Curso de React Avanzado",
  description:
    "Aprende patrones avanzados de React, hooks personalizados y optimización de rendimiento.",
  category: "Frontend",
  level: "Intermedio",
  price: 49,
  instructor: "Benjamín Pérez",
};

export const fakeLessonEdit = {
  id: 1,
  title: "Componentes y Props",
  description: "Aprenderemos cómo funcionan los componentes y props en React.",
  duration: "15:20",
  status: "borrador",
};

export const fakeLessonPage = [
  {
    id: 1,
    title: "Introducción a React",
    duration: "10:32",
    status: "publicada",
 },
 {
    id: 2,
    title: "Componentes y Props",
    duration: "15:20",
    status: "borrador",
 },
 {
    id: 3,
    title: "Estado y Ciclo de vida",
    duration: "18:45",
    status: "publicada",
 },
];

export const studentsInstructorData = [
  {
    id: "1",
    name: "Ana Hunt",
    email: "ana@example.com",
    avatar: "https://i.pravatar.cc/150?img=25",
    courses: [
      {
        id: "c1",
        title: "React desde cero",
        progress: 70,
        lessons: [
          { id: "l1", title: "Introducción a React", completed: true },
          { id: "l2", title: "Componentes y Props", completed: true },
          { id: "l3", title: "Estado y Eventos", completed: false },
          { id: "l4", title: "Hooks básicos", completed: false },
        ],
      },
      {
        id: "c2",
        title: "Next.js avanzado",
        progress: 40,
        lessons: [
          { id: "l1", title: "SSR vs SSG", completed: true },
          { id: "l2", title: "ISR", completed: false },
          { id: "l3", title: "Middleware", completed: false },
        ],
      },
    ],
  },
];

export const progressReportsStudentsData = [
    {
      id: 1,
      name: "Ana Gómez",
      email: "ana@example.com",
      courseTitle: "React Avanzado",
    },
    {
      id: 2,
      name: "Gustavo Pérez",
      email: "gustavo@example.com",
      courseTitle: "Node.js desde cero",
    },
];

export const progressReportsCoursesData = [
    {
      id: 1,
      title: "Curso de React desde Cero",
      students: 120,
      progress: 75,
    },
    {
      id: 2,
      title: "NestJS Avanzado",
      students: 80,
      progress: 40,
    },
    {
      id: 3,
      title: "Diseño UX/UI en Figma",
      students: 150,
      progress: 90,
    },
    {
      id: 4,
      title: "Introducción a TypeScript",
      students: 200,
      progress: 60,
    },
];