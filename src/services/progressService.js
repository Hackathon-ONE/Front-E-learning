import apiClient from '@/lib/apiClient';
import { adaptProgressList, adaptProgress, handleBackendError } from '@/lib/dataAdapters';
import { ENDPOINTS } from '@/config';

export const getProgress = async (userId = null, courseId = null) => {
  try {
    let endpoint = ENDPOINTS.PROGRESS.LIST;
    
    if (userId && courseId) {
      endpoint = ENDPOINTS.PROGRESS.BY_USER_COURSE(userId, courseId);
    } else if (userId) {
      endpoint = `${ENDPOINTS.PROGRESS.LIST}?userId=${userId}`;
    } else if (courseId) {
      endpoint = `${ENDPOINTS.PROGRESS.LIST}?courseId=${courseId}`;
    }
    
    const response = await apiClient.get(endpoint);
    return adaptProgressList(response);
  } catch (error) {
    throw new Error(handleBackendError(error));
  }
};

export const createProgress = async (progressData) => {
  try {
    const response = await apiClient.post(ENDPOINTS.PROGRESS.CREATE, progressData);
    return adaptProgress(response);
  } catch (error) {
    throw new Error(handleBackendError(error));
  }
};

export const updateProgress = async (progressId, progressData) => {
  try {
    const response = await apiClient.put(`${ENDPOINTS.PROGRESS.LIST}/${progressId}`, progressData);
    return adaptProgress(response);
  } catch (error) {
    throw new Error(handleBackendError(error));
  }
};

export const deleteProgress = async (progressId) => {
  try {
    const response = await apiClient.delete(`${ENDPOINTS.PROGRESS.LIST}/${progressId}`);
    return response;
  } catch (error) {
    throw new Error(handleBackendError(error));
  }
};

export const markLessonCompleted = async (userId, courseId, lessonId) => {
  try {
    const progressData = {
      userId: userId.toString(),
      courseId: courseId.toString(),
      lessonId: lessonId.toString(),
      completed: true,
      completedAt: new Date().toISOString()
    };
    
    return await createProgress(progressData);
  } catch (error) {
    throw new Error(handleBackendError(error));
  }
};

export const getCourseProgress = async (userId, courseId) => {
  try {
    const progress = await getProgress(userId, courseId);
    return progress.filter(p => p.courseId === courseId.toString());
  } catch (error) {
    console.error('Error obteniendo progreso del curso:', error);
    return [];
  }
};

export const getUserProgress = async (userId) => {
  try {
    return await getProgress(userId);
  } catch (error) {
    console.error('Error obteniendo progreso del usuario:', error);
    return [];
  }
};
