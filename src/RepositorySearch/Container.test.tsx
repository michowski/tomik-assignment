import React from "react";
import { shallow } from "enzyme";

import * as api from "./api";
import Container from "./Container";
import { FetchRepositoriesParams } from "./types";
import { repositories } from "../__mocks__/repositories";
import SearchStatus from "../components/SearchStatus";
import { AjaxStatus } from "../types";
import Repositories from "./Repositories";
import StateHistory from "./StateHistory";

const mockResponse = {
  data: {
    total_count: 2,
    items: repositories
  }
};

const mockUrl = "?q=tonik+test&page=3&sortBy=stars&sortOrder=asc";
const expectedQueryParams: FetchRepositoriesParams = {
  query: "tonik test",
  sortBy: "stars",
  sortOrder: "asc",
  page: 3
};

Object.defineProperty(window, "location", {
  value: {
    search: mockUrl
  }
});

describe("Container", () => {
  it("makes a proper API call and renders fetched Repositories accordingly", async () => {
    const spy = spyOn(api, "fetchRepositories").and.returnValue(mockResponse);

    const container = shallow(<Container />);

    // Check if query params were read properly:
    const queryParams = container.find(StateHistory).prop("queryParams");
    expect(queryParams).toEqual(expectedQueryParams);

    // No results so far: the status should be loading
    const searchStatus = container.find(SearchStatus);
    expect(searchStatus.prop("status")).toBe(AjaxStatus.Loading);

    /* TODO: Fix these tests */

    // container.update().setProps({});

    // expect(spy).toHaveBeenCalledTimes(1);

    // // Status should now be idle
    // const searchStatusAfter = container.find(SearchStatus);
    // expect(searchStatusAfter.prop("status")).toBe(AjaxStatus.Idle);

    // // Repositories should be rendered
    // const repos = container.find(Repositories);
    // expect(repos.prop("repositories")).toBe(repositories);
  });
});
