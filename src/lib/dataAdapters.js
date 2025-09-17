/**
 * Adaptadores para mapear datos del backend al formato del frontend
 * Convierte la estructura de respuesta del backend Java/Spring Boot
 * al formato esperado por los componentes de React
 */

// Adaptador para usuarios
export function adaptUser(backendUser) {
  if (!backendUser) return null;
  
  return {
    id: backendUser.id?.toString() || backendUser.id,
    email: backendUser.email,
    name: backendUser.name,
    role: backendUser.role?.toUpperCase() || 'STUDENT',
    avatar: backendUser.image || '/default-avatar.png',
    createdAt: backendUser.createdAt,
    updatedAt: backendUser.updatedAt,
    // Campos adicionales para compatibilidad
    image: backendUser.image || '/default-avatar.png',
    joinDate: backendUser.createdAt ? new Date(backendUser.createdAt).toISOString().split('T')[0] : null,
  };
}

// Adaptador para lista de usuarios
export function adaptUsers(backendResponse) {
  if (!backendResponse?.data) return [];
  
  const users = Array.isArray(backendResponse.data) ? backendResponse.data : [backendResponse.data];
  return users.map(adaptUser);
}

// Adaptador para cursos
export function adaptCourse(backendCourse) {
  if (!backendCourse) return null;
  
  return {
    id: backendCourse.id?.toString() || backendCourse.id,
    title: backendCourse.title,
    description: backendCourse.description,
    cover: backendCourse.cover,
    category: backendCourse.category,
    level: backendCourse.level,
    price: backendCourse.price,
    currency: 'USD',
    isFree: backendCourse.isFree || false,
    instructor: backendCourse.instructorName || 'Instructor',
    instructorId: backendCourse.instructorId,
    duration: backendCourse.duration,
    students: backendCourse.studentsCount || 0,
    rating: 4.5, // Valor por defecto
    createdAt: backendCourse.createdAt,
    updatedAt: backendCourse.updatedAt,
    // Campos adicionales para compatibilidad
    lessons: backendCourse.lessons || 0,
    difficulty: backendCourse.level || 'Intermedio',
  };
}

// Adaptador para lista de cursos
export function adaptCourses(backendResponse) {
  if (!backendResponse?.data) return [];
  
  const courses = Array.isArray(backendResponse.data) ? backendResponse.data : [backendResponse.data];
  return courses.map(adaptCourse);
}

// Adaptador para lecciones
export function adaptLesson(backendLesson) {
  if (!backendLesson) return null;
  
  return {
    id: backendLesson.id?.toString() || backendLesson.id,
    courseId: backendLesson.courseId?.toString() || backendLesson.courseId,
    title: backendLesson.title,
    description: backendLesson.description || '',
    videoUrl: backendLesson.videoUrl,
    duration: backendLesson.duration,
    orderIndex: backendLesson.orderIndex || 0,
    completed: false, // Valor por defecto
    createdAt: backendLesson.createdAt,
    updatedAt: backendLesson.updatedAt,
    // Campos adicionales para compatibilidad
    quiz: null, // Se puede agregar después
  };
}

// Adaptador para lista de lecciones
export function adaptLessons(backendResponse) {
  if (!backendResponse?.data) return [];
  
  const lessons = Array.isArray(backendResponse.data) ? backendResponse.data : [backendResponse.data];
  return lessons.map(adaptLesson);
}

// Adaptador para suscripciones
export function adaptSubscription(backendSubscription) {
  if (!backendSubscription) return null;
  
  return {
    id: backendSubscription.id?.toString() || backendSubscription.id,
    userId: backendSubscription.userId?.toString() || backendSubscription.userId,
    courseId: backendSubscription.courseId?.toString() || backendSubscription.courseId,
    status: backendSubscription.status?.toUpperCase() || 'ACTIVE',
    createdAt: backendSubscription.createdAt,
    updatedAt: backendSubscription.updatedAt,
    // Campos adicionales para compatibilidad
    isActive: backendSubscription.status?.toUpperCase() === 'ACTIVE',
  };
}

// Adaptador para lista de suscripciones
export function adaptSubscriptions(backendResponse) {
  if (!backendResponse?.data) return [];
  
  const subscriptions = Array.isArray(backendResponse.data) ? backendResponse.data : [backendResponse.data];
  return subscriptions.map(adaptSubscription);
}

