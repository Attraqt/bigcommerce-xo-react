import Client from "./Client";
import _ from "lodash";

describe("Attraqt\\Client::search", () => {
  const request = new Client("searchtoken").search("", 0, 12);
  const requestWithQuery = new Client("searchtoken").search(
    "searchterm",
    0,
    12
  );
  const requestWithFacets = new Client("searchtoken").search(
    "",
    0,
    12,
    undefined,
    [
      {
        id: "facet_one",
        values: ["value_one", "value_two"],
      },
      { id: "facet_two", values: ["value_three"] },
      { id: "facet_three", values: [] },
    ]
  );

  test("Request URL is correct", () => {
    expect(request.url).toBe("https://api-eu.attraqt.io/search");
  });

  test("Request method is correct", () => {
    expect(request.method).toBe("POST");
  });

  test("Request body contains search token", () => {
    expect(request.body?.token).toBe("searchtoken");
  });

  test("Request body contains search query when specified", () => {
    expect(Object.keys(requestWithQuery.body).includes("query")).toBe(true);
    expect(requestWithQuery.body?.query).toBe("searchterm");
  });

  test("Request body doesn't contains search query when not specified", () => {
    expect(Object.keys(request.body).includes("query")).toBe(false);
  });

  test("Request body contains facet data", () => {
    expect(requestWithFacets.body?.options?.facets).toStrictEqual([
      { id: "facet_one", values: ["value_one", "value_two"] },
      { id: "facet_two", values: ["value_three"] },
    ]);
  });
});
