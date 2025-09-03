export const notificationsByRole = {
    student: [
      { id: 1, message: "Tienes un nuevo curso disponible", read: false },
      { id: 2, message: "Tu progreso fue actualizado", read: true },
    ],
    instructor: [
      { id: 1, message: "Tu curso ha sido aprobado", read: false },
      { id: 2, message: "Nuevo estudiante inscrito en tu curso", read: false },
    ],
  };
  
export const notificationsDashboard = [
  { id: 1, message: "Hay 3 nuevas solicitudes de instructores pendientes", read: false },
  { id: 2, message: "Un curso fue reportado por un estudiante", read: false },
];