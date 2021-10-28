/* eslint-disable react/no-unescaped-entities */
import { FacetResolver } from "../../Data/Facet";
import Facets from "./Facets";
import ItemGrid from "./ItemGrid";
import SortOrder from "./SortOrder";
import Pagination from "./Pagination";
import { withSearchProps } from "../../WithSearch";

type AllProps = { facetResolver: FacetResolver } & withSearchProps;

const Container = (props: AllProps) => {
  return (
    <div className="xo__container">
      <aside className="page-sidebar" id="faceted-search-container">
        <Facets
          active={props.selectedFacets}
          available={props.facets}
          setActive={props.setSelectedFacets}
        />
      </aside>
      <div className="page-content" id="product-listing-container">
        {props.items.length > 0 ? (
          <>
            <SortOrder
              active={props.activeSortOrder}
              available={props.availableSortOrders}
              setActive={props.setActiveSortOrder}
            />
            <ItemGrid items={props.items} />
            <Pagination
              current={props.currentPage}
              total={props.totalPages}
              setCurrent={props.setCurrentPage}
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
