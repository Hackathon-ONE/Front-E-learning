export const studentsData = [
    {
      id: 1,
      name: "Ana Gómez",
      email: "ana@example.com",
      avatar: "https://i.pravatar.cc/150?img=20",
      enrolledCourses: 3,
      progress: "70%",
    },
    {
      id: 2,
      name: "Luis Pérez",
      email: "luis@example.com",
      avatar: "https://i.pravatar.cc/150?img=15",
      enrolledCourses: 2,
      progress: "40%",
    },
    {
      id: 3,
      name: "María Rodríguez",
      email: "maria@example.com",
      avatar: "https://i.pravatar.cc/150?img=32",
      enrolledCourses: 5,
      progress: "85%",
    },
  ];

export const studentsProgress = [
    {
      id: "1",
      name: "Ana Gómez",
      email: "ana@example.com",
      avatar: "https://i.pravatar.cc/150?img=20",
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
  