export interface Fixer {
  id: string;
  name: string;
  rating: number;
  distance: number; // en kilómetros
  category: string;
  avatar?: string;
}

export interface SearchResultsProps {
  results: Fixer[];
  isVisible: boolean;
}
