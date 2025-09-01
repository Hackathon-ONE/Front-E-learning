export const UserEntity = (data) => ({
    id: data.id || "",
    name: data.name || "",
    email: data.email || "",
    role: data.role || "student",
    image: data.image || "",
  });
  
  export const InstructorEntity = (data) => ({
    id: data.id || "",
    name: data.name || "",
    email: data.email || "",
    role: data.role || "instructor",
    image: data.image || "",
  });
  
  export const AdminEntity = (data) => ({
    id: data.id || "",
    name: data.name || "",
    email: data.email || "",
    role: data.role || "admin",
    image: data.image || "",
  });
  
  export const CourseEntity = (data) => ({
    id: data.id || "",
    title: data.title || "",
    description: data.description || "",
    instructor: data.instructor || null,
    studentsCount: data.studentsCount || 0,
  });
  
  export const LessonEntity = (data) => ({
    id: data.id || "",
    title: data.title || "",
    description: data.description || "",
    courseId: data.courseId || "",
    videoUrl: data.videoUrl || "",
    createdAt: data.createdAt || new Date(),
    updatedAt: data.updatedAt || new Date(),
  });
  
  export const QuizEntity = (data) => ({
    id: data.id || "",
    title: data.title || "",
    description: data.description || "",
    courseId: data.courseId || "",
    createdAt: data.createdAt || new Date(),
    updatedAt: data.updatedAt || new Date(),
  });
  
  export const QuestionEntity = (data) => ({
    id: data.id || "",
    text: data.text || "",
    options: data.options || [],
    answer: data.answer || "",
    quizId: data.quizId || "",
    createdAt: data.createdAt || new Date(),
    updatedAt: data.updatedAt || new Date(),
  });
  
  export const ResourceEntity = (data) => ({
    id: data.id || "",
    title: data.title || "",
    description: data.description || "",
    courseId: data.courseId || "",
    createdAt: data.createdAt || new Date(),
    updatedAt: data.updatedAt || new Date(),
  });
  
  export const EnrollmentEntity = (data) => ({
    id: data.id || "",
    courseId: data.courseId || "",
    userId: data.userId || "",
    enrolledAt: data.enrolledAt || "",
  });
  
  // Comentarios de cursos o lecciones
  export const CommentEntity = (data) => ({
    id: data.id || "",
    userId: data.userId || "",
    courseId: data.courseId || null,
    lessonId: data.lessonId || null,
    text: data.text || "",
    createdAt: data.createdAt || new Date(),
    updatedAt: data.updatedAt || new Date(),
  });
  
  // Progreso de lecciones por usuario
  export const LessonProgressEntity = (data) => ({
    id: data.id || "",
    userId: data.userId || "",
    lessonId: data.lessonId || "",
    completed: data.completed || false,
    completedAt: data.completedAt || null,
  });
  
  // Notificaciones (opcional)
  export const NotificationEntity = (data) => ({
    id: data.id || "",
    userId: data.userId || "",
    message: data.message || "",
    read: data.read || false,
    createdAt: data.createdAt || new Date(),
  });  