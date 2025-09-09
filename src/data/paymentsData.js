export const plans = [
  {
    id: "basic",
    name: "Básico",
    price: "$9.99/mes",
    description: "Ideal para empezar y probar la app.",
    benefits: [
      "Acceso limitado a funcionalidades",
      "Soporte por correo",
      "1 proyecto activo",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$19.99/mes",
    description: "Perfecto para usuarios frecuentes.",
    benefits: [
      "Acceso completo a todas las funcionalidades",
      "Soporte prioritario",
      "Proyectos ilimitados",
      "Integraciones externas",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: "$39.99/mes",
    description: "La mejor experiencia para equipos y empresas.",
    benefits: [
      "Todo en Pro",
      "Soporte 24/7",
      "Dashboard avanzado",
      "Reportes personalizados",
      "Gestión de equipos",
    ],
  },
];

export const paymentsDashboard = [
    {
      id: 1,
      date: "2025-08-20",
      amount: 120.5,
      method: "Tarjeta de Crédito",
      status: "Completado",
    },
    {
      id: 2,
      date: "2025-08-21",
      amount: 75.0,
      method: "PayPal",
      status: "Pendiente",
    },
    {
      id: 3,
      date: "2025-08-23",
      amount: 50.99,
      method: "Transferencia Bancaria",
      status: "Fallido",
    },
  ];

export const checkoutCourse = {
    id: 101,
    title: "React Avanzado",
    instructor: "Juan Pérez",
    price: 49.99,
    currency: "USD",
    description: "Construye aplicaciones modernas con React y Next.js.",
  };
  
// Tarjeta mock (simulación)
export const mockCard = {
    number: "4111111111111111", // Visa test
    name: "Juan Pérez",
    expiry: "12/25",
    cvc: "123",
  };

export const paymentsHistory = [
    {
      id: 1,
      course: "React Avanzado",
      date: "2024-06-10",
      amount: 49.99,
      currency: "USD",
      status: "success",
    },
    {
      id: 2,
      course: "Diseño UI/UX",
      date: "2024-05-22",
      amount: 39.99,
      currency: "USD",
      status: "success",
    },
    {
      id: 3,
      course: "Bases de Datos SQL",
      date: "2024-05-10",
      amount: 29.99,
      currency: "USD",
      status: "failed",
    },
];