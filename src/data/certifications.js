import { Award, Medal, GraduationCap } from "lucide-react";

export const certificationsMock = [
  {
    id: 1,
    title: "Frontend Developer",
    description: "Certificado en desarrollo web con React y Next.js",
    icon: <GraduationCap className="w-10 h-10 text-blue-500" />,
  },
  {
    id: 2,
    title: "JavaScript Mastery",
    description: "Badge avanzado en JavaScript moderno",
    icon: <Medal className="w-10 h-10 text-yellow-500" />,
  },
  {
    id: 3,
    title: "UI/UX Design",
    description: "Certificación en diseño de interfaces y experiencia de usuario",
    icon: <Award className="w-10 h-10 text-green-500" />,
  },
];
