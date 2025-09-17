import { Pool } from 'pg';

// Configuración de la base de datos PostgreSQL
const dbConfig = {
  host: process.env.DB_HOST || 'dpg-d2vdr87diees73e0t6d0-a.oregon-postgres.render.com',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'elearning_8xpu',
  user: process.env.DB_USER || 'elearning_8xpu_user',
  password: process.env.DB_PASSWORD || 'dd23oHDEQSpd7WEsoy8YKl2tYlhkGg1d',
  ssl: {
    rejectUnauthorized: false // Necesario para Render
  },
  max: 20, // Máximo de conexiones en el pool
  idleTimeoutMillis: 30000, // Tiempo de inactividad antes de cerrar conexión
  connectionTimeoutMillis: 2000, // Tiempo de espera para conectar
};

// Crear pool de conexiones
const pool = new Pool(dbConfig);

// Función para probar la conexión
export async function testConnection() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    client.release();
    console.log('✅ Conexión a PostgreSQL exitosa:', result.rows[0]);
    return true;
  } catch (error) {
    console.error('❌ Error de conexión a PostgreSQL:', error.message);
    return false;
  }
}

// Función para ejecutar consultas
export async function query(text, params) {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('📊 Query ejecutada:', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('❌ Error en query:', error.message);
    throw error;
  }
}

// Función para obtener un cliente del pool
export async function getClient() {
  return await pool.connect();
}

// Función para cerrar el pool
export async function closePool() {
  await pool.end();
}

export default pool;