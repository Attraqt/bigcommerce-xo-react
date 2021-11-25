import ReactDOM from "react-dom";
import Client from "../Attraqt/Client";
import { SortOption } from "../Components/Data/SortOrder";
import BasicContainer from "../Components/UI/Basic/Container";
import Facets from "../Components/UI/Basic/FacetContainer";
import ContentCard from "../Components/UI/Basic/Item/ContentCard";
import ProductCard from "../Components/UI/Basic/Item/ProductCard";
import ItemGrid from "../Components/UI/Basic/ItemGrid";
import PaginationBasic from "../Components/UI/Basic/Pagination/PaginationBasic";
import PaginationLoadMore from "../Components/UI/Basic/Pagination/PaginationLoadMore";
import SortOrder from "../Components/UI/Cornerstone/SortOrder";
import Summary from "../Components/UI/Basic/Summary";
import ConfigurableContainer from "../Components/UI/Builder/ConfigurableContainer";
import { Configuration } from "../Components/UI/Builder/Configuration";
import withSearch, { FixedState, SearchState } from "../Components/WithSearch";
import { toSearchState, toURL } from "../State/transformer";
import _ from "lodash";
import { CornerstoneContainer, withBigCommerceConfiguration } from "..";

enum PreviewType {
  BASIC,
  CONFIGURABLE,
  BIGCOMMERCE,
}

const api = new Client("6051c020cdf2f91094b2ede1");
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
  pageSize: 32,
};

const fixedState: FixedState = {
  filter: "kind != variant",
};

const type: PreviewType = PreviewType.BIGCOMMERCE;

switch (Number(type)) {
  case PreviewType.BASIC: {
    const SearchContainer = _.flowRight(
      withSearch(api, initialState, fixedState, {}),
      withBigCommerceConfiguration()
    )(BasicContainer);

    ReactDOM.render(<SearchContainer />, document.getElementById("app"));

    break;
  }

  case PreviewType.CONFIGURABLE: {
    const loadMore = false;

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
    };

    const Container = _.flowRight(
      withSearch<{ config: Configuration }>(
        api,
        initialState,
        fixedState,
        { clearItemsOnNewPage: !loadMore },
        toURL,
        toSearchState
      ),
      withBigCommerceConfiguration()
    )(ConfigurableContainer);

    ReactDOM.render(
      <Container config={builderConfig} />,
      document.getElementById("app")
    );

    break;
  }

  case PreviewType.BIGCOMMERCE: {
    const SearchContainer = _.flowRight(
      withSearch(api, initialState, fixedState, {}),
      withBigCommerceConfiguration()
    )(CornerstoneContainer);

    ReactDOM.render(<SearchContainer />, document.getElementById("app"));

    break;
  }
}

(function (d, w) {
  w.xoConfig = {
    trackerKey: "",
    searchEnabled: false,
    searchToken: "6051c020cdf2f91094b2ede1",
    currency: {
      alpha: "GBP",
      symbol: "£",
    },
    customer: {
      id: "",
    },
    taxRate: 0,
    pageContext: {
      pageType: "default",
      inPageBuilder: false,
      orderConfirmation: {
        orderId: "",
      },
      product: {
        sku: "",
        id: "",
      },
      cart: {
        items: "",
        grand_total: "",
      },
    },
    customWidgetTemplates: {},
    customSortOptions: [
      {
        label: "Price Descending",
        attribute: "price",
        direction: "desc",
        sortOrder: 0,
      },
      {
        label: "Price Ascending",
        attribute: "price",
        direction: "asc",
        sortOrder: 1,
      },
    ],
    customFacetConfigurations: [
      {
        isFilter: false,
        attribute: "recommended",
        ui: "basic",
        sortOrder: 0,
      },
      {
        isFilter: false,
        attribute: "weight",
        ui: "weight_facet_ui",
        sortOrder: 1,
      },
      {
        isFilter: false,
        attribute: "height",
        ui: "datalist",
        sortOrder: 50,
      },
    ],
  } as any;
  d.dispatchEvent(
    new CustomEvent("xobc:config", { config: w.xoConfig } as any)
  );
})(document, window);
