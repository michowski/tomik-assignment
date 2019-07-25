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

const DEBOUNCE_TIME = 500;

const Searchbar: FC<Props> = ({ value, onChange, onSubmit }) => {
  const debounceTimeout = useRef<NodeJS.Timeout>();

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = useCallback(
    e => {
      onChange(e.currentTarget.value);
    },
    [onChange]
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

  // Debounce the `onSubmit` callback
  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => onSubmit(value), DEBOUNCE_TIME);
  }, [value, onSubmit]);

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
