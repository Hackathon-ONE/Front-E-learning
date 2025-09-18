import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { query } from "@/lib/database";

/**
 * Obtener lecciones de un curso específico
 * GET /api/courses/[id]/lessons
 */
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const session = await getServerSession(authOptions);

    console.log('🔍 Obteniendo lecciones del curso:', id);

    // Verificar que el curso existe y pertenece al instructor (si es instructor)
    const courseResult = await query(
      'SELECT id, instructor_id FROM courses WHERE id = $1 AND is_active = true',
      [id]
    );

    if (courseResult.rows.length === 0) {
      return NextResponse.json(
        { error: "Curso no encontrado" },
        { status: 404 }
      );
    }

    const course = courseResult.rows[0];

    // Si es instructor, verificar que sea su curso
    if (session?.user?.role === 'INSTRUCTOR' && course.instructor_id !== session.user.id) {
      return NextResponse.json(
        { error: "No tienes permisos para ver las lecciones de este curso" },
        { status: 403 }
      );
    }

    // Buscar lecciones en la base de datos
    const lessonsResult = await query(
      'SELECT id, title, description, video_url, duration, order_index, is_published FROM lessons WHERE course_id = $1 AND is_active = true ORDER BY order_index ASC',
      [id]
    );

    if (lessonsResult.rows.length > 0) {
      console.log(`✅ ${lessonsResult.rows.length} lecciones encontradas para el curso ${id}`);
      
      const lessons = lessonsResult.rows.map(lesson => ({
        id: lesson.id,
        title: lesson.title,
        description: lesson.description,
        videoUrl: lesson.video_url,
        duration: lesson.duration || '0:00',
        orderIndex: lesson.order_index,
        isPublished: lesson.is_published,
        courseId: id
      }));

      return NextResponse.json({
        success: true,
        message: "Lecciones obtenidas exitosamente",
        data: lessons,
        count: lessons.length,
        courseId: id
      });
    } else {
      console.log('⚠️ No hay lecciones para el curso:', id);
      
      // Retornar array vacío si no hay lecciones
      return NextResponse.json({
        success: true,
        message: "No hay lecciones para este curso",
        data: [],
        count: 0,
        courseId: id
      });
    }

  } catch (error) {
    console.error("Error obteniendo lecciones:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

/**
 * Crear una nueva lección para un curso
 * POST /api/courses/[id]/lessons
 */
export async function POST(request, { params }) {
  try {
    const { id } = params;
    const session = await getServerSession(authOptions);

    // Verificar autenticación
    if (!session?.user) {
      return NextResponse.json(
        { 
          success: false,
          message: "No autenticado",
          error: "UNAUTHORIZED"
        },
        { status: 401 }
      );
    }

    // Verificar que sea instructor o admin
    if (!['INSTRUCTOR', 'ADMIN'].includes(session.user.role)) {
      return NextResponse.json(
        { 
          success: false,
          message: "No tienes permisos para crear lecciones",
          error: "FORBIDDEN"
        },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { title, description, videoUrl, duration, orderIndex } = body;

    // Validaciones
    if (!title) {
      return NextResponse.json(
        { 
          success: false,
          message: "El título es requerido",
          error: "MISSING_FIELDS"
        },
        { status: 400 }
      );
    }

    // Verificar que el curso existe y pertenece al instructor
    const courseResult = await query(
      'SELECT id, instructor_id FROM courses WHERE id = $1 AND is_active = true',
      [id]
    );

    if (courseResult.rows.length === 0) {
      return NextResponse.json(
        { 
          success: false,
          message: "Curso no encontrado",
          error: "NOT_FOUND"
        },
        { status: 404 }
      );
    }

    const course = courseResult.rows[0];

    // Si es instructor, verificar que sea su curso
    if (session.user.role === 'INSTRUCTOR' && course.instructor_id !== session.user.id) {
      return NextResponse.json(
        { 
          success: false,
          message: "No tienes permisos para crear lecciones en este curso",
          error: "FORBIDDEN"
        },
        { status: 403 }
      );
    }

    try {
      console.log('📝 Creando lección para el curso:', id);
      
      // Crear lección en la base de datos
      const insertResult = await query(
        `INSERT INTO lessons (course_id, title, description, video_url, duration, order_index, is_published, is_active, created_at, updated_at) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
         RETURNING id, title, description, video_url, duration, order_index, is_published`,
        [
          id,
          title.trim(),
          description?.trim() || null,
          videoUrl || null,
          duration || '0:00',
          orderIndex || 1,
          true, // is_published
          true, // is_active
          new Date().toISOString(),
          new Date().toISOString()
        ]
      );

      const newLesson = insertResult.rows[0];
      console.log('✅ Lección creada:', newLesson.title);

      return NextResponse.json(
        {
          success: true,
          message: "Lección creada exitosamente",
          lesson: {
            id: newLesson.id,
            title: newLesson.title,
            description: newLesson.description,
            videoUrl: newLesson.video_url,
            duration: newLesson.duration,
            orderIndex: newLesson.order_index,
            isPublished: newLesson.is_published,
            courseId: id
          }
        },
        { status: 201 }
      );

    } catch (dbError) {
      console.error('❌ Error con base de datos:', dbError);
      
      return NextResponse.json(
        { 
          success: false,
          message: "Error creando lección en base de datos",
          error: "DATABASE_ERROR"
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error("Error creando lección:", error);
    return NextResponse.json(
      { 
        success: false,
        message: "Error interno del servidor",
        error: "INTERNAL_ERROR"
      },
      { status: 500 }
    );
  }
}
