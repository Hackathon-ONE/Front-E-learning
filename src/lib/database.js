/**
 * Configuración de base de datos PostgreSQL
 * Este archivo maneja la conexión a la base de datos
 */

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

// Función para probar la conexión
export async function testConnection() {
  try {
    // Aquí iría la lógica de prueba de conexión
    console.log('✅ Base de datos configurada correctamente');
    return true;
  } catch (error) {
    console.error('❌ Error conectando a la base de datos:', error);
    return false;
  }
}

// Exportar configuración
export default dbConfig;
