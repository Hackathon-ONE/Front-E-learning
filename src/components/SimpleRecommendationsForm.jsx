'use client';

import { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function SimpleRecommendationsForm() {
  const [formData, setFormData] = useState({
    skills: '',
    experience: '',
    interests: '',
  });
  const [recommendations, setRecommendations] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular recomendaciones basadas en los datos del formulario
    setTimeout(() => {
      const mockRecommendations = {
        courseRecommendations: [
          {
            courseName: 'React Fundamentals',
            reason:
              'Basado en tus habilidades en JavaScript, React te ayudará a crear interfaces de usuario modernas.',
          },
          {
            courseName: 'Node.js Backend Development',
            reason:
              'Complementa tus habilidades frontend con desarrollo backend usando JavaScript.',
          },
          {
            courseName: 'UI/UX Design Principles',
            reason: 'Mejora tus habilidades de diseño para crear mejores experiencias de usuario.',
          },
        ],
      };
      setRecommendations(mockRecommendations);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Card */}
      <div
        className="rounded-xl shadow-md p-4 sm:p-6 mb-6"
        style={{
          backgroundColor: 'var(--color-card-primary)',
          color: 'var(--color-card-primary-text)',
        }}
      >
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Perfil</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Skills */}
          <div>
            <label className="block font-semibold mb-1 text-sm sm:text-base">Tus Habilidades</label>
            <textarea
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="ej. JavaScript, Python, UI Design, Project Management"
              className="w-full p-3 rounded-md border text-sm sm:text-base resize-y"
              rows={3}
              required
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block font-semibold mb-1 text-sm sm:text-base">Tu Experiencia</label>
            <textarea
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="ej. 2 años como desarrollador junior, pasante de marketing y fotógrafo aficionado."
              className="w-full p-3 rounded-md border text-sm sm:text-base resize-y"
              rows={3}
              required
            />
          </div>

          {/* Interests */}
          <div>
            <label className="block font-semibold mb-1 text-sm sm:text-base">Tus Intereses</label>
            <textarea
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              placeholder="ej. Me apasiona la visualización de datos, la creación de aplicaciones móviles y la escritura creativa."
              className="w-full p-3 rounded-md border text-sm sm:text-base resize-y"
              rows={3}
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto btn-primary px-5 py-3 rounded-lg shadow-md flex items-center justify-center text-sm sm:text-base disabled:opacity-50"
          >
            {isLoading ? 'Generando...' : 'Obtener Recomendaciones'}
            <Sparkles className="ml-2 h-4 w-4" />
          </button>
        </form>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div
          className="rounded-xl shadow-md p-4 sm:p-6"
          style={{
            backgroundColor: 'var(--color-card-secondary)',
            color: 'var(--color-card-secondary-text)',
          }}
        >
          <h2 className="text-lg sm:text-xl font-bold mb-4">Recomendaciones AI</h2>
          <div className="space-y-4 animate-pulse">
            <div className="h-4 sm:h-5 w-1/3 bg-gray-300 rounded" />
            <div className="h-3 sm:h-4 w-full bg-gray-300 rounded" />
            <div className="h-3 sm:h-4 w-4/5 bg-gray-300 rounded" />
          </div>
        </div>
      )}

      {/* Recommendations */}
      {recommendations && (
        <div
          className="rounded-xl shadow-md p-4 sm:p-6 mt-6 sm:mt-8"
          style={{
            backgroundColor: 'var(--color-card-secondary)',
            color: 'var(--color-card-secondary-text)',
          }}
        >
          <h2 className="text-lg sm:text-xl font-bold mb-4">Recomendaciones AI</h2>
          <div className="space-y-4">
            {recommendations.courseRecommendations.map((rec, index) => (
              <div key={index} className="p-3 sm:p-4 border rounded-lg">
                <h3 className="font-semibold text-base sm:text-lg flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-[var(--color-primary)]" />
                  {rec.courseName}
                </h3>
                <p className="mt-1 pl-6 text-xs sm:text-sm text-gray-500">{rec.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
