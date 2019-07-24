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
}

const initState: State = {
  query: INIT_QUERY,
  queryParams: INIT_QUERY_PARAMS,
  status: AjaxStatus.Idle,
  repositories: []
};

/* The main container responsible for the state, logic and rendering of results */
const RepositoriesContainer: FC = () => {
  const [state, setState] = useState(initState);

  const { query, queryParams, status, repositories } = state;

  // Make an API call anytime the query or query params change
  useEffect(() => {
    setState(state => ({ ...state, status: AjaxStatus.Loading }));

    fetchRepositories(query, queryParams)
      .then(({ data }) => {
        setState(state => ({
          ...state,
          status: AjaxStatus.Idle,
          repositories: data.items
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
    (query: string) => setState(state => ({ ...state, query })),
    []
  );

  const updateSorting = useCallback(
    (sortBy: RepositoriesSortBy, sortOrder: SortOrder) => {
      setState(state => ({
        ...state,
        queryParams: {
          ...state.queryParams,
          sortBy,
          sortOrder
        }
      }));
    },
    []
  );

  return (
    <div>
      <header>
        <Searchbar initQuery={INIT_QUERY} onUpdate={setQuery} />
        Results for query: <code>{query}</code>
      </header>
      <Repositories
        repositories={repositories}
        queryParams={queryParams}
        updateSorting={updateSorting}
      />
    </div>
  );
};

export default RepositoriesContainer;
