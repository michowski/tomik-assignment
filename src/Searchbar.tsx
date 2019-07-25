import React, {
  FC,
  ChangeEventHandler,
  useEffect,
  useCallback,
  useRef
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

  // useCallback, so that the same function ref is passed forever to <input/>
  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = useCallback(
    e => {
      onChange(e.currentTarget.value);
    },
    [onChange]
  );

  // Debounce the `onSubmit` callback
  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => onSubmit(value), DEBOUNCE_TIME);
  }, [value, onSubmit]);

  return (
    <input
      className="Searchbar"
      placeholder="Enter your query..."
      value={value}
      onChange={onChangeHandler}
    />
  );
};

export default Searchbar;
