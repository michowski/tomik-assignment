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
  const [pageSize, setPageSize] = useState(100);

  return (
    <>
      <table>
        <thead>
          <tr>
            <RepositoriesColumnHeader queryParams={queryParams}>
              Name
            </RepositoriesColumnHeader>
            <RepositoriesColumnHeader queryParams={queryParams}>
              Owner
            </RepositoriesColumnHeader>
            <RepositoriesColumnHeader
              queryParams={queryParams}
              sortBy="stars"
              updateSorting={updateSorting}
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
