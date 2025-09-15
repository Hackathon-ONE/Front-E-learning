import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { coursesPageData } from "@/data/courses";

/**
 * Verificar suscripción de un usuario a un curso específico
 * GET /api/subscriptions/[id]
 */
export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    // Debug logging
    console.log('🔍 API Subscriptions GET - ID recibido:', id);
    console.log('🔍 API Subscriptions GET - Params completos:', params);
    
    if (!id || id === 'undefined') {
      console.error('❌ API Subscriptions GET - ID inválido:', id);
      return NextResponse.json(
        { subscribed: false, error: "ID de curso inválido" },
        { status: 400 }
      );
    }
    
    const session = await getServerSession(authOptions);

    // Verificar autenticación
    if (!session?.user) {
      return NextResponse.json(
        { subscribed: false, error: "No autenticado" },
        { status: 401 }
      );
    }

    // Buscar el curso
    const course = coursesPageData.find(c => c.id.toString() === id.toString());
    if (!course) {
      return NextResponse.json(
        { subscribed: false, error: "Curso no encontrado" },
        { status: 404 }
      );
    }

    // Si el curso es gratuito, acceso libre
    if (course.isFree) {
      return NextResponse.json({
        subscribed: true,
        hasAccess: true,
        course: {
          id: course.id,
          title: course.title,
          isFree: course.isFree
        }
      });
    }

    // Verificar suscripción del usuario (simulación con datos mock)
    // En producción, esto vendría de la base de datos
    const userId = session.user.id;
    const userSubscriptions = await getUserSubscriptions(userId);
    
    const isSubscribed = userSubscriptions.includes(parseInt(id));

    return NextResponse.json({
      subscribed: isSubscribed,
      hasAccess: isSubscribed,
      course: {
        id: course.id,
        title: course.title,
        isFree: course.isFree
      }
    });

  } catch (error) {
    console.error("Error verificando suscripción:", error);
    return NextResponse.json(
      { subscribed: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

/**
 * Crear suscripción a un curso
 * POST /api/subscriptions/[id]
 */
export async function POST(request, { params }) {
  try {
    const { id } = params;
    const session = await getServerSession(authOptions);

    // Verificar autenticación
    if (!session?.user) {
      return NextResponse.json(
        { error: "No autenticado" },
        { status: 401 }
      );
    }

    // Buscar el curso
    const course = coursesPageData.find(c => c.id.toString() === id.toString());
    if (!course) {
      return NextResponse.json(
        { error: "Curso no encontrado" },
        { status: 404 }
      );
    }

    // Si es gratuito, no necesita suscripción
    if (course.isFree) {
      return NextResponse.json({
        subscribed: true,
        message: "Curso gratuito - acceso automático"
      });
    }

    // Simular creación de suscripción
    // En producción, esto guardaría en la base de datos
    const userId = session.user.id;
    await createUserSubscription(userId, parseInt(id));

    return NextResponse.json({
      subscribed: true,
      message: "Suscripción creada exitosamente"
    });

  } catch (error) {
    console.error("Error creando suscripción:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

/**
 * Función helper para obtener suscripciones del usuario (mock)
 * En producción, esto consultaría la base de datos
 */
async function getUserSubscriptions(userId) {
  // Simulación de suscripciones por usuario
  const mockSubscriptions = {
    "1": [1, 2, 3], // Admin tiene acceso a todo
    "2": [1, 2], // Instructor tiene acceso a algunos
    "3": [2], // Estudiante solo al curso 2 (gratuito)
    "4": [1, 2, 3], // Alicia tiene acceso completo
    // Otros usuarios sin suscripciones
  };

  return mockSubscriptions[userId] || [];
}

/**
 * Función helper para crear suscripción (mock)
 * En producción, esto guardaría en la base de datos
 */
async function createUserSubscription(userId, courseId) {
  // Simulación de creación de suscripción
  console.log(`Creando suscripción: Usuario ${userId} -> Curso ${courseId}`);
  
  // En producción, aquí se guardaría en la base de datos
  // await db.subscriptions.create({ userId, courseId, createdAt: new Date() });
  
  return true;
}
