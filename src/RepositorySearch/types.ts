import { SortOrder } from "../types";

// Note: not all of the fields from the API response are present here
export interface Repository {
  id: number;
  name: string;
  stargazers_count: number;
  owner: RepositoryOwner;
  html_url: string;
  updated_at: string;
}

// Note: not all of the fields from the API response are present here
export interface RepositoryOwner {
  id: number;
  login: string;
  html_url: string;
  avatar_url: string;
}

export type RepositoriesSortBy = "stars" | "updated";

export type UpdateRepositoriesSorting = (
  sortBy: RepositoriesSortBy,
  sortOrder: SortOrder
) => void;

// Such abstraction for the state is needed in order to guarantee that the 1:1 relation between:
// ---------
// API query <-> Routing (URL/history) <-> App state
// ---------
// is never broken.
// In other words: what these values hold is the only source of truth :)
export interface FetchRepositoriesParams {
  query: string;
  sortBy: RepositoriesSortBy;
  sortOrder: SortOrder;
  page: number;
}
