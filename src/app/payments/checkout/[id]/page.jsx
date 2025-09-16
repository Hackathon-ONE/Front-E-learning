'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Check, CreditCard, Shield, Clock } from 'lucide-react';

export default function CheckoutPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);

  // Datos de planes de suscripción
  const subscriptionPlans = {
    'basic': {
      id: 'basic',
      name: 'Plan Básico',
      price: 9.99,
      period: 'mes',
      description: 'Ideal para empezar y probar la app',
      features: [
        'Acceso limitado a funcionalidades',
        'Soporte por correo',
        '1 proyecto activo',
        'Acceso a cursos básicos'
      ],
      color: 'blue'
    },
    'pro': {
      id: 'pro',
      name: 'Plan Pro',
      price: 19.99,
      period: 'mes',
      description: 'Perfecto para usuarios frecuentes',
      features: [
        'Acceso completo a todas las funcionalidades',
        'Soporte prioritario',
        'Proyectos ilimitados',
        'Integraciones externas',
        'Acceso a todos los cursos'
      ],
      color: 'purple'
    },
    'premium': {
      id: 'premium',
      name: 'Plan Premium',
      price: 39.99,
      period: 'mes',
      description: 'La mejor experiencia para equipos y empresas',
      features: [
        'Todo en Pro',
        'Soporte 24/7',
        'Dashboard avanzado',
        'Reportes personalizados',
        'Gestión de equipos',
        'Certificaciones avanzadas'
      ],
      color: 'green'
    }
  };

  useEffect(() => {
    // Manejar tanto IDs numéricos como strings
    const planId = isNaN(parseInt(id)) ? id : parseInt(id);
    
    if (subscriptionPlans[planId]) {
      setPlan(subscriptionPlans[planId]);
    } else {
      router.push('/payments');
    }
  }, [id, router]);

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      router.push('/auth/login?redirect=' + encodeURIComponent(window.location.pathname));
      return;
    }

    setLoading(true);
    
    // Simular proceso de checkout
    try {
      // Aquí iría la integración con Stripe, PayPal, etc.
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simular éxito del pago
      alert(`¡Pago exitoso! Has suscrito al ${plan.name}.`);
      router.push('/dashboard');
    } catch (error) {
      console.error('Error en el checkout:', error);
      alert('Error procesando el pago. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (!plan) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[var(--color-text)] mb-4">
            Plan no encontrado
          </h1>
          <button
            onClick={() => router.push('/payments')}
            className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition"
          >
            Ver Planes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[var(--color-text)] mb-2">
            Finalizar Suscripción
          </h1>
          <p className="text-[var(--color-text)] opacity-75">
            Completa tu suscripción al {plan.name}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Resumen del Plan */}
          <div className="bg-[var(--color-surface)] rounded-lg p-6">
            <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">
              Resumen del Plan
            </h2>
            
            <div className={`p-4 rounded-lg border-2 border-${plan.color}-200 bg-${plan.color}-50 dark:bg-${plan.color}-900/20 mb-6`}>
              <h3 className="text-2xl font-bold text-[var(--color-text)] mb-2">
                {plan.name}
              </h3>
              <div className="flex items-baseline mb-2">
                <span className="text-4xl font-bold text-[var(--color-text)]">
                  ${plan.price}
                </span>
                <span className="text-[var(--color-text)] opacity-75 ml-2">
                  /{plan.period}
                </span>
              </div>
              <p className="text-[var(--color-text)] opacity-75">
                {plan.description}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-[var(--color-text)] mb-2">
                Características incluidas:
              </h4>
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-[var(--color-text)]">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Formulario de Pago */}
          <div className="bg-[var(--color-surface)] rounded-lg p-6">
            <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">
              Información de Pago
            </h2>

            {!isAuthenticated ? (
              <div className="text-center py-8">
                <Shield className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">
                  Inicia sesión para continuar
                </h3>
                <p className="text-[var(--color-text)] opacity-75 mb-4">
                  Necesitas una cuenta para procesar el pago
                </p>
                <button
                  onClick={() => router.push('/auth/login?redirect=' + encodeURIComponent(window.location.pathname))}
                  className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition"
                >
                  Iniciar Sesión
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Información del Usuario */}
                <div className="bg-[var(--color-bg)] rounded-lg p-4">
                  <h3 className="font-semibold text-[var(--color-text)] mb-2">
                    Usuario
                  </h3>
                  <p className="text-[var(--color-text)]">{user?.name}</p>
                  <p className="text-sm text-[var(--color-text)] opacity-75">{user?.email}</p>
                </div>

                {/* Métodos de Pago */}
                <div>
                  <h3 className="font-semibold text-[var(--color-text)] mb-3">
                    Método de Pago
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-[var(--color-bg)] transition">
                      <CreditCard className="w-5 h-5 text-[var(--color-text)]" />
                      <span className="text-[var(--color-text)]">Tarjeta de Crédito/Débito</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-[var(--color-bg)] transition">
                      <Shield className="w-5 h-5 text-[var(--color-text)]" />
                      <span className="text-[var(--color-text)]">PayPal</span>
                    </div>
                  </div>
                </div>

                {/* Total */}
                <div className="border-t border-gray-300 dark:border-gray-600 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[var(--color-text)]">Subtotal:</span>
                    <span className="text-[var(--color-text)]">${plan.price}</span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span className="text-[var(--color-text)]">Total:</span>
                    <span className="text-[var(--color-text)]">${plan.price}</span>
                  </div>
                </div>

                {/* Botón de Pago */}
                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Clock className="w-5 h-5 animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      Pagar ${plan.price}
                    </>
                  )}
                </button>

                {/* Información de Seguridad */}
                <div className="text-center text-sm text-[var(--color-text)] opacity-75">
                  <Shield className="w-4 h-4 inline mr-1" />
                  Pago seguro y encriptado
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
