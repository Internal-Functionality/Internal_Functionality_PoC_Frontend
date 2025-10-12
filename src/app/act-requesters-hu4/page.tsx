"use client";

import { useState } from "react";
import LoginButton from "../../components/hu4-components/LoginButton";
import SearchBar from "../../components/hu4-components/SearchBar";
import CategoryGrid from "../../components/hu4-components/CategoryGrid";
import SearchResults from "../../components/hu4-components/SearchResults";
import type { FilterOptions } from "../../components/hu4-components/SearchBar";
import type { Fixer } from "../../components/hu4-components/SearchResults";

// Datos mock de fixers para prueba
const mockFixers: Fixer[] = [
  {
    id: "1",
    name: "Juan Pérez",
    rating: 4.8,
    distance: 2.3,
    category: "Instalaciones",
  },
  {
    id: "2",
    name: "María González",
    rating: 4.9,
    distance: 1.5,
    category: "Limpieza",
  },
  {
    id: "3",
    name: "Carlos Ramírez",
    rating: 4.6,
    distance: 3.7,
    category: "Reparaciones",
  },
  {
    id: "4",
    name: "Ana Martínez",
    rating: 5.0,
    distance: 0.8,
    category: "Pintura",
  },
  {
    id: "5",
    name: "Luis Torres",
    rating: 4.7,
    distance: 4.2,
    category: "Jardinería",
  },
];

export default function App() {
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<Fixer[]>([]);

  const handleSearch = (query: string) => {
    console.log("Búsqueda:", query);

    if (query.trim()) {
      setResults(mockFixers);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  const handleFilterChange = (filters: FilterOptions) => {
    console.log("Filtros activos:", filters);
  };

  const handleCategorySelect = (categoryId: string | null) => {
    console.log("Categoría seleccionada:", categoryId);

    if (categoryId) {
      const filteredResults = mockFixers.filter(
        (fixer) => fixer.category.toLowerCase() === categoryId.toLowerCase()
      );
      setResults(filteredResults);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  const handleAuthChange = (isAuthenticated: boolean) => {
    console.log("Estado de autenticación:", isAuthenticated);
  };

  return (
    <div className="min-h-screen bg-gray-50" suppressHydrationWarning>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">SERVINEO</h1>
          <LoginButton onAuthChange={handleAuthChange} />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-8 py-12">
        {/* Title */}
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
          BUSCA UN SERVICIO
        </h2>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto">
          <SearchBar
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            placeholder="Buscar servicios..."
          />
        </div>

        {/* Category Grid */}
        <CategoryGrid onCategorySelect={handleCategorySelect} />

        {/* Search Results */}
        <SearchResults results={results} isVisible={showResults} />
      </main>
    </div>
  );
}
