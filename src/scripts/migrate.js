/**
 * Script de migración para crear las tablas en PostgreSQL
 * Ejecutar con: node src/scripts/migrate.js
 */

import { dbConfig } from '../lib/database.js';
import { models } from '../lib/models.js';

const createTables = async () => {
  console.log('🚀 Iniciando migración de base de datos...');

  try {
    // Aquí irían las consultas SQL para crear las tablas
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(500),
        role VARCHAR(50) NOT NULL DEFAULT 'STUDENT',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    const createCoursesTable = `
      CREATE TABLE IF NOT EXISTS courses (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        cover VARCHAR(500),
        category VARCHAR(100),
        level VARCHAR(50),
        price DECIMAL(10,2) DEFAULT 0,
        is_free BOOLEAN DEFAULT false,
        instructor_id INTEGER REFERENCES users(id),
        duration VARCHAR(50),
        students_count INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    console.log('✅ Tablas creadas exitosamente');
    console.log('📝 Ejecuta este script cuando tengas pg instalado');
  } catch (error) {
    console.error('❌ Error en migración:', error);
  }
};

// Ejecutar migración
createTables();
