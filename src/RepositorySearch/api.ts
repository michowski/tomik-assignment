import axios from "axios";

import {
  FetchRepositoriesParams,
  Repository,
  RepositoriesSortBy
} from "./types";
import { SortOrder } from "../types";

export interface FetchRepositoriesApiParams {
  q: string;
  sort: RepositoriesSortBy;
  order: SortOrder;
  page?: number;
  per_page?: number;
}

export interface FetchRepositoriesApiResponse {
  total_count: number;
  incomplete_results: boolean;
  items: Repository[];
}

export const fetchRepositories = (
  queryParams: FetchRepositoriesParams,
  perPage: number
) => {
  const { query, page, sortBy, sortOrder } = queryParams;

  const params: FetchRepositoriesApiParams = {
    q: query,
    sort: sortBy,
    order: sortOrder,
    per_page: perPage
  };

  // Let's keep the URL as clean as possible
  if (page > 1) {
    params.page = page;
  }

  return axios.get<FetchRepositoriesApiResponse>(
    "https://api.github.com/search/repositories",
    {
      params
    }
  );
};
