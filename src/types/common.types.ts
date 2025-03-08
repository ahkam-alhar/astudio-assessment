export interface IResponse {
  total: number;
  skip: number;
  limit: number;
}

export interface FilterParams {
  limit?: number;
  skip?: number;
  select?: string;
}

export interface SearchPrams {
  pageSize: number;
  currentPage: number;
  searchText: string;
  filterKey: string;
}

export interface FilterButtonProps {
  label: string;
  value: string;
  isSelected: boolean;
}
