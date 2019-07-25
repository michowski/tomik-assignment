import React, { FC, useState, useEffect, useCallback } from "react";
import Searchbar from "./Searchbar";
import Repositories from "./Repositories";
import {
  Repository,
  FetchRepositoriesParams,
  AjaxStatus,
  RepositoriesSortBy,
  SortOrder
} from "./types";
import { fetchRepositories } from "./api";
import SearchStatus from "./SearchStatus";
import RepositoriesUrlHistory from "./RepositoriesUrlHistory";

const INIT_QUERY = "tonik";
const INIT_QUERY_PARAMS: FetchRepositoriesParams = {
  query: INIT_QUERY,
  sortBy: "updated",
  sortOrder: "desc",
  page: 1
};

export interface State {
  queryParams: FetchRepositoriesParams;
  queryInput: string;
  status: AjaxStatus;
  repositories: Repository[];
  totalCount: number;
}

const initState = (): State => {
  const url = new URLSearchParams(window.location.search);

  const query = url.get("q");
  const initQueryParams = query
    ? {
        query,
        page: +(url.get("page") as string) || 0,
        sortBy: (url.get("sortBy") as RepositoriesSortBy) || "updated",
        sortOrder: (url.get("sortOrder") as SortOrder) || "desc"
      }
    : INIT_QUERY_PARAMS;

  return {
    queryParams: initQueryParams,
    queryInput: initQueryParams.query,
    status: AjaxStatus.Loading,
    repositories: [],
    totalCount: 0
  };
};

/* The main container responsible for the state, logic and rendering of results */
const RepositoriesContainer: FC = () => {
  const [state, setState] = useState(initState);

  const { queryParams, queryInput, status, repositories, totalCount } = state;

  // Make an API call anytime the query params change
  useEffect(() => {
    if (!queryParams.query.length) {
      return;
    }

    setState(state => ({
      ...state,
      status: AjaxStatus.Loading
    }));

    fetchRepositories(queryParams)
      .then(({ data }) => {
        setState(state => ({
          ...state,
          status: AjaxStatus.Idle,
          repositories: data.items,
          totalCount: data.total_count
        }));
      })
      .catch(() => {
        setState(state => ({
          ...state,
          status: AjaxStatus.Fail,
          repositories: []
        }));
      });
  }, [queryParams]);

  const submitQuery = useCallback(
    (query: string) =>
      // Prevent state modification when query doesn't change
      setState(state =>
        query === state.queryParams.query
          ? state
          : {
              ...state,
              status: AjaxStatus.Loading,
              queryParams: {
                ...state.queryParams,
                query
              }
            }
      ),
    []
  );

  const updateQueryInput = useCallback(
    (queryInput: string) =>
      setState(state => ({
        ...state,
        queryInput
      })),
    []
  );

  const updateQueryParams = useCallback(
    (queryParams: FetchRepositoriesParams) => {
      setState(state => ({
        ...state,
        queryParams,
        queryInput: queryParams.query
      }));
    },
    []
  );

  const updateSorting = useCallback(
    (sortBy: RepositoriesSortBy, sortOrder: SortOrder) => {
      setState(state => ({
        ...state,
        queryParams: {
          ...state.queryParams,
          sortBy,
          sortOrder,
          page: 1
        }
      }));
    },
    []
  );

  return (
    <div>
      <RepositoriesUrlHistory
        queryParams={queryParams}
        updateQueryParams={updateQueryParams}
      />
      <Searchbar
        value={queryInput}
        onChange={updateQueryInput}
        onSubmit={submitQuery}
      />
      {queryInput.length > 0 && (
        <>
          <SearchStatus
            query={queryParams.query}
            status={status}
            totalCount={totalCount}
          />
          <Repositories
            repositories={repositories}
            queryParams={queryParams}
            updateSorting={updateSorting}
          />
        </>
      )}
    </div>
  );
};

export default RepositoriesContainer;
