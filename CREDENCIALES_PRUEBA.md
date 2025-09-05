# 🧪 Credenciales de Prueba - Lumina Platform

## Cuentas de Prueba Disponibles

### 👨‍💼 Administrador

- **Email:** `admin@lumina.com`
- **Contraseña:** `admin123`
- **Permisos:** Acceso completo al sistema, gestión de usuarios e instructores

### 👨‍🏫 Instructor

- **Email:** `instructor@lumina.com`
- **Contraseña:** `instructor123`
- **Permisos:** Crear cursos, gestionar estudiantes, ver estadísticas

### 👨‍🎓 Estudiante

- **Email:** `student@lumina.com`
- **Contraseña:** `student123`
- **Permisos:** Acceso a cursos, perfil personal, configuración

## Cuentas Adicionales

### Más Estudiantes

- **Email:** `maria@student.com` | **Contraseña:** `123456`

### Más Instructores

- **Email:** `carlos@instructor.com` | **Contraseña:** `123456`

### Más Administradores

- **Email:** `ana@admin.com` | **Contraseña:** `123456`

## 🚀 Flujo de Login Actualizado

1. **Acceso:** Visita `/auth/login`
2. **Credenciales:** Usa cualquiera de las cuentas de arriba
3. **Redirección:** Después del login, siempre redirige a `/` (página principal)
4. **Contenido Condicional:** La página principal muestra contenido específico según el rol:
   - **Admin:** Dashboard administrativo con gestión completa
   - **Instructor:** Panel de instructor con cursos y estudiantes
   - **Student:** Dashboard de estudiante con cursos matriculados

## 🔧 Características Implementadas

### ✅ Login con Credenciales

- Validación de email y contraseña
- Manejo de errores
- Redirección automática

### ✅ Login con Google

- Integración con NextAuth
- Mapeo automático de roles
- Redirección a página principal

### ✅ Navbar Condicional

- **Admin:** Dashboard Admin
- **Instructor:** Dashboard Instructor + Perfil + Configuración
- **Student:** Perfil + Configuración
- **Todos:** Cerrar sesión

### ✅ Página Principal Dinámica

- **No autenticado:** Landing page completa con Hero, Features, etc.
- **Autenticado:** Dashboard específico por rol con accesos rápidos

### ✅ Hooks de Utilidad

- `useRoleRedirect`: Manejo de redirecciones por rol
- `useAuthRedirect`: Redirige si ya está autenticado (para páginas de login)
- `useRequireAuth`: Requiere autenticación para acceder

## 🎯 Próximos Pasos Sugeridos

1. **Implementar páginas de dashboard específicas:**

   - `/admin/dashboard`
   - `/instructor/dashboard`
   - `/dashboard/profile`
   - `/dashboard/settings`

2. **Agregar protección de rutas:**

   ```jsx
   // En páginas que requieren roles específicos
   useRequireAuth(['ADMIN']); // Solo admin
   useRequireAuth(['ADMIN', 'INSTRUCTOR']); // Admin o instructor
   ```

3. **Conectar con backend real:**
   - Reemplazar `mockUsers` con API real
   - Implementar JWT tokens
   - Agregar refresh tokens

## 🔍 Cómo Probar

1. **Inicia la aplicación:** `npm run dev`
2. **Ve a login:** `http://localhost:3000/auth/login`
3. **Prueba cada rol:** Usa las credenciales de arriba
4. **Observa las diferencias:** Cada rol ve contenido diferente
5. **Verifica el navbar:** El dropdown cambia según el rol

¡Listo para probar! 🎉
