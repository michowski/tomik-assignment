import React, { FC, useState } from "react";

import {
  Repository,
  FetchRepositoriesParams,
  UpdateRepositoriesSorting,
  AjaxStatus
} from "./types";
import RepositoriesRow from "./RepositoriesRow";
import PageSize from "./PageSize";
import RepositoriesColumnHeader from "./RepositoriesColumnHeader";
import "./Repositories.css";
import Pagination from "./Pagination";
import { ITEMS_PER_PAGE } from "./constants";

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
            <RepositoriesColumnHeader queryParams={queryParams} width={250}>
              Name
            </RepositoriesColumnHeader>
            <RepositoriesColumnHeader queryParams={queryParams} width={200}>
              Owner
            </RepositoriesColumnHeader>
            <RepositoriesColumnHeader
              queryParams={queryParams}
              sortBy="stars"
              updateSorting={updateSorting}
              width={130}
            >
              Stars
            </RepositoriesColumnHeader>
            <RepositoriesColumnHeader
              queryParams={queryParams}
              sortBy="updated"
              updateSorting={updateSorting}
            >
              Updated at
            </RepositoriesColumnHeader>
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
