import { Repository } from "../RepositorySearch/types";

export const repositories: Repository[] = [
  {
    id: 1,
    name: "foo",
    stargazers_count: 130,
    html_url: "github.com/john/foo",
    updated_at: "111T111Z",
    owner: {
      id: 101,
      login: "john",
      html_url: "github.com/john",
      avatar_url: "avatar.com/1"
    }
  },
  {
    id: 2,
    name: "bar",
    stargazers_count: 0,
    html_url: "github.com/jack/bar",
    updated_at: "222T222Z",
    owner: {
      id: 102,
      login: "jack",
      html_url: "github.com/jack",
      avatar_url: "avatar.com/2"
    }
  }
];
