/* eslint-disable lodash/prefer-lodash-method */
import { SearchState } from "../Components/WithSearch";
import { filter, isEmpty, forEach } from "lodash";
import { ActiveSortOption } from "../Components/Data/SortOrder";
import { Filter, SelectedFacet } from "../Components/Data/Facet";

const PAGE_SIZE_DEFAULT = 32;

const facetSorter = (a: SelectedFacet, b: SelectedFacet) =>
  a.id.toUpperCase() > b.id.toUpperCase() ? 1 : -1;

const filterSorter = (a: Filter, b: Filter) =>
  a.id.toUpperCase() > b.id.toUpperCase() ? 1 : -1;

export const toSearchState = (url: string): SearchState => {
  const oUrl = new URL(url);
  const params = oUrl.searchParams;
  const state: SearchState = {};

  let query = params.get("search_query");
  let sort = params.get("sort");
  let page = params.get("page");
  let pageSize = params.get("pageSize");
  let facets = params.get("facets");
  let filter = params.get("filter");

  state.query = query ?? '';

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
        const [id, valueString] = data.split(":");
        const values = valueString.split(",").sort();

        return {
          id,
          values,
        } as SelectedFacet;
      })
      .sort(facetSorter);
  }

  if (filter) {
    state.filter = filter
      .split("|")
      .map((data) => {
        const [attr, value] = data.split(":");
        return {
          id: attr,
          filter: value,
        } as Filter;
      })
      .sort(filterSorter);
  }

  return state;
};

export const toURL = (state: SearchState): string => {
  const params: any = {};

  if (state.query) {
    params.search_query = state.query;
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
    const facetString = state.selectedFacets
      .sort(facetSorter)
      .map((f) => {
        return `${f.id}:${f.values.sort()}`;
      })
      .join("|");

    if (facetString) {
      params.facets = facetString;
    }
  }

  if (state.filter && !isEmpty(state.filter)) {
    const filterString = state.filter.filter((f) => f.id != "permanent").sort(filterSorter).map((f) => { return `${f.id}:${f.filter}` }).join("|");

    if (filterString) {
      params.filter = filterString;
    }
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
