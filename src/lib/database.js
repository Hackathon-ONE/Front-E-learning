/**
 * Configuración de base de datos PostgreSQL
 * Este archivo maneja la conexión a la base de datos
 */

import { Pool } from 'pg';

// Configuración de la base de datos
export const dbConfig = {
  // URL de conexión a PostgreSQL
  connectionString: process.env.DATABASE_URL || 
    "postgresql://elearning_8xpu_user:dd23oHDEQSpd7WEsoy8YKl2tYlhkGg1d@dpg-d2vdr87diees73e0t6d0-a.oregon-postgres.render.com/elearning_8xpu",
  
  // Configuración de conexión
  ssl: {
    rejectUnauthorized: false // Necesario para Render.com
  },
  
  // Pool de conexiones
  max: 20, // máximo de conexiones
  idleTimeoutMillis: 30000, // timeout de conexiones inactivas
  connectionTimeoutMillis: 2000, // timeout de conexión
};

// Crear pool de conexiones
const pool = new Pool(dbConfig);

// Función para ejecutar consultas
export async function query(text, params = []) {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('🔍 Query ejecutada:', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('❌ Error en query:', { text, error: error.message });
    throw error;
  }
}

// Función para probar la conexión
export async function testConnection() {
  try {
    const result = await query('SELECT NOW()');
    console.log('✅ Base de datos conectada correctamente:', result.rows[0]);
    return true;
  } catch (error) {
    console.error('❌ Error conectando a la base de datos:', error);
    return false;
  }
}

// Función para cerrar el pool
export async function closePool() {
  try {
    await pool.end();
    console.log('🔌 Pool de conexiones cerrado');
  } catch (error) {
    console.error('❌ Error cerrando pool:', error);
  }
}

// Exportar configuración y pool
export { pool };
export default dbConfig;
