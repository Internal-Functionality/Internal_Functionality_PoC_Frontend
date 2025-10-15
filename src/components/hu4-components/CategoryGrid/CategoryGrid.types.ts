export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface CategoryGridProps {
  onCategorySelect?: (categoryId: string | null) => void;
}
