import React, { useEffect, useState } from "react";
import Client from "../Attraqt/Client";
import { Facet, SelectedFacet } from "./Data/Facet";
import { calculateMaxPages, calculatePage } from "./Data/Pagination";
import { Item } from "./Data/Item";
import { ActiveSortOption, SortOption } from "./Data/SortOrder";

export type withSearchProps = {
  api: Client;

  query: string;
  setQuery: (value: string) => unknown;

  activeSortOrder: ActiveSortOption | undefined;
  setActiveSortOrder: (value: ActiveSortOption) => unknown;

  availableSortOrders: SortOption[];
  setAvailableSortOrders: (value: SortOption[]) => unknown;

  currentPage: number;
  setCurrentPage: (value: number) => unknown;

  totalPages: number;
  // setTotalPages: (value: number) => unknown;

  facets: Facet[];
  // setFacets: (value: Facet[]) => unknown;

  selectedFacets: SelectedFacet[];
  setSelectedFacets: (value: SelectedFacet[]) => unknown;

  items: Item[];
  totalItems: number;
  pageItemNumberStart: number;
  pageItemNumberEnd: number;
};

export type InitialState = {
  query?: string;
  activeSortOrder?: ActiveSortOption;
  currentPage?: number;
  selectedFacets?: SelectedFacet[];
  filter?: string;
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

const withSearch = <T,>(
  WrappedComponent: React.ComponentType<T & withSearchProps>,
  api: Client,
  initialAvailableSortOrders: SortOption[] = [],
  initialState: InitialState = {},
  searchConfiguration: SearchConfiguration = {}
) => {
  searchConfiguration = initSearchConfigurationDefaults(searchConfiguration);

  const SearchWrappedComponent = (props: T) => {
    const [query, setQuery] = useState<string>(initialState.query ?? "");
    const [sort, setSortOrder] = useState<ActiveSortOption | undefined>(
      initialState.activeSortOrder
    );
    const [availableSortOrders, setAvailableSortOrders] = useState<
      SortOption[]
    >(initialAvailableSortOrders);
    const [items, setItems] = useState<Item[]>([]);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(
      initialState.currentPage ?? 1
    );
    const [perPage, setPerPage] = useState<number>(96);
    const [facets, setFacets] = useState<Facet[]>([]);
    const [selectedFacets, setSelectedFacets] = useState<SelectedFacet[]>(
      initialState.selectedFacets ?? []
    );
    const [totalItems, setTotalItems] = useState<number>(0);

    /**
     * Used to detect whether there was a page change in the last state change.
     * @private
     */
    const [__previousCurrentPage, __setPreviousCurrentPage] =
      useState<number>(currentPage);

    useEffect(() => {
      console.log("Query:", query);
      console.log("Sort:", sort);
      console.log("Current Page:", currentPage);
      console.log("Selected Facets:", selectedFacets);

      api
        .search(
          query,
          (currentPage - 1) * perPage,
          perPage,
          sort ? [sort] : [],
          selectedFacets,
          initialState.filter
        )
        .send()
        .then((response) => {
          let pageChanged = currentPage != __previousCurrentPage;

          setTotalPages(
            calculateMaxPages(response.metadata.count, response.metadata.limit)
          );
          setCurrentPage(
            calculatePage(response.metadata.offset, response.metadata.limit)
          );
          setTotalItems(response.metadata.count);
          setFacets(response.metadata.availableFacets);
          setSelectedFacets(response.metadata.selectedFacets);

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
        });
    }, [query, sort, currentPage, JSON.stringify(selectedFacets)]);

    return (
      <WrappedComponent
        api={api}
        query={query}
        setQuery={setQuery}
        activeSortOrder={sort}
        setActiveSortOrder={setSortOrder}
        availableSortOrders={availableSortOrders}
        setAvailableSortOrders={setAvailableSortOrders}
        items={items}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        pageItemNumberStart={
          searchConfiguration.clearItemsOnNewPage
            ? (currentPage - 1) * perPage + 1
            : 1
        }
        pageItemNumberEnd={Math.min(currentPage * perPage, totalItems)}
        facets={facets}
        selectedFacets={selectedFacets}
        setSelectedFacets={setSelectedFacets}
        {...(props as T)}
      ></WrappedComponent>
    );
  };

  return SearchWrappedComponent;
};

export default withSearch;
