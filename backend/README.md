# 🚀 Backend Java/Spring Boot - Lumina E-Learning

## 📋 **Descripción**

Backend completo para la plataforma de e-learning Lumina, desarrollado con Java/Spring Boot. Incluye autenticación JWT, gestión de usuarios, cursos, suscripciones y progreso.

## 🛠️ **Tecnologías**

- **Java 17+**
- **Spring Boot 3.x**
- **Spring Security**
- **Spring Data JPA**
- **MySQL/PostgreSQL**
- **JWT (JSON Web Tokens)**
- **Maven**

## 🚀 **Configuración Rápida**

### **1. Requisitos Previos**

```bash
# Java 17 o superior
java -version

# Maven 3.6+
mvn -version

# Base de datos (MySQL/PostgreSQL)
# Docker (opcional)
```

### **2. Instalación**

```bash
# Clonar el repositorio
git clone <repository-url>
cd backend

# Instalar dependencias
mvn clean install

# Ejecutar la aplicación
mvn spring-boot:run
```

### **3. Configuración de Base de Datos**

```yaml
# application.yml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/lumina_db
    username: lumina_user
    password: lumina_password
    driver-class-name: com.mysql.cj.jdbc.Driver
  
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQLDialect
```

## 🔌 **Endpoints Disponibles**

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

## 🧪 **Testing**

```bash
# Ejecutar tests
mvn test

# Ejecutar con cobertura
mvn test jacoco:report

# Tests de integración
mvn verify
```

## 📊 **Monitoreo**

- **Health Check**: `GET /actuator/health`
- **Metrics**: `GET /actuator/metrics`
- **Info**: `GET /actuator/info`

## 🔐 **Seguridad**

- Autenticación JWT
- CORS configurado para frontend
- Validación de datos
- Manejo de errores

## 📚 **Documentación API**

- Swagger UI: `http://localhost:8080/swagger-ui.html`
- OpenAPI JSON: `http://localhost:8080/v3/api-docs`
