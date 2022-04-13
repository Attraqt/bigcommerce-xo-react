/* eslint-disable lodash/consistent-compose */
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
import { CornerstoneContainer, withBigCommerceConfiguration } from "..";
import flowRight from "lodash/flowRight";

enum PreviewType {
  BASIC,
  CONFIGURABLE,
  BIGCOMMERCE,
}

const api = new Client("615b225d6484a1c6d099d96d");
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
    const SearchContainer = flowRight(
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

    const Container = flowRight(
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
    const SearchContainer = flowRight(
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
    searchToken: "615b225d6484a1c6d099d96d",
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
    customFacetConfigurations:
      [
        {
          "isFilter": false,
          "id": "facet-Brand",
          "ui": "basic",
          "sortOrder": 0,
          "attribute": "Brand",
          "firestoreDocId": "6QtPYqXm32JiFy1CfCbS"
        },
        {
          "isFilter": false,
          "id": "facet-Gender",
          "ui": "basic",
          "sortOrder": 1,
          "attribute": "Gender",
          "firestoreDocId": "BxKQYPKVl4T6FnlugnsM"
        },
        {
          "isFilter": false,
          "id": "facet-Color",
          "ui": "datalist",
          "sortOrder": 2,
          "attribute": "Color",
          "firestoreDocId": "XGG4DiCsUmOrm9De1mcB"
        },
        {
          "isFilter": true,
          "id": "facet-price",
          "ui": "numeric_range",
          "sortOrder": 3,
          "attribute": "price",
          "firestoreDocId": "ku7jArzkhWWep2fYzl0Z"
        },
        {
          "isFilter": false,
          "id": "facet-newcollection",
          "ui": "basic",
          "sortOrder": 4,
          "attribute": "tags",
          "firestoreDocId": "rZVrCCIGvKt52oPWyCVD"
        },
        {
          "isFilter": false,
          "id": "facet-tagSelection",
          "ui": "basic",
          "sortOrder": 5,
          "attribute": "tags",
          "firestoreDocId": "TSxoqx8PgHLk6ILQyqtS"
        },
        {
          "isFilter": false,
          "id": "facet-categoryIds",
          "ui": "basic",
          "sortOrder": 6,
          "attribute": "categoryIds",
          "firestoreDocId": "abUzRfXDO0Hp4BZWhAnl"
        }
      ]
  } as any;
  d.dispatchEvent(
    new CustomEvent("xobc:config", { config: w.xoConfig } as any)
  );
})(document, window);
