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
}
