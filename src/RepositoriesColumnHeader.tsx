import React, { FC } from "react";
import {
  FetchRepositoriesParams,
  UpdateRepositoriesSorting,
  RepositoriesSortBy
} from "./types";

export interface Props {
  /* Not all fields are sortable :( . For those, we simply don't pass these 2 props */
  updateSorting?: UpdateRepositoriesSorting;
  sortBy?: RepositoriesSortBy;

  width?: number;
  queryParams: FetchRepositoriesParams;
}

const DEFAULT_SORT_ORDER = "desc";

const RepositoriesColumnHeader: FC<Props> = ({
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

  return (
    <th onClick={onClick} style={{ width }} className={onClick && "sortable"}>
      {children}

      {sortedByMe && <span>{queryParams.sortOrder === "asc" ? "⬇" : "⬆"}</span>}
    </th>
  );
};

export default RepositoriesColumnHeader;
