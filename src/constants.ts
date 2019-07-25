import { FetchRepositoriesParams } from "./types";

export const INIT_QUERY = "tonik";
export const INIT_QUERY_PARAMS: FetchRepositoriesParams = {
  query: INIT_QUERY,
  sortBy: "updated",
  sortOrder: "desc",
  page: 1
};

export const ITEMS_PER_PAGE = 100;
