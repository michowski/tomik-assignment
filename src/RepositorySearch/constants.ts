import { FetchRepositoriesParams } from "./types";

export const DEFAULT_QUERY = "tonik";

export const DEFAULT_SORT_ORDER = "desc";

export const DEFAULT_QUERY_PARAMS: FetchRepositoriesParams = {
  query: DEFAULT_QUERY,
  sortBy: "updated",
  sortOrder: DEFAULT_SORT_ORDER,
  page: 1
};

export const ITEMS_PER_PAGE = 100;
