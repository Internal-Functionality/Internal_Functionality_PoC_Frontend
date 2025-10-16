export interface FilterOptions {
  calificacion: boolean;
  cercania: boolean;
}

export interface SearchBarProps {
  onSearch?: (query: string) => void;
  onFilterChange?: (filters: FilterOptions) => void;
  placeholder?: string;
}
