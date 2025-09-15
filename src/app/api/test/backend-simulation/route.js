/**
 * Endpoints de simulación del backend Java/Spring Boot
 * Para testear la integración frontend ↔ backend
 */

import { NextResponse } from 'next/server';

// Simular estructura de respuesta del backend Java
const mockBackendResponse = {
  success: true,
  message: "Operación exitosa",
  data: null,
  timestamp: new Date().toISOString(),
  status: 200
};

// Simular usuarios del backend Java
const mockUsers = [
  {
    id: 1,
    email: "admin@lumina.com",
    name: "Administrador",
    role: "ADMIN",
    image: "/default-avatar.png",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-12-01T00:00:00Z"
  },
  {
    id: 2,
    email: "instructor@lumina.com", 
    name: "Instructor Principal",
    role: "INSTRUCTOR",
    image: "/default-avatar.png",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-12-01T00:00:00Z"
  },
  {
    id: 3,
    email: "student@lumina.com",
    name: "Estudiante",
    role: "STUDENT", 
    image: "/default-avatar.png",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-12-01T00:00:00Z"
  }
];

// Simular cursos del backend Java
const mockCourses = [
  {
    id: 1,
    title: "React Avanzado",
    description: "Construye aplicaciones modernas con React y Next.js",
    cover: "/images/react-nextjs.png",
    category: "Frontend",
    level: "Avanzado",
    price: 99.99,
    isFree: false,
    instructorId: 2,
    instructorName: "Instructor Principal",
    duration: "10h 45m",
    studentsCount: 520,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-12-01T00:00:00Z"
  },
  {
    id: 2,
    title: "Introducción a React",
    description: "Aprende los fundamentos de React",
    cover: "/images/react.png", 
    category: "Frontend",
    level: "Principiante",
    price: 0.00,
    isFree: true,
    instructorId: 2,
    instructorName: "Instructor Principal",
    duration: "8h 10m",
    studentsCount: 320,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-12-01T00:00:00Z"
  }
];

// Simular lecciones del backend Java
const mockLessons = [
  {
    id: 1,
    courseId: 1,
    title: "Introducción a React Hooks",
    description: "Aprende sobre useState y useEffect",
    videoUrl: "/video/video1.mp4",
    duration: "45m",
    orderIndex: 1,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-12-01T00:00:00Z"
  },
  {
    id: 2,
    courseId: 1,
    title: "Context API y Redux",
    description: "Manejo de estado global",
    videoUrl: "/video/video2.mp4", 
    duration: "60m",
    orderIndex: 2,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-12-01T00:00:00Z"
  }
];

// Simular suscripciones del backend Java
const mockSubscriptions = [
  {
    id: 1,
    userId: 3,
    courseId: 1,
    status: "ACTIVE",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-12-01T00:00:00Z"
  }
];

// GET /api/test/backend-simulation/users
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get('endpoint');

  try {
    switch (endpoint) {
      case 'users':
        return NextResponse.json({
          ...mockBackendResponse,
          data: mockUsers
        });

      case 'courses':
        return NextResponse.json({
          ...mockBackendResponse,
          data: mockCourses
        });

      case 'lessons':
        const courseId = searchParams.get('courseId');
        const lessons = courseId ? 
          mockLessons.filter(l => l.courseId === parseInt(courseId)) : 
          mockLessons;
        return NextResponse.json({
          ...mockBackendResponse,
          data: lessons
        });

      case 'subscriptions':
        const userId = searchParams.get('userId');
        const subscriptions = userId ? 
          mockSubscriptions.filter(s => s.userId === parseInt(userId)) : 
          mockSubscriptions;
        return NextResponse.json({
          ...mockBackendResponse,
          data: subscriptions
        });

      case 'auth':
        return NextResponse.json({
          ...mockBackendResponse,
          data: {
            user: mockUsers[0],
            token: "mock-jwt-token-12345",
            expiresIn: 3600
          }
        });

      default:
        return NextResponse.json({
          success: false,
          message: "Endpoint no encontrado",
          data: null,
          timestamp: new Date().toISOString(),
          status: 404
        }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error interno del servidor",
      data: null,
      timestamp: new Date().toISOString(),
      status: 500
    }, { status: 500 });
  }
}

// POST /api/test/backend-simulation
export async function POST(request) {
  try {
    const body = await request.json();
    const { action, data } = body;

    switch (action) {
      case 'login':
        const { email, password } = data;
        const user = mockUsers.find(u => u.email === email);
        
        if (user && password === 'password123') {
          return NextResponse.json({
            ...mockBackendResponse,
            data: {
              user,
              token: "mock-jwt-token-12345",
              expiresIn: 3600
            }
          });
        } else {
          return NextResponse.json({
            success: false,
            message: "Credenciales inválidas",
            data: null,
            timestamp: new Date().toISOString(),
            status: 401
          }, { status: 401 });
        }

      case 'subscribe':
        const { userId, courseId } = data;
        const newSubscription = {
          id: mockSubscriptions.length + 1,
          userId,
          courseId,
          status: "ACTIVE",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        mockSubscriptions.push(newSubscription);
        
        return NextResponse.json({
          ...mockBackendResponse,
          data: newSubscription
        });

      case 'updateProgress':
        const { userId: progressUserId, courseId: progressCourseId, lessonId, completed } = data;
        return NextResponse.json({
          ...mockBackendResponse,
          data: {
            userId: progressUserId,
            courseId: progressCourseId,
            lessonId,
            completed,
            updatedAt: new Date().toISOString()
          }
        });

      default:
        return NextResponse.json({
          success: false,
          message: "Acción no soportada",
          data: null,
          timestamp: new Date().toISOString(),
          status: 400
        }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error procesando solicitud",
      data: null,
      timestamp: new Date().toISOString(),
      status: 500
    }, { status: 500 });
  }
}
