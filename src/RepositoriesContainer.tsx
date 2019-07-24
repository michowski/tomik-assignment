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
  sortBy: "updated",
  sortOrder: "desc",
  page: 1
};

export interface State {
  query: string;
  queryParams: FetchRepositoriesParams;
  status: AjaxStatus;
  repositories: Repository[];
  totalCount: number;
}

const initState: State = {
  query: INIT_QUERY,
  queryParams: INIT_QUERY_PARAMS,
  status: AjaxStatus.Idle,
  repositories: [],
  totalCount: 0
};

/* The main container responsible for the state, logic and rendering of results */
const RepositoriesContainer: FC = () => {
  const [state, setState] = useState(initState);

  const { query, queryParams, status, repositories, totalCount } = state;

  // Make an API call anytime the query or query params change
  useEffect(() => {
    if (!query.length) {
      return;
    }

    setState(state => ({
      ...state,
      status: AjaxStatus.Loading
    }));

    fetchRepositories(query, queryParams)
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
  }, [query, queryParams]);

  const setQuery = useCallback(
    (query: string) =>
      setState(state => ({ ...state, query, status: AjaxStatus.Loading })),
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

  const setStateFromHistory = useCallback(
    (query: string, queryParams: FetchRepositoriesParams) => {
      setState(state => ({
        ...state,
        query,
        queryParams
      }));
    },
    []
  );

  return (
    <div>
      <RepositoriesUrlHistory
        query={query}
        queryParams={queryParams}
        setStateFromHistory={setStateFromHistory}
      />
      <Searchbar initQuery={INIT_QUERY} onUpdate={setQuery} />
      {query.length > 0 && (
        <>
          <SearchStatus query={query} status={status} totalCount={totalCount} />
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
