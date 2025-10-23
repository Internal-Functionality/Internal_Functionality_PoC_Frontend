'use client';
import React, { useState } from 'react';
import { Search } from 'lucide-react';

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    console.log('Buscando:', searchQuery);
    // Aquí iría la lógica de búsqueda
  };

  const handleKeyPress = (e:any) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="bg-blue-500 px-20 py-12  min-w-max m-4 rounded-lg">
      {/* Título principal */}
      <h1 className="text-white text-6xl font-bold mb-3">
        Encuentra el profesional perfecto para ti
      </h1>
      
      {/* Subtítulo */}
      <p className="text-white text-3xl mb-8 opacity-95">
        Electricistas y plomeros certificados disponibles en tu zona
      </p>
      
      {/* Barra de búsqueda */}
      <div className="flex gap-3 max-w-6xl">
        <div className="flex-1 relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Search size={20} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Buscar electricista, plomero o servicio..."
            className="w-full bg-amber-50 pl-12 pr-4 py-3 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        
        <button
          onClick={handleSearch}
          className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 whitespace-nowrap"
        >
          Buscar
        </button>
      </div>
    </div>
  );
}
