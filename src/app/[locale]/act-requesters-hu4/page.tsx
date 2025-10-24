"use client";

import { Roboto } from "next/font/google";
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

const roboto = Roboto({
  weight: "300",
  subsets: ["latin"],
});

export default function App() {
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<Fixer[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [resetCategorySelection, setResetCategorySelection] = useState(false);
  const [clearSearchBar, setClearSearchBar] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<FilterOptions>({
    cercania: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchInProgress, setIsSearchInProgress] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("usuario_anonimo");
  const [userTypes, setUserTypes] = useState("visitor");

  // Datos mock para cada categoría de iconos
  const mockDataByCategory = {
    instalaciones: [
      {
        id: "1",
        name: "Carlos Mendoza",
        rating: 4.8,
        distance: 1.2,
        category: "Instalación de Aire Acondicionado",
      },
      {
        id: "2",
        name: "Ana López",
        rating: 4.6,
        distance: 2.1,
        category: "Instalación de Ventiladores",
      },
      {
        id: "3",
        name: "Miguel Torres",
        rating: 4.9,
        distance: 0.8,
        category: "Instalación de Luminarias",
      },
      {
        id: "4",
        name: "Sofia Pérez",
        rating: 4.7,
        distance: 1.5,
        category: "Instalación de Sistemas",
      },
    ],
    montaje: [
      {
        id: "5",
        name: "David González",
        rating: 4.5,
        distance: 1.8,
        category: "Montaje de Muebles",
      },
      {
        id: "6",
        name: "Elena Ruiz",
        rating: 4.8,
        distance: 2.3,
        category: "Montaje de Estanterías",
      },
      {
        id: "7",
        name: "Antonio Díaz",
        rating: 4.6,
        distance: 1.1,
        category: "Montaje de Equipos",
      },
    ],
    mudanza: [
      {
        id: "8",
        name: "Carmen Flores",
        rating: 4.9,
        distance: 0.5,
        category: "Mudanza Residencial",
      },
      {
        id: "9",
        name: "Francisco Herrera",
        rating: 4.7,
        distance: 1.9,
        category: "Mudanza de Oficina",
      },
      {
        id: "10",
        name: "Isabel Moreno",
        rating: 4.8,
        distance: 2.5,
        category: "Mudanza Completa",
      },
    ],
    limpieza: [
      {
        id: "11",
        name: "Manuel Jiménez",
        rating: 4.6,
        distance: 1.3,
        category: "Limpieza Profunda",
      },
      {
        id: "12",
        name: "Rosa Aguilar",
        rating: 4.8,
        distance: 0.9,
        category: "Limpieza de Oficinas",
      },
      {
        id: "13",
        name: "Cristian Montero",
        rating: 4.7,
        distance: 2.0,
        category: "Limpieza Residencial",
      },
    ],
    jardineria: [
      {
        id: "14",
        name: "Laura Sánchez",
        rating: 4.9,
        distance: 1.4,
        category: "Mantenimiento de Jardines",
      },
      {
        id: "15",
        name: "José Martínez",
        rating: 4.5,
        distance: 2.2,
        category: "Poda de Árboles",
      },
      {
        id: "16",
        name: "María Rodríguez",
        rating: 4.8,
        distance: 1.6,
        category: "Diseño de Jardines",
      },
    ],
    reparaciones: [
      {
        id: "17",
        name: "Carlos López",
        rating: 4.7,
        distance: 0.7,
        category: "Reparación de Electrodomésticos",
      },
      {
        id: "18",
        name: "Ana García",
        rating: 4.9,
        distance: 1.8,
        category: "Reparación de Plomería",
      },
      {
        id: "19",
        name: "Miguel Torres",
        rating: 4.6,
        distance: 2.4,
        category: "Reparación de Muebles",
      },
      {
        id: "20",
        name: "Sofia Pérez",
        rating: 4.8,
        distance: 1.1,
        category: "Reparación General",
      },
    ],
    pintura: [
      {
        id: "21",
        name: "David González",
        rating: 4.8,
        distance: 1.5,
        category: "Pintura de Interiores",
      },
      {
        id: "22",
        name: "Elena Ruiz",
        rating: 4.7,
        distance: 2.0,
        category: "Pintura de Exteriores",
      },
      {
        id: "23",
        name: "Antonio Díaz",
        rating: 4.9,
        distance: 0.9,
        category: "Pintura Decorativa",
      },
    ],
  };

  const handleSearch = async (query: string) => {
    console.log("Búsqueda:", query);

    // Prevenir búsquedas duplicadas
    if (isSearchInProgress) {
      console.log("Búsqueda ya en progreso, ignorando...");
      return;
    }

    if (query.trim()) {
      setIsSearchInProgress(true);
      setIsLoading(true);

      try {
        // Resetear la categoría seleccionada cuando se hace búsqueda manual
        setSelectedCategory(null);
        setResetCategorySelection(true);

        // 1. Guardar la búsqueda en el backend
        console.log("Estado actual del usuario:", {
          userName,
          userTypes,
          isAuthenticated,
        });

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

        const searchFound = filteredJobs.length;

        // 4. Guardar la búsqueda en el backend con el nuevo formato
        const searchData: SearchRequest = {
          userName: userName,
          userTypes: userTypes,
          search: query,
          typeOfService: "buscador", // Usar "buscador" para búsquedas manuales
          scope: currentFilters.cercania ? 1 : 0,
          searchFound: searchFound, // Número de resultados encontrados
        };

        const searchResponse = await searchService.saveSearch(searchData);
        if (searchResponse.success) {
          console.log("Búsqueda guardada exitosamente:", searchResponse.data);
        } else {
          console.error("Error al guardar búsqueda:", searchResponse.message);
        }

        if (filteredJobs.length === 0) {
          console.log("No se encontraron jobs que coincidan con la búsqueda");
          setResults([]);
          setShowResults(true);
          return;
        }

        // 5. Obtener todos los users del backend
        const usersResponse = await searchService.getAllUsers();
        if (!usersResponse.success || !usersResponse.data) {
          console.error("Error al obtener users:", usersResponse.message);
          setShowResults(false);
          return;
        }

        // 6. Mapear jobs filtrados a formato Fixer usando los datos de users
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

        // 7. Mostrar resultados
        setResults(fixerResults);
        setShowResults(true);
        console.log("Resultados encontrados:", fixerResults);
      } catch (error) {
        console.error("Error en la búsqueda:", error);
        setShowResults(false);
      } finally {
        setIsLoading(false);
        // Resetear el flag después de procesar la búsqueda
        setTimeout(() => setResetCategorySelection(false), 100);
        // Deshabilitar búsquedas por 1 segundo para prevenir duplicados
        setTimeout(() => setIsSearchInProgress(false), 1000);
      }
    } else {
      setShowResults(false);
    }
  };

  const handleFilterChange = (filters: FilterOptions) => {
    console.log("Filtros activos:", filters);
    setCurrentFilters(filters);
  };

  const handleCategorySelect = async (categoryId: string | null) => {
    console.log("Categoría seleccionada:", categoryId);
    setSelectedCategory(categoryId);

    // Limpiar el SearchBar cuando se selecciona una categoría
    setClearSearchBar(true);
    setTimeout(() => setClearSearchBar(false), 100);

    // Prevenir búsquedas duplicadas
    if (isSearchInProgress) {
      console.log("Búsqueda ya en progreso, ignorando...");
      return;
    }

    if (
      categoryId &&
      mockDataByCategory[categoryId as keyof typeof mockDataByCategory]
    ) {
      setIsSearchInProgress(true);
      setIsLoading(true);

      try {
        // Obtener datos mock para la categoría seleccionada
        const mockResults =
          mockDataByCategory[categoryId as keyof typeof mockDataByCategory];
        const searchFound = mockResults.length;

        // Obtener el nombre de la categoría para el search
        const categoryNames = {
          instalaciones: "Instalaciones",
          montaje: "Montaje",
          mudanza: "Mudanza",
          limpieza: "Limpieza",
          jardineria: "Jardinería",
          reparaciones: "Reparaciones",
          pintura: "Pintura",
        };

        const categoryName =
          categoryNames[categoryId as keyof typeof categoryNames] || categoryId;

        // Guardar la búsqueda en el backend con el nuevo formato
        const searchData: SearchRequest = {
          userName: userName,
          userTypes: userTypes,
          search: categoryName, // Nombre del icono/categoría
          typeOfService: "iconos de acceso rapido", // Tipo específico para iconos
          scope: currentFilters.cercania ? 1 : 0,
          searchFound: searchFound, // Número de resultados mock encontrados
        };

        const searchResponse = await searchService.saveSearch(searchData);
        if (searchResponse.success) {
          console.log(
            "Búsqueda de icono guardada exitosamente:",
            searchResponse.data
          );
        } else {
          console.error(
            "Error al guardar búsqueda de icono:",
            searchResponse.message
          );
        }

        // Mostrar resultados mock
        setResults(mockResults);
        setShowResults(true);
        console.log("Resultados mock encontrados:", mockResults);
      } catch (error) {
        console.error("Error en la búsqueda de categoría:", error);
        setShowResults(false);
      } finally {
        setIsLoading(false);
        // Deshabilitar búsquedas por 1 segundo para prevenir duplicados
        setTimeout(() => setIsSearchInProgress(false), 1000);
      }
    } else {
      // Si no hay categoría seleccionada, limpiar resultados
      setResults([]);
      setShowResults(false);
    }
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
    <section className={roboto.className}>
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
              clearSearch={clearSearchBar}
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
          <CategoryGrid
            onCategorySelect={handleCategorySelect}
            resetSelection={resetCategorySelection}
          />

          {/* Search Results */}
          <SearchResults results={results} isVisible={showResults} />
        </main>
      </div>
    </section>
  );
}
