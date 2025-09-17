# 🚀 Guía de Integración Frontend ↔ Backend

## 📋 **Resumen**

Esta guía explica cómo integrar el frontend de Next.js con el backend Java/Spring Boot. El sistema incluye fallback automático a datos mock cuando el backend no está disponible.

## 🔧 **Configuración Inicial**

### **1. Variables de Entorno**

Crea un archivo `.env.local` basado en `env.example`:

```bash
# Backend
NEXT_PUBLIC_BACKEND_URL=http://localhost:8080
NEXT_PUBLIC_API_URL=http://localhost:8080/api

# Fallback
NEXT_PUBLIC_USE_MOCKS=true

# NextAuth
NEXTAUTH_URL=http://localhost:9002
NEXTAUTH_SECRET=your-secret-key-here
```

### **2. Estructura de Archivos**

```
src/
├── lib/
│   ├── apiClient.js          # Cliente API con fallback
│   └── dataAdapters.js       # Adaptadores de datos
├── services/
│   ├── authService.js        # Servicios de autenticación
│   ├── courseService.js      # Servicios de cursos
│   ├── userService.js        # Servicios de usuarios
│   ├── subscriptionService.js # Servicios de suscripciones
│   └── progressService.js    # Servicios de progreso
├── hooks/
│   └── useBackend.jsx        # Hook para manejo de backend
└── components/
    ├── BackendStatus.jsx     # Componente de estado
    └── CoursesCarouselBackend.jsx # Ejemplo de integración
```

## 🔌 **Endpoints del Backend**

### **Autenticación**

- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/register` - Registro
- `POST /api/auth/logout` - Cerrar sesión
- `POST /api/auth/refresh` - Renovar token

### **Usuarios**

- `GET /api/users` - Lista de usuarios
- `GET /api/users/{id}` - Usuario específico
- `GET /api/users/profile` - Perfil del usuario actual
- `PUT /api/users/profile` - Actualizar perfil

### **Cursos**

- `GET /api/courses` - Lista de cursos
- `GET /api/courses/{id}` - Curso específico
- `POST /api/courses` - Crear curso
- `PUT /api/courses/{id}` - Actualizar curso
- `DELETE /api/courses/{id}` - Eliminar curso
- `POST /api/courses/{id}/enroll` - Inscribirse en curso

### **Suscripciones**

- `GET /api/subscriptions` - Lista de suscripciones
- `POST /api/subscriptions` - Crear suscripción
- `PUT /api/subscriptions/{id}` - Actualizar suscripción
- `DELETE /api/subscriptions/{id}` - Eliminar suscripción

### **Progreso**

- `GET /api/progress` - Lista de progreso
- `POST /api/progress` - Crear progreso
- `PUT /api/progress/{id}` - Actualizar progreso
- `DELETE /api/progress/{id}` - Eliminar progreso

## 🛠️ **Uso de los Servicios**

### **1. Servicios Básicos**

```javascript
import { getCourses, getCourse, enrollInCourse } from '@/services/courseService';
import { login, register, logout } from '@/services/authService';
import { getUsers, getUserById } from '@/services/userService';

// Obtener cursos
const courses = await getCourses();

// Obtener curso específico
const course = await getCourse(courseId);

// Inscribirse en curso
await enrollInCourse(courseId);
```

### **2. Hook useBackend**

```javascript
import { useBackend, useBackendData } from '@/hooks/useBackend';

function MyComponent() {
  const { isBackendAvailable, shouldUseMocks, getConnectionStatus } = useBackend();

  const { data: courses, loading, error, usingMock } = useBackendData(getCourses, mockCoursesData);

  return (
    <div>
      {loading && <p>Cargando...</p>}
      {error && <p>Error: {error}</p>}
      {usingMock && <p>Usando datos de demostración</p>}
      {/* Renderizar cursos */}
    </div>
  );
}
```

### **3. Componente de Estado**

```javascript
import BackendStatus from '@/components/BackendStatus';

