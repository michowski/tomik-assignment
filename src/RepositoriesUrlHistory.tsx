import { FC, useRef, useEffect } from "react";
import { FetchRepositoriesParams } from "./types";

export interface Props {
  queryParams: FetchRepositoriesParams;
  updateQueryParams: (queryParams: FetchRepositoriesParams) => void;
}

const RepositoriesUrlHistory: FC<Props> = ({
  queryParams,
  updateQueryParams
}) => {
  // Initially, we want to call replaceState instead of pushState
  const wasInitialReplaceStatePerformed = useRef(false);

  // We have to distinguish between normal queryParams changes and popState events
  const wasPopStateJustPerformed = useRef(false);

  // Listen to popState events for the past states
  useEffect(() => {
    const listener = (e: PopStateEvent) => {
      const queryParams = e.state as FetchRepositoriesParams;

      wasPopStateJustPerformed.current = true;

      updateQueryParams(queryParams);
    };

    window.addEventListener("popstate", listener);

    return () => window.removeEventListener("popstate", listener);
  }, [updateQueryParams]);

  // Anytime query params change:
  useEffect(() => {
    if (wasPopStateJustPerformed.current) {
      wasPopStateJustPerformed.current = false;
      return;
    }

    // Update the URL
    window.history[
      wasInitialReplaceStatePerformed.current ? "pushState" : "replaceState"
    ](
      queryParams,
      document.title,
      queryParams.query
        ? "?" +
            new URLSearchParams({
              q: queryParams.query,
              page: String(queryParams.page),
              sortBy: queryParams.sortBy,
              sortOrder: queryParams.sortOrder
            }).toString()
        : "/"
    );

    wasInitialReplaceStatePerformed.current = true;
  }, [queryParams, updateQueryParams]);

  return null;
};

export default RepositoriesUrlHistory;
