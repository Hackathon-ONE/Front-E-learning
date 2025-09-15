# 🔗 Integración Frontend ↔ Backend Java/Spring Boot

## 📋 **ENDPOINTS ESPERADOS POR EL FRONTEND**

### **Base URL**

```
http://localhost:8080/api
```

### **1. Autenticación**

#### **POST /api/auth/login**

```json
// Request
{
  "email": "admin@lumina.com",
  "password": "admin123"
}

// Response
{
  "success": true,
  "message": "Login exitoso",
  "data": {
    "user": {
      "id": 1,
      "email": "admin@lumina.com",
      "name": "Administrador",
      "role": "ADMIN",
      "image": "/default-avatar.png",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-12-01T00:00:00Z"
    },
    "token": "jwt-token-here",
    "expiresIn": 3600
  },
  "timestamp": "2024-12-01T00:00:00Z",
  "status": 200
}
```

#### **POST /api/auth/register**

```json
// Request
{
  "email": "nuevo@lumina.com",
  "password": "password123",
  "name": "Nuevo Usuario",
  "role": "STUDENT"
}

// Response
{
  "success": true,
  "message": "Usuario registrado exitosamente",
  "data": {
    "user": {
      "id": 4,
      "email": "nuevo@lumina.com",
      "name": "Nuevo Usuario",
      "role": "STUDENT",
      "image": "/default-avatar.png",
      "createdAt": "2024-12-01T00:00:00Z",
      "updatedAt": "2024-12-01T00:00:00Z"
    },
    "token": "jwt-token-here",
    "expiresIn": 3600
  },
  "timestamp": "2024-12-01T00:00:00Z",
  "status": 201
}
```

### **2. Usuarios**

#### **GET /api/users**

```json
// Response
{
  "success": true,
  "message": "Usuarios obtenidos exitosamente",
  "data": [
    {
      "id": 1,
      "email": "admin@lumina.com",
      "name": "Administrador",
      "role": "ADMIN",
      "image": "/default-avatar.png",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-12-01T00:00:00Z"
    }
  ],
  "timestamp": "2024-12-01T00:00:00Z",
  "status": 200
}
```

#### **GET /api/users/{id}**

```json
// Response
{
  "success": true,
  "message": "Usuario obtenido exitosamente",
  "data": {
    "id": 1,
    "email": "admin@lumina.com",
    "name": "Administrador",
    "role": "ADMIN",
    "image": "/default-avatar.png",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-12-01T00:00:00Z"
  },
  "timestamp": "2024-12-01T00:00:00Z",
  "status": 200
}
```

### **3. Cursos**

#### **GET /api/courses**

```json
// Response
{
  "success": true,
  "message": "Cursos obtenidos exitosamente",
  "data": [
    {
      "id": 1,
      "title": "React Avanzado",
      "description": "Construye aplicaciones modernas con React y Next.js",
      "cover": "/images/react-nextjs.png",
      "category": "Frontend",
      "level": "Avanzado",
      "price": 99.99,
      "isFree": false,
      "instructorId": 2,
      "instructorName": "Instructor Principal",
      "duration": "10h 45m",
      "studentsCount": 520,
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-12-01T00:00:00Z"
    }
  ],
  "timestamp": "2024-12-01T00:00:00Z",
  "status": 200
}
```

#### **GET /api/courses/{id}**

```json
// Response
{
  "success": true,
  "message": "Curso obtenido exitosamente",
  "data": {
    "id": 1,
    "title": "React Avanzado",
    "description": "Construye aplicaciones modernas con React y Next.js",
    "cover": "/images/react-nextjs.png",
    "category": "Frontend",
    "level": "Avanzado",
    "price": 99.99,
    "isFree": false,
    "instructorId": 2,
    "instructorName": "Instructor Principal",
    "duration": "10h 45m",
    "studentsCount": 520,
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-12-01T00:00:00Z"
  },
  "timestamp": "2024-12-01T00:00:00Z",
  "status": 200
}
```

### **4. Lecciones**

#### **GET /api/courses/{courseId}/lessons**

```json
// Response
{
  "success": true,
  "message": "Lecciones obtenidas exitosamente",
  "data": [
    {
      "id": 1,
      "courseId": 1,
      "title": "Introducción a React Hooks",
      "description": "Aprende sobre useState y useEffect",
      "videoUrl": "/video/video1.mp4",
      "duration": "45m",
      "orderIndex": 1,
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-12-01T00:00:00Z"
    }
  ],
  "timestamp": "2024-12-01T00:00:00Z",
  "status": 200
}
```

