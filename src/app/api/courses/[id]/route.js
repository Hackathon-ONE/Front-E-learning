import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { query } from "@/lib/database";
import { coursesPageData } from "@/data/courses";

/**
 * Obtener información de un curso específico
 * GET /api/courses/[id]
 */
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const session = await getServerSession(authOptions);

    console.log('🔍 Obteniendo curso:', id, 'Usuario:', session?.user?.email);

    // Buscar el curso en la base de datos
    const dbResult = await query(
      'SELECT id, title, description, category, instructor_id, is_active, is_open, published FROM courses WHERE id = $1 AND is_active = true',
      [id]
    );

    if (dbResult.rows.length > 0) {
      const course = dbResult.rows[0];
      
      // Si es instructor, verificar que sea su curso
      if (session?.user?.role === 'INSTRUCTOR' && course.instructor_id !== session.user.id) {
        console.log('❌ Instructor intentando acceder a curso que no le pertenece');
        return NextResponse.json(
          { error: "No tienes permisos para ver este curso" },
          { status: 403 }
        );
      }

      console.log('✅ Curso encontrado en base de datos:', course.title);

      const courseData = {
        id: course.id,
        title: course.title,
        description: course.description,
        category: course.category,
        level: 'Intermedio', // Valor por defecto
        price: 0, // Valor por defecto
        instructorId: course.instructor_id,
        resourceUrl: null,
        imageUrl: '/courses/default.jpg',
        isFree: true,
        active: course.is_active,
        isOpen: course.is_open,
        published: course.published,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      return NextResponse.json(courseData);
    }

    // Fallback a mock data
    console.log('⚠️ Curso no encontrado en DB, buscando en mock data...');
    const course = coursesPageData.find(c => c.id.toString() === id.toString());
    
    if (!course) {
      return NextResponse.json(
        { error: "Curso no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(course);

  } catch (error) {
    console.error("Error obteniendo curso:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

/**
 * Actualizar un curso específico
 * PUT /api/courses/[id]
 */
export async function PUT(request, { params }) {
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
          message: "No tienes permisos para editar cursos",
          error: "FORBIDDEN"
        },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { title, description, category, level, price, resourceUrl, imageUrl } = body;

    // Validaciones
    if (!title || !description) {
      return NextResponse.json(
        { 
          success: false,
          message: "El título y la descripción son requeridos",
          error: "MISSING_FIELDS"
        },
        { status: 400 }
      );
    }

    if (!category) {
      return NextResponse.json(
        { 
          success: false,
          message: "La categoría es requerida",
          error: "MISSING_FIELDS"
        },
        { status: 400 }
      );
    }

    try {
      // Verificar que el curso existe y pertenece al instructor (si es instructor)
      const existingCourse = await query(
        'SELECT id, instructor_id FROM courses WHERE id = $1 AND is_active = true',
        [id]
      );

      if (existingCourse.rows.length === 0) {
        return NextResponse.json(
          { 
            success: false,
            message: "Curso no encontrado",
            error: "NOT_FOUND"
          },
          { status: 404 }
        );
      }

      // Si es instructor, verificar que sea su curso
      if (session.user.role === 'INSTRUCTOR' && existingCourse.rows[0].instructor_id !== session.user.id) {
        return NextResponse.json(
          { 
            success: false,
            message: "No tienes permisos para editar este curso",
            error: "FORBIDDEN"
          },
          { status: 403 }
        );
      }

      console.log('📝 Actualizando curso en base de datos:', id);
      
      // Actualizar curso en la base de datos
      const updateResult = await query(
        `UPDATE courses 
         SET title = $1, description = $2, category = $3, updated_at = $4
         WHERE id = $5 AND is_active = true
         RETURNING id, title, description, category, instructor_id, is_active, is_open, published`,
        [
          title.trim(),
          description.trim(),
          category.trim(),
          new Date().toISOString(),
          id
        ]
      );

      if (updateResult.rows.length === 0) {
        return NextResponse.json(
          { 
            success: false,
            message: "No se pudo actualizar el curso",
            error: "UPDATE_FAILED"
          },
          { status: 400 }
        );
      }

      const updatedCourse = updateResult.rows[0];
      console.log('✅ Curso actualizado en base de datos:', updatedCourse.title);

      return NextResponse.json(
        {
          success: true,
          message: "Curso actualizado exitosamente",
          course: {
            id: updatedCourse.id,
            title: updatedCourse.title,
            description: updatedCourse.description,
            category: updatedCourse.category,
            level: level || 'Intermedio',
            price: price || 0,
            instructorId: updatedCourse.instructor_id,
            resourceUrl: resourceUrl || null,
            imageUrl: imageUrl || '/courses/default.jpg',
            isFree: price === 0 || !price,
            active: updatedCourse.is_active,
            isOpen: updatedCourse.is_open,
            published: updatedCourse.published,
            updatedAt: new Date().toISOString()
          }
        },
        { status: 200 }
      );

    } catch (dbError) {
      console.error('❌ Error con base de datos:', dbError);
      
      return NextResponse.json(
        { 
          success: false,
          message: "Error actualizando curso en base de datos",
          error: "DATABASE_ERROR"
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error("Error actualizando curso:", error);
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
