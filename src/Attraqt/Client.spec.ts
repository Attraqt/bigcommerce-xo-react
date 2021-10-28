import Client, { SearchResponseMapper } from "./Client";

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

describe("Attraqt\\Client - SearchResponseMapper", () => {
  test("Mapping works as expected", () => {
    const from = {
      metadata: {
        facets: [
          {
            id: "facet-1",
            title: "Facet One",
            count: 1,
            values: [
              { value: "Value One", count: 100, selected: false },
              { value: "Value Two", count: 200, selected: true },
            ],
          },
        ],
      },
    };

    const to = SearchResponseMapper(from);

    expect(to.metadata.availableFacets).toStrictEqual([
      {
        id: "facet-1",
        title: "Facet One",
        values: [
          {
            value: "Value One",
            count: 100,
          },
          {
            value: "Value Two",
            count: 200,
          },
        ],
      },
    ]);

    expect(to.metadata.selectedFacets).toStrictEqual([
      {
        id: "facet-1",
        values: ["Value Two"],
      },
    ]);
  });
});
