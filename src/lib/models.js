/**
 * Modelos de datos para la base de datos PostgreSQL
 * Define la estructura de las tablas y relaciones
 */

// Modelo de Usuario
export const User = {
  tableName: 'users',
  fields: {
    id: 'SERIAL PRIMARY KEY',
    email: 'VARCHAR(255) UNIQUE NOT NULL',
    password: 'VARCHAR(255) NOT NULL',
    name: 'VARCHAR(255) NOT NULL',
    image: 'VARCHAR(500)',
    role: 'VARCHAR(50) NOT NULL DEFAULT "STUDENT"',
    created_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
    updated_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
  }
};

// Modelo de Curso
export const Course = {
  tableName: 'courses',
  fields: {
    id: 'SERIAL PRIMARY KEY',
    title: 'VARCHAR(255) NOT NULL',
    description: 'TEXT',
    cover: 'VARCHAR(500)',
    category: 'VARCHAR(100)',
    level: 'VARCHAR(50)',
    price: 'DECIMAL(10,2) DEFAULT 0',
    is_free: 'BOOLEAN DEFAULT false',
    instructor_id: 'INTEGER REFERENCES users(id)',
    duration: 'VARCHAR(50)',
    students_count: 'INTEGER DEFAULT 0',
    created_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
    updated_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
  }
};

// Modelo de Lección
export const Lesson = {
  tableName: 'lessons',
  fields: {
    id: 'SERIAL PRIMARY KEY',
    course_id: 'INTEGER REFERENCES courses(id)',
    title: 'VARCHAR(255) NOT NULL',
    description: 'TEXT',
    video_url: 'VARCHAR(500)',
    duration: 'VARCHAR(50)',
    order_index: 'INTEGER',
    created_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
    updated_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
  }
};

// Modelo de Suscripción
export const Subscription = {
  tableName: 'subscriptions',
  fields: {
    id: 'SERIAL PRIMARY KEY',
    user_id: 'INTEGER REFERENCES users(id)',
    course_id: 'INTEGER REFERENCES courses(id)',
    status: 'VARCHAR(50) DEFAULT "active"',
    created_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
    updated_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
    UNIQUE: '(user_id, course_id)'
  }
};

// Modelo de Progreso
export const Progress = {
  tableName: 'progress',
  fields: {
    id: 'SERIAL PRIMARY KEY',
    user_id: 'INTEGER REFERENCES users(id)',
    course_id: 'INTEGER REFERENCES courses(id)',
    lesson_id: 'INTEGER REFERENCES lessons(id)',
    completed: 'BOOLEAN DEFAULT false',
    completed_at: 'TIMESTAMP',
    created_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
    updated_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
  }
};

// Modelo de Pago
export const Payment = {
  tableName: 'payments',
  fields: {
    id: 'SERIAL PRIMARY KEY',
    user_id: 'INTEGER REFERENCES users(id)',
    course_id: 'INTEGER REFERENCES courses(id)',
    amount: 'DECIMAL(10,2) NOT NULL',
    status: 'VARCHAR(50) DEFAULT "pending"',
    payment_method: 'VARCHAR(100)',
    transaction_id: 'VARCHAR(255)',
    created_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
    updated_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
  }
};

// Exportar todos los modelos
export const models = {
  User,
  Course,
  Lesson,
  Subscription,
  Progress,
  Payment
};

export default models;
