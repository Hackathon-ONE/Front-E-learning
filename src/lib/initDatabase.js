import { query, testConnection } from './database.js';

// Función para crear la tabla de usuarios si no existe
export async function createUsersTable() {
  try {
    console.log('🔧 Creando tabla de usuarios...');
    
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'STUDENT',
        image VARCHAR(500) DEFAULT '/default-avatar.png',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    
    await query(createTableQuery);
    console.log('✅ Tabla de usuarios creada/verificada');
    
    // Crear índices para mejorar performance
    await query('CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);');
    await query('CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);');
    
    console.log('✅ Índices creados');
    
  } catch (error) {
    console.error('❌ Error creando tabla de usuarios:', error.message);
    throw error;
  }
}

// Función para insertar usuarios de prueba
export async function insertTestUsers() {
  try {
    console.log('👥 Insertando usuarios de prueba...');
    
    const testUsers = [
      {
        name: 'Admin Usuario',
        email: 'admin@lumina.com',
        password: 'admin123',
        role: 'ADMIN',
        image: '/default-avatar.png'
      },
      {
        name: 'Instructor Demo',
        email: 'instructor@lumina.com',
        password: 'instructor123',
        role: 'INSTRUCTOR',
        image: '/default-avatar.png'
      },
      {
        name: 'Estudiante Demo',
        email: 'student@lumina.com',
        password: 'student123',
        role: 'STUDENT',
        image: '/default-avatar.png'
      }
    ];
    
    for (const user of testUsers) {
      // Verificar si el usuario ya existe
      const existingUser = await query(
        'SELECT id FROM users WHERE email = $1',
        [user.email]
      );
      
      if (existingUser.rows.length === 0) {
        await query(
          'INSERT INTO users (name, email, password, role, image) VALUES ($1, $2, $3, $4, $5)',
          [user.name, user.email, user.password, user.role, user.image]
        );
        console.log(`✅ Usuario insertado: ${user.email}`);
      } else {
        console.log(`⚠️ Usuario ya existe: ${user.email}`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error insertando usuarios de prueba:', error.message);
    throw error;
  }
}

// Función para obtener todos los usuarios
export async function getAllUsers() {
  try {
    const result = await query('SELECT * FROM users ORDER BY created_at DESC');
    return result.rows;
  } catch (error) {
    console.error('❌ Error obteniendo usuarios:', error.message);
    throw error;
  }
}

// Función para inicializar la base de datos completa
export async function initializeDatabase() {
  try {
    console.log('🚀 Inicializando base de datos...');
    
    // Probar conexión
    const connected = await testConnection();
    if (!connected) {
      throw new Error('No se pudo conectar a la base de datos');
    }
    
    // Crear tabla de usuarios
    await createUsersTable();
    
    // Insertar usuarios de prueba
    await insertTestUsers();
    
    // Mostrar usuarios existentes
    const users = await getAllUsers();
    console.log(`📊 Total de usuarios en la base de datos: ${users.length}`);
    users.forEach(user => {
      console.log(`- ${user.name} (${user.email}) - ${user.role}`);
    });
    
    console.log('✅ Base de datos inicializada correctamente');
    
  } catch (error) {
    console.error('❌ Error inicializando base de datos:', error.message);
    throw error;
  }
}
