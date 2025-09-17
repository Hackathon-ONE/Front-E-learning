import apiClient from '@/lib/apiClient';
import { adaptSubscriptions, adaptSubscription, handleBackendError } from '@/lib/dataAdapters';
import { ENDPOINTS } from '@/config';

export const getSubscriptions = async (userId = null) => {
  try {
    const endpoint = userId ? ENDPOINTS.SUBSCRIPTIONS.BY_USER(userId) : ENDPOINTS.SUBSCRIPTIONS.LIST;
    const response = await apiClient.get(endpoint);
    return adaptSubscriptions(response);
  } catch (error) {
    throw new Error(handleBackendError(error));
  }
};

export const createSubscription = async (subscriptionData) => {
  try {
    const response = await apiClient.post(ENDPOINTS.SUBSCRIPTIONS.CREATE, subscriptionData);
    return adaptSubscription(response);
  } catch (error) {
    throw new Error(handleBackendError(error));
  }
};

export const updateSubscription = async (subscriptionId, subscriptionData) => {
  try {
    const response = await apiClient.put(`${ENDPOINTS.SUBSCRIPTIONS.LIST}/${subscriptionId}`, subscriptionData);
    return adaptSubscription(response);
  } catch (error) {
    throw new Error(handleBackendError(error));
  }
};

export const deleteSubscription = async (subscriptionId) => {
  try {
    const response = await apiClient.delete(`${ENDPOINTS.SUBSCRIPTIONS.LIST}/${subscriptionId}`);
    return response;
  } catch (error) {
    throw new Error(handleBackendError(error));
  }
};

export const checkUserSubscription = async (userId, courseId) => {
  try {
    const subscriptions = await getSubscriptions(userId);
    return subscriptions.some(sub => 
      sub.userId === userId.toString() && 
      sub.courseId === courseId.toString() && 
      sub.status === 'ACTIVE'
    );
  } catch (error) {
    console.error('Error verificando suscripción:', error);
    return false;
  }
};
