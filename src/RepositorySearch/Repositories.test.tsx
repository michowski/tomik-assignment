import React from "react";
import { render } from "enzyme";
import Repositories from "./Repositories";
import { FetchRepositoriesParams, Repository } from "./types";
import { AjaxStatus } from "../types";
import { repositories } from "../__mocks__/repositories";

describe("Repositories", () => {
  const queryParams: FetchRepositoriesParams = {
    query: "tonik",
    sortBy: "stars",
    sortOrder: "asc",
    page: 1
  };

  it("renders nothing at all when the list is empty", () => {
    const repos = render(
      <Repositories
        queryParams={queryParams}
        repositories={[]}
        totalCount={0}
        status={AjaxStatus.Idle}
        updateSorting={() => {}}
        updatePage={() => {}}
      />
    );

    expect(repos.html()).toBe(null);
  });

  describe("renders a proper markup", () => {
    const repos = render(
      <Repositories
        queryParams={queryParams}
        repositories={repositories}
        totalCount={2}
        status={AjaxStatus.Idle}
        updateSorting={() => {}}
        updatePage={() => {}}
      />
    );

    const navigations = repos.find(".Repositories_navigation");
    const table = repos.find(".Repositories_table");

    it("renders 2 identical navigations", () => {
      expect(navigations.length).toBe(2);

      const html1 = navigations.eq(0).html();
      const html2 = navigations.eq(1).html();

      expect(html1).toBe(html2);
    });

    it("renders pagination", () => {
      const navigation = navigations.first();
      const pagination = navigation.find(".Pagination");

      expect(pagination.length).toBe(1);
      expect(pagination.find("a").length).toBe(1);
      expect(pagination.find("a").hasClass("current")).toBe(true);
    });

    it("renders page size dropdown", () => {
      const navigation = navigations.first();
      const pageSize = navigation.find(".PageSize");

      expect(pageSize.length).toBe(1);

      const select = pageSize.find("select");
      const options = select.find("option");
      expect(options.length).toBeGreaterThan(1);
    });

    it("renders a table with a row per each repository", () => {
      expect(table.length).toBe(1);
      expect(table.hasClass("loading")).toBe(false);

      const rows = table.find("tr");
      expect(rows.length).toBe(3); // repositories count + 1

      expect(rows.eq(0).find("th").length).toBe(4);
      expect(rows.eq(1).find("td").length).toBe(4);
      expect(rows.eq(2).find("td").length).toBe(4);

      const secondRepository = rows.eq(2);
      const cells = secondRepository.find("td");

      const cell1 = cells.eq(0).children();
      const cell2 = cells.eq(1).children();
      const cell3 = cells.eq(2).text();
      const cell4 = cells.eq(3).text();

      expect(cell1[0].tagName).toBe("a");
      expect(cell1.prop("href")).toBe(repositories[1].html_url);

      expect(cell2[0].tagName).toBe("a");
      expect(cell2.prop("href")).toBe(repositories[1].owner.html_url);

      expect(cell3).toBe("★" + repositories[1].stargazers_count);

      expect(cell4).toBe("222 222");
    });
  });
});
