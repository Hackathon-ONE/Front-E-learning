#!/usr/bin/env node

/**
 * Script para migrar todos los instructores del mock a la base de datos PostgreSQL
 * Organiza los datos correctamente según la estructura de la tabla users
 */

import { query } from '../lib/database.js';

// Instructores del mock que necesitan ser migrados
const mockInstructors = [
  {
    name: 'Benjamín Pérez',
    email: 'instructor@lumina.com',
    role: 'INSTRUCTOR',
    password: 'instructor123',
    image: '/avatars/img60.jpg',
  },
  {
    name: 'Marco Alonzo',
    email: 'marco@lumina.com',
    role: 'INSTRUCTOR',
    password: 'marco123',
    image: '/avatars/img53.jpg',
  },
  {
    name: 'Carlos Mora',
    email: 'carlos@lumina.com',
    role: 'INSTRUCTOR',
    password: 'carlosinstructor123',
    image: '/avatars/img55.jpg',
  },
  {
    name: 'Ana Torres',
    email: 'ana@lumina.com',
    role: 'INSTRUCTOR',
    password: 'anaadmin123',
    image: '/avatars/img33.jpg',
  },
  {
    name: 'Fernanda López',
    email: 'fernanda@lumina.com',
    role: 'INSTRUCTOR',
    password: 'fernandainstructor123',
    image: '/avatars/img38.jpg',
  },
  {
    name: 'Christian Velasco',
    email: 'christian@lumina.com',
    role: 'INSTRUCTOR',
    password: 'christian123',
    image: '/images/instructor.jpg',
  }
];

// Admins del mock que también necesitan ser migrados
const mockAdmins = [
  {
    name: 'Claudia Rodríguez',
    email: 'admin@lumina.com',
    role: 'ADMIN',
    password: 'admin123',
    image: '/avatars/img35.jpg',
  },
  {
    name: 'Lupita Rodríguez',
    email: 'lupita@lumina.com',
    role: 'ADMIN',
    password: 'lupita123',
    image: '/avatars/img48.jpg',
  },
  {
    name: 'José Martínez',
    email: 'jose@lumina.com',
    role: 'ADMIN',
    password: 'joseadmin123',
    image: '/avatars/img11.jpg',
  }
];

// Estudiantes del mock que también necesitan ser migrados
const mockStudents = [
  {
    name: 'Samuel Jimenez',
    email: 'samuel@example.com',
    role: 'STUDENT',
    password: 'samuel123',
    image: '/avatars/img12.jpg',
  },
  {
    name: 'Alicia Gómez',
    email: 'student@example.com',
    role: 'STUDENT',
    password: 'student123',
    image: '/avatars/img45.jpg',
  },
  {
    name: 'María López',
    email: 'maria@example.com',
    role: 'STUDENT',
    password: 'mariastudent123',
    image: '/avatars/img5.jpg',
  },
  {
    name: 'María Aponte',
    email: 'marian@example.com',
    role: 'STUDENT',
    password: 'mariastudent123',
    image: '/avatars/img44.jpg',
  },
  {
    name: 'Gustavo Pérez',
    email: 'gustavo@example.com',
    role: 'STUDENT',
    password: 'gustavostudent123',
    image: '/avatars/img15.jpg',
  },
  {
    name: 'Carla Martínez',
    email: 'carla@example.com',
    role: 'STUDENT',
    password: 'carla123',
    image: '/avatars/img16.jpg',
  },
  {
    name: 'Pedro Sánchez',
    email: 'pedro@example.com',
    role: 'STUDENT',
    password: 'pedrostudent123',
    image: '/avatars/img17.jpg',
  },
  {
    name: 'Laura Fernández',
    email: 'laura@example.com',
    role: 'STUDENT',
    password: 'laurastudent123',
    image: '/avatars/img22.jpg',
  },
  {
    name: 'Ana Hunt',
    email: 'anah@example.com',
    role: 'STUDENT',
    password: 'anastudent123',
    image: '/avatars/img25.jpg',
  }
];

async function migrateUsers() {
  try {
    console.log('🚀 Iniciando migración de usuarios del mock a la base de datos...\n');

    // Verificar usuarios existentes
    console.log('1. Verificando usuarios existentes...');
    const existingUsers = await query('SELECT email FROM users');
    const existingEmails = existingUsers.rows.map(row => row.email);
    console.log(`📋 ${existingEmails.length} usuarios ya existen en la base de datos`);

    // Función para migrar un grupo de usuarios
    const migrateUserGroup = async (users, groupName) => {
      console.log(`\n2. Migrando ${groupName}...`);
      let created = 0;
      let skipped = 0;

      for (const user of users) {
        try {
          // Verificar si el usuario ya existe
          if (existingEmails.includes(user.email)) {
            console.log(`⚠️  ${user.name} (${user.email}) ya existe, omitiendo...`);
            skipped++;
            continue;
          }

          // Insertar usuario en la base de datos
          const result = await query(
            `INSERT INTO users (full_name, email, password_hash, role, profile_photo, active, is_subscribed, created_at, updated_at) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
             RETURNING id, full_name, email, role`,
            [
              user.name,
              user.email,
              user.password, // En producción, aquí deberías hashear la contraseña
              user.role,
              user.image,
              true, // active
              false, // is_subscribed
              new Date().toISOString(),
              new Date().toISOString()
            ]
          );

          const newUser = result.rows[0];
          console.log(`✅ ${newUser.full_name} (${newUser.email}) creado con ID ${newUser.id}`);
          created++;

        } catch (error) {
          console.error(`❌ Error creando ${user.name}:`, error.message);
        }
      }

      console.log(`📊 ${groupName}: ${created} creados, ${skipped} omitidos`);
      return { created, skipped };
    };

    // Migrar todos los grupos
    const instructorsResult = await migrateUserGroup(mockInstructors, 'Instructores');
    const adminsResult = await migrateUserGroup(mockAdmins, 'Administradores');
    const studentsResult = await migrateUserGroup(mockStudents, 'Estudiantes');

    // Resumen final
    const totalCreated = instructorsResult.created + adminsResult.created + studentsResult.created;
    const totalSkipped = instructorsResult.skipped + adminsResult.skipped + studentsResult.skipped;

    console.log('\n🎉 Migración completada!');
    console.log(`📊 Resumen:`);
    console.log(`   • Total creados: ${totalCreated}`);
    console.log(`   • Total omitidos: ${totalSkipped}`);
    console.log(`   • Instructores: ${instructorsResult.created} creados`);
    console.log(`   • Administradores: ${adminsResult.created} creados`);
    console.log(`   • Estudiantes: ${studentsResult.created} creados`);

    // Verificar usuarios finales
    console.log('\n3. Verificando usuarios finales...');
    const finalUsers = await query('SELECT role, COUNT(*) as count FROM users GROUP BY role ORDER BY role');
    console.log('📋 Usuarios por rol:');
    finalUsers.rows.forEach(row => {
      console.log(`   • ${row.role}: ${row.count} usuarios`);
    });

  } catch (error) {
    console.error('❌ Error en la migración:', error);
  } finally {
    process.exit(0);
  }
}

migrateUsers();
