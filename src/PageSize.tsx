import React, { FC, useCallback, FormEventHandler } from "react";
import "./PageSize.css";

export interface Props {
  pageSize: number;
  setPageSize: (size: number) => void;
}

const PAGE_SIZES = [25, 50, 75, 100];

const PageSize: FC<Props> = ({ pageSize, setPageSize }) => {
  // useCallback, so that the same function ref is passed forever to <select/>
  const onChange: FormEventHandler<HTMLSelectElement> = useCallback(e => {
    setPageSize(+e.currentTarget.value);
  }, []);

  return (
    <div className="PageSize">
      <span>Items per page:</span>
      <select value={pageSize} onChange={onChange}>
        {PAGE_SIZES.map(size => (
          <option value={size}>{size}</option>
        ))}
      </select>
    </div>
  );
};

export default PageSize;
