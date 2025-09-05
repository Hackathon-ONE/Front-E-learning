'use client';

import { useState } from 'react';
import { Eye, EyeOff, Copy, Check, ChevronDown, ChevronUp, TestTube } from 'lucide-react';

const testAccounts = [
  {
    role: 'Admin',
    email: 'admin@lumina.com',
    password: 'admin123',
    description: 'Acceso completo al sistema',
    color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  },
  {
    role: 'Instructor',
    email: 'instructor@lumina.com',
    password: 'instructor123',
    description: 'Crear y gestionar cursos',
    color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  },
  {
    role: 'Student',
    email: 'student@lumina.com',
    password: 'student123',
    description: 'Acceso a cursos matriculados',
    color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  },
];

export default function TestCredentials() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPasswords, setShowPasswords] = useState({});
  const [copiedField, setCopiedField] = useState('');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const togglePassword = (index) => {
    setShowPasswords((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const copyToClipboard = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(''), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  return (
    <div className="mb-6">
      {/* Header del dropdown */}
      <button
        onClick={toggleDropdown}
        className="w-full bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4 hover:from-orange-100 hover:to-yellow-100 dark:hover:from-orange-900/30 dark:hover:to-yellow-900/30 transition-all duration-200"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TestTube className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            <div className="text-left">
              <h3 className="text-sm font-semibold text-orange-800 dark:text-orange-200">
                Credenciales de Prueba
              </h3>
              <p className="text-xs text-orange-600 dark:text-orange-400">
                Haz clic para ver las cuentas de demo
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 px-2 py-1 rounded-md">
              {testAccounts.length} cuentas
            </span>
            {isOpen ? (
              <ChevronUp className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            )}
          </div>
        </div>
      </button>

      {/* Contenido del dropdown */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-100 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="mt-2 bg-white dark:bg-gray-600 border border-gray-200 dark:border-gray-500 rounded-lg shadow-sm">
          <div className="mb-2 px-2">
            {testAccounts.map((account, index) => (
              <div
                key={index}
                className="border border-gray-100 dark:border-gray-700 rounded-lg p-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                {/* Header de la cuenta */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium px-2 py-1 rounded-md ${account.color}`}>
                      {account.role}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                      {account.description}
                    </span>
                  </div>
                </div>

                {/* Credenciales */}
                <div className="space-y-2">
                  {/* Email */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-600 dark:text-gray-600 w-12 flex-shrink-0">
                      Email:
                    </span>
                    <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs flex-1 min-w-0 truncate">
                      {account.email}
                    </code>
                    <button
                      onClick={() => copyToClipboard(account.email, `email-${index}`)}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors flex-shrink-0"
                      title="Copiar email"
                    >
                      {copiedField === `email-${index}` ? (
                        <Check className="w-3 h-3 text-green-600" />
                      ) : (
                        <Copy className="w-3 h-3 text-gray-500" />
                      )}
                    </button>
                  </div>

                  {/* Password */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-600 dark:text-gray-400 w-12 flex-shrink-0">
                      Pass:
                    </span>
                    <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs flex-1 min-w-0">
                      {showPasswords[index] ? account.password : '••••••••'}
                    </code>
                    <button
                      onClick={() => togglePassword(index)}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors flex-shrink-0"
                      title={showPasswords[index] ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    >
                      {showPasswords[index] ? (
                        <EyeOff className="w-3 h-3 text-gray-500" />
                      ) : (
                        <Eye className="w-3 h-3 text-gray-500" />
                      )}
                    </button>
                    <button
                      onClick={() => copyToClipboard(account.password, `pass-${index}`)}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors flex-shrink-0"
                      title="Copiar contraseña"
                    >
                      {copiedField === `pass-${index}` ? (
                        <Check className="w-3 h-3 text-green-600" />
                      ) : (
                        <Copy className="w-3 h-3 text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer con instrucciones */}
          <div className="px-4 pb-4 space-y-2">
            <div className="bg-orange-50 mb-2 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
              <p className="text-xs text-orange-700 dark:text-orange-300 flex items-center gap-2">
                <Copy className="w-3 h-3" />
                Haz clic en los iconos para copiar o mostrar/ocultar contraseñas
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
