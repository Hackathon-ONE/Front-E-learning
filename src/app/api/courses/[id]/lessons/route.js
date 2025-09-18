import { NextResponse } from 'next/server';
import { query } from '@/lib/database';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    console.log(`📖 Obteniendo lecciones del curso ${id}...`);

    const result = await query(`
      SELECT 
        l.id,
        l.course_id,
        l.title,
        l.order_index,
        l.duration
      FROM lessons l
      WHERE l.course_id = $1
      ORDER BY l.order_index ASC
    `, [id]);

    const lessons = result.rows.map(lesson => ({
      id: lesson.id,
      courseId: lesson.course_id,
      title: lesson.title,
      description: 'Lección del curso', // Valor por defecto
      videoUrl: '/video/default.mp4', // Valor por defecto
      duration: lesson.duration || '0:00', // Usar duración de la DB o valor por defecto
      order: lesson.order_index,
      completed: false, // Valor por defecto
      createdAt: new Date().toISOString() // Valor por defecto
    }));

    console.log(`✅ ${lessons.length} lecciones encontradas para el curso ${id}`);

    return NextResponse.json({
      success: true,
      lessons: lessons
    });

  } catch (error) {
    console.error(`❌ Error al obtener lecciones del curso ${id}:`, error);
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
