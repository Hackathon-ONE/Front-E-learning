#!/usr/bin/env node

/**
 * Script para verificar la estructura de la base de datos PostgreSQL
 * Verifica qué tablas existen y su estructura
 */

import { query } from '../lib/database.js';

async function checkDatabaseSchema() {
  try {
    console.log('🔍 Verificando estructura de la base de datos...\n');

    // Verificar conexión
    console.log('1. Probando conexión a la base de datos...');
    const connectionTest = await query('SELECT NOW() as current_time');
    console.log('✅ Conexión exitosa:', connectionTest.rows[0].current_time);

    // Listar todas las tablas
    console.log('\n2. Listando tablas existentes...');
    const tablesResult = await query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `);
    
    console.log('📋 Tablas encontradas:');
    tablesResult.rows.forEach(row => {
      console.log(`  - ${row.table_name}`);
    });

    // Verificar tabla de usuarios
    console.log('\n3. Verificando tabla de usuarios...');
    const usersColumns = await query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns 
      WHERE table_name = 'users' 
      ORDER BY ordinal_position
    `);
    
    if (usersColumns.rows.length > 0) {
      console.log('✅ Tabla users encontrada:');
      usersColumns.rows.forEach(col => {
        console.log(`  - ${col.column_name}: ${col.data_type} (${col.is_nullable === 'YES' ? 'nullable' : 'not null'})`);
      });
    } else {
      console.log('❌ Tabla users no encontrada');
    }

    // Verificar tabla de cursos
    console.log('\n4. Verificando tabla de cursos...');
    const coursesColumns = await query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns 
      WHERE table_name = 'courses' 
      ORDER BY ordinal_position
    `);
    
    if (coursesColumns.rows.length > 0) {
      console.log('✅ Tabla courses encontrada:');
      coursesColumns.rows.forEach(col => {
        console.log(`  - ${col.column_name}: ${col.data_type} (${col.is_nullable === 'YES' ? 'nullable' : 'not null'})`);
      });
    } else {
      console.log('❌ Tabla courses no encontrada - Necesita ser creada');
    }

    // Contar registros en cada tabla
    console.log('\n5. Contando registros...');
    
    if (tablesResult.rows.some(row => row.table_name === 'users')) {
      const userCount = await query('SELECT COUNT(*) as count FROM users');
      console.log(`👥 Usuarios: ${userCount.rows[0].count}`);
    }

    if (tablesResult.rows.some(row => row.table_name === 'courses')) {
      const courseCount = await query('SELECT COUNT(*) as count FROM courses');
      console.log(`📚 Cursos: ${courseCount.rows[0].count}`);
    }

    console.log('\n✅ Verificación completada');

  } catch (error) {
    console.error('❌ Error verificando base de datos:', error);
  } finally {
    process.exit(0);
  }
}

checkDatabaseSchema();
