export interface Country {
  id: number;
  name: string;
  capital: string;
  code: string;
  position: [number, number];
  info: string;
};

export interface FetchResult<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
};