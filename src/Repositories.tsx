import React, { FC, useState } from "react";
import { Repository } from "./types";
import RepositoriesRow from "./RepositoriesRow";
import Pagination from "./Pagination";

export interface Props {
  repositories: Repository[];
}

const Repositories: FC<Props> = ({ repositories }) => {
  const [pageSize, setPageSize] = useState(100);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Owner</th>
            <th>Stars</th>
            <th>Updated at</th>
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

      <Pagination pageSize={pageSize} setPageSize={setPageSize} />
    </>
  );
};

export default Repositories;
