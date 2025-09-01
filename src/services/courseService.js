import api from './api';

export const getCourses = async () => {
  try {
    const response = await api.get('/courses');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener cursos');
  }
};

export const enrollInCourse = async (courseId) => {
  try {
    const response = await api.post(`/courses/${courseId}/enroll`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al inscribirse en el curso');
  }
};