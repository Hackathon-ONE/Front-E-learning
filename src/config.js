// Configuración de la aplicación
export const CONFIG = {
  // URLs del backend
  BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || 'https://back-e-learning-1.onrender.com',
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://back-e-learning-1.onrender.com/api',
  
  // Configuración de fallback
  USE_MOCKS: process.env.NEXT_PUBLIC_USE_MOCKS === 'true' || process.env.NEXT_PUBLIC_USE_MOCKS !== 'false',
  
  // Configuración de autenticación
  JWT_STORAGE_KEY: 'lumina_jwt_token',
  USER_STORAGE_KEY: 'lumina_user_data',
  
  // Configuración de timeout
  REQUEST_TIMEOUT: 10000, // 10 segundos
  
  // Configuración de reintentos
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // 1 segundo
  
  // Configuración de cache
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutos
};

// Endpoints del backend
export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  USERS: {
    LIST: '/users',
    PROFILE: '/users/profile',
    BY_ID: (id) => `/users/${id}`,
  },
  COURSES: {
    LIST: '/courses',
    BY_ID: (id) => `/courses/${id}`,
    ENROLL: (id) => `/courses/${id}/enroll`,
    LESSONS: (id) => `/courses/${id}/lessons`,
  },
  SUBSCRIPTIONS: {
    LIST: '/subscriptions',
    CREATE: '/subscriptions',
    BY_USER: (userId) => `/subscriptions?userId=${userId}`,
  },
  PROGRESS: {
    LIST: '/progress',
    CREATE: '/progress',
    BY_USER_COURSE: (userId, courseId) => `/progress?userId=${userId}&courseId=${courseId}`,
  },
};

// Configuración de roles
export const ROLES = {
  ADMIN: 'ADMIN',
  INSTRUCTOR: 'INSTRUCTOR',
  STUDENT: 'STUDENT',
  GUEST: 'GUEST',
};

// Configuración de estados
export const STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  CANCELLED: 'CANCELLED',
  PENDING: 'PENDING',
};

// Configuración de niveles de curso
export const COURSE_LEVELS = {
  BEGINNER: 'Básico',
  INTERMEDIATE: 'Intermedio',
  ADVANCED: 'Avanzado',
};

// Configuración de categorías
export const CATEGORIES = {
  FRONTEND: 'Frontend',
  BACKEND: 'Backend',
  FULLSTACK: 'Fullstack',
  MOBILE: 'Mobile',
  DATA_SCIENCE: 'Data Science',
  UI_UX: 'UI/UX',
  DEVOPS: 'DevOps',
};

export default CONFIG;