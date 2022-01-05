import React, { useEffect, useState } from "react";
import Client from "../Attraqt/Client";
import {
  Facet,
  Filter,
  FilterSpecification,
  mergeSelectedFacets,
  SelectedFacet,
  unmergeSelectedFacets,
} from "./Data/Facet";
import { calculateMaxPages, calculatePage } from "./Data/Pagination";
import { Item } from "./Data/Item";
import { ActiveSortOption, SortOption } from "./Data/SortOrder";
import { toSearchState, toURL } from "../State/transformer";
import usePrevious from "../Util/UsePrevious";
import _, { isEqual } from "lodash";

export type withSearchProps = {
  api: Client;

  loading: boolean;

  query: string;
  setQuery: (value: string) => unknown;

  activeSortOrder: ActiveSortOption | undefined;
  setActiveSortOrder: (value: ActiveSortOption) => unknown;

  currentPage: number;
  setCurrentPage: (value: number) => unknown;

  totalPages: number;

  facets: Facet[];

  selectedFacets: SelectedFacet[];
  setSelectedFacets: (value: SelectedFacet[]) => unknown;

  filter: Filter[];
  setFilter: (value: Filter[]) => unknown;

  items: Item[];
  totalItems: number;
  pageItemNumberStart: number;
  pageItemNumberEnd: number;
};

export type SearchState = {
  query?: string;
  activeSortOrder?: ActiveSortOption;
  currentPage?: number;
  pageSize?: number;
  selectedFacets?: SelectedFacet[];
  filter?: Filter[];
};

export type FixedState = {
  filter?: FilterSpecification;
  permanentFacets?: SelectedFacet[];
};

export type SearchConfiguration = {
  /**
   * Default: true
   *
   * If this is set to true then if the user changes the page, the newly loaded items
   * for that page will replace the already rendered items.
   *
   * If this is set to false then when the user changes the page the new loaded items
   * will be appended to the bottom of the already rendered items.
   */
  clearItemsOnNewPage?: boolean;
};

const initSearchConfigurationDefaults = (
  providedConfig: SearchConfiguration
): SearchConfiguration => {
  if (providedConfig.clearItemsOnNewPage === undefined) {
    providedConfig.clearItemsOnNewPage = true;
  }

  return providedConfig;
};

/**
 * Decorate the `WrappedComponent` with props based on the searching and reporting of results from the
 * Search API.
 *
 * @param api
 * @param initialAvailableSortOrders
 * @param initialState The state of the search on component initialisation.
 * @param permanentState Values that will not change, regardless of what happens to the search state.
 * @param searchConfiguration
 * @param transformSearchStateToUrl
 * @param transformUrlToSearchState
 * @returns
 */
