import { SearchState } from "../Components/WithSearch";
import _ from "lodash";
import { ActiveSortOption } from "../Components/Data/SortOrder";
import { SelectedFacet } from "../Components/Data/Facet";

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
  }

  if (sort) {
    state.activeSortOrder = JSON.parse(sort) as ActiveSortOption;
  }

  if (page) {
    state.currentPage = Number(page);
  }

  if (pageSize) {
    state.pageSize = Number(pageSize);
  }

  if (facets) {
    state.selectedFacets = JSON.parse(facets) as SelectedFacet[];
  }

  return state;
};

export const toURL = (state: SearchState): string => {
  const params: any = {};

  if (state.query) {
    params.query = state.query;
  }

  if (state.activeSortOrder && !_.isEmpty(state.activeSortOrder)) {
    params.sort = JSON.stringify(state.activeSortOrder);
  }

  if (state.currentPage && state.currentPage > 1) {
    params.page = state.currentPage;
  }

  if (state.pageSize && state.pageSize != 96) {
    params.pageSize = state.pageSize;
  }

  if (state.selectedFacets && !_.isEmpty(state.selectedFacets)) {
    params.facets = JSON.stringify(state.selectedFacets);
  }

  const searchParams = new URLSearchParams();

  _.forEach(params, (value, key) => {
    searchParams.set(key, value);
  });

  if (searchParams.toString().length > 0) {
    return "?" + searchParams.toString();
  }

  return "";
};
