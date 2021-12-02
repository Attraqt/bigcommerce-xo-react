/* eslint-disable react/no-unescaped-entities */
import { FacetResolver } from "../../Data/Facet";
import FacetContainer from "./FacetContainer";
import ItemGrid from "./ItemGrid";
import SortOrder from "./SortOrder";
import Pagination from "./Pagination";
import { withSearchProps } from "../../WithSearch";
import { BigCommerceConfigurationProps } from "../../Data/WithBigCommerceConfiguration";

type AllProps = { facetResolver: FacetResolver } & withSearchProps &
  BigCommerceConfigurationProps;

const Container = (props: AllProps) => {
  return (
    <div className="xo__container">
      <aside className="page-sidebar" id="faceted-search-container">
        <FacetContainer
          active={props.selectedFacets}
          available={props.facets}
          setActive={props.setSelectedFacets}
          filter={props.filter}
          setFilter={props.setFilter}
          isLoading={props.loading}
          facetComponentResolver={props.facetResolver}
          bigCommerceConfig={props.bigCommerceConfig}
        />
      </aside>
      <div className="page-content" id="product-listing-container">
        {props.items.length > 0 ? (
          <>
            <SortOrder
              active={props.activeSortOrder}
              setActive={props.setActiveSortOrder}
              isLoading={props.loading}
              bigCommerceConfig={props.bigCommerceConfig}
            />
            <ItemGrid items={props.items} isLoading={props.loading} />
            <Pagination
              current={props.currentPage}
              total={props.totalPages}
              setCurrent={props.setCurrentPage}
              isLoading={props.loading}
            />
          </>
        ) : (
          <p>Sorry - no items found!</p>
        )}
      </div>
    </div>
  );
};

export default Container;
