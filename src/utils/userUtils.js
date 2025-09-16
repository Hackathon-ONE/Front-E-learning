/**
 * Utilidades para manejo de usuarios
 */

// Lista de emails de usuarios mockeados (que ya tienen suscripción)
const MOCKED_USER_EMAILS = [
  'admin@lumina.com',
  'instructor@lumina.com',
  'student@lumina.com',
  'maria@lumina.com',
  'carlos@lumina.com',
  'ana@lumina.com',
  'david@lumina.com',
  'laura@lumina.com',
  'jorge@lumina.com'
];

/**
 * Verifica si un usuario es un usuario mockeado (ya tiene suscripción)
 * @param {Object} user - Objeto del usuario
 * @returns {boolean} - true si es usuario mockeado
 */
export function isMockedUser(user) {
  if (!user?.email) return false;
  return MOCKED_USER_EMAILS.includes(user.email);
}

/**
 * Verifica si un usuario es de Google
 * @param {Object} user - Objeto del usuario
 * @returns {boolean} - true si es usuario de Google
 */
export function isGoogleUser(user) {
  if (!user?.id) return false;
  return user.id.startsWith('google_');
}

/**
 * Verifica si un usuario tiene suscripción activa
 * @param {Object} user - Objeto del usuario
 * @returns {boolean} - true si tiene suscripción
 */
export function hasActiveSubscription(user) {
  if (!user?.id) return false;
  
  // Usuarios mockeados siempre tienen suscripción
  if (isMockedUser(user)) return true;
  
  // Para otros usuarios, verificar en localStorage
  const userSubscriptions = JSON.parse(
    localStorage.getItem('userSubscriptions') || '{}'
  );
  
  return userSubscriptions[user.id] === true;
}

/**
 * Activa la suscripción para un usuario
 * @param {string} userId - ID del usuario
 */
export function activateSubscription(userId) {
  const userSubscriptions = JSON.parse(
    localStorage.getItem('userSubscriptions') || '{}'
  );
  
  userSubscriptions[userId] = true;
  localStorage.setItem('userSubscriptions', JSON.stringify(userSubscriptions));
}

/**
 * Desactiva la suscripción para un usuario
 * @param {string} userId - ID del usuario
 */
export function deactivateSubscription(userId) {
  const userSubscriptions = JSON.parse(
    localStorage.getItem('userSubscriptions') || '{}'
  );
  
  userSubscriptions[userId] = false;
  localStorage.setItem('userSubscriptions', JSON.stringify(userSubscriptions));
}

/**
 * Obtiene el estado de suscripción de un usuario
 * @param {Object} user - Objeto del usuario
 * @returns {Object} - { isSubscribed, isMocked, isGoogle, hasAccess }
 */
export function getUserSubscriptionStatus(user) {
  const isMocked = isMockedUser(user);
  const isGoogle = isGoogleUser(user);
  const isSubscribed = hasActiveSubscription(user);
  
  return {
    isSubscribed: isMocked || isSubscribed,
    isMocked,
    isGoogle,
    hasAccess: isMocked || isSubscribed
  };
}
