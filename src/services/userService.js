import apiClient from '@/lib/apiClient';
import { adaptUser, adaptUsers, handleBackendError } from '@/lib/dataAdapters';
import { ENDPOINTS } from '@/config';

export const getUserProfile = async () => {
  try {
    const response = await apiClient.get(ENDPOINTS.USERS.PROFILE);
    return adaptUser(response);
  } catch (error) {
    throw new Error(handleBackendError(error));
  }
};

export const getUsers = async () => {
  try {
    const response = await apiClient.get(ENDPOINTS.USERS.LIST);
    return adaptUsers(response);
  } catch (error) {
    throw new Error(handleBackendError(error));
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await apiClient.get(ENDPOINTS.USERS.BY_ID(userId));
    return adaptUser(response);
  } catch (error) {
    throw new Error(handleBackendError(error));
  }
};

export const updateUserProfile = async (userData) => {
  try {
    const response = await apiClient.put(ENDPOINTS.USERS.PROFILE, userData);
    return adaptUser(response);
  } catch (error) {
    throw new Error(handleBackendError(error));
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await apiClient.delete(ENDPOINTS.USERS.BY_ID(userId));
    return response;
  } catch (error) {
    throw new Error(handleBackendError(error));
  }
};