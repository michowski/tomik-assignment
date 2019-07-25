/* Searchbar - a one-input form which automatically submits the value after typing is done (debounce) */

import React, {
  FC,
  ChangeEventHandler,
  useEffect,
  useCallback,
  useRef,
  FormEventHandler
} from "react";

import "./Searchbar.css";

export interface Props {
  value: string;
  onChange: (query: string) => void;
  onSubmit: (query: string) => void;
}

export const DEBOUNCE_TIME = 500;

const Searchbar: FC<Props> = ({ value, onChange, onSubmit }) => {
  const debounceTimeout = useRef<NodeJS.Timeout>();

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = useCallback(
    e => {
      const newValue = e.currentTarget.value;

      onChange(newValue);

      // Debounce the `onSubmit` callback
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      debounceTimeout.current = setTimeout(
        () => onSubmit(newValue),
        DEBOUNCE_TIME
      );
    },
    [value, onChange, onSubmit]
  );

  const onSubmitHandler: FormEventHandler<HTMLFormElement> = useCallback(
    e => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      e.preventDefault();
      onSubmit(value);
    },
    [onSubmit, value]
  );

  return (
    <form className="Searchbar" onSubmit={onSubmitHandler}>
      <input
        placeholder="Enter your query..."
        value={value}
        onChange={onChangeHandler}
      />
    </form>
  );
};

export default Searchbar;
