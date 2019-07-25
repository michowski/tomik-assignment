/* RepositoriesRow - simply, one row per each repository in the table */

import React, { FC } from "react";

import { Repository } from "./types";
import "./RepositoriesRow.css";
import { formatDate } from "./utils";

export interface Props {
  repository: Repository;
}

const RepositoriesRow: FC<Props> = ({ repository }) => {
  const { name, html_url, owner, stargazers_count, updated_at } = repository;

  return (
    <tr className="RepositoriesRow">
      <td>
        <a href={html_url}>{name}</a>
      </td>
      <td>
        <a className="RepositoriesRow_owner" href={owner.html_url}>
          <img
            className="RepositoriesRow_ownerImg"
            src={owner.avatar_url}
            alt={owner.login}
          />
          {owner.login}
        </a>
      </td>
      <td className="RepositoriesRow_stars">
        <span className="RepositoriesRow_star">★</span>
        {stargazers_count}
      </td>
      <td className="RepositoriesRow_date">{formatDate(updated_at)}</td>
    </tr>
  );
};

export default RepositoriesRow;
