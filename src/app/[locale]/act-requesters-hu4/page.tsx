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

export default function App() {
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<Fixer[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentFilters, setCurrentFilters] = useState<FilterOptions>({
    calificacion: false,
    cercania: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("usuario_anonimo");
  const [userTypes, setUserTypes] = useState("visitor");

  const handleSearch = async (query: string) => {
    console.log("Búsqueda:", query);

    if (query.trim()) {
      setIsLoading(true);

      try {
        // 1. Guardar la búsqueda en el backend
        console.log("Estado actual del usuario:", {
          userName,
          userTypes,
          isAuthenticated,
        });
        const searchData: SearchRequest = {
          userName: userName, // Usar el estado dinámico del usuario
          userTypes: userTypes, // Usar el tipo de usuario dinámico
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

        console.log("Estructura de un job:", jobsResponse.data[0]);

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
            (user: User) => job.fixerId === user._id
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
    // No mock filtering on category. We only record selection
    // and wait for a real search to be performed.
    setResults([]);
    setShowResults(false);
  };

  // Función para generar nombres aleatorios
  const generateRandomName = () => {
    const nombres = [
      "Cristian Montero",
      "Ana García",
      "Carlos López",
      "María Rodríguez",
      "José Martínez",
      "Laura Sánchez",
      "David González",
      "Sofia Pérez",
      "Miguel Torres",
      "Elena Ruiz",
      "Antonio Díaz",
      "Carmen Flores",
      "Francisco Herrera",
      "Isabel Moreno",
      "Manuel Jiménez",
      "Rosa Aguilar",
    ];
    return nombres[Math.floor(Math.random() * nombres.length)];
  };

  const handleAuthChange = (isAuthenticated: boolean) => {
    console.log("Estado de autenticación:", isAuthenticated);
    setIsAuthenticated(isAuthenticated);

    if (isAuthenticated) {
      // Usuario registrado: nombre aleatorio y tipo requester
      setUserName(generateRandomName());
      setUserTypes("requester");
    } else {
      // Usuario no registrado: usuario anónimo y tipo visitor
      setUserName("usuario_anonimo");
      setUserTypes("visitor");
    }
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
