/* Pagination - add pagination interface to any list of items */

import React, { FC, useCallback, MouseEvent } from "react";

import "./Pagination.css";

export interface Props {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  urlFormat: (page: number) => string; // Add a URL to each page link! Important for a11y & sometimes SEO
  onSelect: (page: number) => void;
}

export const PAGES_LIMIT = 10;

const Pagination: FC<Props> = ({
  currentPage,
  totalCount,
  pageSize,
  urlFormat,
  onSelect
}) => {
  const onSelectHandler = useCallback(
    (page: number) => (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();

      window.scrollTo(0, 0);

      onSelect(page);
    },
    [onSelect]
  );

  const pagesCount = Math.ceil(totalCount / pageSize);

  const pages = new Array(Math.min(10, pagesCount))
    .fill(null)
    .map((_, i) => i + 1);

  return (
    <div className="Pagination">
      <footer>Page:</footer>
      {pages.map(page => (
        <a
          key={page}
          href={urlFormat(page)}
          onClick={onSelectHandler(page)}
          className={page === currentPage ? "current" : undefined}
        >
          {page}
        </a>
      ))}
    </div>
  );
};

export default Pagination;