function MyComponent() {
  return (
    <div>
      <BackendStatus showDetails={true} />
      {/* Resto del componente */}
    </div>
  );
}
```

## 🔄 **Sistema de Fallback**

### **Cómo Funciona**

1. **Verificación de Backend**: El sistema verifica si el backend está disponible
2. **Fallback Automático**: Si el backend no está disponible, usa datos mock
3. **Indicadores Visuales**: Muestra el estado de conexión al usuario
4. **Reintentos**: Intenta reconectar automáticamente

### **Configuración de Fallback**

```javascript
// En config.js
export const CONFIG = {
  USE_MOCKS: process.env.NEXT_PUBLIC_USE_MOCKS === 'true' || !process.env.NEXT_PUBLIC_BACKEND_URL,
  // ... otras configuraciones
};
```

## 🧪 **Testing de Integración**

### **1. Página de Pruebas**

Visita `http://localhost:9002/test-integration` para ejecutar las pruebas de integración.

### **2. Verificación Manual**

```javascript
import apiClient from '@/lib/apiClient';

// Verificar estado del backend
const healthCheck = await apiClient.checkBackendHealth();
console.log('Backend disponible:', healthCheck.available);
```

### **3. Pruebas de Endpoints**

```bash
# Probar autenticación
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@lumina.com","password":"admin123"}'

# Probar cursos
curl http://localhost:8080/api/courses
```

## 📊 **Monitoreo y Debugging**

### **1. Estado de Conexión**

El componente `BackendStatus` muestra:

- Estado de conexión (conectado/desconectado/offline)
- Tiempo de respuesta
- Última verificación
- Botón para forzar verificación

### **2. Logs de Debugging**

```javascript
// En apiClient.js
console.warn('Backend no disponible, usando datos mock');
console.error('API Error:', error.response?.data || error.message);
```

### **3. Configuración de Backend**

Visita `http://localhost:9002/admin/backend-config` para:

- Configurar URLs del backend
- Probar conexión
- Ver estado de endpoints
- Cambiar configuración de fallback

## 🚨 **Solución de Problemas**

### **Problemas Comunes**

1. **Backend no disponible**

   - Verificar que el backend esté ejecutándose
   - Verificar la URL en las variables de entorno
   - Revisar logs del backend

2. **Errores de CORS**

   - Configurar CORS en el backend
   - Verificar headers de respuesta

3. **Errores de autenticación**

   - Verificar token JWT
   - Revisar configuración de NextAuth

4. **Datos no se cargan**
   - Verificar adaptadores de datos
   - Revisar estructura de respuesta del backend

### **Debugging**

```javascript
// Habilitar logs detallados
localStorage.setItem('debug', 'true');

// Verificar configuración
console.log('Config:', CONFIG);
console.log('Backend URL:', CONFIG.API_URL);
```

## 🔐 **Seguridad**

### **1. Autenticación JWT**

- Tokens se almacenan en localStorage
- Se envían automáticamente en headers
- Se limpian al cerrar sesión

### **2. Validación de Datos**

- Adaptadores validan estructura de datos
- Manejo de errores consistente
- Fallback seguro a datos mock

### **3. CORS y Headers**

```javascript
// Headers requeridos en el backend
Access-Control-Allow-Origin: http://localhost:9002
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

## 📈 **Optimizaciones**

### **1. Caching**

- Cache de respuestas del backend
- Invalidación automática
- Fallback a cache local

### **2. Reintentos**

- Reintentos automáticos en fallos de red
- Backoff exponencial
- Límite de reintentos

### **3. Performance**

- Lazy loading de datos
- Paginación
- Debouncing de requests

## 🎯 **Próximos Pasos**

1. **Implementar el backend** con los endpoints documentados
2. **Configurar CORS** en el backend
3. **Implementar autenticación JWT** en el backend
4. **Probar integración** con el backend real
5. **Optimizar performance** según necesidades
6. **Implementar monitoreo** en producción

## 📚 **Recursos Adicionales**

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Spring Boot](https://spring.io/projects/spring-boot)
- [Documentación de Axios](https://axios-http.com/docs/intro)
- [Documentación de NextAuth](https://next-auth.js.org/getting-started/introduction)
