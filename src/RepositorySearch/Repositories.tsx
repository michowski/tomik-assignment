/* Repositories - the actual table of results and the navigation coming with them */

import React, { FC, useState } from "react";

import PageSize from "../components/PageSize";
import Pagination from "../components/Pagination";
import { AjaxStatus } from "../types";
import {
  Repository,
  FetchRepositoriesParams,
  UpdateRepositoriesSorting
} from "./types";
import RepositoriesRow from "./RepositoriesRow";
import ColumnHeader from "./ColumnHeader";
import { ITEMS_PER_PAGE } from "./constants";
import "./Repositories.css";

export interface Props {
  repositories: Repository[];
  queryParams: FetchRepositoriesParams;
  totalCount: number;
  status: AjaxStatus;
  updateSorting: UpdateRepositoriesSorting;
  updatePage: (page: number) => void;
}

const Repositories: FC<Props> = ({
  repositories,
  queryParams,
  status,
  totalCount,
  updateSorting,
  updatePage
}) => {
  const [pageSize, setPageSize] = useState(100);

  if (!repositories.length) {
    return null;
  }

  const navigation = (
    <div className="Repositories_navigation">
      <Pagination
        currentPage={queryParams.page}
        pageSize={ITEMS_PER_PAGE}
        totalCount={totalCount}
        urlFormat={() => "?"}
        onSelect={updatePage}
      />
      <PageSize pageSize={pageSize} setPageSize={setPageSize} />
    </div>
  );

  return (
    <div>
      {navigation}

      <table
        className={`Repositories_table${
          status === AjaxStatus.Loading ? " loading" : ""
        }`}
      >
        <thead>
          <tr>
            <ColumnHeader queryParams={queryParams} width={250}>
              Name
            </ColumnHeader>
            <ColumnHeader queryParams={queryParams} width={200}>
              Owner
            </ColumnHeader>
            <ColumnHeader
              queryParams={queryParams}
              sortBy="stars"
              updateSorting={updateSorting}
              width={130}
            >
              Stars
            </ColumnHeader>
            <ColumnHeader
              queryParams={queryParams}
              sortBy="updated"
              updateSorting={updateSorting}
            >
              Updated at
            </ColumnHeader>
          </tr>
        </thead>
        <tbody>
          {repositories.slice(0, pageSize).map(repository => {
            return (
              <RepositoriesRow key={repository.id} repository={repository} />
            );
          })}
        </tbody>
      </table>

      {navigation}
    </div>
  );
};

export default Repositories;
