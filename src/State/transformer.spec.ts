import { toURL, toSearchState } from "./transformer";

describe("State\\transformer::toURL", () => {
  test("serialises state", () => {
    expect(toURL({})).toBe("");

    expect(
      toURL({
        pageSize: 31,
      })
    ).toBe("?pageSize=31");

    expect(
      toURL({
        currentPage: 32,
      })
    ).toBe("?page=32");

    expect(
      toURL({
        query: "hello world",
      })
    ).toBe("?search_query=hello+world");

    expect(
      toURL({
        activeSortOrder: {
          attribute: "test",
          order: "desc",
        },
      })
    ).toBe("?sort=test%3Adesc");

    expect(
      toURL({
        activeSortOrder: {
          attribute: "test",
          order: "asc",
        },
      })
    ).toBe("?sort=test%3Aasc");

    expect(
      toURL({
        selectedFacets: [{ id: "facet_1", values: ["one"] }],
      })
    ).toBe("?facets=facet_1%3Aone");

    expect(
      toURL({
        selectedFacets: [{ id: "facet_1", values: ["one", "two"] }],
      })
    ).toBe("?facets=facet_1%3Aone%2Ctwo");

    expect(
      toURL({
        selectedFacets: [
          { id: "facet_1", values: ["one", "two"] },
          { id: "facet_2", values: ["three", "four"] },
          { id: "aaa", values: ["test"] },
          { id: "zzz", values: ["b", "c", "a"] },
        ],
      })
    ).toBe(
      "?facets=aaa%3Atest%7Cfacet_1%3Aone%2Ctwo%7Cfacet_2%3Afour%2Cthree%7Czzz%3Aa%2Cb%2Cc"
    );

    expect(
      toURL({
        filter: [{ id: "price", filter: "price > 100 AND price <= 200" }],
      })
    ).toBe("?filter=price%3Aprice+%3E+100+AND+price+%3C%3D+200");

    expect(
      toURL({
        filter: [{ id: "price", filter: "price > 100 AND price <= 200" }, { id: "size", filter: "size = 1 OR size = 2 OR size = 3" }],
      })
    ).toBe("?filter=price%3Aprice+%3E+100+AND+price+%3C%3D+200%7Csize%3Asize+%3D+1+OR+size+%3D+2+OR+size+%3D+3");

    expect(
      toURL({
        filter: [{ id: "price", filter: "price > 100 AND price <= 200" }, { id: "size", filter: "size = 1 OR size = 2 OR size = 3" }, { id: "permanent", filter: "categoryid = 3" }],
      })
    ).toBe("?filter=price%3Aprice+%3E+100+AND+price+%3C%3D+200%7Csize%3Asize+%3D+1+OR+size+%3D+2+OR+size+%3D+3");

    expect(
      toURL({
        query: "hello world",
        pageSize: 31,
        currentPage: 32,
        activeSortOrder: {
          attribute: "test",
          order: "desc",
        },
        selectedFacets: [
          { id: "facet_1", values: ["one", "two"] },
          { id: "facet_2", values: ["three", "four"] },
          { id: "aaa", values: ["test"] },
          { id: "zzz", values: ["b", "c", "a"] },
        ],
      })
    ).toBe(
      "?search_query=hello+world&sort=test%3Adesc&page=32&pageSize=31&facets=aaa%3Atest%7Cfacet_1%3Aone%2Ctwo%7Cfacet_2%3Afour%2Cthree%7Czzz%3Aa%2Cb%2Cc"
    );
  });
});

describe("State\\transformer::toSearchState", () => {
  test("converts a URL successfully", () => {
    expect(
      toSearchState(
        "http://test.com/?search_query=hello+world&sort=test%3Adesc&page=32&pageSize=31&facets=facet_1%3Aone%2Ctwo%7Cfacet_2%3Afour%2Cthree%7Czzz%3Ab%2Ca%2Cc%7Caaa%3Atest&filter=price:price > 100 AND price <= 200"
      )
    ).toEqual({
      query: "hello world",
      pageSize: 31,
      currentPage: 32,
      activeSortOrder: {
        attribute: "test",
        order: "desc",
      },
      selectedFacets: [
        { id: "aaa", values: ["test"] },
        { id: "facet_1", values: ["one", "two"] },
        { id: "facet_2", values: ["four", "three"] },
        { id: "zzz", values: ["a", "b", "c"] },
      ],
      filter: [
        { id: "price", filter: "price > 100 AND price <= 200" }
      ]
    });
  });
});
