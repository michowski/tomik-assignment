import React, {
  FC,
  useState,
  ChangeEventHandler,
  useEffect,
  useCallback,
  useRef
} from "react";

export interface Props {
  onUpdate: (query: string) => void;
}

const DEBOUNCE_TIME = 500;

const Searchbar: FC<Props> = ({ onUpdate }) => {
  const [query, setQuery] = useState("tonik");
  const lastInputTime = useRef();

  // useCallback, so that the same function ref is passed forever to <input/>
  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(e => {
    setQuery(e.currentTarget.value);
  }, []);

  // Debounce the `onUpdate` callback
  useEffect(() => {
    const prevTime = lastInputTime.current;

    // Too early to submit a new value
    if (prevTime != null && new Date().getTime() - prevTime < DEBOUNCE_TIME) {
      return;
    }

    onUpdate(query);
  }, [query]);

  return (
    <div>
      <input className="Searchbar" value={query} onChange={onChange} />
    </div>
  );
};

export default Searchbar;
