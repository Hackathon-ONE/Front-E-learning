"use client";

import axios from "axios";
import { CONFIG, ENDPOINTS } from "@/config";
import { mockUsers, coursesPageData, coursesDetailData, studentsProgress } from "@/data";

/**
 * Cliente API mejorado con fallback a datos mock
 * Maneja la integración con el backend Java/Spring Boot
 */
class ApiClient {
  constructor() {
    this.api = axios.create({
      baseURL: CONFIG.API_URL,
      timeout: CONFIG.REQUEST_TIMEOUT,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
    this.cache = new Map();
  }

  setupInterceptors() {
    // Request interceptor - agrega token de autenticación
    this.api.interceptors.request.use(
      (config) => {
        if (typeof window !== "undefined") {
          const token = this.getStoredToken();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor - manejo de errores y fallback
    this.api.interceptors.response.use(
      (response) => response.data,
      async (error) => {
        const status = error.response?.status;
        
        // Si es 401, limpiar token y redirigir
        if (status === 401 && typeof window !== "undefined") {
          this.clearStoredData();
          window.location.href = "/auth/login";
          return Promise.reject(error);
        }

        // Si es error de red o backend no disponible, usar fallback
        if (status >= 500 || !error.response) {
          console.warn("Backend no disponible, usando datos mock");
          return this.handleFallback(error.config);
        }

        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error.response?.data || error.message);
      }
    );
  }

  // Manejo de fallback a datos mock
  async handleFallback(config) {
    const { method, url } = config;
    const endpoint = url.replace(CONFIG.API_URL, "");

    try {
      switch (method.toUpperCase()) {
        case "GET":
          return this.getMockData(endpoint);
        case "POST":
          return this.handleMockPost(endpoint, config.data);
        case "PUT":
          return this.handleMockPut(endpoint, config.data);
        case "DELETE":
          return this.handleMockDelete(endpoint);
        default:
          throw new Error(`Método ${method} no soportado en fallback`);
      }
    } catch (error) {
      console.error("Error en fallback:", error);
      throw error;
    }
  }

  // Obtener datos mock según el endpoint
  getMockData(endpoint) {
    if (endpoint.includes("/auth/login")) {
      return this.mockAuthLogin();
    }
    if (endpoint.includes("/users")) {
      return this.mockUsers();
    }
    if (endpoint.includes("/courses")) {
      return this.mockCourses(endpoint);
    }
    if (endpoint.includes("/subscriptions")) {
      return this.mockSubscriptions();
    }
    if (endpoint.includes("/progress")) {
      return this.mockProgress();
    }
    throw new Error(`Endpoint ${endpoint} no encontrado en datos mock`);
  }

  // Mock de autenticación
  mockAuthLogin() {
    return {
      success: true,
      message: "Login exitoso (Mock)",
      data: {
        user: {
          id: 1,
          email: "admin@lumina.com",
          name: "Administrador",
          role: "ADMIN",
          image: "/default-avatar.png",
          createdAt: "2024-01-01T00:00:00Z",
          updatedAt: "2024-12-01T00:00:00Z"
        },
        token: "mock-jwt-token-" + Date.now(),
        expiresIn: 3600
      },
      timestamp: new Date().toISOString(),
      status: 200
    };
  }

  // Mock de usuarios
  mockUsers() {
    return {
      success: true,
      message: "Usuarios obtenidos exitosamente (Mock)",
      data: mockUsers.map(user => ({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        image: user.avatar || "/default-avatar.png",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-12-01T00:00:00Z"
      })),
      timestamp: new Date().toISOString(),
      status: 200
    };
  }

  // Mock de cursos
  mockCourses(endpoint) {
    if (endpoint.includes("/courses/") && !endpoint.includes("/lessons")) {
      // Obtener curso específico
      const courseId = endpoint.split("/courses/")[1];
      const course = coursesDetailData.find(c => c.id.toString() === courseId);
      
      if (!course) {
        throw new Error("Curso no encontrado");
      }

      return {
        success: true,
        message: "Curso obtenido exitosamente (Mock)",
        data: {
          id: course.id,
          title: course.title,
          description: course.description,
          cover: course.cover,
          category: "Frontend",
          level: "Intermedio",
          price: 99.99,
          isFree: course.isFree,
          instructorId: 1,
          instructorName: "Instructor Principal",
          duration: course.duration,
          studentsCount: course.students || 0,
          createdAt: "2024-01-01T00:00:00Z",
          updatedAt: "2024-12-01T00:00:00Z"
        },
        timestamp: new Date().toISOString(),
        status: 200
      };
    }

    // Lista de cursos
    return {
      success: true,
      message: "Cursos obtenidos exitosamente (Mock)",
      data: coursesPageData.map(course => ({
        id: course.id,
        title: course.title,
        description: course.description,
        cover: course.cover,
        category: course.category,
        level: "Intermedio",
        price: course.price,
        isFree: course.isFree,
        instructorId: 1,
        instructorName: course.instructor,
        duration: "8h 30m",
        studentsCount: 150,
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-12-01T00:00:00Z"
      })),
      timestamp: new Date().toISOString(),
      status: 200
    };
  }

  // Mock de suscripciones
  mockSubscriptions() {
    return {
      success: true,
      message: "Suscripciones obtenidas exitosamente (Mock)",
      data: [
        {
          id: 1,
          userId: 1,
          courseId: 1,
          status: "ACTIVE",
          createdAt: "2024-01-01T00:00:00Z",
          updatedAt: "2024-12-01T00:00:00Z"
        }
      ],
      timestamp: new Date().toISOString(),
      status: 200
    };
  }

  // Mock de progreso
  mockProgress() {
    return {
      success: true,
      message: "Progreso obtenido exitosamente (Mock)",
      data: [
        {
          id: 1,
          userId: 1,
          courseId: 1,
          lessonId: 1,
          completed: true,
          completedAt: "2024-12-01T00:00:00Z",
          createdAt: "2024-12-01T00:00:00Z",
          updatedAt: "2024-12-01T00:00:00Z"
        }
      ],
      timestamp: new Date().toISOString(),
      status: 200
    };
  }

  // Manejo de POST mock
  handleMockPost(endpoint, data) {
    if (endpoint.includes("/auth/login")) {
      return this.mockAuthLogin();
    }
    if (endpoint.includes("/subscriptions")) {
      return {
        success: true,
        message: "Suscripción creada exitosamente (Mock)",
        data: {
          id: Date.now(),
          userId: data.userId,
          courseId: data.courseId,
          status: "ACTIVE",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        timestamp: new Date().toISOString(),
        status: 201
      };
    }
    throw new Error(`POST ${endpoint} no soportado en fallback`);
  }

  // Manejo de PUT mock
  handleMockPut(endpoint, data) {
    return {
      success: true,
      message: "Actualización exitosa (Mock)",
      data: { ...data, updatedAt: new Date().toISOString() },
      timestamp: new Date().toISOString(),
      status: 200
    };
  }

  // Manejo de DELETE mock
  handleMockDelete(endpoint) {
    return {
      success: true,
      message: "Eliminación exitosa (Mock)",
      data: null,
      timestamp: new Date().toISOString(),
      status: 200
    };
  }

  // Métodos de autenticación
  getStoredToken() {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(CONFIG.JWT_STORAGE_KEY);
  }

  setStoredToken(token) {
    if (typeof window === "undefined") return;
    localStorage.setItem(CONFIG.JWT_STORAGE_KEY, token);
  }

  clearStoredData() {
    if (typeof window === "undefined") return;
    localStorage.removeItem(CONFIG.JWT_STORAGE_KEY);
    localStorage.removeItem(CONFIG.USER_STORAGE_KEY);
  }

  // Métodos de API
  async get(endpoint, config = {}) {
    try {
      const response = await this.api.get(endpoint, config);
      return response;
    } catch (error) {
      // Si el error es de fallback, devolverlo directamente
      if (error.success !== undefined) {
        return error;
      }
      throw error;
    }
  }

  async post(endpoint, data = {}, config = {}) {
    try {
      const response = await this.api.post(endpoint, data, config);
      return response;
    } catch (error) {
      if (error.success !== undefined) {
        return error;
      }
      throw error;
    }
  }

  async put(endpoint, data = {}, config = {}) {
    try {
      const response = await this.api.put(endpoint, data, config);
      return response;
    } catch (error) {
      if (error.success !== undefined) {
        return error;
      }
      throw error;
    }
  }

  async delete(endpoint, config = {}) {
    try {
      const response = await this.api.delete(endpoint, config);
      return response;
    } catch (error) {
      if (error.success !== undefined) {
        return error;
      }
      throw error;
    }
  }

  // Método para verificar si el backend está disponible
  async checkBackendHealth() {
    try {
      // Intentar con /health primero
      const healthResponse = await fetch(`${CONFIG.API_URL}/health`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        timeout: 5000
      });
      
      if (healthResponse.ok) {
        return { available: true, response: await healthResponse.json() };
      }
      
      // Si /health no está disponible, probar con /courses (que debería devolver 403)
      const coursesResponse = await fetch(`${CONFIG.API_URL}/courses`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        timeout: 5000
      });
      
      // Si devuelve 403, significa que el backend está funcionando pero requiere auth
      if (coursesResponse.status === 403) {
        return { available: true, response: { status: 'requires_auth' } };
      }
      
      return { available: false, error: `Unexpected status: ${coursesResponse.status}` };
    } catch (error) {
      return { available: false, error: error.message };
    }
  }
}

// Instancia singleton
const apiClient = new ApiClient();

export default apiClient;
