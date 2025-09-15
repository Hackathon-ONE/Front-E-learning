# 🗄️ Configuración de Base de Datos PostgreSQL

## 📋 **INFORMACIÓN DE LA BASE DE DATOS**

- **URL:** `postgresql://elearning_8xpu_user:dd23oHDEQSpd7WEsoy8YKl2tYlhkGg1d@dpg-d2vdr87diees73e0t6d0-a.oregon-postgres.render.com/elearning_8xpu`
- **Host:** `dpg-d2vdr87diees73e0t6d0-a.oregon-postgres.render.com`
- **Puerto:** `5432`
- **Base de datos:** `elearning_8xpu`
- **Usuario:** `elearning_8xpu_user`

## 🛠️ **PASOS PARA CONFIGURAR**

### 1. **Instalar dependencias de PostgreSQL**

```bash
npm install pg @types/pg
# o
npm install prisma @prisma/client
```

### 2. **Configurar variables de entorno**

Crear archivo `.env.local`:

```env
# Base de datos PostgreSQL
DATABASE_URL="postgresql://elearning_8xpu_user:dd23oHDEQSpd7WEsoy8YKl2tYlhkGg1d@dpg-d2vdr87diees73e0t6d0-a.oregon-postgres.render.com/elearning_8xpu"

# NextAuth
NEXTAUTH_URL="http://localhost:9002"
NEXTAUTH_SECRET="tu-secret-key-aqui"

# API URLs
NEXT_PUBLIC_API_URL="http://localhost:9002/api"
```

### 3. **Crear tablas en la base de datos**

```bash
# Ejecutar script de migración
node src/scripts/migrate.js
```

### 4. **Verificar conexión**

```bash
# Probar conexión
npm run test:db
```

## 📊 **ESTRUCTURA DE TABLAS**

### **users** - Usuarios del sistema

- `id` (SERIAL PRIMARY KEY)
- `email` (VARCHAR UNIQUE)
- `password` (VARCHAR)
- `name` (VARCHAR)
- `image` (VARCHAR)
- `role` (VARCHAR) - ADMIN, INSTRUCTOR, STUDENT
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### **courses** - Cursos disponibles

- `id` (SERIAL PRIMARY KEY)
- `title` (VARCHAR)
- `description` (TEXT)
- `cover` (VARCHAR)
- `category` (VARCHAR)
- `level` (VARCHAR)
- `price` (DECIMAL)
- `is_free` (BOOLEAN)
- `instructor_id` (INTEGER REFERENCES users)
- `duration` (VARCHAR)
- `students_count` (INTEGER)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### **lessons** - Lecciones de los cursos

- `id` (SERIAL PRIMARY KEY)
- `course_id` (INTEGER REFERENCES courses)
- `title` (VARCHAR)
- `description` (TEXT)
- `video_url` (VARCHAR)
- `duration` (VARCHAR)
- `order_index` (INTEGER)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### **subscriptions** - Suscripciones de usuarios

- `id` (SERIAL PRIMARY KEY)
- `user_id` (INTEGER REFERENCES users)
- `course_id` (INTEGER REFERENCES courses)
- `status` (VARCHAR) - active, inactive, cancelled
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)
- UNIQUE(user_id, course_id)

### **progress** - Progreso de usuarios

- `id` (SERIAL PRIMARY KEY)
- `user_id` (INTEGER REFERENCES users)
- `course_id` (INTEGER REFERENCES courses)
- `lesson_id` (INTEGER REFERENCES lessons)
- `completed` (BOOLEAN)
- `completed_at` (TIMESTAMP)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### **payments** - Pagos realizados

- `id` (SERIAL PRIMARY KEY)
- `user_id` (INTEGER REFERENCES users)
- `course_id` (INTEGER REFERENCES courses)
- `amount` (DECIMAL)
- `status` (VARCHAR) - pending, completed, failed
- `payment_method` (VARCHAR)
- `transaction_id` (VARCHAR)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## 🔧 **SERVICIOS DISPONIBLES**

### **DatabaseService** (`src/lib/dbService.js`)

- `connect()` - Conectar a la base de datos
- `disconnect()` - Desconectar de la base de datos
- `getCourses()` - Obtener todos los cursos
- `getCourseById(id)` - Obtener curso por ID
- `getUserByEmail(email)` - Obtener usuario por email
- `createUser(userData)` - Crear nuevo usuario
- `checkSubscription(userId, courseId)` - Verificar suscripción
- `createSubscription(userId, courseId)` - Crear suscripción
- `getUserProgress(userId, courseId)` - Obtener progreso
- `updateProgress(userId, courseId, lessonId, completed)` - Actualizar progreso

## 🚀 **PRÓXIMOS PASOS**

1. **Instalar dependencias de PostgreSQL**
2. **Configurar variables de entorno**
3. **Ejecutar migraciones**
4. **Actualizar servicios para usar base de datos real**
5. **Probar conexión y funcionalidad**

## ⚠️ **NOTAS IMPORTANTES**

- La base de datos está en Render.com (PostgreSQL)
- Requiere SSL para conexión
- Las credenciales están en el archivo `.env.local`
- Los servicios están preparados pero necesitan implementación real
- Los datos actuales son mockeados hasta la implementación completa
