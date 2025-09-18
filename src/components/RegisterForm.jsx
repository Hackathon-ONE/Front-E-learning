'use client';

import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '@/context/AuthContext';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthLayout from './AuthLayout';
import { useAuthRedirect } from '@/hooks/useRoleRedirect';

export default function RegisterForm() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Redirigir si ya está autenticado
  useAuthRedirect();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Nombre es requerido';
    if (!formData.email.trim()) newErrors.email = 'Email es requerido';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email no es válido';
    if (!formData.password.trim()) newErrors.password = 'Contraseña es requerida';
    else if (formData.password.length < 6) newErrors.password = 'Debe tener al menos 6 caracteres';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password.trim(),
          role: 'STUDENT', // por defecto
        }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log('Usuario registrado exitosamente:', data);
        router.push('/auth/login?message=Registro exitoso. Inicia sesión con tus credenciales.');
      } else {
        const errorData = await res.json();
        setErrors({ general: errorData.error || 'Error al registrarse' });
      }
    } catch (error) {
      console.error('Error en registro:', error);
      setErrors({ general: 'Error de conexión. Inténtalo de nuevo.' });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setLoading(true);
    await signIn('google', { callbackUrl: '/' });
    setLoading(false);
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold mb-6 text-center">Registro</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.general && <p className="text-sm text-red-500">{errors.general}</p>}

        <div>
          <label htmlFor="name" className="block mb-1">
            Nombre
          </label>
          <input
            id="name"
            type="text"
            name="name"
            className="w-full p-3 rounded-lg border border-gray-400 dark:border-gray-700"
            value={formData.name}
            onChange={handleChange}
            autoComplete="on"
            required
          />
          {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            className="w-full p-3 rounded-lg border border-gray-400 dark:border-gray-700"
            value={formData.email}
            onChange={handleChange}
            autoComplete="on"
            required
          />
          {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="password" className="block mb-1">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            name="password"
            className="w-full p-3 rounded-lg border border-gray-400 dark:border-gray-700"
            value={formData.password}
            onChange={handleChange}
            autoComplete="off"
            required
          />
          {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
        </div>

        <button
          aria-label="Registrarse"
          type="submit"
          disabled={loading}
          className="w-full py-3 cursor-pointer rounded-lg font-semibold disabled:opacity-50"
          style={{
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-primary-text)',
          }}
        >
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>

      <div className="my-4 flex items-center justify-center gap-2">
        <span>o</span>
      </div>

      <button
        type="button"
        aria-label="Registrarse con Google"
        onClick={handleGoogleRegister}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-3 cursor-pointer rounded-lg border font-semibold disabled:opacity-50"
        style={{
          borderColor: 'var(--color-secondary)',
          backgroundColor: 'var(--color-terciary)',
          color: 'var(--color-text-primary)',
        }}
      >
        <FcGoogle className="w-5 h-5" />
        Registrarse con Google
      </button>

      {/* Pregunta de cambio */}
      <p className="text-center mt-4 text-sm">
        ¿Ya tienes cuenta?{' '}
        <Link
          href="/auth/login"
          className="font-semibold"
          style={{ color: 'var(--color-primary)' }}
        >
          Inicia sesión
        </Link>
      </p>
    </AuthLayout>
  );
}
