import React from "react";
import { shallow } from "enzyme";

import Pagination from "./Pagination";

describe("Pagination", () => {
  Object.defineProperty(window, "scrollTo", {
    configurable: true
  });
  window.scrollTo = jest.fn();

  const urlFormat = (page: number) => `/page/${page}`;
  const onSelect = jest.fn();

  const pagination = shallow(
    <Pagination
      currentPage={2}
      totalCount={33}
      pageSize={10}
      urlFormat={urlFormat}
      onSelect={onSelect}
    />
  );

  const pages = pagination.find("a");

  it("renders the proper amount of pages", () => {
    expect(pages.length).toBe(4);
  });

  it("correctly marks the current page", () => {
    expect(pages.at(0).hasClass("current")).toBe(false);
    expect(pages.at(1).hasClass("current")).toBe(true);
    expect(pages.at(2).hasClass("current")).toBe(false);
    expect(pages.at(3).hasClass("current")).toBe(false);
  });

  it("calls onSelect with the clicked page's index", () => {
    const event = { preventDefault: () => {} };

    pages.at(0).simulate("click", event);
    pages.at(2).simulate("click", event);

    expect(onSelect.mock.calls.length).toBe(2);

    expect(onSelect.mock.calls[0][0]).toBe(1);
    expect(onSelect.mock.calls[1][0]).toBe(3);
  });

  it("sets proper URLs", () => {
    expect(pages.at(0).prop("href")).toBe("/page/1");
    expect(pages.at(1).prop("href")).toBe("/page/2");
  });

  it("limits the amount of pages to 10", () => {
    const paginationManyResults = shallow(
      <Pagination
        currentPage={2}
        totalCount={301}
        pageSize={30}
        urlFormat={urlFormat}
        onSelect={onSelect}
      />
    );

    expect(paginationManyResults.find("a").length).toBe(10);
  });
});
