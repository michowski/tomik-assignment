import React, { FC, useState } from "react";

import {
  Repository,
  FetchRepositoriesParams,
  RepositoriesSortBy,
  UpdateRepositoriesSorting
} from "./types";
import RepositoriesRow from "./RepositoriesRow";
import PageSize from "./PageSize";
import RepositoriesColumnHeader from "./RepositoriesColumnHeader";
import "./Repositories.css";

export interface Props {
  repositories: Repository[];
  queryParams: FetchRepositoriesParams;
  updateSorting: UpdateRepositoriesSorting;
}

const Repositories: FC<Props> = ({
  repositories,
  queryParams,
  updateSorting
}) => {
  const [pageSize, setPageSize] = useState(25);

  return (
    <>
      <table className="Repositories">
        <thead>
          <tr>
            <RepositoriesColumnHeader queryParams={queryParams} width={200}>
              Name
            </RepositoriesColumnHeader>
            <RepositoriesColumnHeader queryParams={queryParams} width={100}>
              Owner
            </RepositoriesColumnHeader>
            <RepositoriesColumnHeader
              queryParams={queryParams}
              sortBy="stars"
              updateSorting={updateSorting}
              width={100}
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

      <PageSize pageSize={pageSize} setPageSize={setPageSize} />
    </>
  );
};

export default Repositories;
