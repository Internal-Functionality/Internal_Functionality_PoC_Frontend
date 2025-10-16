"use client";

import React, { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import type { SearchBarProps, FilterOptions } from "./SearchBar.types";

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onFilterChange,
  placeholder = "Buscar servicios...",
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState<FilterOptions>({
    calificacion: false,
    cercania: false,
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  const toggleFilter = (filterName: keyof FilterOptions) => {
    const newFilters = {
      ...filters,
      [filterName]: !filters[filterName],
    };
    setFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const hasActiveFilters = filters.calificacion || filters.cercania;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center gap-3">
        {/* Search Input Container */}
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
          />
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearchClick}
          className="p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Buscar"
        >
          <Search className="w-5 h-5 text-gray-600" />
        </button>

        {/* Filter Button */}
        <div className="relative">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`p-3 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              hasActiveFilters
                ? "bg-blue-500 border-blue-500 text-white hover:bg-blue-600"
                : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
            }`}
            aria-label="Filtros"
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>

          {/* Filter Popover */}
          {isFilterOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsFilterOpen(false)}
              />

              {/* Popover Content */}
              <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
                  <span className="font-semibold text-gray-900 text-sm">
                    Filtros
                  </span>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Cerrar"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Filter Options */}
                <div className="p-2">
                  {/* Calificación */}
                  <button
                    onClick={() => toggleFilter("calificacion")}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md transition-colors ${
                      filters.calificacion
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-sm font-medium">Calificación</span>
                    <div
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                        filters.calificacion
                          ? "bg-blue-500 border-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {filters.calificacion && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7"></path>
                        </svg>
                      )}
                    </div>
                  </button>

                  {/* Cercanía */}
                  <button
                    onClick={() => toggleFilter("cercania")}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md transition-colors ${
                      filters.cercania
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-sm font-medium">Cercanía</span>
                    <div
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                        filters.cercania
                          ? "bg-blue-500 border-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {filters.cercania && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7"></path>
                        </svg>
                      )}
                    </div>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
