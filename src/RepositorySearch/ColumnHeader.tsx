/* ColumnHeader - a column header which, if applicable, is also responsible for sorting logic */

import React, { FC, KeyboardEventHandler } from "react";
import {
  FetchRepositoriesParams,
  UpdateRepositoriesSorting,
  RepositoriesSortBy
} from "./types";
import { DEFAULT_SORT_ORDER } from "./constants";

export interface Props {
  /* Not all of the fields are sortable :( . For those, we simply don't pass these 2 props */
  updateSorting?: UpdateRepositoriesSorting;
  sortBy?: RepositoriesSortBy;

  width?: number;
  queryParams: FetchRepositoriesParams;
}

const ColumnHeader: FC<Props> = ({
  sortBy,
  queryParams,
  updateSorting,
  width,
  children
}) => {
  const sortedByMe = queryParams.sortBy === sortBy;

  const onClick =
    updateSorting &&
    (() => {
      if (sortBy == null) {
        return;
      }

      const newSortOrder = sortedByMe
        ? queryParams.sortOrder === "asc"
          ? "desc"
          : "asc"
        : DEFAULT_SORT_ORDER;

      updateSorting(sortBy, newSortOrder);
    });

  // Enable sorting by pressing enter
  const onKeyDown: KeyboardEventHandler = e => {
    if (e.keyCode === 13 && onClick) {
      onClick();
    }
  };

  return (
    <th
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onKeyDown}
      style={{ width }}
      className={onClick && "sortable"}
    >
      {children}

      {sortedByMe && <span>{queryParams.sortOrder === "asc" ? "⬇" : "⬆"}</span>}
    </th>
  );
};

export default ColumnHeader;
