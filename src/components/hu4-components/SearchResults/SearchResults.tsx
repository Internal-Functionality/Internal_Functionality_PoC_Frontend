import React from "react";
import { Star, MapPin, User } from "lucide-react";
import type { SearchResultsProps, Fixer } from "./SearchResults.types";

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  isVisible,
}) => {
  if (!isVisible) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
        {/* Header */}
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Resultados:{" "}
          {results.length > 0
            ? `${results.length} fixers encontrados`
            : "No se encontraron resultados"}
        </h3>

        {/* Results List */}
        {results.length > 0 && (
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
            {results.map((fixer) => (
              <FixerCard key={fixer.id} fixer={fixer} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {results.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">No se encontraron fixers para tu búsqueda</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Fixer Card Component
const FixerCard: React.FC<{ fixer: Fixer }> = ({ fixer }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-200">
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {fixer.avatar ? (
            <img
              src={fixer.avatar}
              alt={fixer.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center border-2 border-gray-300">
              <User className="w-7 h-7 text-gray-500" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          {/* Name and Category */}
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-gray-900 truncate">
              {fixer.name}
            </h4>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
              {fixer.category}
            </span>
          </div>

          {/* Rating and Distance */}
          <div className="flex items-center gap-4 text-sm">
            {/* Rating */}
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-gray-700">
                {fixer.rating.toFixed(1)}
              </span>
            </div>

            {/* Distance */}
            <div className="flex items-center gap-1 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{fixer.distance.toFixed(1)} km</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
