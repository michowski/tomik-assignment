/* The main container responsible for the state and logic of the feature */

import React, { FC, useState, useEffect, useCallback } from "react";

import Repositories from "./Repositories";
import {
  Repository,
  FetchRepositoriesParams,
  RepositoriesSortBy
} from "./types";
import { fetchRepositories } from "./api";
import { ITEMS_PER_PAGE } from "./constants";
import { AjaxStatus, SortOrder } from "../types";
import SearchStatus from "../components/SearchStatus";
import Searchbar from "../components/Searchbar";
import StateHistory from "./StateHistory";
import { queryParamsFromUrl } from "./utils";

export interface State {
  queryParams: FetchRepositoriesParams;
  queryInput: string;
  status: AjaxStatus;
  repositories: Repository[];
  totalCount: number;
}

const initState = (): State => {
  const initQueryParams = queryParamsFromUrl(window.location.search);

  return {
    queryParams: initQueryParams,
    queryInput: initQueryParams.query,
    status: AjaxStatus.Loading,
    repositories: [],
    totalCount: 0
  };
};

const Container: FC = () => {
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

    fetchRepositories(queryParams, ITEMS_PER_PAGE)
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
                query,
                page: 1
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

  const updatePage = useCallback((page: number) => {
    setState(state => ({
      ...state,
      queryParams: {
        ...state.queryParams,
        page
      }
    }));
  }, []);

  return (
    <div>
      <StateHistory
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
            updatePage={updatePage}
            totalCount={totalCount}
            status={status}
          />
        </>
      )}
    </div>
  );
};

export default Container;
