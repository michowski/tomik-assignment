import React, { FC } from "react";

import { Repository } from "./types";
import "./RepositoriesRow.css";

export interface Props {
  repository: Repository;
}

// Poor man's date formatting, never do it :)
const formatDate = (date: string) => {
  const parts = date.split("T");

  return parts[0] + " " + parts[1].slice(0, -1);
};

const RepositoriesRow: FC<Props> = ({ repository }) => {
  const { name, owner, stargazers_count, updated_at } = repository;

  return (
    <tr className="RepositoriesRow">
      <td>{name}</td>
      <td>
        <a href={owner.url}>{owner.login}</a>
      </td>
      <td className="RepositoriesRow_stars">
        <span className="RepositoriesRow_star">★</span>
        {stargazers_count}
      </td>
      <td>{formatDate(updated_at)}</td>
    </tr>
  );
};

export default RepositoriesRow;
