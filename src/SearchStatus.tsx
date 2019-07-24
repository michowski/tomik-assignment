import React, { FC } from "react";
import "./SearchStatus.css";
import { AjaxStatus } from "./types";

export interface Props {
  query: string;
  status: AjaxStatus;
  totalCount: number;
}

const SearchStatus: FC<Props> = ({ query, status, totalCount }) => {
  return (
    <header className="SearchStatus">
      {status === AjaxStatus.Fail ? (
        "Whoops, something went wrong!"
      ) : status === AjaxStatus.Loading ? (
        "Loading..."
      ) : totalCount === 0 ? (
        "No results found! Try something else."
      ) : (
        <>
          <var>{totalCount}</var> results found for: <code>{query}</code>
        </>
      )}
    </header>
  );
};

export default SearchStatus;
