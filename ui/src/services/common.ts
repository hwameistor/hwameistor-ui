export type empty = Record<string, never>

export type Pagination = {
  page: number;
  pageSize: number;
  total: number;
}
