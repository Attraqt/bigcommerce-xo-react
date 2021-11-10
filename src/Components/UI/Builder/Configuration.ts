import React from "react";
import { FacetContainerProps } from "../../Data/Facet";
import { ItemGridProps, ItemHandlerProps } from "../../Data/Item";
import { PaginationProps } from "../../Data/Pagination";
import { SortOrderProps } from "../../Data/SortOrder";
import { withSearchProps } from "../../WithSearch";

export type Configuration = {
  feature?: {
    loadMore?: boolean;
  };
  componentMap: {
    pagination: React.FC<PaginationProps>;
    sort: React.FC<SortOrderProps>;
    grid: React.FC<ItemGridProps>;
    facets: React.FC<FacetContainerProps>;
    summary: React.FC<withSearchProps>;
    productCard: React.FC<ItemHandlerProps>;
    contentCard: React.FC<ItemHandlerProps>;
  };
};
