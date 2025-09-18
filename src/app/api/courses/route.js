import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { query } from '@/lib/database';
import { coursesPageData } from '@/data/courses';

/**
 * Obtener todos los cursos
 * GET /api/courses
 */
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(request.url);
    const instructorId = searchParams.get('instructorId');

    console.log('🔍 Obteniendo cursos de la base de datos...');
    console.log(
      '👤 Usuario autenticado:',
      session?.user?.email,
      'Rol:',
      session?.user?.role,
      'ID:',
      session?.user?.id
    );
    console.log('🔍 Session completa:', JSON.stringify(session, null, 2));

    let queryText, queryParams;

    // Si es instructor, solo mostrar sus cursos
    if (session?.user?.role === 'INSTRUCTOR' && session?.user?.id) {
      queryText =
        'SELECT id, title, description, category, instructor_id, is_active, is_open, published FROM courses WHERE is_active = true AND instructor_id = $1 ORDER BY id DESC';
      queryParams = [session.user.id];
      console.log('📚 Filtrando cursos para instructor:', session.user.id);
    }
    // Si es admin, mostrar todos los cursos
    else if (session?.user?.role === 'ADMIN') {
      queryText =
        'SELECT id, title, description, category, instructor_id, is_active, is_open, published FROM courses WHERE is_active = true ORDER BY id DESC';
      queryParams = [];
      console.log('📚 Mostrando todos los cursos para admin');
    }
    // Si hay instructorId específico en query params
    else if (instructorId) {
      queryText =
        'SELECT id, title, description, category, instructor_id, is_active, is_open, published FROM courses WHERE is_active = true AND instructor_id = $1 ORDER BY id DESC';
      queryParams = [instructorId];
      console.log('📚 Filtrando cursos para instructor específico:', instructorId);
    }
    // Por defecto, mostrar todos los cursos (para estudiantes)
    else {
      queryText =
        'SELECT id, title, description, category, instructor_id, is_active, is_open, published FROM courses WHERE is_active = true ORDER BY id DESC';
      queryParams = [];
      console.log('📚 Mostrando todos los cursos para estudiantes');
    }

    // Consultar cursos de la base de datos PostgreSQL
    const dbResult = await query(queryText, queryParams);

    if (dbResult.rows.length > 0) {
      console.log(`✅ ${dbResult.rows.length} cursos encontrados en base de datos`);

      const courses = dbResult.rows.map((course) => ({
        id: course.id,
        title: course.title,
        description: course.description,
        category: course.category,
        level: 'Intermedio', // Valor por defecto ya que no existe en la tabla
        price: 0, // Valor por defecto ya que no existe en la tabla
        instructorId: course.instructor_id,
        resourceUrl: null, // Valor por defecto ya que no existe en la tabla
        imageUrl: '/courses/default.jpg', // Valor por defecto
        isFree: true, // Valor por defecto ya que no existe en la tabla
        active: course.is_active,
        isOpen: course.is_open,
        published: course.published,
        createdAt: new Date().toISOString(), // Valor por defecto
        updatedAt: new Date().toISOString(), // Valor por defecto
      }));

      return NextResponse.json({
        success: true,
        message: 'Cursos obtenidos exitosamente desde base de datos',
        data: courses,
        count: courses.length,
        source: 'database',
        timestamp: new Date().toISOString(),
      });
    } else {
      console.log('⚠️ No hay cursos en base de datos, usando mock data...');

      // Fallback a coursesPageData si no hay cursos en la base de datos
      const courses = coursesPageData.map((course) => ({
        id: course.id,
        title: course.title,
        description: course.description,
        category: course.category,
        level: course.level,
        price: course.price,
        instructorId: course.instructorId,
        resourceUrl: course.resourceUrl,
        imageUrl: course.imageUrl,
        isFree: course.isFree,
        active: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));

      return NextResponse.json({
        success: true,
        message: 'Cursos obtenidos desde mock data (fallback)',
        data: courses,
        count: courses.length,
        source: 'mock',
        timestamp: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.error('❌ Error obteniendo cursos de base de datos:', error);

    // Fallback a coursesPageData en caso de error
    console.log('⚠️ Error de DB, usando fallback a mock data...');
    try {
      const courses = coursesPageData.map((course) => ({
        id: course.id,
        title: course.title,
        description: course.description,
        category: course.category,
        level: course.level,
        price: course.price,
        instructorId: course.instructorId,
        resourceUrl: course.resourceUrl,
        imageUrl: course.imageUrl,
        isFree: course.isFree,
        active: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));

      return NextResponse.json({
        success: true,
        message: 'Cursos obtenidos desde mock data (fallback por error)',
        data: courses,
        count: courses.length,
        source: 'mock-fallback',
        timestamp: new Date().toISOString(),
      });
    } catch (fallbackError) {
      console.error('❌ Error en fallback:', fallbackError);
      return NextResponse.json(
        {
          success: false,
          message: 'Error interno del servidor',
          error: 'INTERNAL_ERROR',
        },
        { status: 500 }
      );
    }
  }
}

/**
 * Crear un nuevo curso
 * POST /api/courses
 */
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    // Verificar autenticación
    if (!session?.user) {
      return NextResponse.json(
        {
          success: false,
          message: 'No autenticado',
          error: 'UNAUTHORIZED',
        },
        { status: 401 }
      );
    }

    // Verificar que sea instructor o admin
    if (!['INSTRUCTOR', 'ADMIN'].includes(session.user.role)) {
      return NextResponse.json(
        {
          success: false,
          message: 'No tienes permisos para crear cursos',
          error: 'FORBIDDEN',
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
          message: 'El título y la descripción son requeridos',
          error: 'MISSING_FIELDS',
        },
        { status: 400 }
      );
    }

    if (!category || !level) {
      return NextResponse.json(
        {
          success: false,
          message: 'La categoría y el nivel son requeridos',
          error: 'MISSING_FIELDS',
        },
        { status: 400 }
      );
    }

    try {
      console.log('📝 Creando curso en base de datos:', title);

      // Crear curso en la base de datos
      const insertResult = await query(
        `INSERT INTO courses (title, description, category, instructor_id, is_active, is_open, published) 
         VALUES ($1, $2, $3, $4, $5, $6, $7) 
         RETURNING id, title, description, category, instructor_id, is_active, is_open, published`,
        [
          title.trim(),
          description.trim(),
          category.trim(),
          session.user.id,
          true, // is_active
          true, // is_open
          true, // published
        ]
      );

      const newCourse = insertResult.rows[0];
      console.log('✅ Curso creado en base de datos:', {
        id: newCourse.id,
        title: newCourse.title,
        instructorId: newCourse.instructor_id,
      });

      return NextResponse.json(
        {
          success: true,
          message: 'Curso creado exitosamente',
          course: {
            id: newCourse.id,
            title: newCourse.title,
            description: newCourse.description,
            category: newCourse.category,
            level: level || 'Intermedio', // Usar el nivel del formulario
            price: price || 0, // Usar el precio del formulario
            instructorId: newCourse.instructor_id,
            resourceUrl: resourceUrl || null,
            imageUrl: imageUrl || '/courses/default.jpg',
            isFree: price === 0 || !price,
            active: newCourse.is_active,
            isOpen: newCourse.is_open,
            published: newCourse.published,
            createdAt: new Date().toISOString(),
          },
        },
        { status: 201 }
      );
    } catch (dbError) {
      console.error('❌ Error con base de datos:', dbError);

      // Fallback: simular creación exitosa (para desarrollo)
      const mockCourse = {
        id: `course_${Date.now()}`,
        title: title.trim(),
        description: description.trim(),
        category: category.trim(),
        level: level.trim(),
        price: price || 0,
        instructorId: session.user.id,
        resourceUrl: resourceUrl || null,
        imageUrl: imageUrl || '/courses/default.jpg',
        isFree: price === 0 || !price,
        active: true,
        createdAt: new Date().toISOString(),
      };

      console.log('✅ Curso creado en mock data (fallback):', {
        id: mockCourse.id,
        title: mockCourse.title,
        instructorId: mockCourse.instructorId,
      });

      return NextResponse.json(
        {
          success: true,
          message: 'Curso creado exitosamente (fallback)',
          course: mockCourse,
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error('Error creando curso:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error interno del servidor',
        error: 'INTERNAL_ERROR',
      },
      { status: 500 }
    );
  }
}
