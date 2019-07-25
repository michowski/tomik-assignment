import { formatDate, queryParamsToUrl, queryParamsFromUrl } from "./utils";
import { FetchRepositoriesParams } from "./types";
import { DEFAULT_QUERY_PARAMS, DEFAULT_SORT_ORDER } from "./constants";

describe("formatDate", () => {
  it("formats ISO dates", () => {
    expect(formatDate("2015-05-30T08:50:51Z")).toBe("2015-05-30 08:50:51");
    expect(formatDate("1643-03-22T09:11:53Z")).toBe("1643-03-22 09:11:53");
  });
});

describe("queryParamsToUrl", () => {
  it("converts queryParams into a proper URL", () => {
    const params: FetchRepositoriesParams = {
      query: "tonik test",
      sortBy: "stars",
      sortOrder: "asc",
      page: 3
    };

    expect(queryParamsToUrl(params)).toBe(
      "?q=tonik+test&page=3&sortBy=stars&sortOrder=asc"
    );
  });

  it("gives an empty absolute path when there's an empty query", () => {
    const params: FetchRepositoriesParams = {
      query: "",
      sortBy: "stars",
      sortOrder: "asc",
      page: 3
    };

    expect(queryParamsToUrl(params)).toBe("/");
  });
});

describe("queryParamsFromUrl", () => {
  it("reads query params from URL", () => {
    const url = "?q=tonik+test&page=3&sortBy=stars&sortOrder=asc";

    const expected: FetchRepositoriesParams = {
      query: "tonik test",
      sortBy: "stars",
      sortOrder: "asc",
      page: 3
    };

    expect(queryParamsFromUrl(url)).toEqual(expected);
  });

  it("returns a default object when no query param", () => {
    const urlEmptyQuery = "?q=&page=3&sortBy=stars&sortOrder=asc";
    const urlNoQuery = "page=3&sortBy=stars&sortOrder=asc";

    const expected: FetchRepositoriesParams = DEFAULT_QUERY_PARAMS;

    expect(queryParamsFromUrl(urlEmptyQuery)).toEqual(expected);
    expect(queryParamsFromUrl(urlNoQuery)).toEqual(expected);
  });

  it("uses defaults for the missing params", () => {
    const url = "?q=tonik+test&sortBy=stars";

    const expected: FetchRepositoriesParams = {
      query: "tonik test",
      sortBy: "stars",
      sortOrder: DEFAULT_SORT_ORDER,
      page: 1
    };

    expect(queryParamsFromUrl(url)).toEqual(expected);
  });
});
