'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { coursesPageData, coursesDetailData } from '@/data/courses';

/**
 * Hook para verificar si un usuario tiene acceso a un curso específico
 * @param {string|number} courseId - ID del curso a verificar
 * @returns {Object} - { hasAccess, loading, error, isSubscribed }
 */
export function useSubscription(courseId) {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [hasAccess, setHasAccess] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authLoading) return;

    if (!courseId || courseId === 'undefined' || courseId === undefined) {
      setHasAccess(false);
      setLoading(false);
      return;
    }

    function checkAccess() {
      try {
        setLoading(true);
        setError(null);

        // Buscar el curso en los datos locales
        const course =
          coursesDetailData.find((c) => c.id.toString() === String(courseId)) ||
          coursesPageData.find((c) => c.id.toString() === String(courseId));

        if (!course) {
          throw new Error('Curso no encontrado');
        }

        // Si es gratuito, acceso libre
        if (course.isFree) {
          setHasAccess(true);
          setIsSubscribed(true);
          setLoading(false);
          return;
        }

        // Si no está autenticado, no tiene acceso
        if (!isAuthenticated) {
          setHasAccess(false);
          setIsSubscribed(false);
          setLoading(false);
          return;
        }

        // Simular verificación de suscripción (en un entorno real, esto vendría de una API)
        // Por ahora, asumimos que el usuario no está suscrito a menos que sea el curso gratuito
        setIsSubscribed(false);
        setHasAccess(false);
      } catch (err) {
        console.error('Error verificando suscripción:', err);
        setError(err.message);
        setHasAccess(false);
        setIsSubscribed(false);
      } finally {
        setLoading(false);
      }
    }

    checkAccess();
  }, [courseId, isAuthenticated, authLoading]);

  return {
    hasAccess,
    isSubscribed,
    loading,
    error,
  };
}

/**
 * Hook para verificar acceso a múltiples cursos
 * @param {Array} courseIds - Array de IDs de cursos
 * @returns {Object} - { subscriptions, loading, error }
 */
export function useMultipleSubscriptions(courseIds) {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [subscriptions, setSubscriptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authLoading) {
      return;
    }

    function checkMultipleAccess() {
      try {
        setError(null);

        if (!courseIds?.length) {
          setSubscriptions({});
          setLoading(false);
          return;
        }

        const subscriptionMap = {};

        courseIds.forEach((courseId) => {
          // Buscar el curso en los datos locales
          const course =
            coursesDetailData.find((c) => c.id.toString() === String(courseId)) ||
            coursesPageData.find((c) => c.id.toString() === String(courseId));

          if (course) {
            // Si es gratuito, acceso libre
            subscriptionMap[courseId] = course.isFree;
          } else {
            subscriptionMap[courseId] = false;
          }
        });

        setSubscriptions(subscriptionMap);
        setLoading(false);
      } catch (err) {
        console.error('Error verificando suscripciones múltiples:', err);
        setError(err.message);
        setLoading(false);
      }
    }

    checkMultipleAccess();
  }, [courseIds, isAuthenticated, authLoading]);

  return {
    subscriptions,
    loading,
    error,
  };
}
