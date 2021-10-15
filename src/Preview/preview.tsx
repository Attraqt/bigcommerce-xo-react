import ReactDOM from "react-dom";
import Client from "../Attraqt/Client";
import { Facet } from "../Components/Data/Facet";
import { SortOption } from "../Components/Data/SortOrder";
import BasicContainer from "../Components/UI/Basic/Container";
import FacetBasic from "../Components/UI/Basic/Facet/FacetBasic";
import FacetDataList from "../Components/UI/Basic/Facet/FacetDataList";
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
import withSearch, { FixedState, SearchState } from "../Components/WithSearch";
import { toSearchState, toURL } from "../State/transformer";

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

const initialState: SearchState = {
  query: "to",
  pageSize: 32,
};

const fixedState: FixedState = {
  // filter: "categryid = 123"
};

const type: PreviewType = PreviewType.CONFIGURABLE;

switch (Number(type)) {
  case PreviewType.BASIC: {
    const SearchContainer = withSearch(
      BasicContainer,
      api,
      sort,
      initialState,
      fixedState,
      {}
    );

    ReactDOM.render(<SearchContainer />, document.getElementById("app"));

    break;
  }

  case PreviewType.CONFIGURABLE: {
    const loadMore = true;

    const builderConfig: Configuration = {
      componentMap: {
        pagination: loadMore ? PaginationLoadMore : PaginationBasic,
        sort: SortOrder,
        grid: ItemGrid,
        contentCard: ContentCard,
        productCard: ProductCard,
        summary: Summary,
        facets: Facets,
      },
      facetResolver: (f: Facet) =>
        f.id == "facet-Brand" ? FacetDataList : FacetBasic,
    };

    const Container = withSearch(
      ConfigurableContainer,
      api,
      sort,
      initialState,
      fixedState,
      { clearItemsOnNewPage: !loadMore },
      toURL,
      toSearchState
    );

    ReactDOM.render(
      <Container config={builderConfig} />,
      document.getElementById("app")
    );

    break;
  }
}
