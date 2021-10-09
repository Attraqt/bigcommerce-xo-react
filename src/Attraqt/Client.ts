import _ from "lodash";
import { Facet, SelectedFacet } from "../Components/Data/Facet";
import { Item } from "../Components/Data/Item";
import { ActiveSortOption } from "../Components/Data/SortOrder";
import { DeepPick } from "ts-deep-pick";

type SearchResponseRaw = {
  items: Item[];
  metadata: {
    count: number;
    time: number;
    token: string;
    url: string;
    offset: number;
    limit: number;
    facets: {
      id: string;
      title: string;
      count: number;
      values: { value: string; count: number; selected: boolean }[];
    }[];
  };
};

type SearchResponse = {
  items: Item[];
  metadata: {
    count: number;
    time: number;
    token: string;
    url: string;
    offset: number;
    limit: number;
    availableFacets: Facet[];
    selectedFacets: SelectedFacet[];
  };
};

class Request<TInternal, TExternal> {
  constructor(
    public readonly url: string,
    public readonly method: "POST" | "GET",
    public readonly headers: Record<string, string>,
    public readonly body: any,
    private mapper: (from: TInternal) => TExternal
  ) {}

  async send(): Promise<TExternal> {
    return fetch(this.url, {
      method: this.method,
      headers: this.headers,
      body: JSON.stringify(this.body ?? ""),
    })
      .then((res) => res.json())
      .then((res: TInternal) => this.mapper(res));
  }
}

/**
 *
 * @param from
 * @private
 * @returns
 */
export const SearchResponseMapper = (
  from: DeepPick<SearchResponseRaw, "metadata.facets">
): SearchResponse => {
  let availableFacets: Facet[] = from.metadata.facets.map((facet) => {
    return {
      id: facet.id,
      title: facet.title,
      values: facet.values.map((value) => {
        return { value: value.value, count: value.count };
      }),
    } as Facet;
  });

  let selectedFacets: SelectedFacet[] = from.metadata.facets
    .map((facet) => {
      let selectedValues = facet.values
        .filter((value) => value.selected)
        .map((value) => value.value);

      return {
        id: facet.id,
        values: selectedValues,
      };
    })
    .filter((item) => item.values.length > 0);

  from.metadata.facets = [];

  let to: any = from;
  delete to.metadata.facets;

  to.metadata.availableFacets = availableFacets;
  to.metadata.selectedFacets = selectedFacets;

  return to;
};

class Client {
  constructor(private token: string) {}

  /**
   *
   * @param query
   * @param offset
   * @param limit
   * @param sortBy
   * @param facets
   * @returns
   */
  search(
    query: string,
    offset: number,
    limit: number,
    sortBy?: ActiveSortOption[],
    facets?: SelectedFacet[],
    filter?: string
  ): Request<SearchResponseRaw, SearchResponse> {
    const requestBody = {
      token: this.token,
      query: query.length > 0 ? query : undefined,
      options: {
        facets: _.reject(facets, (f) => f.values.length == 0),
        offset,
        limit,
        sortBy,
        filter,
      },
    };

    return new Request(
      "https://api-eu.attraqt.io/search",
      "POST",
      {
        "Content-Type": "application/json",
      },
      _.pickBy(requestBody, (value) => !!value),
      SearchResponseMapper
    );
  }
}

export default Client;
