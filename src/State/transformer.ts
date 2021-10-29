import { SearchState } from "../Components/WithSearch";
import { isEmpty } from "lodash";
import { ActiveSortOption } from "../Components/Data/SortOrder";
import { SelectedFacet } from "../Components/Data/Facet";
import { forEach } from "lodash";

const QUERY_ANY = "*";
const PAGE_SIZE_DEFAULT = 32;

const facetSorter = (a: SelectedFacet, b: SelectedFacet) =>
  a.id.toUpperCase() > b.id.toUpperCase() ? 1 : -1;

export const toSearchState = (url: string): SearchState => {
  const oUrl = new URL(url);
  const params = oUrl.searchParams;
  const state: SearchState = {};

  let query = params.get("query");
  let sort = params.get("sort");
  let page = params.get("page");
  let pageSize = params.get("pageSize");
  let facets = params.get("facets");

  if (query) {
    state.query = query;
  } else {
    state.query = QUERY_ANY;
  }

  if (sort) {
    const [attribute, order] = sort.split(":");

    state.activeSortOrder = {
      attribute,
      order,
    } as ActiveSortOption;
  }

  if (page) {
    state.currentPage = Number(page);
  } else {
    state.currentPage = 1;
  }

  if (pageSize) {
    state.pageSize = Number(pageSize);
  } else {
    state.pageSize = PAGE_SIZE_DEFAULT;
  }

  if (facets) {
    state.selectedFacets = facets
      .split("|")
      .map((data) => {
        const [attr, valueString] = data.split(":");
        const values = valueString.split(",").sort();

        return {
          id: attr,
          values,
        } as SelectedFacet;
      })
      .sort(facetSorter);
  }

  return state;
};

export const toURL = (state: SearchState): string => {
  const params: any = {};

  if (state.query && state.query !== QUERY_ANY) {
    params.query = state.query;
  }

  if (state.activeSortOrder && !isEmpty(state.activeSortOrder)) {
    params.sort = `${state.activeSortOrder.attribute}:${state.activeSortOrder.order}`;
  }

  if (state.currentPage && state.currentPage > 1) {
    params.page = state.currentPage;
  }

  if (state.pageSize && state.pageSize != PAGE_SIZE_DEFAULT) {
    params.pageSize = state.pageSize;
  }

  if (state.selectedFacets && !isEmpty(state.selectedFacets)) {
    params.facets = state.selectedFacets
      .sort(facetSorter)
      .map((f) => {
        return `${f.id}:${f.values.sort()}`;
      })
      .join("|");
  }

  const searchParams = new URLSearchParams();

  forEach(params, (value, key) => {
    searchParams.set(key, value);
  });

  if (searchParams.toString().length > 0) {
    return "?" + searchParams.toString();
  }

  return "";
};