const withSearch = <T,>(
  api: Client,
  initialState: SearchState = {},
  permanentState: FixedState = {},
  searchConfiguration: SearchConfiguration = {},
  transformSearchStateToUrl: (state: SearchState) => string = toURL,
  transformUrlToSearchState: (url: string) => SearchState = toSearchState
) => {
  return (WrappedComponent: React.ComponentType<T & withSearchProps>) => {
    searchConfiguration = initSearchConfigurationDefaults(searchConfiguration);

    const WrappedWithSearchComponent = (props: T) => {
      const [query, setQuery] = useState<string>();
      const previousQuery = usePrevious(query);

      const [sort, setSortOrder] = useState<ActiveSortOption | undefined>();
      const previousSort = usePrevious(sort);

      const [items, setItems] = useState<Item[]>([]);
      const [totalPages, setTotalPages] = useState<number>(1);
      const [currentPage, setCurrentPage] = useState<number>(1);

      const [perPage, setPerPage] = useState<number>();
      const previousPerPage = usePrevious(perPage);

      const [facets, setFacets] = useState<Facet[]>([]);

      const [selectedFacets, __setSelectedFacets] = useState<SelectedFacet[]>(
        initialState.selectedFacets ?? []
      );

      const [filter, setFilter] = useState<Filter[]>([]);

      const setSelectedFacets = (data: SelectedFacet[]) => {
        // Keep our internal representation of the selected facets in a deterministic order so we don't trigger
        // any useEffect calls unnecessarily.
        __setSelectedFacets(
          data
            .sort((a: SelectedFacet, b: SelectedFacet) =>
              a.id.toUpperCase() > b.id.toUpperCase() ? 1 : -1
            )
            .map((f) => {
              f.values.sort();
              return f;
            })
        );
      };

      const previousSelectedFacets = usePrevious(selectedFacets);

      const [totalItems, setTotalItems] = useState<number>(0);
      const [loading, setLoading] = useState<boolean>(true);

      /**
       * Used to detect whether there was a page change in the last state change.
       * @private
       */
      const [__previousCurrentPage, __setPreviousCurrentPage] =
        useState<number>(currentPage);

      useEffect(() => {
        const state = transformUrlToSearchState(document.location.toString());

        if (state.query) {
          setQuery(state.query);
        } else if (initialState.query) {
          setQuery(initialState.query);
        }

        setPerPage(state.pageSize ?? initialState.pageSize ?? 96);
        setCurrentPage(state.currentPage ?? initialState.currentPage ?? 1);

        if (state.activeSortOrder) {
          setSortOrder(state.activeSortOrder);
        } else if (initialState.activeSortOrder) {
          setSortOrder(initialState.activeSortOrder);
        }

        if (state.selectedFacets) {
          setSelectedFacets(state.selectedFacets);
        } else if (initialState.selectedFacets) {
          setSelectedFacets(initialState.selectedFacets);
        }

        if (state.filter) {
          setFilter(state.filter);
        } else if (initialState.filter) {
          setFilter(initialState.filter);
        }
      }, []);

      useEffect(() => {
        if (!perPage || !currentPage || !query) return;

        /**
         * If we've changed anything that might affect the search results grid then set the current page back to 1.
         */
        if (currentPage > 1) {
          if (
            perPage != previousPerPage ||
            query != previousQuery ||
            !isEqual(sort, previousSort) ||
            !isEqual(selectedFacets, previousSelectedFacets)
          ) {
            setCurrentPage(1);
            return;
          }
        }

        setLoading(true);

        api
          .search(
            query,
            (currentPage - 1) * perPage,
            perPage,
            sort ? [sort] : [],
            mergeSelectedFacets(
              selectedFacets,
              permanentState.permanentFacets ?? []
            ),
            filter
              .concat(
                permanentState.filter
                  ? { id: "permanent", filter: permanentState.filter }
                  : []
              )
              .map((f) => f.filter)
              .join(" AND ")
          )
          .send()
          .then((response) => {
            let pageChanged = currentPage != __previousCurrentPage;

            setTotalPages(
              calculateMaxPages(
                response.metadata.count,
                response.metadata.limit
              )
            );
            setCurrentPage(
              calculatePage(response.metadata.offset, response.metadata.limit)
            );
            setTotalItems(response.metadata.count);
            setFacets(response.metadata.availableFacets);
            setSelectedFacets(
              unmergeSelectedFacets(
                response.metadata.selectedFacets,
                permanentState.permanentFacets ?? []
              )
            );

            if (pageChanged) {
              if (searchConfiguration.clearItemsOnNewPage) {
                setItems(response.items);
              } else {
                setItems([...items, ...response.items]);
              }
            } else {
              setItems(response.items);
            }

            __setPreviousCurrentPage(currentPage);
          })
          .finally(() => {
            setLoading(false);
          });
      }, [
        query,
        sort,
        currentPage,
        JSON.stringify(selectedFacets),
        JSON.stringify(filter),
      ]);

      useEffect(() => {
        const url = transformSearchStateToUrl({
          query: query,
          activeSortOrder: sort,
          currentPage: currentPage,
          pageSize: perPage,
          selectedFacets: selectedFacets,
          filter,
        });

        window.history.replaceState(
          {},
          "",
          window.document.location.pathname + url
        );
      }, [
        query,
        sort,
        currentPage,
        perPage,
        JSON.stringify(selectedFacets),
        JSON.stringify(filter),
      ]);

      return (
        <WrappedComponent
          api={api}
          loading={loading}
          query={query ?? ""}
          setQuery={setQuery}
          activeSortOrder={sort}
          setActiveSortOrder={setSortOrder}
          items={items}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          pageItemNumberStart={
            perPage
              ? searchConfiguration.clearItemsOnNewPage
                ? (currentPage - 1) * perPage + 1
                : 1
              : 1
          }
          pageItemNumberEnd={
            perPage ? Math.min(currentPage * perPage, totalItems) : 1
          }
          facets={facets}
          selectedFacets={selectedFacets}
          setSelectedFacets={setSelectedFacets}
          filter={filter}
          setFilter={setFilter}
          {...(props as T)}
        ></WrappedComponent>
      );
    };

    return WrappedWithSearchComponent;
  };
};

export default withSearch;
