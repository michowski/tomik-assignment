import React, { FC, useCallback, FormEventHandler } from "react";

export interface Props {
  pageSize: number;
  setPageSize: (size: number) => void;
}

const PAGE_SIZES = [25, 50, 75, 100];

const Pagination: FC<Props> = ({ pageSize, setPageSize }) => {
  // useCallback, so that the same function ref is passed forever to <select/>
  const onChange: FormEventHandler<HTMLSelectElement> = useCallback(e => {
    setPageSize(+e.currentTarget.value);
  }, []);

  return (
    <select value={pageSize} onChange={onChange}>
      {PAGE_SIZES.map(size => (
        <option value={size}>{size}</option>
      ))}
    </select>
  );
};

export default Pagination;