### **5. Suscripciones**

#### **GET /api/subscriptions?userId={userId}**

```json
// Response
{
  "success": true,
  "message": "Suscripciones obtenidas exitosamente",
  "data": [
    {
      "id": 1,
      "userId": 3,
      "courseId": 1,
      "status": "ACTIVE",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-12-01T00:00:00Z"
    }
  ],
  "timestamp": "2024-12-01T00:00:00Z",
  "status": 200
}
```

#### **POST /api/subscriptions**

```json
// Request
{
  "userId": 3,
  "courseId": 1
}

// Response
{
  "success": true,
  "message": "Suscripción creada exitosamente",
  "data": {
    "id": 1,
    "userId": 3,
    "courseId": 1,
    "status": "ACTIVE",
    "createdAt": "2024-12-01T00:00:00Z",
    "updatedAt": "2024-12-01T00:00:00Z"
  },
  "timestamp": "2024-12-01T00:00:00Z",
  "status": 201
}
```

### **6. Progreso**

#### **GET /api/progress?userId={userId}&courseId={courseId}**

```json
// Response
{
  "success": true,
  "message": "Progreso obtenido exitosamente",
  "data": [
    {
      "id": 1,
      "userId": 3,
      "courseId": 1,
      "lessonId": 1,
      "completed": true,
      "completedAt": "2024-12-01T00:00:00Z",
      "createdAt": "2024-12-01T00:00:00Z",
      "updatedAt": "2024-12-01T00:00:00Z"
    }
  ],
  "timestamp": "2024-12-01T00:00:00Z",
  "status": 200
}
```

#### **POST /api/progress**

```json
// Request
{
  "userId": 3,
  "courseId": 1,
  "lessonId": 1,
  "completed": true
}

// Response
{
  "success": true,
  "message": "Progreso actualizado exitosamente",
  "data": {
    "id": 1,
    "userId": 3,
    "courseId": 1,
    "lessonId": 1,
    "completed": true,
    "completedAt": "2024-12-01T00:00:00Z",
    "updatedAt": "2024-12-01T00:00:00Z"
  },
  "timestamp": "2024-12-01T00:00:00Z",
  "status": 200
}
```

## 🔧 **CONFIGURACIÓN REQUERIDA**

### **1. CORS**

```java
@CrossOrigin(origins = "http://localhost:9002")
```

### **2. Headers de Respuesta**

```
Content-Type: application/json
Access-Control-Allow-Origin: http://localhost:9002
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

### **3. Autenticación JWT**

- Header: `Authorization: Bearer {token}`
- Expiración: 3600 segundos (1 hora)
- Algoritmo: HS256

## 🧪 **TESTING**

### **Ejecutar Tests de Integración**

1. Iniciar el frontend: `npm run dev`
2. Visitar: `http://localhost:9002/test-integration`
3. Hacer clic en "Ejecutar Tests de Integración"

### **Verificar Endpoints**

```bash
# Test de autenticación
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@lumina.com","password":"admin123"}'

# Test de cursos
curl http://localhost:8080/api/courses

# Test de suscripciones
curl "http://localhost:8080/api/subscriptions?userId=3"
```

## 📊 **ESTRUCTURA DE RESPUESTA ESTÁNDAR**

Todas las respuestas del backend deben seguir esta estructura:

```json
{
  "success": boolean,
  "message": string,
  "data": any,
  "timestamp": string (ISO 8601),
  "status": number (HTTP status code)
}
```

## ⚠️ **NOTAS IMPORTANTES**

1. **Timestamps**: Usar formato ISO 8601 (UTC)
2. **IDs**: Usar enteros secuenciales
3. **Roles**: ADMIN, INSTRUCTOR, STUDENT (en mayúsculas)
4. **Estados**: ACTIVE, INACTIVE, CANCELLED (en mayúsculas)
5. **Precios**: Usar decimales con 2 decimales
6. **URLs**: Usar rutas relativas para imágenes y videos
7. **Paginación**: Implementar para listas largas
8. **Filtros**: Soporte para búsqueda y filtrado
9. **Validación**: Validar todos los inputs
10. **Manejo de errores**: Respuestas consistentes para errores
