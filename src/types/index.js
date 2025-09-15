export const UserEntity = (data) => ({
  id: data.id ?? "",
  full_name: data.full_name ?? data.name ?? "", // por si backend manda "full_name"
  email: data.email ?? "",
  role: data.role ?? "STUDENT",
  avatar: data.avatar ?? "",
});

export const InstructorEntity = (data) => ({
  id: data.id ?? "",
  full_name: data.full_name ?? data.name ?? "",
  email: data.email ?? "",
  role: data.role ?? "INSTRUCTOR",
  avatar: data.avatar ?? "",
});

export const AdminEntity = (data) => ({
  id: data.id ?? "",
  full_name: data.full_name ?? data.name ?? "",
  email: data.email ?? "",
  role: data.role ?? "ADMIN",
  avatar: data.avatar ?? "",
});

export const CourseEntity = (data) => ({
  id: data.id ?? "",
  title: data.title ?? "",
  description: data.description ?? "",
  instructor: data.instructor ? InstructorEntity(data.instructor) : null,
  price: data.price ?? 0,
  isFree: data.isFree ?? false,
  currency: data.currency ?? "USD",
  //instructor: data.instructor ? UserEntity(data.instructor) : null,
  studentsCount: data.studentsCount ?? 0,
  image: data.image ?? "", // portada del curso
});

export const LessonEntity = (data) => ({
  id: data.id ?? "",
  title: data.title ?? "",
  description: data.description ?? "",
  courseId: data.courseId ?? "",
  videoUrl: data.videoUrl ?? "",
  createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
  updatedAt: data.updatedAt ? new Date(data.updatedAt) : new Date(),
});

export const QuizEntity = (data) => ({
  id: data.id ?? "",
  title: data.title ?? "",
  description: data.description ?? "",
  courseId: data.courseId ?? "",
  createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
  updatedAt: data.updatedAt ? new Date(data.updatedAt) : new Date(),
});

export const QuestionEntity = (data) => ({
  id: data.id ?? "",
  text: data.text ?? "",
  options: data.options ?? [],
  answer: data.answer ?? "",
  quizId: data.quizId ?? "",
  createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
  updatedAt: data.updatedAt ? new Date(data.updatedAt) : new Date(),
});

export const ResourceEntity = (data) => ({
  id: data.id ?? "",
  title: data.title ?? "",
  description: data.description ?? "",
  courseId: data.courseId ?? "",
  createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
  updatedAt: data.updatedAt ? new Date(data.updatedAt) : new Date(),
});

export const EnrollmentEntity = (data) => ({
  id: data.id ?? "",
  courseId: data.courseId ?? "",
  userId: data.userId ?? "",
  enrolledAt: data.enrolledAt ? new Date(data.enrolledAt) : null,
});

export const CommentEntity = (data) => ({
  id: data.id ?? "",
  userId: data.userId ?? "",
  courseId: data.courseId ?? null,
  lessonId: data.lessonId ?? null,
  text: data.text ?? "",
  createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
  updatedAt: data.updatedAt ? new Date(data.updatedAt) : new Date(),
});

export const LessonProgressEntity = (data) => ({
  id: data.id ?? "",
  userId: data.userId ?? "",
  lessonId: data.lessonId ?? "",
  completed: data.completed ?? false,
  completedAt: data.completedAt ? new Date(data.completedAt) : null,
});

export const NotificationEntity = (data) => ({
  id: data.id ?? "",
  userId: data.userId ?? "",
  message: data.message ?? "",
  read: data.read ?? false,
  createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
});