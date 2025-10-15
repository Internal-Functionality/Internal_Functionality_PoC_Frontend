"use client";

import { useState } from "react";
import LoginButton from "../../../components/hu4-components/LoginButton";
import SearchBar from "../../../components/hu4-components/SearchBar/SearchBar";
import CategoryGrid from "../../../components/hu4-components/CategoryGrid/CategoryGrid";
import SearchResults from "../../../components/hu4-components/SearchResults/SearchResults";
import type { FilterOptions } from "../../../components/hu4-components/SearchBar/SearchBar.types";
import type { Fixer } from "../../../components/hu4-components/SearchResults/SearchResults.types";
import {
  searchService,
  type SearchRequest,
  type Job,
  type User,
} from "../../../service/searchService";

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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentFilters, setCurrentFilters] = useState<FilterOptions>({
    calificacion: false,
    cercania: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query: string) => {
    console.log("Búsqueda:", query);

    if (query.trim()) {
      setIsLoading(true);

      try {
        // 1. Guardar la búsqueda en el backend
        const searchData: SearchRequest = {
          userName: "usuario_anonimo", // Por ahora hardcodeado, se puede mejorar después
          userTypes: "requester", // Tipo de usuario
          search: query,
          typeOfService: selectedCategory || "0", // Si no hay categoría seleccionada, usar "0"
          scope: currentFilters.cercania ? 1 : 0, // 1 si está activado el filtro de cercanía, 0 si no
        };

        const searchResponse = await searchService.saveSearch(searchData);
        if (searchResponse.success) {
          console.log("Búsqueda guardada exitosamente:", searchResponse.data);
        } else {
          console.error("Error al guardar búsqueda:", searchResponse.message);
        }

        // 2. Obtener todos los jobs del backend
        const jobsResponse = await searchService.getAllJobs();
        if (!jobsResponse.success || !jobsResponse.data) {
          console.error("Error al obtener jobs:", jobsResponse.message);
          setShowResults(false);
          return;
        }

        // 3. Filtrar jobs por título que coincida con la búsqueda
        const filteredJobs = jobsResponse.data.filter((job: Job) =>
          job.title.toLowerCase().includes(query.toLowerCase())
        );

        if (filteredJobs.length === 0) {
          console.log("No se encontraron jobs que coincidan con la búsqueda");
          setResults([]);
          setShowResults(true);
          return;
        }

        // 4. Obtener todos los users del backend
        const usersResponse = await searchService.getAllUsers();
        if (!usersResponse.success || !usersResponse.data) {
          console.error("Error al obtener users:", usersResponse.message);
          setShowResults(false);
          return;
        }

        // 5. Mapear jobs filtrados a formato Fixer usando los datos de users
        const fixerResults: Fixer[] = filteredJobs.map((job: Job) => {
          // Buscar el user que corresponde al fixerId del job
          const fixerUser = usersResponse.data?.find(
            (user: User) => user._id === job.fixerId
          );

          return {
            id: job._id,
            name: fixerUser?.name || "Usuario no encontrado",
            rating: 4.5, // Por ahora hardcodeado, se puede obtener del backend después
            distance: Math.random() * 5, // Por ahora aleatorio, se puede calcular después
            category: job.title, // Usar el título como categoría por ahora
          };
        });

        // 6. Mostrar resultados
        setResults(fixerResults);
        setShowResults(true);
        console.log("Resultados encontrados:", fixerResults);
      } catch (error) {
        console.error("Error en la búsqueda:", error);
        setShowResults(false);
      } finally {
        setIsLoading(false);
      }
    } else {
      setShowResults(false);
    }
  };

  const handleFilterChange = (filters: FilterOptions) => {
    console.log("Filtros activos:", filters);
    setCurrentFilters(filters);
  };

  const handleCategorySelect = (categoryId: string | null) => {
    console.log("Categoría seleccionada:", categoryId);
    setSelectedCategory(categoryId);

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
          {isLoading && (
            <div className="text-center mt-4">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-700 mr-2"></div>
                Buscando servicios...
              </div>
            </div>
          )}
        </div>

        {/* Category Grid */}
        <CategoryGrid onCategorySelect={handleCategorySelect} />

        {/* Search Results */}
        <SearchResults results={results} isVisible={showResults} />
      </main>
    </div>
  );
}
