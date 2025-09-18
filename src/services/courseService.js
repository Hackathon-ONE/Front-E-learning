import apiClient from '@/lib/apiClient';
import { adaptCourses, adaptCourse, handleBackendError } from '@/lib/dataAdapters';
import { ENDPOINTS } from '@/config';

export const getCourses = async () => {
  try {
    const response = await apiClient.get(ENDPOINTS.COURSES.LIST);
    return adaptCourses(response);
  } catch (error) {
    throw new Error(handleBackendError(error));
  }
};

export const getCourse = async (courseId) => {
  try {
    const response = await apiClient.get(ENDPOINTS.COURSES.BY_ID(courseId));
    return adaptCourse(response);
  } catch (error) {
    throw new Error(handleBackendError(error));
  }
};

export const enrollInCourse = async (courseId) => {
  try {
    const response = await apiClient.post(ENDPOINTS.COURSES.ENROLL(courseId));
    return response;
  } catch (error) {
    throw new Error(handleBackendError(error));
  }
};

export const getCourseLessons = async (courseId) => {
  try {
    const response = await apiClient.get(ENDPOINTS.COURSES.LESSONS(courseId));
    return response;
  } catch (error) {
    throw new Error(handleBackendError(error));
  }
};

export const createCourse = async (courseData) => {
  try {
    const response = await apiClient.post(ENDPOINTS.COURSES.LIST, courseData);
    return adaptCourse(response);
  } catch (error) {
    throw new Error(handleBackendError(error));
  }
};

export const updateCourse = async (courseId, courseData) => {
  try {
    const response = await apiClient.put(ENDPOINTS.COURSES.BY_ID(courseId), courseData);
    return adaptCourse(response);
  } catch (error) {
    throw new Error(handleBackendError(error));
  }
};

export const deleteCourse = async (courseId) => {
  try {
    const response = await apiClient.delete(ENDPOINTS.COURSES.BY_ID(courseId));
    return response;
  } catch (error) {
    throw new Error(handleBackendError(error));
  }
};