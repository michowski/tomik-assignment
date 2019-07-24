import React, {
  FC,
  useState,
  ChangeEventHandler,
  useEffect,
  useCallback,
  useRef
} from "react";

import "./Searchbar.css";

export interface Props {
  initQuery: string;
  onUpdate: (query: string) => void;
}

const DEBOUNCE_TIME = 500;

const Searchbar: FC<Props> = ({ initQuery, onUpdate }) => {
  const [query, setQuery] = useState(initQuery);
  const debounceTimeout = useRef<NodeJS.Timeout>();

  // useCallback, so that the same function ref is passed forever to <input/>
  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(e => {
    setQuery(e.currentTarget.value);
  }, []);

  // Debounce the `onUpdate` callback
  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => onUpdate(query), DEBOUNCE_TIME);
  }, [query]);

  return (
    <input
      className="Searchbar"
      placeholder="Enter your query..."
      value={query}
      onChange={onChange}
    />
  );
};

export default Searchbar;
