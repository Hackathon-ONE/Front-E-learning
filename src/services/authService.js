import apiClient from '@/lib/apiClient';
import { adaptAuthResponse, handleBackendError } from '@/lib/dataAdapters';
import { ENDPOINTS } from '@/config';

export const login = async (credentials) => {
  try {
    const response = await apiClient.post(ENDPOINTS.AUTH.LOGIN, credentials);
    const adaptedResponse = adaptAuthResponse(response);
    
    // Guardar token si la autenticación fue exitosa
    if (adaptedResponse?.token) {
      apiClient.setStoredToken(adaptedResponse.token);
    }
    
    return adaptedResponse;
  } catch (error) {
    throw new Error(handleBackendError(error));
  }
};

export const register = async (userData) => {
  try {
    const response = await apiClient.post(ENDPOINTS.AUTH.REGISTER, userData);
    const adaptedResponse = adaptAuthResponse(response);
    
    // Guardar token si el registro fue exitoso
    if (adaptedResponse?.token) {
      apiClient.setStoredToken(adaptedResponse.token);
    }
    
    return adaptedResponse;
  } catch (error) {
    throw new Error(handleBackendError(error));
  }
};

export const logout = async () => {
  try {
    await apiClient.post(ENDPOINTS.AUTH.LOGOUT);
  } catch (error) {
    console.warn('Error al cerrar sesión en el backend:', error.message);
  } finally {
    // Limpiar datos locales independientemente del resultado del backend
    apiClient.clearStoredData();
  }
};

export const refreshToken = async () => {
  try {
    const response = await apiClient.post(ENDPOINTS.AUTH.REFRESH);
    const adaptedResponse = adaptAuthResponse(response);
    
    if (adaptedResponse?.token) {
      apiClient.setStoredToken(adaptedResponse.token);
    }
    
    return adaptedResponse;
  } catch (error) {
    throw new Error(handleBackendError(error));
  }
};

export const getCurrentUser = () => {
  if (typeof window === "undefined") return null;
  
  const userData = localStorage.getItem('lumina_user_data');
  if (userData) {
    try {
      return JSON.parse(userData);
    } catch (error) {
      console.error('Error al parsear datos de usuario:', error);
      return null;
    }
  }
  
  return null;
};

export const setCurrentUser = (user) => {
  if (typeof window === "undefined") return;
  
  if (user) {
    localStorage.setItem('lumina_user_data', JSON.stringify(user));
  } else {
    localStorage.removeItem('lumina_user_data');
  }
};