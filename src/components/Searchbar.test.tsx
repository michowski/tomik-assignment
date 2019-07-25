import React from "react";

import Searchbar, { DEBOUNCE_TIME } from "./Searchbar";
import { shallow } from "enzyme";

jest.useFakeTimers();

describe("Searchbar", () => {
  const value = "tonik";

  it("calls onChange instantly after user input, but not onSubmit", () => {
    const onChange = jest.fn();
    const onSubmit = jest.fn();

    const searchbar = shallow(
      <Searchbar value={value} onChange={onChange} onSubmit={onSubmit} />
    );

    searchbar
      .find("input")
      .first()
      .simulate("change", {
        currentTarget: {
          value: "toni"
        }
      });

    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][0]).toBe("toni");

    expect(onSubmit.mock.calls.length).toBe(0);
  });

  it("calls onSubmit with a current value on form submit event", () => {
    const onChange = jest.fn();
    const onSubmit = jest.fn();

    const searchbar = shallow(
      <Searchbar value={value} onChange={onChange} onSubmit={onSubmit} />
    );

    searchbar
      .find("form")
      .first()
      .simulate("submit", {
        preventDefault: () => {}
      });

    expect(onSubmit.mock.calls.length).toBe(1);
    expect(onSubmit.mock.calls[0][0]).toBe("tonik");

    expect(onChange.mock.calls.length).toBe(0);
  });

  it("calls onSubmit automatically after user stops typing", () => {
    const onChange = jest.fn();
    const onSubmit = jest.fn();

    const searchbar = shallow(
      <Searchbar value={value} onChange={onChange} onSubmit={onSubmit} />
    );

    searchbar
      .find("input")
      .first()
      .simulate("change", {
        currentTarget: {
          value: "toni"
        }
      })
      .simulate("change", {
        currentTarget: {
          value: "ton"
        }
      });

    // The form isn't submited instantly, despite the changes
    expect(onChange.mock.calls.length).toBe(2);
    expect(onChange.mock.calls[0][0]).toBe("toni");
    expect(onChange.mock.calls[1][0]).toBe("ton");
    expect(onSubmit.mock.calls.length).toBe(0);

    // Some time later - still not submitted
    jest.advanceTimersByTime(DEBOUNCE_TIME / 2);
    expect(onSubmit.mock.calls.length).toBe(0);

    // After the full DEBOUNCE_TIME passed, the latest value should be submitted
    jest.advanceTimersByTime(DEBOUNCE_TIME / 2);
    expect(onSubmit.mock.calls.length).toBe(1);
    expect(onSubmit.mock.calls[0][0]).toBe("ton");
  });
});