// Adaptador para progreso
export function adaptProgress(backendProgress) {
  if (!backendProgress) return null;
  
  return {
    id: backendProgress.id?.toString() || backendProgress.id,
    userId: backendProgress.userId?.toString() || backendProgress.userId,
    courseId: backendProgress.courseId?.toString() || backendProgress.courseId,
    lessonId: backendProgress.lessonId?.toString() || backendProgress.lessonId,
    completed: backendProgress.completed || false,
    completedAt: backendProgress.completedAt,
    createdAt: backendProgress.createdAt,
    updatedAt: backendProgress.updatedAt,
    // Campos adicionales para compatibilidad
    score: backendProgress.score || null,
  };
}

// Adaptador para lista de progreso
export function adaptProgressList(backendResponse) {
  if (!backendResponse?.data) return [];
  
  const progress = Array.isArray(backendResponse.data) ? backendResponse.data : [backendResponse.data];
  return progress.map(adaptProgress);
}

// Adaptador para respuesta de autenticación
export function adaptAuthResponse(backendResponse) {
  if (!backendResponse?.data) return null;
  
  const { user, token, expiresIn } = backendResponse.data;
  
  return {
    user: adaptUser(user),
    token,
    expiresIn,
    success: backendResponse.success,
    message: backendResponse.message,
  };
}

// Adaptador para respuesta genérica del backend
export function adaptBackendResponse(backendResponse) {
  if (!backendResponse) return null;
  
  return {
    success: backendResponse.success || false,
    message: backendResponse.message || '',
    data: backendResponse.data,
    timestamp: backendResponse.timestamp,
    status: backendResponse.status || 200,
  };
}

// Función para mapear roles del backend al frontend
export function mapRole(backendRole) {
  const roleMap = {
    'ADMIN': 'ADMIN',
    'INSTRUCTOR': 'INSTRUCTOR',
    'STUDENT': 'STUDENT',
    'GUEST': 'GUEST',
  };
  
  return roleMap[backendRole?.toUpperCase()] || 'STUDENT';
}

// Función para mapear estados del backend al frontend
export function mapStatus(backendStatus) {
  const statusMap = {
    'ACTIVE': 'ACTIVE',
    'INACTIVE': 'INACTIVE',
    'CANCELLED': 'CANCELLED',
    'PENDING': 'PENDING',
  };
  
  return statusMap[backendStatus?.toUpperCase()] || 'PENDING';
}

// Función para mapear niveles de curso
export function mapCourseLevel(backendLevel) {
  const levelMap = {
    'BASIC': 'Básico',
    'INTERMEDIATE': 'Intermedio',
    'ADVANCED': 'Avanzado',
    'BEGINNER': 'Básico',
  };
  
  return levelMap[backendLevel?.toUpperCase()] || 'Intermedio';
}

// Función para mapear categorías
export function mapCategory(backendCategory) {
  const categoryMap = {
    'FRONTEND': 'Frontend',
    'BACKEND': 'Backend',
    'FULLSTACK': 'Fullstack',
    'MOBILE': 'Mobile',
    'DATA_SCIENCE': 'Data Science',
    'UI_UX': 'UI/UX',
    'DEVOPS': 'DevOps',
  };
  
  return categoryMap[backendCategory?.toUpperCase()] || 'Frontend';
}

// Función para validar si una respuesta del backend es válida
export function isValidBackendResponse(response) {
  return response && 
         typeof response === 'object' && 
         'success' in response && 
         'data' in response;
}

// Función para extraer datos de una respuesta del backend
export function extractBackendData(response) {
  if (!isValidBackendResponse(response)) {
    throw new Error('Respuesta del backend inválida');
  }
  
  return response.data;
}

// Función para manejar errores del backend
export function handleBackendError(error) {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  
  if (error.message) {
    return error.message;
  }
  
  return 'Error desconocido del backend';
}

export default {
  adaptUser,
  adaptUsers,
  adaptCourse,
  adaptCourses,
  adaptLesson,
  adaptLessons,
  adaptSubscription,
  adaptSubscriptions,
  adaptProgress,
  adaptProgressList,
  adaptAuthResponse,
  adaptBackendResponse,
  mapRole,
  mapStatus,
  mapCourseLevel,
  mapCategory,
  isValidBackendResponse,
  extractBackendData,
  handleBackendError,
};
