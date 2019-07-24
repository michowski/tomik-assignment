import React, { FC } from "react";
import { Repository } from "./types";

export interface Props {
  repository: Repository;
}

const RepositoriesRow: FC<Props> = ({ repository }) => {
  const { name, owner, stargazers_count, updated_at } = repository;

  return (
    <tr>
      <td>{name}</td>
      <td>{owner.login}</td>
      <td>{stargazers_count}</td>
      <td>{updated_at}</td>
    </tr>
  );
};

export default RepositoriesRow;
