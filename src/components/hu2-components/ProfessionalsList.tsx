'use client';
import React, { useState } from 'react';
import { Home, Zap, Wrench, Phone } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export  function ProfessionalsList() {
  const t = useTranslations('home');
  const [activeFilter, setActiveFilter] = useState('todos');

  const professionals = [
    {
      id: 1,
      name: 'Pedro Perez',
      profession: 'Plomero',
      specialty: 'Cerrajero',
      rating: 4.8,
      reviews: 127,
      location: 'Centro, Ciudad',
      price: 25,
      available: true,
      initials: 'PP',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 2,
      name: 'Carlos Ramirez',
      profession: 'Electricista',
      specialty: '',
      rating: 4.9,
      reviews: 203,
      location: 'Zona Norte',
      price: 30,
      available: true,
      initials: 'CR',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 3,
      name: 'Ana Martinez',
      profession: 'Electricista',
      specialty: '',
      rating: 4.7,
      reviews: 89,
      location: 'Zona Sur',
      price: 28,
      available: false,
      initials: 'AM',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 4,
      name: 'Luis Fernandez',
      profession: 'Plomero',
      specialty: '',
      rating: 4.6,
      reviews: 156,
      location: 'Zona Este',
      price: 22,
      available: true,
      initials: 'LF',
      color: 'bg-blue-100 text-blue-600'
    }
  ];

  const filteredProfessionals = professionals.filter(prof => {
    if (activeFilter === 'todos') return true;
    if (activeFilter === 'electricistas') return prof.profession === 'Electricista';
    if (activeFilter === 'plomeros') return prof.profession === 'Plomero';
    return true;
  });

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Filtros */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => setActiveFilter('todos')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-colors ${
              activeFilter === 'todos'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Home size={18} />
            {t('filterAll')}
          </button>
          <button
            onClick={() => setActiveFilter('electricistas')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-colors ${
              activeFilter === 'electricistas'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Zap size={18} />
            {t('filterElectricians')}
          </button>
          <button
            onClick={() => setActiveFilter('plomeros')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-colors ${
              activeFilter === 'plomeros'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Wrench size={18} />
            {t('filterPlumbers')}
          </button>
        </div>

        {/* Título de resultados */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{t('resultsTitle')}</h2>
          <p className="text-gray-600 mt-1">{t('resultsFound', { count: filteredProfessionals.length })}</p>
        </div>

        {/* Grid de profesionales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProfessionals.map((prof) => (
            <div key={prof.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className={`${prof.color} w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0`}>
                    {prof.initials}
                  </div>
                  
                  {/* Info básica */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{prof.name}</h3>
                    <p className="text-orange-600 text-sm font-medium">
                      {t(prof.profession === 'Electricista' ? 'electrician' : 'plumber')}{prof.specialty && ` - ${t('locksmith')}`}
                    </p>
                  </div>
                </div>

                {/* Badge disponible */}
                {prof.available && (
                  <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {t('available')}
                  </span>
                )}
              </div>

              {/* Rating y ubicación */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500">⭐</span>
                  <span className="font-bold text-gray-900">{prof.rating}</span>
                  <span className="text-gray-500 text-sm">({prof.reviews} {t('reviews')})</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {prof.location}
                </div>
                
              </div>

              {/* Botones de acción */}
              <div className="flex gap-3">
                <Link 
                  href={`/i18n-hu2/profile/${prof.id}`}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors text-center"
                >
                  {t('requestService')}
                </Link>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}