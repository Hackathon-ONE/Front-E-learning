import { NextResponse } from 'next/server';
import { query } from '@/lib/database';
import { coursesPageData, coursesDetailData, vercelLessonsPlayerData } from '@/data/courses';

export async function POST() {
  try {
    console.log('🔄 Iniciando sincronización de cursos con la base de datos...');

    // 1. Crear instructores en la tabla users si no existen
    console.log('1. Verificando y creando instructores en la tabla users...');

    // Lista de instructores necesarios para los cursos
    const requiredInstructors = [
      { name: 'Marco Alonzo', email: 'marco.alonzo@lumina.com' },
      { name: 'Benjamín Pérez', email: 'benjamin.perez@lumina.com' },
      { name: 'Ana Torres', email: 'ana.torres@lumina.com' },
      { name: 'Carlos Mora', email: 'carlos.mora@lumina.com' },
      { name: 'Fernanda López', email: 'fernanda.lopez@lumina.com' },
      { name: 'María Gómez', email: 'maria.gomez@lumina.com' },
      { name: 'Carlos Rodríguez', email: 'carlos.rodriguez@lumina.com' },
    ];

    for (const instructor of requiredInstructors) {
      try {
        // Verificar si el instructor ya existe
        const existingInstructor = await query(
          "SELECT id FROM users WHERE full_name = $1 AND role = 'INSTRUCTOR'",
          [instructor.name]
        );

        if (existingInstructor.rows.length === 0) {
          // Crear instructor
          await query(
            `INSERT INTO users (full_name, email, password_hash, role, profile_photo, active, is_subscribed) 
             VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [
              instructor.name,
              instructor.email,
              'instructor_password', // Contraseña por defecto
              'INSTRUCTOR',
              '/default-avatar.png',
              true, // active
              false, // is_subscribed
            ]
          );
          console.log(`✅ Instructor creado: ${instructor.name}`);
        } else {
          console.log(`⚠️ Instructor ya existe: ${instructor.name}`);
        }
      } catch (error) {
        console.error(`❌ Error creando instructor ${instructor.name}:`, error.message);
      }
    }

    // Verificar instructores existentes
    const instructorsResult = await query(
      "SELECT id, full_name, email FROM users WHERE role = 'INSTRUCTOR'"
    );
    console.log(`   ${instructorsResult.rows.length} instructores encontrados en users`);
    instructorsResult.rows.forEach((instructor) => {
      console.log(`   - ${instructor.full_name} (${instructor.email}) - ID: ${instructor.id}`);
    });

    // 2. Sincronizar cursos
    console.log('2. Sincronizando cursos...');
    for (const course of coursesPageData) {
      try {
        // Verificar si el curso ya existe (por título)
        const existingCourse = await query('SELECT id FROM courses WHERE title = $1', [
          course.title,
        ]);

        if (existingCourse.rows.length === 0) {
          // Obtener el instructor del curso desde la tabla users
          const instructorResult = await query(
            "SELECT id FROM users WHERE full_name = $1 AND role = 'INSTRUCTOR'",
            [course.instructor]
          );

          const instructorId = instructorResult.rows[0]?.id || null;

          // Crear curso (sin especificar ID, dejar que se auto-genere)
          await query(
            `INSERT INTO courses (title, description, category, instructor_id, is_active, is_open, published) 
             VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [
              course.title,
              course.description,
              course.category,
              instructorId,
              true, // is_active
              true, // is_open
              true, // published
            ]
          );
          console.log(`✅ Curso creado: ${course.title}`);
        } else {
          console.log(`⚠️ Curso ya existe: ${course.title}`);
        }
      } catch (error) {
        console.error(`❌ Error creando curso ${course.title}:`, error.message);
      }
    }

    // 3. Sincronizar lecciones del curso de Vercel
    console.log('3. Sincronizando lecciones del curso de Vercel...');

    // Buscar el ID real del curso de Vercel en la base de datos
    const vercelCourseResult = await query('SELECT id FROM courses WHERE title = $1', [
      'Despliegue con Vercel',
    ]);

    if (vercelCourseResult.rows.length > 0) {
      const vercelCourseId = vercelCourseResult.rows[0].id;
      console.log(`   Curso de Vercel encontrado con ID: ${vercelCourseId}`);

      for (const lesson of vercelLessonsPlayerData) {
        try {
          // Verificar si la lección ya existe
          const existingLesson = await query(
            'SELECT id FROM lessons WHERE course_id = $1 AND title = $2',
            [vercelCourseId, lesson.title]
          );

          if (existingLesson.rows.length === 0) {
            // Crear lección
            await query(
              `INSERT INTO lessons (course_id, title, order_index, duration) 
               VALUES ($1, $2, $3, $4)`,
              [
                vercelCourseId,
                lesson.title,
                lesson.id,
                lesson.duration || '00:15:00', // Duración por defecto
              ]
            );
            console.log(`✅ Lección creada: ${lesson.title}`);
          } else {
            console.log(`⚠️ Lección ya existe: ${lesson.title}`);
          }
        } catch (error) {
          console.error(`❌ Error creando lección ${lesson.title}:`, error.message);
        }
      }
    } else {
      console.log('❌ Curso de Vercel no encontrado en la base de datos');
    }

    // 4. Verificar resultados
    const coursesCount = await query('SELECT COUNT(*) as count FROM courses');
    const instructorsCount = await query(
      "SELECT COUNT(*) as count FROM users WHERE role = 'INSTRUCTOR'"
    );
    const lessonsCount = await query('SELECT COUNT(*) as count FROM lessons');

    console.log('📊 Resumen de sincronización:');
    console.log(`   Cursos: ${coursesCount.rows[0].count}`);
    console.log(`   Instructores: ${instructorsCount.rows[0].count}`);
    console.log(`   Lecciones: ${lessonsCount.rows[0].count}`);

    return NextResponse.json({
      success: true,
      message: 'Sincronización completada exitosamente',
      data: {
        courses: parseInt(coursesCount.rows[0].count),
        instructors: parseInt(instructorsCount.rows[0].count),
        lessons: parseInt(lessonsCount.rows[0].count),
      },
    });
  } catch (error) {
    console.error('❌ Error en sincronización:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Error interno del servidor',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
