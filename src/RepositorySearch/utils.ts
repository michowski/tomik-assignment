import { FetchRepositoriesParams, RepositoriesSortBy } from "./types";
import { DEFAULT_QUERY_PARAMS } from "./constants";
import { SortOrder } from "../types";

// Poor man's date formatting, for truly localised apps it would be something like moment.js
export const formatDate = (date: string) => {
  const parts = date.split("T");

  return parts[0] + " " + parts[1].slice(0, -1);
};

export const queryParamsToUrl = (
  queryParams: FetchRepositoriesParams
): string =>
  queryParams.query
    ? "?" +
      new URLSearchParams({
        q: queryParams.query,
        page: String(queryParams.page),
        sortBy: queryParams.sortBy,
        sortOrder: queryParams.sortOrder
      }).toString()
    : "/";

export const queryParamsFromUrl = (
  searchUrl: string
): FetchRepositoriesParams => {
  const url = new URLSearchParams(searchUrl);

  const query = url.get("q");
  const queryParams = query
    ? {
        query,
        page: +(url.get("page") as string) || 1,
        sortBy: (url.get("sortBy") as RepositoriesSortBy) || "updated",
        sortOrder: (url.get("sortOrder") as SortOrder) || "desc"
      }
    : DEFAULT_QUERY_PARAMS;

  return queryParams;
};
