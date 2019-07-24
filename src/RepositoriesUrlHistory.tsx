import React, { FC, useRef, useEffect } from "react";
import { FetchRepositoriesParams } from "./types";

export interface Props {
  query: string;
  queryParams: FetchRepositoriesParams;
  setStateFromHistory: (
    query: string,
    queryParams: FetchRepositoriesParams
  ) => void;
}

const RepositoriesUrlHistory: FC<Props> = ({
  query,
  queryParams,
  setStateFromHistory
}) => {
  // Initially, we only want to replace state
  const wasReplaceStateCalled = useRef(false);

  // Listen to popState events for the past states
  useEffect(() => {
    const listener = (e: PopStateEvent) => {
      const query = e.state["query"] as string;
      const queryParams = e.state["queryParams"] as FetchRepositoriesParams;

      setStateFromHistory(query, queryParams);
    };

    window.addEventListener("popstate", listener);

    return () => window.removeEventListener("popstate", listener);
  }, [setStateFromHistory]);

  // Anytime query params change:
  useEffect(() => {
    // Read the initial state, if any
    if (!wasReplaceStateCalled.current) {
      const url = new URLSearchParams(window.location.search);

      const query = url.get("q");
      if (!query) {
        wasReplaceStateCalled.current = true;
        return;
      }

      setStateFromHistory(query, {
        sortBy: url.get("sortBy"),
        sortOrder: url.get("sortOrder"),
        page: url.get("page") || 0
      } as FetchRepositoriesParams);
    }

    // Update the URL
    window.history[
      wasReplaceStateCalled.current ? "pushState" : "replaceState"
    ](
      {
        query,
        queryParams
      },
      document.title,
      new URLSearchParams({
        q: query,
        sortBy: queryParams.sortBy,
        sortOrder: queryParams.sortOrder,
        page: String(queryParams.page)
      }).toString()
    );

    wasReplaceStateCalled.current = true;
  }, [query, queryParams, setStateFromHistory]);

  return null;
};

export default RepositoriesUrlHistory;
