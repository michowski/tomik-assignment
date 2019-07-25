/*
  StateHistory - an invisible component responsible for the logic behind
  the 1:1 relation between the state of RepositorySearch and the URL (browser history).

  To achieve the goal, it:

  1. Updates the app state from the URL - by listening to popState events
  2. Updates the URL from the app state - by listening to changes in queryParams and doing replaceState/pushState
*/

import { FC, useRef, useEffect } from "react";
import { FetchRepositoriesParams } from "./types";
import { queryParamsToUrl } from "./utils";

export interface Props {
  queryParams: FetchRepositoriesParams;
  updateQueryParams: (queryParams: FetchRepositoriesParams) => void;
}

const StateHistory: FC<Props> = ({ queryParams, updateQueryParams }) => {
  // Initially, we want to call replaceState instead of pushState, just to save the state of the app
  const wasInitialReplaceStatePerformed = useRef(false);

  // When looking for the changes in queryParams, we have to disregard popState events
  // Otherwise, we would pushState right after popState, thus breaking "back" functionality
  const wasPopStateJustPerformed = useRef(false);

  // Listen to popState events
  useEffect(() => {
    const listener = (e: PopStateEvent) => {
      const queryParams = e.state as FetchRepositoriesParams;

      wasPopStateJustPerformed.current = true;

      updateQueryParams(queryParams);
    };

    window.addEventListener("popstate", listener);

    return () => window.removeEventListener("popstate", listener);
  }, [updateQueryParams]);

  // Listen to query params change:
  useEffect(() => {
    // popState has just happened - let's mark it back to false
    if (wasPopStateJustPerformed.current) {
      wasPopStateJustPerformed.current = false;
      return;
    }

    // Update the URL
    window.history[
      wasInitialReplaceStatePerformed.current ? "pushState" : "replaceState"
    ](queryParams, document.title, queryParamsToUrl(queryParams));

    wasInitialReplaceStatePerformed.current = true;
  }, [queryParams, updateQueryParams]);

  return null;
};

export default StateHistory;
