/* The main container responsible for the state and logic of the feature */

import React, { FC, useState, useEffect, useCallback, useRef } from "react";

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
import { queryParamsFromUrl, queryParamsToUrl } from "./utils";

export interface State {
  queryParams: FetchRepositoriesParams;
  queryInput: string;
  status: AjaxStatus;
  repositories: Repository[];
  totalCount: number;
}

export type RepositoriesResults = Pick<State, "repositories" | "totalCount">;
export type RepositoriesCache = {
  [url: string]: RepositoriesResults | undefined;
};

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

  // Cache the results by URL
  // This super-dirty-simple implementation will explode at some point because of RAM
  // I believe the best approach (aside from HTTP caching) is some bullet-proof TTL/queue solution
  const cache = useRef<RepositoriesCache>({});

  const { queryParams, queryInput, status, repositories, totalCount } = state;

  // Make an API call anytime the query params change
  useEffect(() => {
    if (!queryParams.query.length) {
      return;
    }

    // Check if we have results cached
    const url = queryParamsToUrl(queryParams);
    const cacheHit = cache.current[url];
    if (cacheHit) {
      const { totalCount, repositories } = cacheHit;

      return setState(state => ({
        ...state,
        status: AjaxStatus.Idle,
        totalCount,
        repositories
      }));
    }

    // No cache entry - just fetch the data from the API
    setState(state => ({
      ...state,
      status: AjaxStatus.Loading
    }));

    fetchRepositories(queryParams, ITEMS_PER_PAGE)
      .then(({ data }) => {
        const { total_count: totalCount, items: repositories } = data;

        setState(state => ({
          ...state,
          repositories,
          totalCount,
          status: AjaxStatus.Idle
        }));

        // Save the results for later
        cache.current[url] = { totalCount, repositories };
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
