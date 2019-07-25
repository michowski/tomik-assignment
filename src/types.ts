/* Types shared across the entire app */

// Note: not all of the fields from the API are present here
export interface Repository {
  id: number;
  name: string;
  stargazers_count: number;
  owner: RepositoryOwner;
  created_at: string;
  updated_at: string;
}

// Note: not all of the fields from the API are present here
export interface RepositoryOwner {
  id: number;
  login: string;
  url: string;
  avatar_url: string;
}

export type SortOrder = "asc" | "desc";

export type RepositoriesSortBy = "stars" | "updated";

export type UpdateRepositoriesSorting = (
  sortBy: RepositoriesSortBy,
  sortOrder: SortOrder
) => void;

export interface FetchRepositoriesParams {
  query: string;
  sortBy: RepositoriesSortBy;
  sortOrder: SortOrder;
  page: number;
}

export enum AjaxStatus {
  Idle,
  Loading,
  Fail
}
