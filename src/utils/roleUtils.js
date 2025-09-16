/**
 * Utilidades para manejo de roles en la aplicación
 */

export const ROLES = {
  ADMIN: "ADMIN",
  INSTRUCTOR: "INSTRUCTOR", 
  STUDENT: "STUDENT",
  GUEST: "GUEST"
};

export const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: [
    "manage_users",
    "manage_courses", 
    "manage_instructors",
    "view_analytics",
    "manage_payments",
    "access_admin_panel",
    "access_instructor_panel",
    "access_student_panel"
  ],
  [ROLES.INSTRUCTOR]: [
    "create_courses",
    "edit_own_courses",
    "manage_own_students",
    "view_own_analytics",
    "access_instructor_panel"
  ],
  [ROLES.STUDENT]: [
    "enroll_courses",
    "view_own_progress",
    "access_student_panel"
  ]
};

/**
 * Verifica si un usuario tiene un permiso específico
 * @param {string} userRole - Rol del usuario
 * @param {string} permission - Permiso a verificar
 * @returns {boolean}
 */
export function hasPermission(userRole, permission) {
  const permissions = ROLE_PERMISSIONS[userRole] || [];
  return permissions.includes(permission);
}

/**
 * Verifica si un usuario puede acceder a una ruta
 * @param {string} userRole - Rol del usuario
 * @param {string} route - Ruta a verificar
 * @returns {boolean}
 */
export function canAccessRoute(userRole, route) {
  // Rutas públicas (acceso sin autenticación)
  const publicRoutes = [
    "/",
    "/courses",
    "/courses/[id]", // Solo el catálogo y vista básica
    "/team",
    "/payments",
    "/help",
    "/auth",
    "/demo",
    "/test-roles",
    "/debug-courses",
    "/debug-user",
    "/403",
    "/404",
    "/500"
  ];
  
  // Verificar si es una ruta pública
  const isPublicRoute = publicRoutes.some(publicRoute => {
    if (publicRoute.includes("[id]")) {
      return route.match(/^\/courses\/\d+$/);
    }
    return route.startsWith(publicRoute);
  });
  
  if (isPublicRoute) {
    return true; // Acceso público
  }
  
  // Rutas que requieren autenticación
  if (route.startsWith("/admin")) {
    return userRole === ROLES.ADMIN;
  }
  
  if (route.startsWith("/instructor")) {
    return userRole === ROLES.INSTRUCTOR || userRole === ROLES.ADMIN;
  }
  
  if (route.startsWith("/students")) {
    return userRole === ROLES.STUDENT || userRole === ROLES.ADMIN;
  }
  
  // Rutas de cursos que requieren autenticación
  if (route.includes("/lessons") || route.includes("/resources") || route.includes("/quizzes")) {
    return userRole === ROLES.STUDENT || userRole === ROLES.INSTRUCTOR || userRole === ROLES.ADMIN;
  }
  
  // Rutas de dashboard
  if (route.startsWith("/dashboard")) {
    return userRole !== ROLES.GUEST; // Cualquier usuario autenticado
  }
  
  // Por defecto, permitir acceso (rutas públicas)
  return true;
}

/**
 * Obtiene la ruta de redirección por defecto para un rol
 * @param {string} userRole - Rol del usuario
 * @returns {string}
 */
export function getDefaultRedirectPath(userRole) {
  switch (userRole) {
    case ROLES.ADMIN:
      return "/admin/dashboard";
    case ROLES.INSTRUCTOR:
      return "/instructor/dashboard";
    case ROLES.STUDENT:
      return "/";
    default:
      return "/";
  }
}

/**
 * Normaliza un rol a mayúsculas
 * @param {string} role - Rol a normalizar
 * @returns {string}
 */
export function normalizeRole(role) {
  if (!role) return ROLES.GUEST;
  return role.toUpperCase();
}

/**
 * Verifica si un rol es válido
 * @param {string} role - Rol a verificar
 * @returns {boolean}
 */
export function isValidRole(role) {
  return Object.values(ROLES).includes(normalizeRole(role));
}
