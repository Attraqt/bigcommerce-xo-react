import ReactDOM from "react-dom";
import Client from "../Attraqt/Client";
import { Facet } from "../Components/Data/Facet";
import { SortOption } from "../Components/Data/SortOrder";
import BasicContainer from "../Components/UI/Basic/Container";
import FacetBasic from "../Components/UI/Basic/Facet/FacetBasic";
import Facets from "../Components/UI/Basic/Facets";
import ContentCard from "../Components/UI/Basic/Item/ContentCard";
import ProductCard from "../Components/UI/Basic/Item/ProductCard";
import ItemGrid from "../Components/UI/Basic/ItemGrid";
import PaginationBasic from "../Components/UI/Basic/Pagination/PaginationBasic";
import PaginationLoadMore from "../Components/UI/Basic/Pagination/PaginationLoadMore";
import SortOrder from "../Components/UI/Basic/SortOrder";
import Summary from "../Components/UI/Basic/Summary";
import ConfigurableContainer from "../Components/UI/Builder/ConfigurableContainer";
import { Configuration } from "../Components/UI/Builder/Configuration";
import withSearch, { FixedState } from "../Components/WithSearch";

enum PreviewType {
  BASIC,
  CONFIGURABLE,
}

const api = new Client("60eff59fc82a20b7044bd0e9");
const sort: SortOption[] = [
  {
    attribute: "title",
    order: "desc",
    label: "Title (Descending)",
  },
  {
    attribute: "title",
    order: "asc",
    label: "Title (Ascending)",
  },
];

const initialState = {
  query: "to",
};

const config = {
  clearItemsOnNewPage: true,
};

const fixedState: FixedState = {
  // filter: "categryid = 123"
};

const type = PreviewType.CONFIGURABLE;

if (PreviewType.BASIC) {
  const SearchContainer = withSearch(
    BasicContainer,
    api,
    sort,
    initialState,
    fixedState,
    config
  );
  ReactDOM.render(<SearchContainer />, document.getElementById("app"));
} else if (PreviewType.CONFIGURABLE) {
  const builderConfig: Configuration = {
    loadMorePagination: true,
    componentMap: {
      pagination: config.clearItemsOnNewPage
        ? PaginationBasic
        : PaginationLoadMore,
      sort: SortOrder,
      grid: ItemGrid,
      contentCard: ContentCard,
      productCard: ProductCard,
      summary: Summary,
      facets: Facets,
    },
    facetResolver: (f: Facet) => FacetBasic,
  };

  const Container = withSearch(ConfigurableContainer, api, sort, initialState);

  ReactDOM.render(
    <Container config={builderConfig} />,
    document.getElementById("app")
  );
}
