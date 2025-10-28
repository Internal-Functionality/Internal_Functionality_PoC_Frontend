"use client";

import React, { useState, useEffect } from "react";
import {
  Wrench,
  Hammer,
  Truck,
  Sparkles,
  Scissors,
  Settings,
  Paintbrush,
} from "lucide-react";
import type { CategoryGridProps, Category } from "./CategoryGrid.types";

const categories: Category[] = [
  { id: "instalaciones", name: "Instalaciones", icon: "wrench" },
  { id: "montaje", name: "Montaje", icon: "hammer" },
  { id: "mudanza", name: "Mudanza", icon: "truck" },
  { id: "limpieza", name: "Limpieza", icon: "sparkles" },
  { id: "jardineria", name: "Jardinería", icon: "scissors" },
  { id: "reparaciones", name: "Reparaciones", icon: "settings" },
  { id: "pintura", name: "Pintura", icon: "paintbrush" },
];

const CategoryGrid: React.FC<CategoryGridProps> = ({
  onCategorySelect,
  resetSelection,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Efecto para resetear la selección cuando se hace una búsqueda manual
  useEffect(() => {
    if (resetSelection) {
      setSelectedCategory(null);
    }
  }, [resetSelection]);

  const handleCategoryClick = (categoryId: string) => {
    // Si se hace clic en la categoría ya seleccionada, la deseleccionamos
    const newSelection = selectedCategory === categoryId ? null : categoryId;
    setSelectedCategory(newSelection);

    if (onCategorySelect) {
      onCategorySelect(newSelection);
    }
  };

  const getIcon = (iconName: string) => {
    const iconProps = { className: "w-8 h-8" };

    switch (iconName) {
      case "wrench":
        return <Wrench {...iconProps} />;
      case "hammer":
        return <Hammer {...iconProps} />;
      case "truck":
        return <Truck {...iconProps} />;
      case "sparkles":
        return <Sparkles {...iconProps} />;
      case "scissors":
        return <Scissors {...iconProps} />;
      case "settings":
        return <Settings {...iconProps} />;
      case "paintbrush":
        return <Paintbrush {...iconProps} />;
      default:
        return <Wrench {...iconProps} />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="grid grid-cols-7 gap-4">
        {categories.map((category) => {
          const isSelected = selectedCategory === category.id;

          return (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                isSelected
                  ? "bg-blue-100 text-blue-700"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              <div
                className={`transition-colors ${
                  isSelected ? "text-blue-600" : "text-gray-500"
                }`}
              >
                {getIcon(category.icon)}
              </div>
              <span className="text-xs font-medium text-center leading-tight">
                {category.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryGrid;
