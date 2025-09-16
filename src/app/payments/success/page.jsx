'use client';

import { useRouter } from 'next/navigation';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function PaymentSuccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center">
        <div className="bg-[var(--color-surface)] rounded-2xl shadow-xl p-8">
          {/* Icono de éxito */}
          <div className="mb-6">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
          </div>

          {/* Título */}
          <h1 className="text-2xl font-bold text-[var(--color-text)] mb-4">¡Pago Exitoso!</h1>

          {/* Mensaje */}
          <p className="text-[var(--color-text)] mb-6">
            Tu suscripción ha sido activada correctamente. Ahora tienes acceso completo a todos los
            cursos de la plataforma.
          </p>

          {/* Beneficios */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-[var(--color-text)] mb-2">
              ¿Qué puedes hacer ahora?
            </h3>
            <ul className="text-sm text-[var(--color-text)] space-y-1 text-left">
              <li>✅ Acceder a todas las lecciones</li>
              <li>✅ Descargar recursos y materiales</li>
              <li>✅ Tomar quizzes y evaluaciones</li>
              <li>✅ Obtener certificados de finalización</li>
            </ul>
          </div>

          {/* Botones de acción */}
          <div className="space-y-3">
            <Button
              onClick={() => router.push('/courses')}
              className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
            >
              Explorar Cursos
              <ArrowRight className="w-4 h-4" />
            </Button>

            <Button
              onClick={() => router.push('/')}
              className="w-full py-3 bg-gray-500 text-white rounded-lg font-semibold hover:opacity-90 transition"
            >
              Ir al Inicio
            </Button>
          </div>

          {/* Información adicional */}
          <div className="mt-6 text-xs text-[var(--color-text)]">
            <p>Recibirás un correo de confirmación en los próximos minutos.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
