import { NextResponse } from 'next/server';
import { query } from '@/lib/database';

export async function GET() {
  try {
    console.log('📚 Obteniendo cursos de la base de datos...');

    const result = await query(`
      SELECT 
        c.id,
        c.title,
        c.description,
        c.category,
        c.instructor_id,
        c.is_active,
        c.is_open,
        c.published,
        u.full_name as instructor_name,
        u.profile_photo as instructor_avatar
      FROM courses c
      LEFT JOIN users u ON c.instructor_id = u.id
      ORDER BY c.id DESC
    `);

    const courses = result.rows.map(course => ({
      id: course.id,
      title: course.title,
      description: course.description,
      cover: '/default-course.jpg', // Valor por defecto
      price: 0, // Valor por defecto
      currency: 'USD', // Valor por defecto
      isFree: true, // Valor por defecto
      category: course.category,
      instructor: course.instructor_name,
      instructorAvatar: course.instructor_avatar,
      lessons: 0, // Valor por defecto
      duration: '0h 0m', // Valor por defecto
      students: 0, // Valor por defecto
      objectives: [], // Valor por defecto
      isActive: course.is_active,
      isOpen: course.is_open,
      published: course.published,
      createdAt: new Date().toISOString() // Valor por defecto
    }));

    console.log(`✅ ${courses.length} cursos encontrados`);

    return NextResponse.json({
      success: true,
      courses: courses
    });

  } catch (error) {
    console.error('❌ Error al obtener cursos:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error interno del servidor',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
